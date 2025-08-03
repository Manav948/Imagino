import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-hot-toast'

const ImageCard = ({ imageUrl, prompt, createdBy, onAddToSlider }) => {
  const handleSubmit = () => {
    toast.success("SuccessFully added in slider");
  }
  return (
    <StyledWrapper>
      <div className="card-container">
        <div className="card">
          <img src={imageUrl} alt={prompt} className="card-img" />
          <div className="overlay">
            <h3 className="prompt">{prompt}</h3>
            <p className="creator">by {createdBy}</p>
            {onAddToSlider && (
              <button
                className="add-button"
                onClick={() => {onAddToSlider(imageUrl),handleSubmit()}}
              >
                ➕ Add to Slider
              </button>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-container {
    width: 280px;
    height: 340px;
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

  .add-button {
    font-size: 12px;
    background: #6a0dad;
    border: none;
    padding: 6px 12px;
    border-radius: 12px;
    color: white;
    cursor: pointer;
  }
`;

export default ImageCard;
