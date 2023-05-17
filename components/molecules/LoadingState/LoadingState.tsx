import { motion, AnimatePresence } from 'framer-motion';

import { Loader } from '~/components/atoms';

import type { LoadingStateProps } from './LoadingState.types';

export const LoadingState: React.FC<LoadingStateProps> = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-bgMedium"
      >
        <Loader />
      </motion.div>
    )}
  </AnimatePresence>
);
