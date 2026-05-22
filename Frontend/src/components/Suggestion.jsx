"use client"
import React from "react"
import styled from "styled-components"
import { Terminal } from "lucide-react"

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
      <div className="suggestion-panel">
        <div className="suggestion-header">
          <Terminal className="suggestion-icon" />
          <span className="suggestion-title">SUGGESTION_TEMPLATES</span>
        </div>

        <div className="suggestion-grid">
          {suggestions.map((item, index) => (
            <button
              key={index}
              className="suggestion-chip"
              onClick={() => handleClick(item)}
              title="Click to load prompt"
            >
              <span className="suggestion-idx">[0{index + 1}]</span>
              <span className="suggestion-text">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .suggestion-panel {
    width: 100%;
    text-align: left;
  }

  .suggestion-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .suggestion-icon {
    width: 12px;
    height: 12px;
    color: #ff4a1c;
  }

  .suggestion-title {
    font-family: monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #888;
  }

  .suggestion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 8px;
  }

  .suggestion-chip {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: rgba(18, 18, 18, 0.6);
    border: 1px solid #262626;
    border-radius: 4px;
    padding: 8px 12px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    width: 100%;
    outline: none;
  }

  .suggestion-chip:hover {
    border-color: #ff4a1c;
    background: rgba(255, 74, 28, 0.05);
    box-shadow: 0 0 10px rgba(255, 74, 28, 0.1);
  }

  .suggestion-idx {
    font-family: monospace;
    font-size: 10px;
    color: #ff4a1c;
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .suggestion-text {
    font-family: monospace;
    font-size: 11px;
    color: #a3a3a3;
    line-height: 1.4;
    transition: color 0.2s ease-in-out;
  }

  .suggestion-chip:hover .suggestion-text {
    color: #ffffff;
  }
`

export default Suggestion
