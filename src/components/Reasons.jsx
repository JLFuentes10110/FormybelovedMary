import { useEffect, useRef, useState } from 'react'
import './Reasons.css'

const reasons = [
  {
    n: '01',
    text: 'The way you laugh — completely, without reservation — is the most beautiful sound I know. It fills every room and stays with me long after you\'re gone.',
  },
  {
    n: '02',
    text: 'How considerate you are. You think of others before yourself, quietly, without needing to be asked. That kind of heart is rare, and you carry it so naturally.',
  },
  {
    n: '03',
    text: 'Your independence. The way you stand on your own, carry your own weight, and still show up fully for the people you love. I am so amazed by you.',
  },
  {
    n: '04',
    text: 'Your tenacity. When work gets hard, when life gets heavier than it should — you don\'t fold. You push through. Watching you fight for yourself is one of the most inspiring things I\'ve ever witnessed.',
  },
  {
    n: '05',
    text: 'How smart you are — not just in the way you think, but in the way you feel. You read rooms, you read people, you read me. Your emotional intelligence is something I will never stop being in awe of.',
  },
  {
    n: '06',
    text: 'Your softness. The way you let yourself cry, the way you speak your struggles out loud, the way you don\'t hide what you feel — that kind of vulnerability takes real courage. And I love every tender part of you.',
  },
  {
    n: '07',
    text: 'Your generosity and kindness. The way you give — your time, your love, your care — without keeping score. You make the people around you feel like they matter. Because to you, they truly do.',
  },
  {
    n: '08',
    text: 'Because being with you is the easiest, most natural thing I\'ve ever done. You are, simply put, the greatest thing that has ever happened to me. And I love you — all of you, always.',
  },
]

export default function Reasons() {
  const [visible, setVisible] = useState([])
  const refs = useRef([])

  useEffect(() => {
    const obs = refs.current.map((ref, i) => {
      if (!ref) return null
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setVisible(v => [...new Set([...v, i])])
        },
        { threshold: 0.2 }
      )
      o.observe(ref)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className="reasons-section">
      <div className="section-header">
        <p className="section-subtitle">Because you deserve to know</p>
        <h2 className="section-title">Why I love you</h2>
        <div className="header-divider">
          <span className="divider-line" />
          <span className="divider-rose">🌹</span>
          <span className="divider-line" />
        </div>
      </div>

      <div className="reasons-grid">
        {reasons.map((r, i) => (
          <div
            key={i}
            ref={el => (refs.current[i] = el)}
            className={`reason-card ${visible.includes(i) ? 'visible' : ''}`}
            style={{ transitionDelay: `${(i % 2) * 0.12}s` }}
          >
            <span className="card-corner tl" />
            <span className="card-corner tr" />
            <span className="card-corner bl" />
            <span className="card-corner br" />
            <span className="reason-num">{r.n}</span>
            <p className="reason-text">{r.text}</p>
            <div className="reason-rose">🌹</div>
          </div>
        ))}
      </div>
    </section>
  )
}