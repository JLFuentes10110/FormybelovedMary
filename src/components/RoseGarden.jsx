import { useEffect, useRef } from 'react'

const ROSE_SVG = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="20" cy="22" rx="8" ry="10" fill="currentColor" opacity="0.6"/>
  <ellipse cx="14" cy="18" rx="6" ry="8" fill="currentColor" opacity="0.7" transform="rotate(-20 14 18)"/>
  <ellipse cx="26" cy="18" rx="6" ry="8" fill="currentColor" opacity="0.7" transform="rotate(20 26 18)"/>
  <ellipse cx="20" cy="14" rx="7" ry="7" fill="currentColor" opacity="0.8"/>
  <circle cx="20" cy="16" r="4" fill="currentColor"/>
</svg>`

export default function RoseGarden() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const petals = []
    
    function createPetal() {
      const el = document.createElement('div')
      const size = Math.random() * 20 + 10
      const hue = Math.random() * 30 - 15
      el.innerHTML = ROSE_SVG
      el.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 110 - 5}vw;
        top: -60px;
        color: hsl(${355 + hue}, ${60 + Math.random()*20}%, ${55 + Math.random()*20}%);
        pointer-events: none;
        z-index: 0;
        animation: fall ${6 + Math.random() * 8}s linear forwards;
        animation-delay: ${Math.random() * 2}s;
        opacity: ${0.3 + Math.random() * 0.5};
      `
      container.appendChild(el)
      petals.push(el)
      setTimeout(() => {
        el.remove()
        petals.splice(petals.indexOf(el), 1)
      }, 16000)
    }

    const style = document.createElement('style')
    style.textContent = `
      @keyframes fall {
        0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.6; }
        100% { transform: translateY(110vh) rotate(${Math.random() > 0.5 ? '' : '-'}${360 + Math.random()*360}deg) scale(0.5); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    const interval = setInterval(createPetal, 800)
    return () => {
      clearInterval(interval)
      style.remove()
    }
  }, [])

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
}
