/**
 * @file App.tsx
 * @description Shell principal da aplicação — orquestra todas as seções da Landing Page.
 */

import './index.css'

// Dados da aplicação
import {
  navItems,
  heroData,
  socialProofData,
  servicesData,
  aboutData,
  faqData,
  footerData,
  floatingWhatsAppData
} from './data/siteData'

// Componentes
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SocialProof from './components/SocialProof'
import ServicesGrid from './components/ServicesGrid'
import AboutAuthority from './components/AboutAuthority'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <>
      <Header navItems={navItems} />

      <main id="main-content">
        <HeroSection data={heroData} />
        <ServicesGrid data={servicesData} />
        <SocialProof data={socialProofData} />
        <AboutAuthority data={aboutData} />
        <FAQ data={faqData} />
      </main>

      <Footer data={footerData} />
      <FloatingWhatsApp data={floatingWhatsAppData} />
    </>
  )
}

export default App
