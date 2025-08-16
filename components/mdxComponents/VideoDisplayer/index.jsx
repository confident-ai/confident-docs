"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Verified, 
  Share2, 
  Check, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize
} from 'lucide-react';

const VideoDisplayer = ({ src, type = 'video/mp4', title = "How to use Confident AI", ...props }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const wrapperRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewStats, setViewStats] = useState({
    views: 0,
    daysAgo: 0,
    likes: 0
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    // Generate random view count between 1.5k and 15k
    const randomViews = Math.floor(Math.random() * (15000 - 1500) + 1500);
    // Random upload date (1-30 days ago)
    const daysAgo = Math.floor(Math.random() * 30) + 1;
    // Random like count (60-80% of views)
    const likePercentage = Math.random() * 0.2 + 0.6; // Between 60-80%
    const likeCount = Math.floor(randomViews * likePercentage);
    
    setViewStats({
      views: randomViews > 1000 ? `${(randomViews / 1000).toFixed(1)}K` : randomViews,
      daysAgo: daysAgo,
      likes: likeCount > 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount
    });
  }, []); 
  
  // Use Intersection Observer to detect when video is visible
  useEffect(() => {
    let videoElement = null;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading the video before showing it
          setVideoLoaded(true);
          
          // Create and start loading the video immediately in the background
          videoElement = document.createElement('video');
          videoElement.preload = 'auto';
          videoElement.src = src;
          videoElement.muted = true;
          
          // Unobserve once we've started the loading process
          observer.unobserve(containerRef.current);
          
          // Add a 3-second delay before showing the video
          setTimeout(() => {
            setShowVideo(true);
          }, 3000);
        }
      },
      {
        root: null,
        rootMargin: '250px', // Load when approaching viewport (increased margin)
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      // Clean up the background video element
      if (videoElement) {
        videoElement.src = '';
        videoElement = null;
      }
    };
  }, [src]); // Add src as dependency to recreate observer if src changes
  
  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [showVideo, videoRef.current]);
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle spacebar press when the video is displayed
      if (e.code === 'Space' && showVideo && videoRef.current) {
        e.preventDefault(); // Prevent page scrolling
        
        const video = videoRef.current;
        if (!video) return;
        
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        
        // Trigger flash animation
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 500); // Hide after 500ms
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVideo]); 

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    
    // Trigger flash animation
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 500); // Hide after 500ms
  };
  
  const handleMuteToggle = (e) => {
    // Stop the click from bubbling up to the video element
    e.stopPropagation();
    
    // Doesn't do anything
    setIsMuted(!isMuted);
  };
  
  const handleProgressClick = (e) => {
    // Stop the click from bubbling up to the video element
    e.stopPropagation();
    
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;
    
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };
  
  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (!wrapperRef.current) return;
    
    if (wrapperRef.current.requestFullscreen) {
      wrapperRef.current.requestFullscreen();
    } else if (wrapperRef.current.webkitRequestFullscreen) {
      wrapperRef.current.webkitRequestFullscreen();
    } else if (wrapperRef.current.msRequestFullscreen) {
      wrapperRef.current.msRequestFullscreen();
    }
  };
  
  // Format time (seconds) to MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleShare = (e) => {
    // Stop the click from bubbling up
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err);
        });
    }
  };

  // Add fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullScreenNow = 
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement;
      
      setIsFullscreen(!!isFullScreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Add a dedicated handlePlay function that includes stopPropagation
  const handlePlayButtonClick = (e) => {
    e.stopPropagation();
    handlePlayPause();
  };

  // Add a preventPropagation handler for all control events
  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.youtubeContainer}>
      <div className={styles.videoContainer} ref={containerRef}>
        {showVideo ? (
          <div 
            ref={wrapperRef}
            className={`${styles.videoWrapper} ${isFullscreen ? styles.fullscreenMode : ''}`}
          >
            <video 
              ref={videoRef}
              playsInline
              preload={videoLoaded ? "auto" : "metadata"}
              muted={true} // Always muted
              onClick={handlePlayPause}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: isFullscreen ? 'contain' : 'cover' 
              }}
              {...props}
            >
              <source src={src} type={type} />
            </video>
            
            {/* Add Flash Animation */}
            {showFlash && (
              <div className={styles.playPauseFlash}>
                {isPlaying ? <Pause size={34} /> : <Play size={34} />}
              </div>
            )}
            
            <div 
              className={styles.customControls}
              onClick={preventPropagation}
            >
              <div 
                className={styles.progressContainer} 
                ref={progressRef}
                onClick={handleProgressClick}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.controlsBottom}>
                <div className={styles.controlsLeft}>
                  <button 
                    className={styles.controlButton} 
                    onClick={handlePlayButtonClick}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                  </button>
                  
                  <button 
                    className={styles.controlButton} 
                    onClick={handleMuteToggle}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={20} fill="white" /> : <Volume2 size={20} fill="white" />}
                  </button>
                  
                  <span className={styles.timeDisplay}>
                    {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className={styles.controlsRight}>
                  <button 
                    className={styles.controlButton} 
                    onClick={handleFullscreen}
                    aria-label="Fullscreen"
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.videoPlaceholder}>
            <div className={styles.loadingText}>Loading video...</div>
          </div>
        )}
      </div>
      
      <div className={styles.videoInfo}>
        <div className={styles.titleRow}>
          <h3 className={styles.videoTitle}>{title}</h3>
          <div className={styles.viewCount}>
            {viewStats.views} views • {viewStats.daysAgo} days ago
          </div>
        </div>
        <div className={styles.interactionRow}>
          <div className={styles.channelSection}>
            <div className={styles.channelInfo}>
              <div className={styles.channelAvatar}>
                <img src="/icons/light-logo.svg" alt="Confident AI Logo" />
              </div>
              <div className={styles.channelNameSection}>
                <div className={styles.channelName}>
                  Confident AI
                  <span className={styles.verifiedBadge}>
                    <Verified size={14} />
                  </span>
                
                </div>
                <div className={styles.channelSubscribers}>100K subscribers</div>
              </div>
              <button className={styles.subscribeButton}>Subscribe</button>
            </div>
          </div>
          
          <div className={styles.likeSection}>
            <div className={styles.likeButtonGroup}>
              <span className={styles.likeButton}>
                <ThumbsUp size={16} /> {viewStats.likes}
              </span>
              <div className={styles.buttonDivider}></div>
              <span className={styles.dislikeButton}>
                <ThumbsDown size={16}/>
              </span>
            </div>
            <button 
              className={styles.shareButtonPill}
              onClick={handleShare}
              aria-label="Share this page"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied link!
                </>
              ) : (
                <>
                  <Share2 size={16} /> Share
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDisplayer; 