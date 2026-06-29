import { useState, useEffect } from 'react'

const SLIDES = ['Slide A', 'Slide B', 'Slide C', 'Slide D']

// Live coding 12 — Image Carousel. Build from CHALLENGE.md.
export default function Carousel({ images = SLIDES }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  // TODO: prev/next (wrap), dot click, autoplay interval with cleanup.

  return (
    <div>
      <div data-testid="current-slide">{/* TODO: images[index] */}</div>
      {/* TODO: prev / next / dots / play-pause */}
    </div>
  )
}
