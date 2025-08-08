import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';

const ImageCard = ({ imageUrl, prompt, createdBy, onAddToSlider }) => {
  const handleAddToSlider = () => {
    onAddToSlider(imageUrl);
    toast.success("Successfully added to slider");
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${prompt.slice(0, 20).replace(/\s+/g, '_') || 'download'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  return (
    <StyledWrapper>
      <div className="card-container">
        <div className="card">
          <img src={imageUrl} alt={prompt} className="card-img" />
          <div className="overlay">
            <h3 className="prompt">{prompt}</h3>
            <p className="creator">by {createdBy}</p>
            <div className="button-group">
              {onAddToSlider && (
                <button className="add-button" onClick={handleAddToSlider}>
                  ➕ Add to Slider
                </button>
              )}
              <button className="download-button" onClick={handleDownload}>
                ⬇️ Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-container {
    width: 280px;
    height: 360px;
    border-radius: 20px;
    perspective: 1000px;
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
    background: #1e1e2f;
    transition: all 1s ease;
  }

  .card-container:hover .card {
    box-shadow:
      0 0 20px rgba(255, 0, 128, 0.4),
      0 0 40px rgba(128, 0, 255, 0.3),
      0 0 60px rgba(0, 200, 255, 0.25);
    transform: translateY(-5px);
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    filter: brightness(0.92);
  }

  .overlay {
    position: absolute;
    bottom: 0;
    padding: 16px;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
    color: #fff;
  }

  .prompt {
    font-size: 14px;
    font-weight: 600;
  }

  .creator {
    font-size: 12px;
    color: #c1b4ff;
    margin-bottom: 8px;
  }

  .button-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .add-button, .download-button {
    font-size: 12px;
    background: #6a0dad;
    border: none;
    padding: 6px 12px;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .add-button:hover, .download-button:hover {
    background: #8b3dd9;
  }
`;

export default ImageCard;
