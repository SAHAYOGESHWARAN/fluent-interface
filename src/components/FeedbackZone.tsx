
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedItems, setDraggedItems] = useState<any[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    console.log('Files dropped:', e.dataTransfer.files);
    
    // Add a temporary visual feedback for the drop
    const newItem = { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 };
    setDraggedItems(prev => [...prev, newItem]);
    
    // Remove the item after animation
    setTimeout(() => {
      setDraggedItems(prev => prev.filter(item => item.id !== newItem.id));
    }, 2000);
  };

  return (
    <div className="relative">
      <motion.div
        className={`
          relative w-full max-w-lg mx-auto h-56 sm:h-64 lg:h-72
          border-2 border-dashed rounded-3xl
          transition-all duration-500 ease-out
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50/80' 
            : 'border-gray-200 bg-white/60 hover:border-blue-300 hover:bg-blue-50/40'
          }
          backdrop-blur-sm shadow-2xl hover:shadow-3xl
          flex flex-col items-center justify-center
          cursor-pointer group
          overflow-hidden
        `}
        animate={{
          y: [0, -8, -4, -12, 0],
          scale: isDragOver ? 1.02 : 1,
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.3,
            ease: "easeOut"
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        {/* Central orb/logo */}
        <motion.div 
          className={`
            w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600
            flex items-center justify-center mb-6
            shadow-xl
          `}
          animate={{
            scale: isDragOver ? 1.15 : 1,
            rotate: isDragOver ? 12 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.05, 
            rotate: 6,
            transition: { duration: 0.2 }
          }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
        </motion.div>
        
        <motion.p 
          className="text-gray-700 font-semibold text-lg mb-2"
          animate={{
            y: isDragOver ? -5 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          {isDragOver ? 'Release to capture!' : 'Drop anything to capture feedback'}
        </motion.p>
        
        {/* Drag over ripple effect */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-blue-400"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.1, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Visual feedback for dropped items */}
        <AnimatePresence>
          {draggedItems.map((item) => (
            <motion.div
              key={item.id}
              className="absolute w-4 h-4 bg-green-500 rounded-full"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 1], opacity: [1, 0.8, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default FeedbackZone;
