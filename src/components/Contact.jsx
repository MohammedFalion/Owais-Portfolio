import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaAward, FaDiscord, FaInstagram,
  FaEnvelope, FaPaperPlane,
} from 'react-icons/fa';

const SOCIALS = [
  { icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/wesssso512',   color: '#e6edf3' },
  { icon: FaLinkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/owais-boshnak-16709b1aa/', color: '#0a66c2' },
  { icon: FaAward,    label: 'Credly',    href: 'https://www.credly.com/badges/55d1c58f-9bc7-45aa-8ed5-45915dee90c3/linked_in_profile',  color: '#f4b400' },
  { icon: FaDiscord,  label: 'Discord',   href: 'https://discord.com/users/weso38522',  color: '#5865f2' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/owais.boshnak?igsh=ZzRoanNuMm4zZGJj', color: '#e4405f' },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [focused, setFocused] = useState('');
  const recipientEmail = 'owais@placeholder.dev';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ].join('\n');

    const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoHref;

    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === field ? 'var(--green)' : 'var(--border)'}`,
    padding: '10px 4px',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color 0.2s',
    caretColor: 'var(--green)',
  });

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.7, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          $ ./contact.sh --send-message
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          GET IN TOUCH
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}
          className="contact-grid">

          {/* Form */}
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-topbar">
              <div className="dots">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
              </div>
              <span className="title">~/contact/send_message.sh</span>
            </div>
            <div className="terminal-body">
              <div style={{ marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
                <span style={{ color: 'var(--cyan)' }}>owais@kali</span>
                <span>:~$ </span>
                <span style={{ color: 'var(--green)' }}>./contact.sh</span>
                <br />
                <span style={{ color: 'var(--text-dim)' }}>
                  # Fill in all fields and press [SEND]
                </span>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '32px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '16px' }}>✅</div>
                  <div style={{ color: 'var(--green)', fontSize: '12px', marginBottom: '8px' }}>
                    [SUCCESS] Message transmitted.
                  </div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '11px' }}>
                    I'll get back to you soon. Connection closed.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { field: 'name',    label: 'your_name',    type: 'text',  required: true  },
                    { field: 'email',   label: 'your_email',   type: 'email', required: true  },
                    { field: 'subject', label: 'subject',      type: 'text',  required: true  },
                  ].map(({ field, label, type, required }) => (
                    <div key={field}>
                      <label style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: focused === field ? 'var(--green)' : 'var(--text-dim)',
                        marginBottom: '4px',
                        transition: 'color 0.2s',
                        letterSpacing: '0.1em',
                      }}>
                        <span style={{ color: 'var(--cyan)' }}>&gt;</span> {label}
                      </label>
                      <input
                        name={field}
                        type={type}
                        required={required}
                        value={form[field]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused('')}
                        style={inputStyle(field)}
                        autoComplete="off"
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: focused === 'message' ? 'var(--green)' : 'var(--text-dim)',
                      marginBottom: '4px',
                      transition: 'color 0.2s',
                      letterSpacing: '0.1em',
                    }}>
                      <span style={{ color: 'var(--cyan)' }}>&gt;</span> message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      style={{
                        ...inputStyle('message'),
                        resize: 'vertical',
                        borderBottom: 'none',
                        border: `1px solid ${focused === 'message' ? 'var(--green)' : 'var(--border)'}`,
                        borderRadius: '4px',
                        padding: '12px',
                        boxShadow: focused === 'message' ? 'var(--glow-green)' : 'none',
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <span><FaPaperPlane style={{ fontSize: '12px' }} /></span>
                    <span>$ open_mail_client.exe</span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Contact info */}
            <div className="terminal-window">
              <div className="terminal-topbar">
                <div className="dots">
                  <div className="dot dot-red" />
                  <div className="dot dot-yellow" />
                  <div className="dot dot-green" />
                </div>
                <span className="title">contact_info</span>
              </div>
              <div className="terminal-body">
                {[
                  { icon: FaEnvelope, label: 'Email', value: 'owais@placeholder.dev', color: 'var(--green)' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                  }}>
                    <item.icon style={{ color: item.color, fontSize: '16px', flexShrink: 0 }} />
                    <div>
                      <div style={{ color: 'var(--text-dim)', fontSize: '10px', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ color: item.color }}>{item.value}</div>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.7,
                }}>
                  <span style={{ color: 'var(--yellow)' }}>[INFO]</span> Available for:
                  <br />
                  <span style={{ color: 'var(--green)' }}>▸</span> Game development projects
                  <br />
                  <span style={{ color: 'var(--cyan)' }}>▸</span> Security consulting
                  <br />
                  <span style={{ color: 'var(--neon)' }}>▸</span> CTF team collaboration
                  <br />
                  <span style={{ color: 'var(--text-dim)' }}>▸</span> Full-time opportunities
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="terminal-window">
              <div className="terminal-topbar">
                <div className="dots">
                  <div className="dot dot-red" />
                  <div className="dot dot-yellow" />
                  <div className="dot dot-green" />
                </div>
                <span className="title">~/social</span>
              </div>
              <div className="terminal-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {SOCIALS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 6, color: s.color }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--text-dim)',
                          textDecoration: 'none',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          transition: 'background 0.2s',
                          cursor: 'none',
                        }}
                      >
                        <Icon style={{ fontSize: '16px', flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{s.label}</span>
                        <span style={{ fontSize: '10px', opacity: 0.4 }}>→</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '80px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-dim)',
        }}
      >
        <span>
          <span style={{ color: 'var(--green)' }}>owais@portfolio</span>
          <span>:~$ echo </span>
          <span style={{ color: 'var(--cyan)' }}>"Built with 💚, and too many caffeine,</span>
        </span>
        <br />
        <span style={{ opacity: 0.5, marginTop: '8px', display: 'block' }}>
          © {new Date().getFullYear()} Owais Boshnak. All rights reserved.
        </span>
      </motion.footer>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
