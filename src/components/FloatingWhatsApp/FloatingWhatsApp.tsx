/**
 * @file components/FloatingWhatsApp/FloatingWhatsApp.tsx
 * @description Botão flutuante fixo do WhatsApp — acessível e com animação pulse.
 *
 * FEATURES:
 * - Posição fixed bottom-right
 * - aria-label descritivo
 * - Tooltip no hover (desktop)
 * - Animação pulse-glow para atrair atenção
 * - Aparece após scroll de 300px para não competir com o Hero CTA
 * - Responsivo: tamanho menor no mobile
 */

import { useState, useEffect } from 'react'
import type { FloatingWhatsAppData } from '../../types'

interface FloatingWhatsAppProps {
  data: FloatingWhatsAppData
}

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.112 1.528 5.837L.057 23.5l5.797-1.523A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.012-1.374l-.36-.213-3.437.902.918-3.348-.234-.375A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
)

export default function FloatingWhatsApp({ data }: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  /* Aparece após 300px de scroll */
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // check imediato
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${data.phoneNumber}&text=${encodeURIComponent(data.message)}`

  return (
    <div
      className="fixed z-50"
      style={{
        bottom: '1.25rem',
        right: '1.25rem',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Tooltip — escondido no mobile para não vazar a tela, e por não ter hover */}
      <div
        role="tooltip"
        id="whatsapp-tooltip"
        className="hidden lg:block absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium shadow-xl pointer-events-none"
        style={{
          background: 'var(--color-ink-900)',
          color: '#fff',
          transition: 'opacity 0.2s ease',
          opacity: isTooltipVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {data.tooltip}
        {/* Seta do tooltip */}
        <span
          className="absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 rotate-45"
          style={{ background: 'var(--color-ink-900)' }}
          aria-hidden="true"
        />
      </div>

      {/* Botão principal */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={data.ariaLabel}
        aria-describedby="whatsapp-tooltip"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
        className="animate-pulse-glow flex items-center justify-center rounded-full
          will-change-transform
          transition-[transform,box-shadow] duration-300 ease-out
          active:scale-90 active:duration-75
          supports-[hover:hover]:hover:-translate-y-1.5 supports-[hover:hover]:hover:shadow-2xl
          motion-reduce:animate-none motion-reduce:transition-none motion-reduce:transform-none
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2
          focus-visible:ring-[#25D366] w-14 h-14 md:w-16 md:h-16
          min-h-[44px] min-w-[44px] cursor-pointer"
        style={{
          background: '#25D366',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
        }}
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}
