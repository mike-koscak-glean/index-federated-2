import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CLIENTS = [
  { label: 'Cursor IDE', icon: 'code', x: 15, y: 8 },
  { label: 'Desktop Agent', icon: 'computer', x: 50, y: 3 },
  { label: 'Internal Tools', icon: 'dashboard', x: 85, y: 8 },
  { label: 'Slack Bot', icon: 'chat', x: 25, y: 22 },
  { label: 'Custom App', icon: 'widgets', x: 75, y: 22 },
];

const PILLARS = [
  { label: 'People', icon: 'group', color: 'var(--glean-mid-blue)' },
  { label: 'Content', icon: 'description', color: 'var(--glean-green)' },
  { label: 'Process', icon: 'account_tree', color: 'var(--glean-pink)' },
];

export function Scene6() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        MCP + Glean: Better Together
      </motion.div>

      <div className="arch-layout">
        <div className="arch-visual">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.label}
              className="arch-client"
              style={{ left: `${client.x}%`, top: `${client.y}%` }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 24 }}>{client.icon}</span>
              <span className="arch-client-label">{client.label}</span>
            </motion.div>
          ))}

          <svg className="arch-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {CLIENTS.map((client, i) => (
              <motion.line
                key={i}
                x1={client.x}
                y1={client.y + 12}
                x2={50}
                y2={50}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={0.3}
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
              />
            ))}
          </svg>

          <motion.div
            className="arch-mcp-band"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            MCP / Actions Layer
          </motion.div>

          {CLIENTS.map((client, i) => (
            <motion.div
              key={`packet-${i}`}
              className="arch-packet"
              style={{ left: `${client.x}%` }}
              initial={{ top: `${client.y + 12}%`, opacity: 0 }}
              animate={{
                top: ['20%', '46%'],
                opacity: [0, 1, 1, 0],
                left: [`${client.x}%`, '50%'],
              }}
              transition={{
                delay: 1.6 + i * 0.2,
                duration: 1.0,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
          ))}

          {CLIENTS.map((client, i) => (
            <motion.div
              key={`resp-${i}`}
              className="arch-packet arch-packet-resp"
              style={{ left: '50%' }}
              initial={{ top: '55%', opacity: 0 }}
              animate={{
                top: ['55%', `${client.y + 12}%`],
                opacity: [0, 1, 1, 0],
                left: ['50%', `${client.x}%`],
              }}
              transition={{
                delay: 2.2 + i * 0.2,
                duration: 1.0,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
          ))}
        </div>

        {/* Enterprise Graph section */}
        <motion.div
          className="arch-graph-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: 'spring' }}
        >
          <div className="arch-graph-header">
            <img src={LOGOS.glean} alt="Glean" className="arch-graph-logo" />
            <span className="arch-graph-title">Enterprise Graph</span>
          </div>

          <div className="arch-graph-pillars">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                className="arch-pillar"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.15 }}
              >
                <span
                  className="material-symbols-rounded arch-pillar-icon"
                  style={{ color: pillar.color }}
                >
                  {pillar.icon}
                </span>
                <span className="arch-pillar-label">{pillar.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="arch-graph-explainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            MCP is the USB-C for AI — but it does nothing about underlying tool quality.
            With Glean, all MCP hosts share one governed, permissions-enforced graph.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
