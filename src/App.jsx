import React, { useState, useEffect } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

export default function App() {
  const [count, setCount] = useState(0);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [showMinusOne, setShowMinusOne] = useState(false);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (count / 150) * circumference;
  const percentage = Math.round((count / 150) * 100);

  const incBtnHandler = () => {
    if (count < 150) {
      setCount((val) => val + 1);
      setShowPlusOne(true);
      setTimeout(() => setShowPlusOne(false), 500);
    }
  };

  const decBtnHandler = () => {
    if (count !== 0) {
      setCount((val) => val - 1);
      setShowMinusOne(true);
      setTimeout(() => setShowMinusOne(false), 500); 
    }
  };

  const resetHandler = () => {
    setCount(0);
  };

  useEffect(() => {
    if (percentage === 100) {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  return (
    <div className="container prevent-select">
      <div className="card" style={{ animation: 'fadeIn 0.5s ease-in' }}>
        <div className="circular-progress">
          <svg width="150" height="150">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" style={{ stopColor: "#7e57c2", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#f06292", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle
              className="track"
              cx="75"
              cy="75"
              r={radius}
            />
            <circle
              className="progress"
              cx="75"
              cy="75"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={progress}
            />
          </svg>
          <div className="percentage">{percentage}%</div>
        </div>
        <div className="value">Count: {count}</div>
        <div className="buttons-row">
          <div className="button-wrapper">
            <button onClick={incBtnHandler}><i className="fas fa-plus"></i></button>
            {showPlusOne && <div className="plus-one">+1</div>}
          </div>
          <div className="button-wrapper">
            <button className="secondary" onClick={decBtnHandler}><i className="fas fa-minus"></i></button>
            {showMinusOne && <div className="minus-one">-1</div>}
          </div>
        </div>
        <div className="buttons-column">
          <button className="default" onClick={resetHandler}><i className="fas fa-redo"></i> Reset</button>
        </div>
      </div>
    </div>
  );
}
