import React, { useEffect, useState } from 'react';

interface ScrollToTopButtonProps {
  text?: string;
  onClick?: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className="topScrollBtn"
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={scrollToTop}>
      Наверх
    </button>
  );
};

export default ScrollToTopButton;
