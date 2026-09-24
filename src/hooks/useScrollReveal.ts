/**
 * @file hooks/useScrollReveal.ts
 * @description Hook de Scroll Reveal baseado em IntersectionObserver.
 *
 * - Zero dependências externas
 * - Respeita prefers-reduced-motion (WCAG 2.1)
 * - Callback no eixo de entrada (triggerOnce) para evitar re-animação
 * - Aceita threshold e rootMargin configuráveis
 */

import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  /** Fração visível necessária para disparar (0–1). Default: 0.15 */
  threshold?: number
  /** Margem extra de antecipação. Default: '0px 0px -60px 0px' */
  rootMargin?: string
  /** Anima apenas na primeira entrada. Default: true */
  triggerOnce?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Respeita a preferência do SO por redução de movimento —
    // marca como visível imediatamente para não bloquear conteúdo.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
