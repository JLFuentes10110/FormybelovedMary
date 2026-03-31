import { useRef, useState } from 'react'
import './LetterSection.css'

const MARY_LETTER = `My Love,

I just want to take a moment to tell you how deeply I love you. Sometimes words feel too small to explain how important you are to me, but I still want to try. You are the most beautiful thing that ever happened in my life. The love, care and warmth you give me makes my heart feel safe and full. Being with you makes everything feel lighter, happier, and more meaningful. You are not just my boyfriend — you are my comfort, best friend, my safe place and someone I truly treasure with all my heart.

I want you to always feel secure in my love, no matter what happens around us, please remember that you're loved, valued, and cared for me so deeply. I am here for you, and I will always choose you. Your feelings matter to me, your happiness matters to me, and I will always do my best to protect you and the love we have. I want you to feel at peace knowing that my heart is yours.

Soon, I will be branching out from work, my love, and things might become a little different for us. Because of that, I really want to spend as much time as I can with you now. I want to make bawi for every moment we might miss in the future. Every minute I spend with you is precious to me, and I want to make memories that we can hold onto no matter where life takes us.

I also want to give you something special. Please take my simple gift — Lucho's friend — a black stuffed cat, because I know how much you love cats. I want this little companion to stay with you, especially during the times when I may be far away from you. Whenever you hug it, I hope it reminds you of me — my love, my presence, and how much I care about you.

Even if we are apart sometimes, I want you to feel that part of me will always be there with you.

Beb, I decided to give him a cute name — "JAPERY" 🐱 It comes from our names "JAPETH AND MARY" because just like us, it represents two hearts connected as one. Whenever you see and touch Japery, I hope you remember that my heart is always connected to yours, no matter what the distance.

Please always remember this: my heart belongs only to you. My eyes only see you. Among everyone in this world, you are the one I choose, the one I value the most, and the one who holds the most special place in my life. No one could ever replace what you mean to me.

I am so thankful to have you in my life, Beb. Out of all the people in the world, I am grateful that our paths crossed and that we found each other. You make my days brighter, my heart calmer, and my life more meaningful. Loving you is one of the most and the best things that ever happened to me.

When I think about our future, I see you beside me. I want to spend the rest of my life loving you, supporting you and growing with you. I want us to continue building our dreams together like we once talked about — step by step, hand in hand. No matter how big or small our dreams are, I want us to achieve them together and celebrate every victory along the way. I will wait for you, Beb.

I know soon we may experience distance, and it may not always be easy. There will be days when we miss each other more than usual, and moments when things feel difficult. But I believe in us. I believe in the love we share. All we need is patience, trust and understanding. Distance may separate us physically, but it will never weaken what we have in our hearts.

I will always pray for you, especially for your safety, your happiness, your dreams and your future, Beb. I also pray for our relationship — that may God continue to guide us, protect us, and strengthen the love between us. I pray that no matter what challenges come our way, we will always find our way back to each other. Please uli and pahuway pirme sa ako, Japeth.

Thank you for loving me even if I am so hard to be loved. Thank you for being so patient with me. Thank you for choosing me everyday.

I love you more than words can explain and I will always choose you not just today but tomorrow and the rest of my life.

Forever Yours,
Mary 💕`

export default function LetterSection() {
  const [showing, setShowing] = useState(true)

  return (
    <section className="letter-section">
      <p className="section-subtitle">Her words, preserved</p>
      <h2 className="section-title">Her letter to me</h2>
      <div className="divider">🌹</div>

      <div className="letter-display">
        <div className="parchment-container">
          <div className="letter-paper parchment-unfolding">
            <div className="letter-header">
              <span className="letter-rose">🌹</span>
              <p className="letter-from">A letter from her heart</p>
            </div>
            <div className="letter-body">
              {MARY_LETTER.split('\n').map((line, i) => (
                <p key={i} className="letter-line">{line || <br/>}</p>
              ))}
            </div>
            <div className="letter-seal">❤</div>
          </div>
        </div>
      </div>
    </section>
  )
}
