import { motion } from 'framer-motion';

export function SceneKnowsPeople() {
  return (
    <div className="scene kd-scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Beyond Search
      </motion.div>

      <motion.h2
        className="kd-headline"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        Knows Your <span className="final-highlight">People</span>
      </motion.h2>

      <motion.p
        className="kd-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        Learns your projects, priorities, and patterns based on how you use business apps,
        then anticipates tasks and acts on your behalf.
      </motion.p>

      <motion.div
        className="kd-placeholder"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.span
          className="material-symbols-rounded kd-placeholder-icon"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          group
        </motion.span>
        <span className="kd-placeholder-text">Coming soon</span>
      </motion.div>
    </div>
  );
}
