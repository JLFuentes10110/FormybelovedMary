import { useEffect, useRef, useState } from 'react'
import './Reasons.css'

const reasons = [
  { n: '01', text: 'The way you laugh — completely, without reservation — is the most beautiful sound I know.' },
  { n: '02', text: 'You make ordinary moments feel like magic. Even just sitting beside you feels like the whole world is right.' },
  { n: '03', text: 'Your kindness. The way you care. It undoes me every single time.' },
  { n: '04', text: 'How you see beauty in things others overlook. You\'ve taught me to look closer.' },
  { n: '05', text: 'The way you say my name. There\'s no better version of my name than the one in your voice.' },
  { n: '06', text: 'Your strength. The quiet courage you carry. It inspires me every day.' },
  { n: '07', text: 'Because being with you is the easiest, most natural thing I\'ve ever done.' },
  { n: '08', text: 'You are, simply put, the greatest thing that has ever happened to me.' },
]

export default function Reasons() {
  const [visible, setVisible] = useState([])
  const refs = useRef([])

  useEffect(() => {
    const obs = refs.current.map((ref, i) => {
      if (!ref) return null
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setVisible(v => [...new Set([...v, i])])
      }, { threshold: 0.2 })
      o.observe(ref)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className="reasons-section">
      <p className="section-subtitle">Because you deserve to know</p>
      <h2 className="section-title">Why I love you</h2>
      <div className="divider">🌹</div>

      <div className="reasons-grid">
        {reasons.map((r, i) => (
          <div
            key={i}
            ref={el => refs.current[i] = el}
            className={`reason-card ${visible.includes(i) ? 'visible' : ''}`}
            style={{ transitionDelay: `${(i % 2) * 0.15}s` }}
          >
            <span className="reason-num">{r.n}</span>
            <p className="reason-text">{r.text}</p>
            <div className="reason-rose">🌹</div>
          </div>
        ))}
      </div>
    </section>
  )
}
