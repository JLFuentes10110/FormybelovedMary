import { useRef, useEffect, useState } from 'react'
import maryPhoto from '../assets/mary.jpg'
import './PhotoToText.css'

const LOVE_TEXT = `I love you more than words could ever say. You are the reason I smile every single morning. Your laugh is my favorite sound in this world. Being with you feels like home. Every moment with you is a treasure I keep close to my heart. You make everything brighter just by existing. I am so grateful the universe brought you to me. You are breathtaking. You are extraordinary. You are mine and I am yours. I fall deeper every single day. My heart beats for you. You are my person, my safe place, my greatest joy. I love the way you see the world. I love your kindness. I love your strength. I love everything that makes you, you. You are more beautiful than a thousand roses. I choose you today and every day after. You are my favorite adventure, my sweetest dream. I am so lucky to love you and to be loved by you. Every heartbeat whispers your name. You are enough, you are more than enough, you are everything.`

export default function PhotoToText() {
  const canvasRef = useRef(null)
  const fileRef = useRef(null)
  const [hasImage, setHasImage] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imgData, setImgData] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Auto-load Mary's photo on mount
    const img = new Image()
    img.onload = () => {
      processImage(img)
    }
    img.onerror = () => {
      console.log('Mary\'s photo will be loaded when you add it to src/assets/mary.jpg')
      setHasImage(false)
    }
    img.src = maryPhoto
  }, [])

  function processImage(img) {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = 800, H = 600
    canvas.width = W
    canvas.height = H

    // Draw image to get pixel data
    const offscreen = document.createElement('canvas')
    offscreen.width = W
    offscreen.height = H
    const octx = offscreen.getContext('2d')
    
    const ratio = Math.min(W / img.width, H / img.height)
    const dw = img.width * ratio, dh = img.height * ratio
    const dx = (W - dw) / 2, dy = (H - dh) / 2
    octx.drawImage(img, dx, dy, dw, dh)
    
    const pixels = octx.getImageData(0, 0, W, H)
    setImgData({ pixels, W, H, dx, dy, dw, dh, img })
    setHasImage(true)
    renderTextImage({ pixels, W, H }, ctx, zoomLevel)
  }

  function renderTextImage(data, ctx, zoom) {
    if (!data) return
    const { pixels, W, H } = data
    ctx.fillStyle = '#fdf0f0'
    ctx.fillRect(0, 0, W, H)

    const charSize = Math.max(4, Math.round(8 / zoom))
    const words = LOVE_TEXT.split(' ')
    let wordIdx = 0

    ctx.font = `${charSize}px 'Cormorant Garamond', serif`
    ctx.textBaseline = 'top'

    for (let y = 0; y < H; y += Math.ceil(charSize * 1.3)) {
      let x = 0
      while (x < W) {
        const px = (y * W + Math.min(x, W-1)) * 4
        const r = pixels.data[px], g = pixels.data[px+1], b = pixels.data[px+2], a = pixels.data[px+3]
        if (a < 30) { x += charSize; continue; }

        const bright = (r * 0.299 + g * 0.587 + b * 0.114) / 255
        if (bright > 0.93) { x += charSize; continue; }

        const word = words[wordIdx % words.length]
        wordIdx++

        // Color from pixel, darkened for text readability
        const dr = Math.max(0, r - 80), dg = Math.max(0, g - 80), db = Math.max(0, b - 80)
        ctx.fillStyle = `rgb(${dr},${dg},${db})`
        ctx.fillText(word, x, y)
        x += ctx.measureText(word + ' ').width
      }
    }
  }

  useEffect(() => {
    if (!imgData) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    renderTextImage(imgData, ctx, zoomLevel)
  }, [zoomLevel, imgData])

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => processImage(img)
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="photo-section">
      <p className="section-subtitle">Made of love letters</p>
      <h2 className="section-title">A portrait written in words</h2>
      <div className="divider">🌹</div>

      <p className="photo-intro">
        Upload her photo — it transforms into a portrait made entirely of love words.<br/>
        <em>Zoom in close, and you'll read what your heart already knows.</em>
      </p>

      <div className="photo-container" ref={containerRef}>
        {!hasImage ? (
          <div className="upload-zone" onClick={() => fileRef.current.click()}>
            <div className="upload-icon">🌹</div>
            <p className="upload-title">Add her photo here</p>
            <p className="upload-sub">Click to upload — it becomes a portrait made of love</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
          </div>
        ) : (
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="love-canvas" />
            <div className="zoom-controls">
              <label>
                <span>Zoom to read the words</span>
                <input
                  type="range" min="0.5" max="4" step="0.1"
                  value={zoomLevel}
                  onChange={e => setZoomLevel(+e.target.value)}
                />
                <span>{zoomLevel.toFixed(1)}×</span>
              </label>
            </div>
            <p className="canvas-hint">
              <em>Every pixel is a love word. Zoom in to read them all.</em>
            </p>
            <button className="change-photo" onClick={() => { setHasImage(false); setImgData(null); fileRef.current.value=''; }}>
              Change photo
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
          </div>
        )}
      </div>
    </section>
  )
}
