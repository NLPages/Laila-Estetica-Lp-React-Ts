/**
 * @file components/HeroSection/HeroSection.tsx
 * @description Seção Hero — único <h1> da página, CTA principal e prova social rápida.
 *
 * FEATURES:
 * - <h1> único com copywriting focado em autoestima
 * - Animações de entrada escalonadas (CSS animations)
 * - QuickStats com micro-animação de destaque
 * - Dois CTAs: principal (WhatsApp) e secundário (âncora)
 * - Layout 2 colunas no desktop, stack no mobile
 * - Imagem com object-fit + aspect-ratio para qualquer resolução
 */

import type { HeroData } from '../../types'

interface HeroSectionProps {
  data: HeroData
}

/* Ícone WhatsApp reutilizável */
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.112 1.528 5.837L.057 23.5l5.797-1.523A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.012-1.374l-.36-.213-3.437.902.918-3.348-.234-.375A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
)

export default function HeroSection({ data }: HeroSectionProps) {
  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector(data.ctaSecondaryHref)
    if (target) {
      const headerHeight = 80
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="inicio"
      aria-label="Apresentação da Laila Pinheiro Estética"
      className="gradient-hero-bg overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto">
        <div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ minHeight: 'calc(100vh - 80px)', paddingBlock: '4rem' }}
        >
          {/* ── COLUNA DE TEXTO ── */}
          <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">

            {/* Eyebrow badge */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <span className="badge-rose">{data.eyebrow}</span>
            </div>

            {/* H1 — único na página */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <h1
                className="font-display leading-tight text-balance"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  color: 'var(--color-ink-900)',
                  fontWeight: 700,
                }}
              >
                {data.headline}{' '}
                <span className="gradient-rose-gold-text italic">
                  {data.headlineHighlight}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <p
                style={{
                  color: 'var(--color-ink-500)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.75,
                  maxWidth: '52ch',
                }}
              >
                {data.subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col items-center justify-center sm:flex-row animate-fade-up"
              style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <a
                href={data.ctaSecondaryHref}
                onClick={handleSecondaryClick}
                className="btn-primary flex items-center justify-center min-h-[44px] min-w-[44px]
                  transition-[transform,box-shadow] duration-300 ease-out
                  active:scale-95 active:duration-75
                  supports-[hover:hover]:hover:-translate-y-1 supports-[hover:hover]:hover:shadow-xl
                  motion-reduce:transition-none motion-reduce:transform-none
                  cursor-pointer focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]"
                aria-label="Ver todos os tratamentos estéticos disponíveis"
              >
                {data.ctaSecondaryText}
              </a>
            </div>

            {/* QuickStats — prova social imediata */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
            >
              {/* Separador */}
              <div
                className="w-full h-px mb-6"
                style={{ background: 'var(--color-ink-100)' }}
                aria-hidden="true"
              />

              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {data.quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-0.5"
                  >
                    <dt
                      className="text-xs font-medium uppercase tracking-widest"
                      style={{ color: 'var(--color-ink-300)', letterSpacing: '0.08em' }}
                    >
                      {stat.label}
                    </dt>
                    <dd
                      className="font-display font-bold"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        color: 'var(--color-rose-gold-600)',
                      }}
                    >
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ── COLUNA DE IMAGEM ── */}
          <div
            className="order-1 lg:order-2 animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="relative mx-auto" style={{ maxWidth: '480px' }}>

              {/* Decoração: círculo de fundo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center, var(--color-rose-gold-100) 0%, transparent 70%)',
                  transform: 'scale(1.1)',
                  zIndex: 0,
                }}
              />

              {/* Container da imagem com aspect-ratio fixo */}
              <div
                className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(201,124,90,0.20)]"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={data.imageSrc}
                  alt={data.imageAlt}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />

                {/* Overlay sutil na parte inferior para legibilidade */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background: 'linear-gradient(to top, rgba(201,124,90,0.15), transparent)',
                  }}
                />
              </div>

              {/* Badge flutuante — "Entre em contato" */}
              <div
                className="absolute -bottom-4 left-0 sm:-left-4 lg:bottom-8 lg:-left-8 z-20 w-full sm:w-auto flex justify-center sm:block px-2 sm:px-0"
              >
                <a
                  href={data.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card px-4 py-3 flex items-center gap-3 w-full sm:w-auto shadow-2xl
                    transition-[transform,box-shadow] duration-300 ease-out
                    active:scale-95 active:duration-75
                    supports-[hover:hover]:hover:shadow-xl supports-[hover:hover]:hover:-translate-y-1
                    motion-reduce:transition-none motion-reduce:transform-none
                    cursor-pointer focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
                  style={{ borderRadius: '1rem', minWidth: '200px', textDecoration: 'none' }}
                  aria-label="Agende pelo WhatsApp, clique e entre em contato"
                >
                  <span
                    className="text-[#25D366]"
                    role="img"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={32} />
                  </span>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: 'var(--color-ink-900)' }}
                    >
                      Agende pelo WhatsApp
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--color-rose-gold-500)' }}
                    >
                      Clique e entre em contato
                    </p>
                  </div>
                </a>
              </div>

              {/* Badge flutuante — estrelas */}
              <div
                aria-hidden="true"
                className="absolute -top-4 right-0 sm:-right-4 lg:top-8 lg:-right-8 z-20 px-2 sm:px-0"
              >
                <a
                  href="https://www.google.com/search?q=laila-pinheiro-estetica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-1.5 sm:gap-2 shadow-xl cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 active:scale-95 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4] rounded-2xl"
                  style={{ borderRadius: '1rem', textDecoration: 'none' }}
                  aria-label="Ver avaliações no Google"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  <div className="flex gap-0.5" aria-label="5 estrelas">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: '#f59e0b', fontSize: '0.875rem' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">5.0</span>
                    <span className="font-medium text-gray-600 text-xs sm:text-sm">Google</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onda separadora inferior */}
      <div aria-hidden="true" style={{ marginTop: '-1px', lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '60px', display: 'block' }}
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
