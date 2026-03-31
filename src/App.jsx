import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import RoseGarden from './components/RoseGarden'
import PhotoToText from './components/PhotoToText'
import Timeline from './components/Timeline'
import LetterSection from './components/LetterSection'
import Reasons from './components/Reasons'
import Closing from './components/Closing'
import './App.css'

function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div className={`app ${loaded ? 'loaded' : ''}`}>
      <RoseGarden />
      <Hero />
      <Timeline />
      <PhotoToText />
      <Reasons />
      <LetterSection />
      <Closing />
    </div>
  )
}

export default App
