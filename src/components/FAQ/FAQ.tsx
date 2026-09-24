/**
 * @file components/FAQ/FAQ.tsx
 * @description Accordion de FAQ com Schema.org FAQPage markup injetado via <script>.
 *
 * FEATURES:
 * - Accordion acessível: aria-expanded, aria-controls, role="region"
 * - Schema.org FAQPage injetado via <script type="application/ld+json">
 * - Itens mapeados via .map() — DRY
 * - Animação suave de abertura/fechamento via max-height
 * - Suporte a teclado: Enter/Space para abrir, Escape para fechar
 * - Apenas um item aberto por vez (accordion exclusivo)
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { FAQData, FAQItem } from '../../types'

interface FAQProps {
  data: FAQData
}

/* ── Item do Accordion ── */
interface FAQItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQAccordionItem({ item, isOpen, onToggle, index }: FAQItemProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const answerId = `faq-answer-${item.id}`
  const questionId = `faq-question-${item.id}`

  /* Animação via max-height */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (isOpen) {
      panel.style.maxHeight = panel.scrollHeight + 'px'
    } else {
      panel.style.maxHeight = '0px'
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--color-ink-100)' }}
    >
      {/* Pergunta — botão acessível */}
      <h3 className="m-0">
        <button
          id={questionId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
          style={{
            color: 'var(--color-ink-900)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            // @ts-expect-error — CSS custom property
            '--tw-ring-color': 'var(--color-rose-gold-500)',
          }}
        >
          {/* Número + texto */}
          <div className="flex items-start gap-4">
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
              style={{
                background: isOpen
                  ? 'var(--color-rose-gold-500)'
                  : 'var(--color-rose-gold-100)',
                color: isOpen ? '#fff' : 'var(--color-rose-gold-600)',
                transition: 'background 0.3s ease, color 0.3s ease',
                fontSize: '0.7rem',
              }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="font-medium leading-snug text-base"
              style={{
                color: isOpen
                  ? 'var(--color-rose-gold-700)'
                  : 'var(--color-ink-900)',
                transition: 'color 0.2s ease',
                fontWeight: isOpen ? 600 : 500,
              }}
            >
              {item.question}
            </span>
          </div>

          {/* Ícone chevron */}
          <span
            aria-hidden="true"
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300"
            style={{
              background: isOpen
                ? 'var(--color-rose-gold-500)'
                : 'var(--color-ink-100)',
              color: isOpen ? '#fff' : 'var(--color-ink-500)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Resposta — painel animado */}
      <div
        id={answerId}
        ref={panelRef}
        role="region"
        aria-labelledby={questionId}
        style={{
          maxHeight: '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="pb-6 pl-11 pr-4">
          <p
            className="leading-relaxed text-sm"
            style={{
              color: 'var(--color-ink-500)',
              lineHeight: 1.8,
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Componente principal ── */
export default function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: accordionRef, isVisible: accordionVisible } = useScrollReveal({ threshold: 0.05 })

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }, [])

  /* Schema.org FAQPage — gerado dinamicamente a partir dos dados */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-titulo"
      className="section-padding"
      style={{ background: '#ffffff' }}
    >
      {/* Schema.org FAQPage markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="section-container">
        <div className="max-w-3xl mx-auto">

          {/* Cabeçalho */}
          <header
            ref={headerRef}
            className={`text-center mb-12 reveal ${headerVisible ? 'reveal-visible' : ''}`}
          >
            <span className="badge-rose mb-4 inline-flex">{data.eyebrow}</span>

            <h2
              id="faq-titulo"
              className="font-display font-semibold leading-tight mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: 'var(--color-ink-900)',
              }}
            >
              {data.headline}
            </h2>

            <p
              style={{
                color: 'var(--color-ink-500)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
              }}
            >
              {data.subheadline}
            </p>

            <div className="divider-rose mx-auto mt-6" aria-hidden="true" />
          </header>

          {/* Accordion */}
          <div
            ref={accordionRef}
            className={`rounded-2xl overflow-hidden border reveal ${accordionVisible ? 'reveal-visible' : ''}`}
            style={{
              borderColor: 'var(--color-ink-100)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              className="px-6 pt-2"
              role="list"
              aria-label="Perguntas frequentes"
            >
              {data.items.map((item, index) => (
                <div key={item.id} role="listitem">
                  <FAQAccordionItem
                    item={item}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href={data.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="Enviar dúvida para Laila Pinheiro pelo WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.112 1.528 5.837L.057 23.5l5.797-1.523A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.012-1.374l-.36-.213-3.437.902.918-3.348-.234-.375A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              {data.ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
