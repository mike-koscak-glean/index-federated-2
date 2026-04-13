import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const QUERY = 'Provide a Customer 360 for Acme: recent deals, support issues, key contacts, risks, and next best actions.';

const ROADMAP = [
  { title: 'The Retrieval Problem', subtitle: 'What actually happens when AI searches your enterprise' },
  { title: 'The Index Advantage', subtitle: 'Why pre-built knowledge beats real-time fetching' },
  { title: 'The Enterprise Graph', subtitle: 'How content, people, permissions, and activity connect' },
  { title: 'What This Unlocks', subtitle: 'From better answers to actions, agents, and workflow' },
];

const TYPING_SPEED = 22;
const TYPING_DURATION = QUERY.length * TYPING_SPEED;

export function Scene0() {
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < QUERY.length) {
        setTyped(QUERY.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, []);

  const roadmapStartDelay = TYPING_DURATION / 1000 + 0.3;

  return (
    <div className="scene scene0-centered">
      <motion.h1
        className="scene0-title"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Your AI Is Only as Good as What It Can Find
      </motion.h1>

      <motion.div
        className="search-bar"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20, opacity: 0.5 }}>search</span>
        <span className="search-text">
          {typed}
          <span className="cursor-blink">|</span>
        </span>
      </motion.div>

      <div className="scene0-roadmap">
        <svg className="scene0-roadmap-line" viewBox="0 0 2 100" preserveAspectRatio="none">
          <motion.line
            x1="1" y1="0" x2="1" y2="100"
            stroke="rgba(216, 253, 73, 0.25)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={typingDone ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          />
        </svg>
        {ROADMAP.map((item, i) => (
          <motion.div
            key={i}
            className="scene0-roadmap-item"
            initial={{ opacity: 0, x: -16 }}
            animate={typingDone ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="scene0-roadmap-badge">{i + 1}</div>
            <div className="scene0-roadmap-text">
              <span className="scene0-roadmap-step-title">{item.title}</span>
              <span className="scene0-roadmap-step-sub">{item.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="scene0-teaser"
        initial={{ opacity: 0 }}
        animate={typingDone ? { opacity: 0.45 } : {}}
        transition={{ delay: roadmapStartDelay + 1.4, duration: 0.6 }}
      >
        We'll compare two approaches: federated retrieval vs. a unified index.
      </motion.p>
    </div>
  );
}
