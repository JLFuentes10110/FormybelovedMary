import { useEffect, useRef, useState } from 'react'
import './Timeline.css'

const moments = [
  { emoji: '✨', date: 'October 2024', title: 'The Beginning', desc: 'The universe conspired to bring us together. That first moment — I knew.' },
  { emoji: '🌹', date: 'The early days', title: 'Falling', desc: 'Every message, every laugh, every moment with you felt like breathing fresh air for the first time.' },
  { emoji: '🤍', date: 'Getting closer', title: 'Something real', desc: 'I stopped pretending I wasn\'t completely enchanted by you. You were already everything.' },
  { emoji: '💑', date: 'One month ago', title: 'Officially yours', desc: 'The day I got to call you mine. The happiest title I\'ve ever held.' },
  { emoji: '🌹', date: 'Today', title: 'Our first monthsary', desc: 'One month official, but a lifetime of feelings. And I\'d choose you all over again.' },
]

export default function Timeline() {
  const [visible, setVisible] = useState([])
  const refs = useRef([])

  useEffect(() => {
    const observers = refs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setVisible(v => [...new Set([...v, i])])
      }, { threshold: 0.3 })
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className="timeline-section">
      <p className="section-subtitle">Our story</p>
      <h2 className="section-title">How we got here</h2>
      <div className="divider">🌹</div>

      <div className="timeline">
        {moments.map((m, i) => (
          <div
            key={i}
            ref={el => refs.current[i] = el}
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} ${visible.includes(i) ? 'visible' : ''}`}
          >
            <div className="timeline-dot">
              <span>{m.emoji}</span>
            </div>
            <div className="timeline-card">
              <div className="t-date">{m.date}</div>
              <h3 className="t-title">{m.title}</h3>
              <p className="t-desc">{m.desc}</p>
            </div>
          </div>
        ))}
        <div className="timeline-line" />
      </div>
    </section>
  )
}
