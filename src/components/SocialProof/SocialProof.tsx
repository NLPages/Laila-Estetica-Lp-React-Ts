/**
 * @file components/SocialProof/SocialProof.tsx
 * @description Seção de depoimentos com cards gerados via .map() e Selo do Google.
 *
 * FEATURES:
 * - Depoimentos mapeados via .map() — DRY absoluto
 * - Cards com avatar, estrelas, nome, serviço e localização
 * - Selo Google com rating e contagem de avaliações
 * - Layout: grid responsivo 1-2-3 colunas
 * - Cards em destaque têm borda colorida
 */

import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SocialProofData, Testimonial } from '../../types'

interface SocialProofProps {
  data: SocialProofData
}

/* ── Componente de estrelas reutilizável ── */
function StarRating({ rating, label }: { rating: number; label?: string }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={label ?? `Avaliação: ${rating} estrelas de 5`}
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            color: i < rating ? '#f59e0b' : 'var(--color-ink-100)',
            fontSize: '1rem',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

/* ── Card de depoimento ── */
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  return (
    <article
      ref={ref}
      className={`card flex flex-col gap-5 p-6 h-full
        transition-[transform,box-shadow] duration-300 ease-out
        active:scale-95 active:duration-75
        supports-[hover:hover]:hover:-translate-y-1.5 supports-[hover:hover]:hover:shadow-xl
        motion-reduce:transition-none motion-reduce:transform-none
        cursor-pointer focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]
        reveal ${isVisible ? 'reveal-visible' : ''}`}
      tabIndex={0}
      style={{
        borderLeft: testimonial.featured
          ? '3px solid var(--color-rose-gold-400)'
          : undefined,
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
      aria-label={`Depoimento de ${testimonial.name}`}
    >
      {/* Header: avatar + info */}
      <header className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm"
          style={{
            background: 'var(--color-rose-gold-100)',
            color: 'var(--color-rose-gold-600)',
          }}
          aria-hidden="true"
        >
          {testimonial.avatarSrc ? (
            <img
              src={testimonial.avatarSrc}
              alt={testimonial.avatarAlt ?? `Foto de ${testimonial.name}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            testimonial.initials
          )}
        </div>

        {/* Nome e localização */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <p
            className="font-semibold truncate"
            style={{ color: 'var(--color-ink-900)', fontSize: '0.9375rem' }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: 'var(--color-ink-300)' }}
          >
            {testimonial.location}
          </p>
        </div>

        {/* Rating no topo direito */}
        <div className="ml-auto shrink-0">
          <StarRating rating={testimonial.rating} />
        </div>
      </header>

      {/* Texto do depoimento */}
      <blockquote
        className="flex-1 relative"
        cite="https://g.page/laila-pinheiro-estetica"
      >
        {/* Aspas decorativas */}
        <span
          aria-hidden="true"
          className="absolute -top-2 -left-1 text-5xl leading-none font-serif select-none"
          style={{ color: 'var(--color-rose-gold-200)', fontFamily: 'Georgia, serif' }}
        >
          "
        </span>
        <p
          className="text-sm leading-relaxed pl-4"
          style={{ color: 'var(--color-ink-700)' }}
        >
          {testimonial.text}
        </p>
      </blockquote>

      {/* Rodapé: data */}
      <footer
        className="flex items-center justify-end pt-4 mt-auto border-t"
        style={{ borderColor: 'var(--color-ink-100)' }}
      >
        <time
          className="text-xs text-stone-400"
          dateTime={testimonial.date}
        >
          {testimonial.date}
        </time>
      </footer>
    </article>
  )
}

/* ── Componente principal ── */
export default function SocialProof({ data }: SocialProofProps) {
  const { googleSeal } = data
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="section-padding"
      style={{ background: '#ffffff' }}
    >
      <div className="section-container max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <header
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 reveal ${headerVisible ? 'reveal-visible' : ''}`}
        >
          <span className="badge-rose mb-4 inline-flex">{data.eyebrow}</span>

          <h2
            id="depoimentos-titulo"
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
            className="mx-auto mb-8"
            style={{
              color: 'var(--color-ink-500)',
              maxWidth: '55ch',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
            }}
          >
            {data.subheadline}
          </p>

          {/* Selo Google */}
          <a
            href={googleSeal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border
              transition-[transform,box-shadow] duration-300 ease-out
              active:scale-95 active:duration-75
              supports-[hover:hover]:hover:shadow-xl supports-[hover:hover]:hover:-translate-y-1
              motion-reduce:transition-none motion-reduce:transform-none
              cursor-pointer min-h-[44px] min-w-[44px]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-offset-2 focus-visible:ring-[#4285F4]"
            style={{
              borderColor: 'var(--color-ink-100)',
              background: '#fff',
              textDecoration: 'none',
            }}
            aria-label={`Ver ${googleSeal.reviewCount} avaliações de ${googleSeal.rating} estrelas no Google`}
          >
            {/* Logo Google simplificado (SVG inline) */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <StarRating
                  rating={Math.round(googleSeal.rating)}
                  label={`${googleSeal.rating} estrelas no Google`}
                />
                <span
                  className="font-bold text-sm"
                  style={{ color: 'var(--color-ink-900)' }}
                >
                  {googleSeal.rating.toFixed(1)}
                </span>
              </div>
              <span
                className="text-xs"
                style={{ color: 'var(--color-ink-300)' }}
              >
                {googleSeal.reviewCount} avaliações no Google
              </span>
            </div>
          </a>

          <div className="divider-rose mx-auto mt-8" aria-hidden="true" />
        </header>

        {/* Grid de depoimentos */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Depoimentos de clientes"
        >
          {data.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
