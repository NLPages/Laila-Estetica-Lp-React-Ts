/**
 * @file components/Footer/Footer.tsx
 * @description Rodapé completo com links institucionais, contatos e SEO local.
 *
 * FEATURES:
 * - Informações de contato estruturadas e clicáveis (WhatsApp, Email, Mapa)
 * - Navegação de rodapé por grupos lógicos
 * - Redes Sociais com SVGs acessíveis
 * - Disclaimer estético (requisito para clínicas)
 * - Layout responsivo (stack no mobile, grid no desktop)
 */

import type { FooterData } from '../../types'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import iconLogo from '../../assets/logo2.jpg'

interface FooterProps {
  data: FooterData
}

/* ── Ícones Sociais (SVG Inline) ── */
const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    case 'whatsapp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.112 1.528 5.837L.057 23.5l5.797-1.523A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.012-1.374l-.36-.213-3.437.902.918-3.348-.234-.375A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.61.94-5.26 3.02-6.85 1.5-1.15 3.4-1.67 5.25-1.57.02 1.34-.01 2.68.01 4.02-1.35-.06-2.73.44-3.59 1.46-.86 1.05-1.07 2.53-.55 3.75.52 1.25 1.83 2.11 3.2 2.17 1.35.06 2.7-.44 3.56-1.45.69-.84.99-1.92.97-2.99-.04-4.83-.02-9.66-.02-14.49h4.31c-.01 0-.01-.01 0 0z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Footer({ data }: FooterProps) {
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 })
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const headerHeight = 80
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer
      className="bg-[var(--color-ink-900)] pt-16 pb-8 md:pt-24"
      style={{ color: 'var(--color-champagne-50)' }}
      aria-label="Rodapé do site"
    >
      <div className="section-container max-w-7xl mx-auto">
        
        {/* ── GRID PRINCIPAL ── */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 reveal ${gridVisible ? 'reveal-visible' : ''}`}
        >
          
          {/* Marca e Descrição (4 colunas) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center gap-3 w-max cursor-pointer active:scale-95 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)] rounded-lg min-h-[44px]"
              aria-label="Laila Pinheiro Estética — voltar para o início"
            >
              <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden bg-[var(--color-ink-900)] border border-[var(--color-rose-gold-500)]/30 p-0.5">
                <img
                  src={iconLogo}
                  alt="Logotipo Laila Pinheiro Estética"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="flex flex-col leading-tight" aria-hidden="true">
                <span
                  className="font-display text-xl font-semibold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Laila Pinheiro
                </span>
                <span
                  className="text-[0.7rem] font-medium tracking-widest uppercase text-[var(--color-rose-gold-300)]"
                  style={{ letterSpacing: '0.12em' }}
                >
                  Estética
                </span>
              </span>
            </a>
            
            <p className="text-[var(--color-ink-100)] opacity-80 text-sm leading-relaxed max-w-sm">
              {data.tagline}
            </p>
            
            {/* Redes Sociais */}
            <div className="flex items-center gap-4 mt-2">
              {data.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center
                    bg-[var(--color-ink-700)] text-[var(--color-rose-gold-300)]
                    transition-[transform,background-color,box-shadow,color] duration-300 ease-out
                    active:scale-95 active:duration-75
                    supports-[hover:hover]:hover:bg-[var(--color-rose-gold-500)] supports-[hover:hover]:hover:text-white
                    supports-[hover:hover]:hover:-translate-y-1 supports-[hover:hover]:hover:shadow-lg
                    motion-reduce:transition-none motion-reduce:transform-none
                    cursor-pointer focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Links de Navegação (4 colunas divididas) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data.linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="font-semibold text-white tracking-wide uppercase text-sm">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={!link.external ? (e) => handleNavClick(e, link.href) : undefined}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center py-2 px-1 text-sm text-[var(--color-ink-100)] opacity-70 hover:opacity-100 hover:text-[var(--color-rose-gold-300)] transition-colors duration-200 active:opacity-100 active:duration-75 motion-reduce:transition-none cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)] rounded-md"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contatos (4 colunas) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <h3 className="font-semibold text-white tracking-wide uppercase text-sm mb-4">
                Contato & Localização
              </h3>
              <address className="not-italic flex flex-col gap-2">
                {data.contactInfo.map((contact, index) => {
                  const isLink = !!contact.href
                  const Wrapper = isLink ? 'a' : 'div'
                  const props = isLink
                    ? {
                        href: contact.href,
                        target: contact.href?.startsWith('http') ? '_blank' : undefined,
                        rel: contact.href?.startsWith('http') ? 'noopener noreferrer' : undefined,
                        className: 'group flex items-center gap-3 text-sm text-[var(--color-ink-100)] opacity-80 transition-all duration-300 ease-out hover:opacity-100 hover:text-[var(--color-rose-gold-300)] active:scale-95 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)] rounded-lg px-2 -ml-2',
                      }
                    : { className: 'flex items-center gap-3 text-sm text-[var(--color-ink-100)] opacity-80 py-2' }

                  return (
                    <Wrapper key={index} {...props}>
                      <span className="leading-snug">{contact.label}</span>
                    </Wrapper>
                  )
                })}
              </address>
            </div>

            {data.businessHours && (
              <div>
                <h3 className="font-semibold text-white tracking-wide uppercase text-sm mb-4">
                  Horário de Funcionamento
                </h3>
                <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-ink-100)] opacity-80 w-full max-w-xs">
                  {data.businessHours.map((bh) => (
                    <li key={bh.day} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span>{bh.day}</span>
                      <span className="font-medium text-white">{bh.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* ── LINHA DIVISÓRIA ── */}
        <div className="w-full h-px bg-white/10 mb-8" aria-hidden="true" />

        {/* ── BOTTOM FOOTER ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-300)] text-center md:text-left">
          <p>
            © {data.copyright} Laila Pinheiro Estética. Todos os direitos reservados. Desenvolvido por{' '}
            <a 
              href={data.developer.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-rose-gold-500)] transition-colors duration-300"
            >
              {data.developer.name}
            </a>
          </p>
          <p className="max-w-2xl opacity-75">
            {data.disclaimer}
          </p>
        </div>

      </div>
    </footer>
  )
}
