import React from "react";
import "./index.scss";

interface LoadingProps {
  text?: string;
  size?: number; 
}

const Loading: React.FC<LoadingProps> = ({ text , size = 40 }) => {
  return (
    <div className="loading-container">
      <div className="spinner" style={{ width: size, height: size }} />
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default Loading;
