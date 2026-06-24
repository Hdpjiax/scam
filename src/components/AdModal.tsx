"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AdModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    closeModal();
    window.location.href = `/login?email=${encodeURIComponent(email)}&register=true`;
  };

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem("hasSeenAd");
    if (!hasSeenAd) {
      // Short delay so the page can render first.
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setShow(false);
    sessionStorage.setItem("hasSeenAd", "true");
  };

  if (!show) return null;

  return (
    <div className="ad-modal-overlay" onClick={closeModal}>
      <div className="ad-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="ad-close-btn" onClick={closeModal} aria-label="Close">
          <X />
        </button>
        <div className="ad-modal-image">
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
            alt="NŌMA interior decor"
          />
        </div>
        <div className="ad-modal-text">
          <span className="ad-badge">Exclusive Offer</span>
          <h2>30% DISCOUNT</h2>
          <p>On your first purchase. Bring your spaces to life with our collection of objects designed to inspire tranquility.</p>
          <form className="ad-form" onSubmit={handleAdSubmit}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ad-input"
            />
            <button type="submit" className="ad-primary-btn">
              Claim 30% Off
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .ad-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: adFadeIn 0.5s ease-out forwards;
        }

        .ad-modal-content {
          background: #111;
          width: 100%;
          max-width: 800px;
          border-radius: 20px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transform: translateY(20px);
          animation: adSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s;
          opacity: 0;
        }

        .ad-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .ad-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.1);
        }

        .ad-modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ad-modal-text {
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(135deg, #161616 0%, #0a0a0a 100%);
        }

        .ad-badge {
          background: rgba(255, 255, 255, 0.1);
          color: #d1b894;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          margin-bottom: 24px;
          border: 1px solid rgba(209, 184, 148, 0.2);
        }

        .ad-modal-text h2 {
          font-size: 2.5rem;
          font-weight: 300;
          line-height: 1.1;
          margin: 0 0 20px 0;
          color: white;
          letter-spacing: -0.02em;
        }

        .ad-modal-text p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 40px 0;
          font-weight: 300;
        }

        .ad-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ad-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 16px 24px;
          font-size: 15px;
          color: white;
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
        }

        .ad-input:focus {
          border-color: #d1b894;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(209, 184, 148, 0.25);
        }

        .ad-primary-btn {
          background: #fff;
          color: #000;
          border: none;
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .ad-primary-btn:hover {
          background: #d1b894;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        @keyframes adFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes adSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .ad-modal-content {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          
          .ad-modal-image {
            height: 200px;
          }
          
          .ad-modal-text {
            padding: 40px 30px;
          }
          
          .ad-modal-text h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
