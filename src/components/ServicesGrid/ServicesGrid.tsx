/**
 * @file components/ServicesGrid/ServicesGrid.tsx
 * @description Grade de serviços mapeada via .map() — DRY absoluto.
 * Cards com hover, badges, lista de benefícios e CTA de conversão.
 */

import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { ServicesData, Service } from '../../types'

interface ServicesGridProps {
  data: ServicesData
}

/* ── Card individual de serviço ── */
interface ServiceCardProps {
  service: Service
  /** Índice para o stagger de delay */
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  return (
    <article
      ref={ref}
      className={`card h-full flex flex-col gap-5 p-6 lg:p-7 group
        transition-[transform,box-shadow] duration-300 ease-out
        active:scale-95 active:duration-75
        supports-[hover:hover]:hover:-translate-y-1.5 supports-[hover:hover]:hover:shadow-xl
        motion-reduce:transition-none motion-reduce:transform-none
        cursor-pointer focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]
        reveal ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 90}ms` : '0ms' }}
      tabIndex={0}
      aria-label={`Serviço: ${service.title}`}
    >
      {/* Ícone + Badge */}
      <div className="flex items-start justify-between">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{
            background: 'var(--color-rose-gold-100)',
            transition: 'background 0.3s ease',
          }}
          aria-hidden="true"
        >
          {service.icon}
        </div>

        {service.badge && (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
            style={{
              background: 'var(--color-rose-gold-500)',
              color: '#fff',
              letterSpacing: '0.03em',
            }}
            aria-label={`Destaque: ${service.badge}`}
          >
            {service.badge}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-3 flex-1">
        <h3
          className="font-display font-semibold leading-snug"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            color: 'var(--color-ink-900)',
          }}
        >
          {service.title}
        </h3>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: 'var(--color-ink-500)' }}
        >
          {service.description}
        </p>

        {/* Lista de benefícios */}
        <ul className="flex flex-col gap-1.5 mt-2" aria-label={`Benefícios de ${service.title}`}>
          {service.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'var(--color-ink-700)' }}
            >
              <span
                className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                style={{
                  background: 'var(--color-rose-gold-100)',
                  color: 'var(--color-rose-gold-600)',
                }}
                aria-hidden="true"
              >
                ✓
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé do card — duração */}
      {service.duration && (
        <div
          className="flex items-center gap-2 pt-4 border-t"
          style={{ borderColor: 'var(--color-ink-100)' }}
        >
          <span aria-hidden="true" style={{ color: 'var(--color-rose-gold-400)' }}>⏱</span>
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--color-ink-300)' }}
          >
            {service.duration}
          </span>
        </div>
      )}
    </article>
  )
}

/* ── Componente principal ── */
export default function ServicesGrid({ data }: ServicesGridProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.3 })
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="section-padding"
      style={{ background: 'var(--color-champagne-50)' }}
    >
      <div className="section-container max-w-7xl mx-auto">

        {/* Cabeçalho da seção */}
        <header
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 reveal ${headerVisible ? 'reveal-visible' : ''}`}
        >
          <span className="badge-rose mb-4 inline-flex">{data.eyebrow}</span>

          <h2
            id="servicos-titulo"
            className="font-display font-semibold leading-tight mb-4 text-balance"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--color-ink-900)',
            }}
          >
            {data.headline}
          </h2>

          <p
            className="mx-auto"
            style={{
              color: 'var(--color-ink-500)',
              maxWidth: '55ch',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
            }}
          >
            {data.subheadline}
          </p>

          <div className="divider-rose mx-auto mt-6" aria-hidden="true" />
        </header>

        {/* Grade de cards — mapeamento DRY */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="Lista de tratamentos estéticos disponíveis"
        >
          {data.items.map((service, index) => (
            <div key={service.id} role="listitem">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* CTA de conversão */}
        <div
          ref={ctaRef}
          className={`text-center mt-12 lg:mt-16 reveal ${ctaVisible ? 'reveal-visible' : ''}`}
          style={{ transitionDelay: ctaVisible ? '200ms' : '0ms' }}
        >
          <p
            className="mb-5 text-sm"
            style={{ color: 'var(--color-ink-500)' }}
          >
            Não sabe qual tratamento é ideal para você?
          </p>
          <a
            href={data.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex min-h-[44px] min-w-[44px]
              transition-[transform,box-shadow] duration-300 ease-out
              active:scale-95 active:duration-75
              supports-[hover:hover]:hover:-translate-y-1 supports-[hover:hover]:hover:shadow-xl
              motion-reduce:transition-none motion-reduce:transform-none
              cursor-pointer focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]"
            aria-label="Conversar com Laila pelo WhatsApp para descobrir o tratamento ideal"
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
    </section>
  )
}
