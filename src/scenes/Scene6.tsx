import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CLIENTS = [
  { label: 'Cursor IDE', icon: 'code', x: 15, y: 10 },
  { label: 'Desktop Agent', icon: 'computer', x: 50, y: 5 },
  { label: 'Internal Tools', icon: 'dashboard', x: 85, y: 10 },
  { label: 'Slack Bot', icon: 'chat', x: 25, y: 25 },
  { label: 'Custom App', icon: 'widgets', x: 75, y: 25 },
];

export function Scene6() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Step 6 — MCP as Access Layer on Top of Glean
      </motion.div>

      <div className="arch-layout">
        <div className="arch-visual">
          {/* Clients */}
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

          {/* MCP Rails */}
          <svg className="arch-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {CLIENTS.map((client, i) => (
              <motion.line
                key={i}
                x1={client.x}
                y1={client.y + 12}
                x2={50}
                y2={52}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={0.3}
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
              />
            ))}
          </svg>

          {/* MCP label band */}
          <motion.div
            className="arch-mcp-band"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            MCP / Actions Layer
          </motion.div>

          {/* Central Glean index */}
          <motion.div
            className="arch-glean-core"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: 'spring' }}
          >
            <div className="arch-glean-glow" />
            <img src={LOGOS.glean} alt="Glean" style={{ width: 36, height: 36, position: 'relative', zIndex: 1 }} />
            <span className="arch-glean-label">Enterprise Knowledge Graph</span>
            <span className="arch-glean-sub">Content · Permissions · People · Activity</span>
          </motion.div>

          {/* Packets animation */}
          {CLIENTS.map((client, i) => (
            <motion.div
              key={`packet-${i}`}
              className="arch-packet"
              style={{ left: `${client.x}%` }}
              initial={{ top: `${client.y + 12}%`, opacity: 0 }}
              animate={{
                top: ['20%', '48%'],
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

          {/* Response packets going back */}
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

        <motion.div
          className="callout-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          style={{ alignSelf: 'center' }}
        >
          <div className="callout">
            MCP is a great port for tools — not a replacement for an enterprise index.
          </div>
          <div className="callout">
            With Glean, all MCP hosts share one governed, permission-aware graph.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
