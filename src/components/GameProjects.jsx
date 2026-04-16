import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGooglePlay, FaStar } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import { SiRoblox } from 'react-icons/si';
import falfolIcon from '../assets/falfool.png';

const GAMES = [
  {
    id: 'super-falfol',
    name: 'Super Falfol',
    genre: 'Runner / Adventure',
    description: 'An action packed Runner featuring the beloved Falfol character from Spacetoon. Navigate through challenging worlds and Storys, traps, and epic Events. Collect power-ups and unlock special abilities as you progress through a vibrant worlds.',
    rating: '3.9K',
    reviews: '1.1K',
    downloads: '100K+',
    icon: '',
    iconImg: falfolIcon,
    tags: ['Runner', 'Endless Run', 'Arcade'],
    playUrl: 'https://play.google.com/store/apps/details?id=com.gamepower7.superfalfool&hl=ar&pli=1',
    platform: 'google-play',
    color: '#ff6b35',
  },
  {
    id: 'toon-soccer',
    name: 'Toon Soccer',
    genre: 'Sports / Casual',
    description: 'A fun and addictive cartoon-style soccer game with physics-based gameplay. Choose your Spacetoon Character, master trick shots, and dominate the pitch in quick fire matches. Features multiplayer mode and a progression system with unlockable characters.',
    rating: '4.5',
    reviews: '1K',
    icon: '⚽',
    tags: ['Football', 'Soccer', 'Multiplayer'],
    playUrl: 'https://www.roblox.com/share?code=82586f9c42eff6469d79dd19b24fb462&type=ExperienceDetails&stamp=1776324464855',
    platform: 'roblox',
    color: '#00e5ff',
  },
];

function GameCard({ game }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        cursor: 'none',
        perspective: '1000px',
      }}
      layout
    >
      <motion.div
        animate={hovered ? { rotateY: 3, rotateX: -3 } : { rotateY: 0, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${hovered ? game.color : 'var(--border)'}`,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: hovered
            ? `0 0 20px ${game.color}40, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Folder flap */}
        <motion.div
          animate={hovered
            ? { rotateX: -40, originY: 0, transformPerspective: 800 }
            : { rotateX: 0 }
          }
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${game.color}30, ${game.color}20)`
              : 'var(--bg-card-hover)',
            borderBottom: `1px solid ${hovered ? game.color : 'var(--border)'}60`,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden',
            transformOrigin: 'top center',
          }}
        >
          {/* App Icon */}
          <motion.div
            animate={hovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              width: '72px',
              height: '72px',
              background: `linear-gradient(135deg, ${game.color}80, ${game.color}40)`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              flexShrink: 0,
              border: `1px solid ${game.color}60`,
              boxShadow: hovered ? `0 0 20px ${game.color}60` : 'none',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            {game.iconImg ? (
              <img
                src={game.iconImg}
                alt={game.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px', display: 'block' }}
              />
            ) : (
              game.icon
            )}
          </motion.div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '11px',
              color: hovered ? game.color : 'var(--text-bright)',
              marginBottom: '6px',
              transition: 'color 0.3s',
              textShadow: hovered ? `0 0 8px ${game.color}80` : 'none',
            }}>
              {game.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              marginBottom: '8px',
            }}>
              {game.genre}
            </div>
            {/* Rating stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[1,2,3,4,5].map((s) => (
                <FaStar key={s} style={{
                  fontSize: '10px',
                  color: parseFloat(game.rating) >= s ? '#ffe600' : 'var(--border)',
                }} />
              ))}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                marginLeft: '4px',
              }}>
                {game.rating} ({game.reviews})
              </span>
            </div>
          </div>

          {/* GET button (Play Store style) */}
          <motion.a
            href={game.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              padding: '8px 18px',
              borderRadius: '20px',
              background: hovered ? game.color : 'transparent',
              border: `1px solid ${hovered ? game.color : 'var(--border)'}`,
              color: hovered ? 'var(--bg)' : 'var(--text-dim)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.3s',
              flexShrink: 0,
              cursor: 'none',
            }}
          >
            GET
          </motion.a>
        </motion.div>

        {/* Folder interior — hover reveal */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '20px 24px' }}>
                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text)',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  borderLeft: `2px solid ${game.color}40`,
                  paddingLeft: '12px',
                }}>
                  {game.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {game.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      background: `${game.color}15`,
                      border: `1px solid ${game.color}40`,
                      color: game.color,
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {[
                    { label: 'Downloads', value: game.downloads },
                    { label: 'Rating',    value: game.rating },
                    { label: 'Reviews',   value: game.reviews },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div style={{
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '10px',
                        color: game.color,
                        marginBottom: '2px',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--text-dim)',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Roblox CTA */}
                <a
                  href={game.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    background: `linear-gradient(135deg, ${game.color}20, ${game.color}10)`,
                    border: `1px solid ${game.color}60`,
                    color: game.color,
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'all 0.2s',
                  }}
                >
                  {game.platform === 'roblox' ? <SiRoblox /> : <FaGooglePlay />}
                  {game.platform === 'roblox' ? 'View on Roblox' : 'View on Google Play'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function GameProjects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="games" className="section" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.7, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          $ ls ./games/ — hover to open folder
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <IoGameController style={{ color: 'var(--green)' }} />
          GAME PROJECTS
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i + 0.2, duration: 0.5 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
