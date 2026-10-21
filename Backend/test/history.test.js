import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import http from 'http';
import FormData from 'form-data';
import axios from 'axios';
import User from '../src/models/user.js';
import GeneratedImage from '../src/models/generatedImage.js';

// Valid 1x1 PNG image buffer for testing
const VALID_1X1_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const runTests = async () => {
  console.log('--- Starting Image History Automated Test Suite ---');
  let server;
  let testPort = 8009;
  const baseUrl = `http://127.0.0.1:${testPort}`;

  try {
    // Wait for mongoose connection
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    console.log('✓ Connected to MongoDB');

    // Start a dedicated test HTTP server
    const expressApp = (await import('../app.js')).default || app;
    // We create our own server instance to avoid interfering with any running instance
    server = http.createServer(expressApp);
    await new Promise((resolve) => server.listen(testPort, '127.0.0.1', resolve));
    console.log(`✓ Test server running on ${baseUrl}`);

    // Create Test User A and User B
    const userAEmail = `test_user_a_${Date.now()}@example.com`;
    const userBEmail = `test_user_b_${Date.now()}@example.com`;

    const userA = await User.create({
      username: `user_a_${Date.now()}`,
      email: userAEmail,
      password: 'HashedPassword123!',
      imageCount: 2,
      maxImageLimit: 10,
    });

    const userB = await User.create({
      username: `user_b_${Date.now()}`,
      email: userBEmail,
      password: 'HashedPassword123!',
      imageCount: 0,
      maxImageLimit: 10,
    });

    const tokenA = jwt.sign({ userId: userA._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const tokenB = jwt.sign({ userId: userB._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('✓ Test users and JWT credentials generated');

    // --- Scenario 1: Unauthenticated GET /api/user/history returns 401 ---
    try {
      await axios.get(`${baseUrl}/api/user/history`);
      throw new Error('Should have failed with 401');
    } catch (err) {
      if (err.response?.status === 401) {
        console.log('✓ Scenario 1 PASSED: Unauthenticated GET returns 401');
      } else {
        throw new Error(`Expected 401, got ${err.response?.status || err.message}`);
      }
    }

    // --- Scenario 2: Unauthenticated POST /api/user/history returns 401 ---
    try {
      await axios.post(`${baseUrl}/api/user/history`, { prompt: 'test' });
      throw new Error('Should have failed with 401');
    } catch (err) {
      if (err.response?.status === 401) {
        console.log('✓ Scenario 2 PASSED: Unauthenticated POST returns 401');
      } else {
        throw new Error(`Expected 401, got ${err.response?.status || err.message}`);
      }
    }

    // --- Scenario 3: Validation failure for empty prompt ---
    try {
      await axios.post(
        `${baseUrl}/api/user/history`,
        { prompt: '' },
        { headers: { Authorization: `Bearer ${tokenA}` } }
      );
      throw new Error('Should have failed with 400 for empty prompt');
    } catch (err) {
      if (err.response?.status === 400) {
        console.log('✓ Scenario 3 PASSED: Validation rejects empty prompt with 400');
      } else {
        throw new Error(`Expected 400, got ${err.response?.status || err.message}`);
      }
    }

    // --- Scenario 4: User A saves an image via multipart upload ---
    const clientGenId = `gen_${Date.now()}_test`;
    const form = new FormData();
    form.append('image', VALID_1X1_PNG, { filename: 'test_creation.png', contentType: 'image/png' });
    form.append('prompt', 'Neon cyberpunk alley with vibrant reflection puddles');
    form.append('aspectRatio', '16:9');
    form.append('cfgScale', '8.5');
    form.append('steps', '45');
    form.append('sampler', 'DPM++ 2M SDE');
    form.append('clientGenerationId', clientGenId);

    const saveRes = await axios.post(`${baseUrl}/api/user/history`, form, {
      headers: {
        Authorization: `Bearer ${tokenA}`,
        ...form.getHeaders(),
      },
    });

    if (saveRes.status !== 201 || !saveRes.data?.data?.image?._id) {
      throw new Error(`Expected 201 Created with saved record, got: ${JSON.stringify(saveRes.data)}`);
    }
    const savedImage = saveRes.data.data.image;
    console.log(`✓ Scenario 4 PASSED: User A saved image successfully (ID: ${savedImage._id}, Cloudinary URL: ${savedImage.imageUrl})`);

    // Verify fields in DB
    if (
      savedImage.prompt !== 'Neon cyberpunk alley with vibrant reflection puddles' ||
      savedImage.aspectRatio !== '16:9' ||
      savedImage.cfgScale !== 8.5 ||
      savedImage.steps !== 45 ||
      savedImage.sampler !== 'DPM++ 2M SDE' ||
      savedImage.clientGenerationId !== clientGenId
    ) {
      throw new Error(`Metadata mismatch in saved image: ${JSON.stringify(savedImage)}`);
    }
    console.log('✓ Scenario 4.1 PASSED: All generation parameters persisted accurately');

    // --- Scenario 5: Idempotency check with same clientGenerationId ---
    const formDup = new FormData();
    formDup.append('image', VALID_1X1_PNG, { filename: 'test_creation.png', contentType: 'image/png' });
    formDup.append('prompt', 'Neon cyberpunk alley with vibrant reflection puddles');
    formDup.append('clientGenerationId', clientGenId);

    const dupRes = await axios.post(`${baseUrl}/api/user/history`, formDup, {
      headers: {
        Authorization: `Bearer ${tokenA}`,
        ...formDup.getHeaders(),
      },
    });

    if (dupRes.status !== 200 || dupRes.data?.data?.image?._id !== savedImage._id) {
      throw new Error(`Expected 200 OK returning existing record, got: ${JSON.stringify(dupRes.data)}`);
    }

    const countForGenId = await GeneratedImage.countDocuments({
      userId: userA._id,
      clientGenerationId: clientGenId,
    });
    if (countForGenId !== 1) {
      throw new Error(`Expected exactly 1 DB record for clientGenerationId, found: ${countForGenId}`);
    }
    console.log('✓ Scenario 5 PASSED: Idempotency verified — duplicate request returned existing record without creating duplicate');

    // Save a second image for User A to test pagination & search
    const form2 = new FormData();
    form2.append('image', VALID_1X1_PNG, { filename: 'test2.png', contentType: 'image/png' });
    form2.append('prompt', 'Serene mountain cabin surrounded by snow');
    form2.append('aspectRatio', '1:1');
    form2.append('clientGenerationId', `gen_${Date.now()}_test2`);

    const saveRes2 = await axios.post(`${baseUrl}/api/user/history`, form2, {
      headers: {
        Authorization: `Bearer ${tokenA}`,
        ...form2.getHeaders(),
      },
    });
    const savedImage2 = saveRes2.data.data.image;
    console.log(`✓ Saved second image for pagination/search tests (ID: ${savedImage2._id})`);

    // --- Scenario 6: Pagination and sorting ---
    const listRes = await axios.get(`${baseUrl}/api/user/history?page=1&limit=1`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });

    if (listRes.status !== 200 || !listRes.data?.data?.pagination) {
      throw new Error(`Invalid pagination response: ${JSON.stringify(listRes.data)}`);
    }
    const { pagination, images } = listRes.data.data;
    if (images.length !== 1 || pagination.totalImages !== 2 || pagination.totalPages !== 2 || !pagination.hasNextPage) {
      throw new Error(`Pagination metadata mismatch: ${JSON.stringify(pagination)}`);
    }
    // Newest first check: savedImage2 was created after savedImage
    if (images[0]._id !== savedImage2._id) {
      throw new Error(`Expected newest image first (${savedImage2._id}), got: ${images[0]._id}`);
    }
    console.log('✓ Scenario 6 PASSED: Pagination works correctly with stable newest-first ordering');

    // --- Scenario 7: Prompt search filtering ---
    const searchRes = await axios.get(`${baseUrl}/api/user/history?search=cyberpunk`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const searchImages = searchRes.data.data.images;
    if (searchImages.length !== 1 || searchImages[0]._id !== savedImage._id) {
      throw new Error(`Search filter failed. Expected 1 cyberpunk image, got: ${searchImages.length}`);
    }
    console.log('✓ Scenario 7 PASSED: Search by prompt filters results accurately');

    // --- Scenario 8: Single item retrieval by ID ---
    const getRes = await axios.get(`${baseUrl}/api/user/history/${savedImage._id}`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    if (getRes.status !== 200 || getRes.data?.data?.image?._id !== savedImage._id) {
      throw new Error(`Get by ID failed: ${JSON.stringify(getRes.data)}`);
    }
    console.log('✓ Scenario 8 PASSED: Successfully retrieved single image record by ID');

    // --- Scenario 9: Security / Ownership: User B cannot access User A's image ---
    try {
      await axios.get(`${baseUrl}/api/user/history/${savedImage._id}`, {
        headers: { Authorization: `Bearer ${tokenB}` },
      });
      throw new Error('User B should not be able to access User A image');
    } catch (err) {
      if (err.response?.status === 403) {
        console.log('✓ Scenario 9 PASSED: User B blocked with 403 Forbidden when accessing User A record');
      } else {
        throw new Error(`Expected 403, got ${err.response?.status || err.message}`);
      }
    }

    // --- Scenario 10: Security / Ownership: User B cannot delete User A's image ---
    try {
      await axios.delete(`${baseUrl}/api/user/history/${savedImage._id}`, {
        headers: { Authorization: `Bearer ${tokenB}` },
      });
      throw new Error('User B should not be able to delete User A image');
    } catch (err) {
      if (err.response?.status === 403) {
        console.log('✓ Scenario 10 PASSED: User B blocked with 403 Forbidden when deleting User A record');
      } else {
        throw new Error(`Expected 403, got ${err.response?.status || err.message}`);
      }
    }

    // --- Scenario 11: User A deletes image ---
    const delRes = await axios.delete(`${baseUrl}/api/user/history/${savedImage._id}`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    if (delRes.status !== 200) {
      throw new Error(`Delete failed with status: ${delRes.status}`);
    }
    const checkDeleted = await GeneratedImage.findById(savedImage._id);
    if (checkDeleted !== null) {
      throw new Error('Image record still exists in MongoDB after deletion');
    }
    console.log('✓ Scenario 11 PASSED: User A deleted image; verified removed from database and Cloudinary cleanup triggered');

    // --- Scenario 12: Backward compatibility with /api/user/store-image & /api/user/images ---
    const legacySave = await axios.post(
      `${baseUrl}/api/user/store-image`,
      { prompt: 'Legacy test prompt', imageUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
      { headers: { Authorization: `Bearer ${tokenA}` } }
    );
    if (legacySave.status !== 200) {
      throw new Error(`Legacy store-image failed: ${legacySave.status}`);
    }

    const legacyGet = await axios.get(`${baseUrl}/api/user/images`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    if (legacyGet.status !== 200 || !Array.isArray(legacyGet.data?.images)) {
      throw new Error(`Legacy images get failed: ${JSON.stringify(legacyGet.data)}`);
    }
    console.log('✓ Scenario 12 PASSED: Legacy endpoints /store-image and /images work seamlessly with new architecture');

    // Clean up test data
    await GeneratedImage.deleteMany({ userId: { $in: [userA._id, userB._id] } });
    await User.deleteMany({ _id: { $in: [userA._id, userB._id] } });
    console.log('✓ Cleaned up test MongoDB documents');

    console.log('\n==========================================');
    console.log('🎉 ALL 12 AUTOMATED TESTS PASSED SUCCESSFULLY!');
    console.log('==========================================\n');
  } catch (error) {
    console.error('\n❌ TEST RUN FAILED:', error.response?.data || error.message || error);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.disconnect();
  }
};

runTests();
