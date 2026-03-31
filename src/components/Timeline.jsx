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
    desc: 'I had kept that part of myself — quietly, carefully — for the right moment, the right person. And when it came to you, there was no question. She gave me all of her, and I gave her all of me. That night we both felt it — loved, wanted, and deeply cared for. Holding her, I felt something I had never felt before — seen, whole, and certain. That night I swore, quietly and certainly, that she would be my first and my last.',
  },
  {
    emoji: '⛪',
    date: 'Our First Date',
    title: 'Mass, then TOPS',
    desc: 'We began our first date the way we always wanted to — side by side in church, offering the night to something bigger than ourselves. Then came TOPS, the city glittering below us, and the quiet joy of simply being together. It didn\'t feel like a beginning. It felt like something already written.',
  },
  {
    emoji: '💑',
    date: 'One Month Ago',
    title: 'Officially yours',
    desc: 'Every question she had carried, every doubt her mind had built — I answered them, one by one, with nothing but the truth. I told her it was all genuine. Every word, every moment, every feeling. And that day, with the most sincere part of me, I offered her my heart — and swore to love her, to take care of her, and to never leave her side.',
  },
  {
    emoji: '🌹',
    date: 'Today',
    title: 'Our first monthsary',
    desc: 'It wasn\'t always easy. There were ups and downs, days that tested us. But there were also moments so full of joy, so full of each other, that nothing else existed. We poured our utmost love into every second we had together — before distance came and changed the shape of us. The situation has grown rough, but that doesn\'t change what this is. We\'ll fight through it. Consider each other\'s feelings. Keep them close, always. And love each other — not just today, but forever.',
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
