/**
 * @file types/index.ts
 * @description Interfaces TypeScript para toda a estrutura de dados da
 * Landing Page da Laila Pinheiro Estética.
 *
 * Princípio: Todas as interfaces são rigorosamente tipadas para garantir
 * desacoplamento total entre dados (data.ts) e renderização (componentes React).
 */

/* =====================================================
   NAV & HEADER
   ===================================================== */

/** Um item de navegação âncora dentro da página */
export interface NavItem {
  /** Texto exibido no link */
  label: string;
  /** ID da seção alvo (ex: "#servicos") */
  href: string;
  /** Se verdadeiro, é o CTA principal do header */
  isCta?: boolean;
}

/* =====================================================
   HERO SECTION
   ===================================================== */

/** Dados da seção Hero — única ocorrência do <h1> */
export interface HeroData {
  /** Badge/Chip acima do H1 (ex: "Especialista em Estética Avançada • Duque de Caxias") */
  eyebrow: string;
  /** Título principal <h1> — foco em autoestima e transformação */
  headline: string;
  /** Parte destacada do headline (para aplicar gradient-rose-gold-text) */
  headlineHighlight: string;
  /** Subtítulo persuasivo — proposta de valor clara */
  subheadline: string;
  /** Texto do botão CTA principal */
  ctaText: string;
  /** URL do CTA (WhatsApp) */
  ctaHref: string;
  /** Texto do botão secundário */
  ctaSecondaryText: string;
  /** Href do botão secundário (ex: "#servicos") */
  ctaSecondaryHref: string;
  /** Metadados de prova social rápida abaixo do CTA */
  quickStats: QuickStat[];
  /** Caminho da imagem hero */
  imageSrc: string;
  /** Alt text da imagem hero (acessibilidade) */
  imageAlt: string;
}

/** Mini-estatística exibida abaixo do CTA da Hero */
export interface QuickStat {
  /** Número ou valor (ex: "+500", "5★") */
  value: string;
  /** Descrição do valor (ex: "pacientes atendidas", "avaliação Google") */
  label: string;
}

/* =====================================================
   SERVIÇOS
   ===================================================== */

/** Categoria de serviço para agrupamento visual */
export type ServiceCategory =
  | 'facial'
  | 'corporal'
  | 'rejuvenescimento'
  | 'bioestimulacao'
  | 'laser'
  | 'skincare';

/** Um serviço oferecido pela clínica */
export interface Service {
  /** ID único — usado como key no .map() */
  id: string;
  /** Ícone (nome do emoji ou string SVG inline) */
  icon: string;
  /** Categoria para filtro ou agrupamento */
  category: ServiceCategory;
  /** Nome do serviço */
  title: string;
  /** Descrição curta e persuasiva (2-3 linhas) */
  description: string;
  /** Lista de benefícios/resultados do procedimento */
  benefits: string[];
  /** Tag de destaque (ex: "Mais Pedido", "Novidade", "Sem Cirurgia") */
  badge?: string;
  /** Tempo aproximado do procedimento */
  duration?: string;
}

/** Dados completos da seção de serviços */
export interface ServicesData {
  /** Eyebrow acima do H2 */
  eyebrow: string;
  /** Título da seção <h2> */
  headline: string;
  /** Subtítulo da seção */
  subheadline: string;
  /** Array de serviços */
  items: Service[];
  /** Texto do CTA de conversão ao final da seção */
  ctaText: string;
  /** Href do CTA */
  ctaHref: string;
}

/* =====================================================
   DEPOIMENTOS / PROVA SOCIAL
   ===================================================== */

/** Um depoimento de cliente */
export interface Testimonial {
  /** ID único */
  id: string;
  /** Nome da cliente */
  name: string;
  /** Iniciais para o avatar fallback */
  initials: string;
  /** Caminho da foto (opcional) */
  avatarSrc?: string;
  /** Alt text da foto */
  avatarAlt?: string;
  /** Nota em estrelas (1-5) */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Texto do depoimento */
  text: string;
  /** Cidade/bairro (ex: "Duque de Caxias", "Nova Iguaçu") */
  location: string;
  /** Data aproximada (ex: "Agosto de 2025") */
  date: string;
  /** Se verdadeiro, é destaque (aparece primeiro) */
  featured?: boolean;
}

/** Dados da seção de prova social */
export interface SocialProofData {
  /** Eyebrow acima do H2 */
  eyebrow: string;
  /** Título <h2> */
  headline: string;
  /** Subtítulo */
  subheadline: string;
  /** Depoimentos */
  testimonials: Testimonial[];
  /** Dados do selo Google */
  googleSeal: GoogleSeal;
}

/** Metadados do Selo do Google Meu Negócio */
export interface GoogleSeal {
  /** Nota geral */
  rating: number;
  /** Total de avaliações */
  reviewCount: string;
  /** URL do Google Meu Negócio */
  url: string;
}

/* =====================================================
   ABOUT / AUTORIDADE
   ===================================================== */

/** Um item de credencial profissional */
export interface Credential {
  /** Ícone */
  icon: string;
  /** Texto da credencial */
  text: string;
}

/** Dados da seção Sobre / Autoridade */
export interface AboutData {
  /** Eyebrow da seção */
  eyebrow: string;
  /** Título <h2> */
  headline: string;
  /** Nome completo para destacar */
  name: string;
  /** Título profissional */
  title: string;
  /** Parágrafos da bio (array de strings para renderização separada) */
  bioParagraphs: string[];
  /** Lista de credenciais e especializações */
  credentials: Credential[];
  /** Caminho da foto */
  imageSrc: string;
  /** Alt text da foto */
  imageAlt: string;
  /** CTA da seção */
  ctaText: string;
  /** Href do CTA */
  ctaHref: string;
}

/* =====================================================
   FAQ
   ===================================================== */

/** Um item do FAQ com suporte a Schema.org FAQPage */
export interface FAQItem {
  /** ID único */
  id: string;
  /** Pergunta (mapeia para Question.name no Schema.org) */
  question: string;
  /** Resposta (mapeia para Answer.text no Schema.org) */
  answer: string;
  /** Categoria para agrupamento (opcional) */
  category?: 'procedimento' | 'segurança' | 'resultados' | 'precos' | 'agendamento';
}

/** Dados da seção FAQ */
export interface FAQData {
  /** Eyebrow acima do H2 */
  eyebrow: string;
  /** Título <h2> */
  headline: string;
  /** Subtítulo */
  subheadline: string;
  /** Array de perguntas */
  items: FAQItem[];
  /** CTA final da seção */
  ctaText: string;
  /** Href do CTA */
  ctaHref: string;
}

/* =====================================================
   FOOTER
   ===================================================== */

/** Um link do footer */
export interface FooterLink {
  label: string;
  href: string;
  /** Se abre em nova aba */
  external?: boolean;
}

/** Grupo de links do footer */
export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

/** Dado de contato estruturado para SEO local */
export interface ContactInfo {
  /** Tipo de contato */
  type: 'phone' | 'whatsapp' | 'email' | 'address' | 'hours';
  /** Ícone */
  icon?: string;
  /** Texto exibido */
  label: string;
  /** Valor (tel:, mailto:, https:, etc) */
  href?: string;
}

/** Dados completos do footer */
export interface FooterData {
  /** Descrição curta da clínica */
  tagline: string;
  /** Informações de contato */
  contactInfo: ContactInfo[];
  /** Horários de funcionamento */
  businessHours?: { day: string; hours: string }[];
  /** Grupos de links */
  linkGroups: FooterLinkGroup[];
  /** Redes sociais */
  socialLinks: SocialLink[];
  /** Texto de copyright */
  copyright: number;
  developer: { name: string; url: string };
  /** Aviso legal/disclaimer estético */
  disclaimer: string;
}

/** Link de rede social */
export interface SocialLink {
  /** Nome da rede */
  name: string;
  /** URL */
  href: string;
  /** Aria-label acessível */
  ariaLabel: string;
  /** Ícone SVG path ou emoji */
  icon: string;
}

/* =====================================================
   FLOATING WHATSAPP
   ===================================================== */

/** Dados do botão flutuante do WhatsApp */
export interface FloatingWhatsAppData {
  /** Número do WhatsApp (apenas dígitos, com DDI) */
  phoneNumber: string;
  /** Mensagem pré-preenchida */
  message: string;
  /** Aria-label acessível */
  ariaLabel: string;
  /** Tooltip exibido no hover */
  tooltip: string;
}

/* =====================================================
   ROOT DATA EXPORT
   ===================================================== */

/** Objeto raiz que agrega todos os dados da landing page */
export interface SiteData {
  nav: NavItem[];
  hero: HeroData;
  socialProof: SocialProofData;
  services: ServicesData;
  about: AboutData;
  faq: FAQData;
  footer: FooterData;
  floatingWhatsApp: FloatingWhatsAppData;
}
