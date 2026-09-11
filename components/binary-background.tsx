"use client"

import { useEffect, useState } from "react"

export default function BinaryBackground() {
  const [binaryCode, setBinaryCode] = useState("")

  useEffect(() => {
    const generateBinary = () => {
      return Array.from({ length: 200 }, () => Math.round(Math.random())).join("")
    }
    setBinaryCode(generateBinary())
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
      <div className="absolute inset-0 font-mono text-xs text-accent whitespace-pre-wrap break-all animate-pulse">
        {binaryCode}
      </div>
    </div>
  )
}
