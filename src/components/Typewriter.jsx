import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ text, speed = 50, delay = 0, onComplete, highlights = [] }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, speed, started, onComplete]);

  // Helper to render text with highlights
  const renderText = () => {
    const parts = [];
    let currentPos = 0;

    // Find all occurrences of highlights and their positions
    const occurrences = [];
    highlights.forEach(h => {
      let index = text.indexOf(h);
      while (index !== -1) {
        occurrences.push({ index, length: h.length, color: 'var(--mars-red)' });
        index = text.indexOf(h, index + 1);
      }
    });

    // Sort by index
    occurrences.sort((a, b) => a.index - b.index);

    // Split text into highlighted and non-highlighted parts
    let lastIndex = 0;
    occurrences.forEach(occ => {
      // Add normal text before highlight
      if (occ.index > lastIndex) {
        const slice = text.slice(lastIndex, occ.index);
        const visibleSlice = displayedText.slice(lastIndex, occ.index);
        if (visibleSlice) parts.push(<span key={`n-${lastIndex}`}>{visibleSlice}</span>);
      }
      
      // Add highlighted text
      const end = occ.index + occ.length;
      const visibleSlice = displayedText.slice(Math.max(lastIndex, occ.index), end);
      if (visibleSlice) {
        parts.push(<span key={`h-${occ.index}`} style={{ color: occ.color }}>{visibleSlice}</span>);
      }
      lastIndex = end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const visibleSlice = displayedText.slice(lastIndex);
      if (visibleSlice) parts.push(<span key={`n-${lastIndex}`}>{visibleSlice}</span>);
    }

    return parts;
  };

  return <span>{renderText()}</span>;
};

export default Typewriter;
