"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

const ImageDisplayer = ({ 
  src, 
  alt = "Image", 
  title,
  width = "100%",
  height = "auto",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);
  
  // Determine if we're using an S3 URL or a local/relative URL
  const isExternalUrl = src.startsWith('http');
  
  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div className={styles.imageContainer}>
      <div 
        className={`${styles.imageWrapper} ${!isLoaded ? styles.loading : ''}`}
      >
        {/* For S3 or external URLs, use a regular img tag */}
        {isExternalUrl ? (
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            style={{ width, height }}
            onLoad={handleImageLoad}
            {...props}
          />
        ) : (
          // For local/relative URLs, use Next.js Image component
          <Image
            ref={imageRef}
            src={src}
            alt={alt}
            fill={width === "100%"}
            width={width !== "100%" ? width : undefined}
            height={height !== "auto" ? height : undefined}
            style={{ objectFit: "contain" }}
            onLoad={handleImageLoad}
            {...props}
          />
        )}
        
        {!isLoaded && (
          <div className={styles.placeholder}>
            <div className={styles.loadingText}>Loading image...</div>
          </div>
        )}
      </div>
      
      {title && (
        <div className={styles.caption}>
          {title}
        </div>
      )}
    </div>
  );
};

export default ImageDisplayer; 