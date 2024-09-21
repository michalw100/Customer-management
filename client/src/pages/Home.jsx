import React from 'react';
import image from '../picture/homeBackground.png';

export default function Home() {
  return (
      <img 
        src={image} 
        alt="Home Background" 
        className="image"
      />
  );
}
