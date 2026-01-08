import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterWrapper>
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>VisionCraft AI</h2>
                    <p>Create. Inspire. Share.</p>
                </div>
                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="#">Explore</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
                <div className="footer-social">
                    <a href="https://www.github.com/"><FaGithub /></a>
                    <a href="https://www.linkedin.com/"><FaLinkedin /></a>
                    <a href="https://www.x.com/"><FaTwitter /></a>
                </div>
            </div>
            <p className="footer-copy">&copy; {new Date().getFullYear()} Made 💖 with Manav Valani.</p>
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.footer`
  padding: 40px 20px 20px;
  color: #eee;
  text-align: center;

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    padding-bottom: 20px;
    border-bottom: 1px solid #444;
  }

  .footer-brand h2 {
    font-size: 24px;
    background: linear-gradient(90deg, #c267ff, #67b2ff, #ff63b5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .footer-brand p {
    font-size: 14px;
    color: #aaa;
    margin-top: 4px;
  }

  .footer-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .footer-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #ff63b5;
  }

  .footer-social a {
    margin: 0 10px;
    color: #999;
    font-size: 20px;
    transition: color 0.3s ease;
  }

  .footer-social a:hover {
    color: #67b2ff;
  }

  .footer-copy {
    margin-top: 20px;
    font-size: 12px;
    color: #666;
  }
`;
