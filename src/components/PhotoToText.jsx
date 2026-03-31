import './PhotoToText.css'
import maryPhoto from '../assets/mary.jpg'

const LOVE_LETTER = `My Love, I just want to take a moment to tell you how deeply I love you. Sometimes words feel too small to explain how important you are to me, but I still want to try. You are the most beautiful thing that ever happened in my life. The love, care and warmth you give me makes my heart feel safe and full. Being with you makes everything feel lighter, happier, and more meaningful. You are not just my boyfriend — you are my comfort, best friend, my safe place and someone I truly treasure with all my heart. I want you to always feel secure in my love, no matter what happens around us, please remember that you're loved, valued, and cared for me so deeply. I am here for you, and I will always choose you. Your feelings matter to me, your happiness matters to me, and I will always do my best to protect you and the love we have. I want you to feel at peace knowing that my heart is yours. Soon, I will be branching out from work, my love, and things might become a little different for us. Because of that, I really want to spend as much time as I can with you now. I want to make bawi for every moment we might miss in the future. Every minute I spend with you is precious to me, and I want to make memories that we can hold onto no matter where life takes us. Mary`

export default function PhotoToText() {
  return (
    <section className="photo-section">
      <p className="section-subtitle">Her portrait, written in the very letter of her love.</p>
      <h2 className="section-title">Every word shapes her beauty.</h2>

      <p className="portrait-text" style={{ backgroundImage: `url(${maryPhoto})` }}>
        {LOVE_LETTER.repeat(15)}
      </p>
    </section>
  )
}