import { motion } from 'framer-motion';

const pathVariants = [
  'M 40,40 Q 160,40 160,160',
  'M 160,40 Q 100,100 40,160',
  'M 160,160 Q 100,160 40,160',
  'M 160,40 Q 100,160 40,40',
  'M 160,40 Q 100,40 40,40',
  'M 40,40 Q 160,40 160,160',
];

export const StatePaths: React.FC = () => {
  return (
    <div>
      <svg
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'purple',
          stroke: '#bf4d00',
          strokeLinecap: 'round',
        }}
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <motion.path
          style={{
            stroke: "#70f",
            strokeWidth: 20,
            strokeLinecap: "round",
            fill: "transparent",
          }}
          d={pathVariants[0]}
          animate={{
            d: pathVariants,
          }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: 6,
            times: [0, 0.16, 0.33, 0.5, 0.66, 0.83],
          }}
        /> */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0.16, 0.33, 0.5, 0.66, 0.83] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 1,
          }}
          strokeWidth={10}
          strokeDasharray="0 1"
          fill="none"
          d="M415,275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z"
        />
      </svg>
    </div>
  );
};
