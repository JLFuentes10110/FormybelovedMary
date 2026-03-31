import { useEffect, useRef, useState } from 'react'
import './Closing.css'

export default function Closing() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="closing-section" ref={ref}>
      <div className={`closing-content ${visible ? 'visible' : ''}`}>
        <div className="rose-row">
          {'🌹'.repeat(5).split('').map((r, i) => (
            <span key={i} className="closing-rose" style={{ animationDelay: `${i * 0.2}s` }}>🌹</span>
          ))}
        </div>
        <h2 className="closing-title">Happy First Monthsary</h2>
        <p className="closing-sub">my love, my home, my everything</p>
        <div className="closing-vow">
          <p>
            One month of being officially yours.<br/>
            A lifetime of loving you still ahead.<br/>
            I would choose you, again and again,<br/>
            in every universe, in every life.
          </p>
          <br/>
          <p className="closing-sign">
            Yours, always and completely. ❤
          </p>
        </div>
        <div className="closing-date">
          <span>October 2024 → Forever</span>
        </div>
      </div>
    </section>
  )
}
