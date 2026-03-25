import React from 'react';

const Seaweed = ({ height, left, animationDuration, delay, src }) => (
  <img 
    src={src}
    alt="seaweed"
    style={{ 
      position: 'absolute', 
      bottom: '-10px', 
      left: `${left}%`, 
      height: `${height}px`,
      width: 'auto',
      animation: `sway ${animationDuration}s ease-in-out infinite alternate ${delay}s`,
      transformOrigin: 'bottom center',
      opacity: 0.9,
      pointerEvents: 'none',
      zIndex: 0,
      filter: 'drop-shadow(0 0 10px rgba(50, 200, 50, 0.2))'
    }}
  />
);

const SeaweedBackground = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      <style>{`
        @keyframes sway {
          0% { transform: rotate(-8deg) skewX(2deg); }
          100% { transform: rotate(8deg) skewX(-2deg); }
        }
      `}</style>
      <Seaweed src="/seaweed1.png" height={250} left={2} animationDuration={4} delay={0} />
      <Seaweed src="/seaweed2.png" height={300} left={8} animationDuration={4.5} delay={0.5} />
      <Seaweed src="/seaweed1.png" height={180} left={15} animationDuration={3.8} delay={1.2} />
      <Seaweed src="/seaweed2.png" height={350} left={22} animationDuration={5.2} delay={0.2} />
      <Seaweed src="/seaweed1.png" height={200} left={30} animationDuration={4.1} delay={0.8} />
      
      <Seaweed src="/seaweed2.png" height={280} left={75} animationDuration={4.7} delay={1.5} />
      <Seaweed src="/seaweed1.png" height={320} left={85} animationDuration={5.5} delay={0.4} />
      <Seaweed src="/seaweed2.png" height={240} left={92} animationDuration={4.2} delay={1.1} />
      <Seaweed src="/seaweed1.png" height={200} left={98} animationDuration={3.6} delay={0.7} />
    </div>
  );
};

export default SeaweedBackground;
