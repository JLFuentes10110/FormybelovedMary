import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    setTimeout(() => setVisible(true), 300)
  }, [])

  return (
    <section className={`hero ${visible ? 'visible' : ''}`}>
      <div className="hero-bg">
        <div className="hero-circle c1" />
        <div className="hero-circle c2" />
        <div className="hero-circle c3" />
      </div>
      
      <div className="hero-content">
        <p className="hero-eyebrow">For the one who holds my heart</p>
        <h1 className="hero-name">My Love,</h1>
        <div className="hero-rose">🌹</div>
        <p className="hero-tagline">
          One month of being yours officially —<br/>
          <em>but a lifetime of falling for you.</em>
        </p>
        <div className="hero-since">
          <span className="label">Together since</span>
          <span className="date">October 2024</span>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>scroll down, my love</span>
        </div>
      </div>
    </section>
  )
}
