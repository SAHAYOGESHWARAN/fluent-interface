import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { 
  Slack, 
  FileText, 
  FileImage,
  Youtube,
  Database,
  Settings,
  Palette,
  Globe,
  Zap,
  GitBranch
} from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';

const FloatingIcons = () => {
  const scrollDirection = useScrollDirection();
  const containerRef = useRef<HTMLDivElement>(null);

  const icons = [
    { Icon: Slack, color: 'bg-purple-500', position: 'top-16 left-16', delay: '0s', size: 'w-12 h-12' },
    { Icon: FileText, color: 'bg-red-500', position: 'top-24 right-20', delay: '1s', size: 'w-10 h-10' },
    { Icon: FileImage, color: 'bg-blue-500', position: 'top-48 left-32', delay: '2s', size: 'w-10 h-10' },
    { Icon: Youtube, color: 'bg-green-500', position: 'bottom-32 right-16', delay: '3s', size: 'w-12 h-12' },
    { Icon: Database, color: 'bg-indigo-500', position: 'bottom-48 left-20', delay: '4s', size: 'w-10 h-10' },
    { Icon: Settings, color: 'bg-gray-500', position: 'top-64 right-32', delay: '5s', size: 'w-10 h-10' },
    { Icon: Palette, color: 'bg-pink-500', position: 'bottom-64 right-48', delay: '1.5s', size: 'w-10 h-10' },
    { Icon: Globe, color: 'bg-cyan-500', position: 'top-80 left-48', delay: '2.5s', size: 'w-10 h-10' },
    { Icon: Zap, color: 'bg-yellow-500', position: 'bottom-20 left-64', delay: '3.5s', size: 'w-12 h-12' },
    { Icon: GitBranch, color: 'bg-orange-500', position: 'bottom-80 right-64', delay: '4.5s', size: 'w-10 h-10' },
  ];

  const imageIcons = [
    { src: '/slack.png', alt: 'Slack', color: 'bg-purple-500', position: 'top-24 left-32', delay: '0.2s', size: 'w-12 h-12' },
    { src: '/pdf.png', alt: 'PDF', color: 'bg-red-500', position: 'top-40 right-24', delay: '0.4s', size: 'w-10 h-10' },
    { src: '/notion.png', alt: 'Notion', color: 'bg-black', position: 'bottom-40 left-40', delay: '0.6s', size: 'w-12 h-12' },
    { src: '/google-docs.png', alt: 'Google Docs', color: 'bg-blue-400', position: 'bottom-56 right-32', delay: '0.8s', size: 'w-10 h-10' },
    { src: '/tally.png', alt: 'Tally', color: 'bg-green-400', position: 'top-80 right-56', delay: '1s', size: 'w-10 h-10' },
    { src: '/hubspot.png', alt: 'Hubspot', color: 'bg-orange-400', position: 'bottom-80 left-56', delay: '1.2s', size: 'w-10 h-10' },
  ];

  const getScrollBasedPosition = (index: number) => {
    if (scrollDirection === 'up') {
      // Move icons towards the center (drag box area)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offset = 100 + (index * 20); // Spread them around the center
      const angle = (index * 36) * (Math.PI / 180); // 36 degrees apart
      
      return {
        x: centerX + Math.cos(angle) * offset - centerX,
        y: centerY + Math.sin(angle) * offset - centerY,
      };
    }
    return { x: 0, y: 0 }; // Original position
  };

  const DraggableIcon = ({ Icon, color, position, delay, size, index }: any) => {
    const dragControls = useDragControls();
    const scrollPosition = getScrollBasedPosition(index);

    return (
      <motion.div
        key={index}
        className={`
          absolute ${position} ${size}
          ${color} rounded-2xl shadow-lg
          flex items-center justify-center
          opacity-15 hover:opacity-80
          transition-opacity duration-300
          cursor-grab active:cursor-grabbing
          hidden lg:flex
        `}
        initial={{ 
          opacity: 0.15,
          scale: 1,
          x: 0,
          y: 0,
        }}
        animate={{ 
          y: scrollDirection ? [scrollPosition.y, scrollPosition.y - 10, scrollPosition.y - 5, scrollPosition.y - 15, scrollPosition.y] : [0, -10, -5, -15, 0],
          x: scrollPosition.x,
          rotate: [0, 1, -1, 0.5, 0],
          opacity: 0.15,
        }}
        transition={{
          y: {
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: parseFloat(delay),
            ease: "easeInOut"
          },
          x: {
            duration: 1.2,
            ease: "easeInOut"
          }
        }}
        whileHover={{ 
          opacity: 0.8, 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileDrag={{ 
          opacity: 1, 
          scale: 1.2,
          zIndex: 50,
          transition: { duration: 0.1 }
        }}
        drag
        dragControls={dragControls}
        dragConstraints={{
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        }}
        dragElastic={0.1}
        onDragStart={() => {
          console.log(`Dragging ${Icon.name} icon`);
        }}
        onDragEnd={(event, info) => {
          console.log(`Dropped ${Icon.name} icon at:`, info.point);
        }}
        onClick={() => {
          console.log(`Clicked ${Icon.name} icon`);
        }}
      >
        <Icon className="w-1/2 h-1/2 text-white" />
      </motion.div>
    );
  };

  const DraggableImageIcon = ({ src, alt, color, position, delay, size, index }: any) => {
    const dragControls = useDragControls();
    const scrollPosition = getScrollBasedPosition(index + icons.length); // avoid overlap

    return (
      <motion.div
        key={index}
        className={`
        absolute ${position} ${size}
        ${color} rounded-2xl shadow-lg
        flex items-center justify-center
        opacity-15 hover:opacity-80
        transition-opacity duration-300
        cursor-grab active:cursor-grabbing
        hidden lg:flex
      `}
        initial={{ 
          opacity: 0.15,
          scale: 1,
          x: 0,
          y: 0,
        }}
        animate={{ 
          y: scrollDirection ? [scrollPosition.y, scrollPosition.y - 10, scrollPosition.y - 5, scrollPosition.y - 15, scrollPosition.y] : [0, -10, -5, -15, 0],
          x: scrollPosition.x,
          rotate: [0, 1, -1, 0.5, 0],
          opacity: 0.15,
        }}
        transition={{
          y: {
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: parseFloat(delay),
            ease: "easeInOut"
          },
          x: {
            duration: 1.2,
            ease: "easeInOut"
          }
        }}
        whileHover={{ 
          opacity: 0.8, 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileDrag={{ 
          opacity: 1, 
          scale: 1.2,
          zIndex: 50,
          transition: { duration: 0.1 }
        }}
        drag
        dragControls={dragControls}
        dragConstraints={{
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        }}
        dragElastic={0.1}
        onDragStart={() => {
          console.log(`Dragging ${alt} icon`);
        }}
        onDragEnd={(event, info) => {
          console.log(`Dropped ${alt} icon at:`, info.point);
        }}
        onClick={() => {
          console.log(`Clicked ${alt} icon`);
        }}
      >
        <img src={src} alt={alt} className="w-1/2 h-1/2 object-contain" />
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Desktop version with draggable icons */}
      <div className="pointer-events-auto">
        {icons.map((iconProps, index) => (
          <DraggableIcon key={`desktop-${index}`} {...iconProps} index={index} />
        ))}
        {imageIcons.map((imgProps, index) => (
          <DraggableImageIcon key={`img-desktop-${index}`} {...imgProps} index={index} />
        ))}
      </div>
      
      {/* Tablet version */}
      <div className="hidden md:flex lg:hidden pointer-events-auto">
        {icons.slice(0, 6).map(({ Icon, color, delay }, index) => (
          <motion.div
            key={`tablet-${index}`}
            className={`
              absolute w-10 h-10 ${color} rounded-xl shadow-md
              flex items-center justify-center
              opacity-20 hover:opacity-60
              cursor-pointer
              ${index === 0 ? 'top-20 left-12' : ''}
              ${index === 1 ? 'top-32 right-12' : ''}
              ${index === 2 ? 'top-48 left-16' : ''}
              ${index === 3 ? 'bottom-48 right-16' : ''}
              ${index === 4 ? 'bottom-32 left-12' : ''}
              ${index === 5 ? 'bottom-20 right-12' : ''}
            `}
            animate={{
              y: [0, -8, -4, -12, 0],
              rotate: [0, 0.5, -0.5, 0.25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: parseFloat(delay),
              ease: "easeInOut"
            }}
            whileHover={{ 
              opacity: 0.6, 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            onClick={() => {
              console.log(`Clicked ${Icon.name} icon (tablet)`);
            }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        ))}
        {imageIcons.slice(0, 3).map(({ src, alt, color, delay }, index) => (
          <motion.div
            key={`img-tablet-${index}`}
            className={`
              absolute w-10 h-10 ${color} rounded-xl shadow-md
              flex items-center justify-center
              opacity-20 hover:opacity-60
              cursor-pointer
              ${index === 0 ? 'top-40 left-20' : ''}
              ${index === 1 ? 'top-56 right-20' : ''}
              ${index === 2 ? 'bottom-56 left-20' : ''}
            `}
            animate={{
              y: [0, -8, -4, -12, 0],
              rotate: [0, 0.5, -0.5, 0.25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: parseFloat(delay),
              ease: "easeInOut"
            }}
            whileHover={{ 
              opacity: 0.6, 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            onClick={() => {
              console.log(`Clicked ${alt} icon (tablet)`);
            }}
          >
            <img src={src} alt={alt} className="w-5 h-5 object-contain" />
          </motion.div>
        ))}
      </div>
      
      {/* Mobile simplified version */}
      <div className="md:hidden pointer-events-auto">
        {icons.slice(0, 4).map(({ Icon, color, delay }, index) => (
          <motion.div
            key={`mobile-${index}`}
            className={`
              absolute w-8 h-8 ${color} rounded-lg shadow-md
              flex items-center justify-center
              opacity-25 hover:opacity-50
              cursor-pointer
              ${index === 0 ? 'top-24 left-6' : ''}
              ${index === 1 ? 'top-32 right-6' : ''}
              ${index === 2 ? 'bottom-32 left-6' : ''}
              ${index === 3 ? 'bottom-24 right-6' : ''}
            `}
            animate={{
              y: [0, -6, -3, -9, 0],
              rotate: [0, 0.3, -0.3, 0.15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: parseFloat(delay),
              ease: "easeInOut"
            }}
            whileHover={{ 
              opacity: 0.5, 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onClick={() => {
              console.log(`Clicked ${Icon.name} icon (mobile)`);
            }}
          >
            <Icon className="w-4 h-4 text-white" />
          </motion.div>
        ))}
        {imageIcons.slice(0, 2).map(({ src, alt, color, delay }, index) => (
          <motion.div
            key={`img-mobile-${index}`}
            className={`
              absolute w-8 h-8 ${color} rounded-lg shadow-md
              flex items-center justify-center
              opacity-25 hover:opacity-50
              cursor-pointer
              ${index === 0 ? 'top-32 left-8' : ''}
              ${index === 1 ? 'bottom-32 right-8' : ''}
            `}
            animate={{
              y: [0, -6, -3, -9, 0],
              rotate: [0, 0.3, -0.3, 0.15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: parseFloat(delay),
              ease: "easeInOut"
            }}
            whileHover={{ 
              opacity: 0.5, 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onClick={() => {
              console.log(`Clicked ${alt} icon (mobile)`);
            }}
          >
            <img src={src} alt={alt} className="w-4 h-4 object-contain" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FloatingIcons;
