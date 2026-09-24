/**
 * @file components/Header/Header.tsx
 * @description Header sticky com navegação âncora, logo SVG e CTA de conversão.
 * 
 * FEATURES:
 * - Mobile-First: Menu hambúrguer com animação suave no mobile
 * - Sticky: Header torna-se opaco ao rolar (efeito glassmorphism)
 * - Acessibilidade: aria-label, aria-expanded, aria-controls, role="navigation"
 * - Semântica: <header>, <nav>, <ul>, <li> — sem "div soup"
 * - Performance: useCallback nos handlers para evitar re-renders desnecessários
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import type { NavItem } from '../../types'
import iconLogo from '../../assets/logo.png'

/* ──────────────────────────────────────────────────────────────────────────────
   ÍCONES INLINE — SVG semântico (sem biblioteca externa)
   ────────────────────────────────────────────────────────────────────────────── */
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

/* ──────────────────────────────────────────────────────────────────────────────
   PROPS
   ────────────────────────────────────────────────────────────────────────────── */
interface HeaderProps {
  navItems: NavItem[]
}

/* ──────────────────────────────────────────────────────────────────────────────
   COMPONENTE
   ────────────────────────────────────────────────────────────────────────────── */
export default function Header({ navItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  /* Detecta scroll para aplicar backdrop blur */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Fecha menu ao redimensionar para desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /* Fecha menu ao pressionar Escape */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  /* Bloqueia scroll do body quando menu mobile está aberto */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  /* Navega com smooth scroll e fecha o menu mobile */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        closeMenu()
        const target = document.querySelector(href)
        if (target) {
          const headerHeight = 80
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
          window.scrollTo({ top, behavior: 'smooth' })
        }
      } else {
        closeMenu()
      }
    },
    [closeMenu]
  )

  /* Separa links normais do CTA */
  const regularLinks = navItems.filter(item => !item.isCta)
  const ctaLink = navItems.find(item => item.isCta)

  return (
    <>
      {/* ── HEADER PRINCIPAL ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-in-out',
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(201,124,90,0.10)]' : 'bg-white/80 backdrop-blur-sm',
        ].join(' ')}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* ── LOGO ── */}
            <a
              href="/"
              className="flex items-center gap-3 shrink-0 min-h-[44px] min-w-[44px] cursor-pointer transition-all duration-300 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)] rounded-lg"
              aria-label="Laila Pinheiro Estética — voltar para o início"
            >
              <img
                src={iconLogo}
                alt="Logotipo Laila Pinheiro Estética"
                className="h-10 w-auto md:h-12 mix-blend-multiply contrast-125 object-contain"
                width="48"
                height="48"
              />
              
              {/* O nome da marca agora fica visível em todas as telas (flex flex-col) */}
              <span className="flex flex-col leading-tight" aria-hidden="true">
                <span
                  className="font-display text-lg font-semibold text-[var(--color-ink-900)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Laila Pinheiro
                </span>
                <span
                  className="text-xs font-medium tracking-widest uppercase"
                  style={{ color: 'var(--color-rose-gold-500)', letterSpacing: '0.13em' }}
                >
                  Estética
                </span>
              </span>
            </a>

            {/* ── NAVEGAÇÃO DESKTOP ── */}
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-8" role="list">
                {regularLinks.map(item => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={e => handleNavClick(e, item.href)}
                      className={[
                        'relative text-sm font-medium transition-all duration-300 ease-out cursor-pointer active:scale-95 min-h-[44px] flex items-center',
                        'text-[var(--color-ink-700)]',
                        'hover:text-[var(--color-rose-gold-600)]',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)] rounded-md px-2',
                        // Underline animado no hover
                        'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px]',
                        'after:w-0 hover:after:w-full',
                        'after:bg-[var(--color-rose-gold-500)]',
                        'after:transition-[width] after:duration-300 after:ease-out',
                        'after:rounded-full',
                      ].join(' ')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── CTA DESKTOP + BOTÃO HAMBÚRGUER ── */}
            <div className="flex items-center gap-4">
              
              {/* CTA visível APENAS em desktop. 
                  Envolvemos na div "hidden lg:block" para garantir que 
                  a classe btn-primary não force a exibição no celular */}
              {ctaLink && (
                <div className="hidden lg:block">
                  <a
                    href={ctaLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex btn-primary text-sm px-5 py-3 min-h-[44px] min-w-[44px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]"
                    aria-label="Agendar avaliação gratuita pelo WhatsApp"
                  >
                    {/* Ícone WhatsApp inline */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.112 1.528 5.837L.057 23.5l5.797-1.523A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.012-1.374l-.36-.213-3.437.902.918-3.348-.234-.375A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                    </svg>
                    {ctaLink.label}
                  </a>
                </div>
              )}

              {/* Botão hambúrguer — apenas mobile/tablet */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
                className={[
                  'lg:hidden flex items-center justify-center w-12 h-12 min-h-[44px] min-w-[44px] rounded-lg cursor-pointer active:scale-95',
                  'text-[var(--color-ink-700)] transition-all duration-300 ease-out',
                  'hover:bg-[var(--color-rose-gold-100)] hover:text-[var(--color-rose-gold-600)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]',
                ].join(' ')}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MENU MOBILE — Overlay ── */}
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={[
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
          'transition-opacity duration-300 ease-in-out lg:hidden',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Painel do menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={[
          'fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw]',
          'bg-white flex flex-col',
          'shadow-2xl',
          'transition-transform duration-300 ease-in-out lg:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header do painel */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--color-ink-100)]">
          <span
            className="font-semibold text-[var(--color-ink-900)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Menu
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="flex items-center justify-center w-12 h-12 min-h-[44px] min-w-[44px] rounded-lg text-[var(--color-ink-500)] hover:bg-[var(--color-rose-gold-100)] hover:text-[var(--color-rose-gold-600)] transition-all duration-300 ease-out cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Links de navegação */}
        <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto py-6 px-6">
          <ul className="flex flex-col gap-1" role="list">
            {regularLinks.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  className={[
                    'flex items-center gap-3 p-4 rounded-xl min-h-[44px] cursor-pointer active:scale-95',
                    'text-[var(--color-ink-700)] font-medium text-base',
                    'transition-all duration-300 ease-out',
                    'hover:bg-[var(--color-rose-gold-50)] hover:text-[var(--color-rose-gold-600)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]',
                  ].join(' ')}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: 'var(--color-rose-gold-400)' }}
                    aria-hidden="true"
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA no rodapé do menu mobile */}
        {ctaLink && (
          <div className="px-6 pb-8 pt-4 border-t border-[var(--color-ink-100)]">
            <a
              href={ctaLink.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="btn-primary w-full justify-center gap-2 min-h-[44px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-rose-gold-500)]"
              aria-label="Agendar avaliação gratuita pelo WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.112 1.528 5.837L.057 23.5l5.797-1.523A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.012-1.374l-.36-.213-3.437.902.918-3.348-.234-.375A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              {ctaLink.label}
            </a>
            {/* Info de localização */}
            <p
              className="mt-4 text-center text-xs"
              style={{ color: 'var(--color-ink-300)' }}
            >
              Duque de Caxias, RJ
            </p>
          </div>
        )}
      </div>

      {/* Spacer para compensar o header fixed */}
      <div className="h-20" aria-hidden="true" />
    </>
  )
}