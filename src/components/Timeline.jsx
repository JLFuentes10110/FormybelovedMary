import { useEffect, useRef, useState } from 'react'
import './Timeline.css'

const moments = [
  {
    emoji: '✨',
    date: 'The Beginning',
    title: 'Love at first bus stop',
    desc: 'At a quiet bus stop, in the middle of an ordinary day, the universe paused… and chose us. One glance was all it took — and suddenly, nothing felt ordinary anymore.',
  },
  {
    emoji: '🌿',
    date: 'The Early Days',
    title: 'Falling',
    desc: 'It started simply — a small act of care, food in my hands, and a heart unsure of the way. I got lost finding you that day, but when I finally did… I realized I had been lost in you all along — in your smile, your eyes, your everything.',
  },
  {
    emoji: '🤍',
    date: 'Getting Closer',
    title: 'The kiss at the dormitory',
    desc: 'Standing outside your dormitory, something wordless moved between us — and then, a kiss. Simple, unhurried, and somehow electric. Butterflies everywhere, as though it were the very first time. Because in every way that mattered, it was.',
  },
  {
    emoji: '🕯️',
    date: 'Something Real',
    title: 'The night I gave you all of me',
    desc: 'I had kept that part of myself — quietly, carefully — for the right moment, the right person. And when it came to you, there was no question. In your arms I felt seen, whole, and safe. That night I swore, quietly and certainly, that you would be my first and my last.',
  },
  {
    emoji: '⛪',
    date: 'Our First Date',
    title: 'Mass, then TOPS',
    desc: 'We began the day the way we always wanted to — side by side in church, offering the morning to something bigger than ourselves. Then came TOPS, the city glittering below us, and the quiet joy of simply being together. It didn\'t feel like a beginning. It felt like something already written.',
  },
  {
    emoji: '💑',
    date: 'One Month Ago',
    title: 'Officially yours',
    desc: 'The day I got to call you mine — not just in feeling, but in truth. The simplest words, yet the most meaningful title I\'ve ever been given.',
  },
  {
    emoji: '🌹',
    date: 'Today',
    title: 'Our first monthsary',
    desc: 'One month of us — but it feels like a lifetime of choosing you, again and again. And if I had to start over, find you in another bus stop, another life — I would still choose you. Every time.',
  },
]

export default function Timeline() {
  const [visible, setVisible] = useState([])
  const refs = useRef([])

  useEffect(() => {
    const observers = refs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(v => [...new Set([...v, i])])
        },
        { threshold: 0.25 }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className="timeline-section">
      <div className="section-header">
        <p className="section-subtitle">A love letter in moments</p>
        <h2 className="section-title">How we got here</h2>
        <div className="header-divider">
          <span className="divider-line" />
          <span className="divider-rose">🌹</span>
          <span className="divider-line" />
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-line" />

        {moments.map((m, i) => {
          const isLeft = i % 2 === 0
          const isLast = i === moments.length - 1
          return (
            <div
              key={i}
              ref={el => (refs.current[i] = el)}
              className={[
                'timeline-item',
                isLeft ? 'left' : 'right',
                visible.includes(i) ? 'visible' : '',
                isLast ? 'last' : '',
              ].join(' ')}
            >
              <div className="timeline-dot">
                <span className="dot-emoji">{m.emoji}</span>
                <span className="dot-ring" />
              </div>

              <div className={`timeline-card ${isLast ? 'card-final' : ''}`}>
                <span className="card-corner tl" />
                <span className="card-corner tr" />
                <span className="card-corner bl" />
                <span className="card-corner br" />
                <p className="t-date">{m.date}</p>
                <h3 className="t-title">{m.title}</h3>
                <p className="t-desc">{m.desc}</p>
                {isLast && <p className="t-footer">— Always —</p>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}