import { useState, useEffect } from 'react'

const SLIDES = ['Slide A', 'Slide B', 'Slide C', 'Slide D']

export default function Carousel({ images = SLIDES }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(next, 2000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, images.length])

  return (
    <div style={{ width: 240 }}>
      <div
        data-testid="current-slide"
        style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef', borderRadius: 8, fontSize: 20 }}
      >
        {images[index]}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <button onClick={prev}>Prev</button>
        <button onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={next}>Next</button>
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
        {images.map((_, i) => (
          <button
            key={i}
            data-testid={`dot-${i}`}
            aria-current={i === index ? 'true' : 'false'}
            onClick={() => setIndex(i)}
            style={{ width: 12, height: 12, borderRadius: '50%', border: 'none', background: i === index ? '#333' : '#ccc', cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  )
}
