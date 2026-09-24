/**
 * @file components/AboutAuthority/AboutAuthority.tsx
 * @description Seção "Sobre Laila" — construção de autoridade e confiança.
 *
 * FEATURES:
 * - Layout 2 colunas: foto à esquerda, texto à direita (invertido no mobile)
 * - Credenciais mapeadas via .map()
 * - Parágrafos da bio mapeados via .map()
 * - Imagem com borda decorativa e tag de autoridade sobreposta
 * - CTA para WhatsApp
 */

import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { AboutData } from '../../types'

interface AboutAuthorityProps {
  data: AboutData
}

export default function AboutAuthority({ data }: AboutAuthorityProps) {
  const { ref: photoRef, isVisible: photoVisible } = useScrollReveal({ threshold: 0.15 })
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.15 })
  const { ref: credsRef, isVisible: credsVisible } = useScrollReveal({ threshold: 0.2 })
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="section-padding"
      style={{ background: '#ffffff' }}
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── COLUNA DA FOTO ── */}
          <div
            ref={photoRef}
            className={`relative order-2 lg:order-1 reveal-left ${photoVisible ? 'reveal-visible' : ''}`}
          >
            <div className="relative mx-auto" style={{ maxWidth: '420px' }}>

              {/* Borda decorativa deslocada */}
              <div
                aria-hidden="true"
                className="absolute rounded-3xl"
                style={{
                  inset: 0,
                  transform: 'translate(16px, 16px)',
                  background: 'var(--color-rose-gold-200)',
                  borderRadius: '1.5rem',
                  zIndex: 0,
                }}
              />

              {/* Imagem principal */}
              <div
                className="relative z-10 rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '3/4',
                  boxShadow: '0 20px 60px rgba(201,124,90,0.15)',
                }}
              >
                <img
                  src={data.imageSrc}
                  alt={data.imageAlt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Tag de autoridade sobreposta */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 left-1/2 z-20"
                style={{ transform: 'translateX(-50%)' }}
              >
                <div
                  className="px-5 py-3 rounded-2xl text-center shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-rose-gold-500), var(--color-rose-gold-700))',
                    color: '#fff',
                    minWidth: '220px',
                  }}
                >
                  <p className="font-bold text-sm">{data.name}</p>
                  <p className="text-xs opacity-90 mt-0.5">{data.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── COLUNA DE TEXTO ── */}
          <div
            ref={textRef}
            className={`flex flex-col gap-6 order-1 lg:order-2 pt-8 lg:pt-0 reveal-right ${textVisible ? 'reveal-visible' : ''}`}
          >

            {/* Eyebrow */}
            <span className="badge-rose">{data.eyebrow}</span>

            {/* H2 */}
            <h2
              id="sobre-titulo"
              className="font-display font-semibold leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-ink-900)',
              }}
            >
              {data.headline}{' '}
              <span className="gradient-rose-gold-text italic">
                que cuida de você.
              </span>
            </h2>

            {/* Bio — parágrafos mapeados */}
            <div className="flex flex-col gap-4">
              {data.bioParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    color: 'var(--color-ink-500)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.75,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Credenciais mapeadas */}
            <div
              ref={credsRef}
              className={`rounded-2xl p-5 mt-2 reveal ${credsVisible ? 'reveal-visible' : ''}`}
              style={{
                background: '#fff',
                border: '1px solid var(--color-ink-100)',
                transitionDelay: credsVisible ? '150ms' : '0ms',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--color-rose-gold-500)', letterSpacing: '0.1em' }}
              >
                Formação &amp; Credenciais
              </p>
              <ul className="flex flex-col gap-3" aria-label="Credenciais profissionais de Laila Pinheiro">
                {data.credentials.map((cred, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'var(--color-ink-700)' }}
                  >
                    <span
                      className="shrink-0 text-base mt-0.5"
                      aria-hidden="true"
                    >
                      {cred.icon}
                    </span>
                    {cred.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href={data.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary self-start"
              aria-label="Enviar mensagem para Laila Pinheiro pelo WhatsApp"
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
