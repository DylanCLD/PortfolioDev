"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

/** A real procedural drawing, with the same parameters shown in the code panel. */
export function WaveLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const [frequency, setFrequency] = useState(3)
  const [playing, setPlaying] = useState(true)
  const [codeOpen, setCodeOpen] = useState(false)
  const { language } = useLanguage()
  const fr = language === "fr"

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = true
    let raf = 0
    let last = 0
    let width = 600
    let height = 480

    function draw() {
      if (!canvas || !context) return
      const ink = getComputedStyle(canvas).color
      context.clearRect(0, 0, width, height)
      context.strokeStyle = ink
      const phase = frameRef.current
      for (let row = 0; row < 52; row++) {
        context.beginPath()
        context.globalAlpha = .15 + .65 * Math.sin((row / 52) * Math.PI)
        context.lineWidth = row % 7 === 0 ? 1.25 : .65
        for (let step = 0; step <= 100; step++) {
          const u = step / 100
          const envelope = Math.pow(Math.sin(u * Math.PI), .8)
          const wave = Math.sin(u * frequency * Math.PI + row * .075 + phase)
          const x = u * width
          const y = height * .5 + (row - 26) * height * .007 + wave * envelope * height * .22
          if (step === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.stroke()
      }
      context.globalAlpha = 1
    }

    function tick(time: number) {
      if (time - last >= 32) {
        frameRef.current += .012
        draw()
        last = time
      }
      raf = requestAnimationFrame(tick)
    }
    function sync() {
      cancelAnimationFrame(raf)
      draw()
      if (playing && visible && !document.hidden && !reduce.matches) raf = requestAnimationFrame(tick)
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width
      height = entry.contentRect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      sync()
    })
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    const theme = new MutationObserver(sync)
    resize.observe(canvas)
    intersection.observe(canvas)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-visual-style"] })
    reduce.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      intersection.disconnect()
      theme.disconnect()
      reduce.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [frequency, playing])

  return (
    <div className="wave-lab">
      <div className="lab-caption"><span>FIG. 01 / WAVE FIELD</span><span>CANVAS 2D</span></div>
      <div className="wave-stage">
        <canvas ref={canvasRef} aria-label={fr ? "Onde procédurale contrôlée par la fréquence" : "Procedural wave controlled by frequency"} role="img" />
        <span className="wave-axis" aria-hidden="true">x →</span>
      </div>
      <div className="lab-controls">
        <label>{fr ? "Fréquence" : "Frequency"}<input aria-label={fr ? "Fréquence de l’onde" : "Wave frequency"} type="range" min="1" max="6" step="0.1" value={frequency} onChange={event => setFrequency(Number(event.target.value))} /><output>{frequency.toFixed(1)}</output></label>
        <button type="button" onClick={() => setPlaying(!playing)} aria-pressed={!playing}>{playing ? "Pause" : fr ? "Animer" : "Play"}</button>
        <button type="button" onClick={() => setCodeOpen(!codeOpen)} aria-expanded={codeOpen}>{codeOpen ? fr ? "Fermer le code" : "Close code" : "</> Code"}</button>
      </div>
      <div className="lab-code" data-open={codeOpen}>
        <div className="code-tab">wave.ts <span>TypeScript</span></div>
        <pre><code><span className="code-comment">// {fr ? "Le dessin au-dessus utilise ces paramètres." : "The drawing above uses these parameters."}</span>{"\n"}<span className="code-keyword">const</span>{" frequency = "}<span className="code-value">{frequency.toFixed(1)}</span>{";\n"}<span className="code-keyword">const</span>{" envelope = Math.pow(Math.sin(u * Math.PI), 0.8);\n"}<span className="code-keyword">const</span>{" wave = Math.sin(u * frequency * Math.PI\n  + row * 0.075 + phase);\n"}<span className="code-keyword">const</span>{" y = height * 0.5 + (row - 26) * height * 0.007\n  + wave * envelope * height * 0.22;\n"}<span className="code-function">context.lineTo</span>{"(u * width, y);"}</code></pre>
      </div>
    </div>
  )
}
