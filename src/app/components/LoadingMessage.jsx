import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingMessage({ messages }) {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1 === messages.length ? null : prevIndex + 1;
        setCurrentMessage(messages[newIndex]);
        
        if (newIndex === messages.length - 1) {
          clearInterval(interval)
        }

        return newIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.p
          key={index + currentMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.75 }}
          className="absolute top-0"
        >
          {currentMessage}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
