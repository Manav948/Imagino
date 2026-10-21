/**
 * Generate a responsive, lightweight Cloudinary URL transformation for thumbnails.
 * Leaves non-Cloudinary URLs or data URLs unchanged.
 *
 * @param {string} url
 * @param {Object} [options]
 * @param {number} [options.width=600]
 * @param {string} [options.quality='auto']
 * @param {string} [options.format='auto']
 * @returns {string}
 */
export const getOptimizedImageUrl = (url, { width = 600, quality = 'auto', format = 'auto' } = {}) => {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }
  // Avoid duplicating transformations if already transformed
  if (url.includes('/upload/w_') || url.includes('/upload/c_')) {
    return url;
  }
  return url.replace('/upload/', `/upload/w_${width},c_limit,q_${quality},f_${format}/`);
};

/**
 * Robust cross-origin image downloader.
 * Fetches the image as a Blob so the browser actually triggers a download
 * instead of navigating to the external Cloudinary URL.
 *
 * @param {string} imageUrl
 * @param {string} [promptText='image']
 * @returns {Promise<boolean>}
 */
export const downloadImage = async (imageUrl, promptText = 'image') => {
  const sanitizedPrompt = (promptText || 'imagino')
    .slice(0, 32)
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${sanitizedPrompt || 'imagino'}_${Date.now()}.png`;

  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    return true;
  } catch (error) {
    console.warn('Direct blob fetch failed, falling back to window download:', error);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
};

/**
 * Center-crops a base64 image according to the specified aspect ratio.
 * Resolves both a cropped base64 data URL and an image/png Blob for upload.
 *
 * @param {string} base64Str
 * @param {string} aspectRatio - '1:1' | '16:9' | '9:16'
 * @returns {Promise<{ dataUrl: string, blob: Blob }>}
 */
export const cropImageToBlob = (base64Str, aspectRatio = '1:1') => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = base64Str;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const width = img.width;
      const height = img.height;
      let targetWidth = width;
      let targetHeight = height;

      if (aspectRatio === '16:9') {
        targetHeight = Math.round(width * (9 / 16));
      } else if (aspectRatio === '9:16') {
        targetWidth = Math.round(height * (9 / 16));
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Center crop offsets
      const sx = Math.max(0, Math.round((width - targetWidth) / 2));
      const sy = Math.max(0, Math.round((height - targetHeight) / 2));

      ctx.drawImage(img, sx, sy, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);

      const dataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        resolve({ dataUrl, blob: blob || null });
      }, 'image/png');
    };

    img.onerror = () => {
      // If image loading fails, return original dataUrl without cropping
      resolve({ dataUrl: base64Str, blob: null });
    };
  });
};

/**
 * Format timestamp into human-readable relative time or standard date
 * @param {string|Date} dateInput
 * @returns {string}
 */
export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return 'Recently';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Recently';

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};
