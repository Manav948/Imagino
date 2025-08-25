"use client"
import React from "react"
import styled from "styled-components"
import { Lightbulb } from "lucide-react"

const suggestions = [
  "A futuristic cyberpunk city at night, neon lights glowing",
  "A cozy cabin in the snowy mountains with northern lights",
  "Surreal dreamscape with floating islands and waterfalls",
  "Ultra realistic portrait of a medieval knight in battle",
  "A mystical forest with glowing mushrooms and fairies",
]

const Suggestion = ({ setPrompt }) => {
  const handleClick = (text) => {
    setPrompt(text)
  }

  return (
    <StyledWrapper>
      <div className="container">
        {/* Heading */}
        <h2 className="heading">
          <Lightbulb className="icon" />
          Try These Suggestions
        </h2>

        {/* Card Grid */}
        <div className="grid">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleClick(item)}
            >
              <div className="card-content text-xl font-bold">
                <p className="card-para">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 5rem auto;
    padding: 0 1.5rem;
    text-align: center;
  }

  .heading {
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: linear-gradient(to right, cyan, purple, pink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 3rem;
  }

  .icon {
    width: 32px;
    height: 32px;
    color: #facc15; /* yellow-400 */
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    justify-items: center;
  }

  .card {
    width: 300px;
    height: 120px;
    background-color: #4158D0;
    background-image: linear-gradient(
      43deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    );
    border-radius: 8px;
    color: white;
    overflow: hidden;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    cursor: pointer;
  }

  .card-content {
    padding: 20px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }

  .card-title {
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .card-para {
    opacity: 0.9;
    font-size: 14px;
  }

  .card:hover {
    transform: rotateY(10deg) rotateX(10deg) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }

  .card:hover:before {
    transform: translateX(-100%);
  }

  .card:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }

  .card:hover:after {
    transform: translateX(100%);
  }
`

export default Suggestion
