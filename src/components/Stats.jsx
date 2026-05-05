import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'GRAVITY', value: '3.721', unit: 'm/s²', detail: '38% of Earth' },
  { label: 'DISTANCE', value: '225M', unit: 'KM', detail: 'From Earth' },
  { label: 'DAY LENGTH', value: '24.6', unit: 'HRS', detail: '1.03 Earth Days' },
  { label: 'TEMP', value: '-62', unit: '°C', detail: 'Average' },
];

const Stats = () => {
  return (
    <section id="stats">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel"
              style={{ padding: '40px 30px', textAlign: 'center' }}
            >
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '10px' }}>{stat.label}</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--mars-red)' }}>
                {stat.value}
                <span style={{ fontSize: '1rem', fontWeight: 500, color: 'white', marginLeft: '5px' }}>{stat.unit}</span>
              </div>
              <div style={{ fontSize: '0.9rem', marginTop: '10px', color: 'var(--text-secondary)' }}>{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
