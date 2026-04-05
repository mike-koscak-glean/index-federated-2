import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const QUERY = 'Provide a Customer 360 for Acme: recent deals, support issues, key contacts, risks, and next best actions.';

export function Scene0() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < QUERY.length) {
        setTyped(QUERY.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 22);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        The Enterprise AI Question
      </motion.div>

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

      <div className="path-cards">
        <motion.div
          className="path-card path-card-left"
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="path-card-icon">
            <span className="material-symbols-rounded" style={{ fontSize: 32 }}>hub</span>
          </div>
          <h3>MCP / Federated-only</h3>
          <p>Multiple real-time API calls, no shared index, app-level ranking only</p>
        </motion.div>

        <motion.div
          className="path-card path-card-right"
          initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="path-card-icon path-card-icon-glean">
            <img src="https://app.glean.com/images/glean-logo2.svg" alt="Glean" style={{ width: 32, height: 32 }} />
          </div>
          <h3>Glean Indexed Enterprise Graph</h3>
          <p>100+ connectors, deep index of content + permissions + people + activity</p>
        </motion.div>
      </div>
    </div>
  );
}
