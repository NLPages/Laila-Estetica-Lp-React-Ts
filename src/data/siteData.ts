/**
 * @file data/siteData.ts
 * @description Arquivo central de dados da Landing Page — Laila Pinheiro Estética.
 *
 * PRINCÍPIO DE DESACOPLAMENTO:
 * Este arquivo contém APENAS dados e copywriting. Zero lógica de UI ou renderização.
 * Os componentes React consomem esses dados via props tipadas com as interfaces de /types/index.ts.
 *
 * COPYWRITING: Persuasivo, empático e localizado para mulheres de Duque de Caxias
 * e Baixada Fluminense. Tom: Premium, acolhedor, confiante e empoderador.
 */

import type {
  SiteData,
  NavItem,
  HeroData,
  SocialProofData,
  ServicesData,
  AboutData,
  FAQData,
  FooterData,
  FloatingWhatsAppData,
} from '../types';

import lailaImg from '../assets/Laila.jpg';

/* =====================================================
   CONFIGURAÇÃO GLOBAL — WhatsApp
   ===================================================== */
const WHATSAPP_NUMBER = '5521997867944';
const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send`;
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos'
);
export const WHATSAPP_LINK = `${WHATSAPP_BASE_URL}?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}`;

/* =====================================================
   NAVEGAÇÃO
   ===================================================== */
export const navItems: NavItem[] = [
  { label: 'Tratamentos', href: '#servicos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Sobre Laila', href: '#sobre' },
  { label: 'Dúvidas', href: '#faq' },
  {
    label: 'Agendar Avaliação',
    href: WHATSAPP_LINK,
    isCta: true,
  },
];

/* =====================================================
   HERO SECTION
   ===================================================== */
export const heroData: HeroData = {
  eyebrow: '✦ ESTÉTICA INTEGRATIVA • DUQUE DE CAXIAS, RJ',
  headline: 'Sua autoestima de volta,',
  headlineHighlight: 'do seu jeito.',
  subheadline:
    'Cada rosto tem a sua história. Aqui em Caxias, Laila cuida de você com técnica real e atenção genuína, para realçar o que já é bonito em você. Sem exageros. Sem receita pronta.',
  ctaText: 'Agendar minha avaliação gratuita',
  ctaHref: WHATSAPP_LINK,
  ctaSecondaryText: 'Conheça os tratamentos',
  ctaSecondaryHref: '#servicos',
  quickStats: [
    { value: '+500', label: 'pacientes atendidas' },
    { value: '5★', label: 'avaliação no Google' },
    { value: '8+', label: 'anos de experiência' },
    { value: '100%', label: 'protocolos personalizados' },
  ],
  imageSrc: lailaImg,
  imageAlt:
    'Laila Pinheiro, esteticista especialista em estética avançada, sorrindo em ambiente acolhedor. Atendimento humanizado em Duque de Caxias, RJ',
};

/* =====================================================
   SERVIÇOS
   ===================================================== */
export const servicesData: ServicesData = {
  eyebrow: '✦ Nossos Tratamentos',
  headline: 'Cada rosto, um protocolo único',
  subheadline:
    'Nenhum tratamento começa sem antes conversar com você. Laila precisa entender seu biotipo, sua rotina e o que realmente te incomoda para montar um plano que faça sentido de verdade.',
  ctaText: 'Descobrir qual tratamento é pra mim',
  ctaHref: WHATSAPP_LINK,
  items: [
    {
      id: 'toxina-botulinica',
      icon: '💉',
      category: 'facial',
      title: 'Toxina Botulínica',
      description:
        'Suaviza as marcas de expressão sem apagar a sua identidade. Você continua sendo você, só com o rosto mais descansado e harmonioso. O resultado depende do que você quer: Laila aplica com critério e sem exagero.',
      benefits: [
        'Aparência mais descansada e jovem',
        'Suavização de linhas de expressão',
        'Resultado natural, sem aspecto "congelado"',
        'Prevenção do aprofundamento de rugas',
      ],
      badge: 'Mais Pedido',
    },
    {
      id: 'fios-pdo',
      icon: '🧵',
      category: 'facial',
      title: 'Fios de PDO',
      description:
        'Devolve a firmeza que a gravidade e o tempo foram levando. O fio estimula o colágeno da sua própria pele, e o resultado aparece de forma gradual, natural. Nada de cara esticada ou expressão travada.',
      benefits: [
        'Contorno facial mais definido',
        'Produção natural de colágeno estimulada',
        'Firmeza e sustentação progressivas',
        'Rejuvenescimento com aspecto natural',
      ],
    },
    {
      id: 'microagulhamento',
      icon: '⚡',
      category: 'rejuvenescimento',
      title: 'Microagulhamento',
      description:
        'A pele tem capacidade de se renovar. O microagulhamento ativa esse processo de forma direcionada. No rosto, trata cicatrizes de acne e poros. Nos lábios, entrega o efeito Glow Lips: hidratação profunda e viço real.',
      benefits: [
        'Pele renovada e visivelmente mais saudável',
        'Redução de cicatrizes e poros dilatados',
        'Lábios com viço e hidratação profunda (Glow Lips)',
        'Leve volumização labial natural',
      ],
    },
    {
      id: 'limpeza-pele',
      icon: '💎',
      category: 'skincare',
      title: 'Limpeza de Pele',
      description:
        'Pele limpa é a base de tudo. Antes de qualquer tratamento estético, sua pele precisa estar preparada. A limpeza feita aqui vai fundo, desobstrui os poros e deixa a pele respirando de verdade.',
      benefits: [
        'Pele limpa, respirando e luminosa',
        'Controle de cravos e oleosidade',
        'Potencializa a absorção de ativos',
        'Essencial para a saúde da pele a longo prazo',
      ],
    },
    {
      id: 'peeling',
      icon: '🌟',
      category: 'rejuvenescimento',
      title: 'Peeling',
      description:
        'Para quem quer atacar manchas, textura irregular ou aquele cansaço acumulado que a pele vai mostrando com o tempo. O protocolo é sempre escolhido com base no seu fototipo e no que você quer melhorar.',
      benefits: [
        'Pele com textura uniformizada e viço',
        'Clareamento de manchas e hiperpigmentação',
        'Renovação celular acelerada',
        'Protocolo seguro para todos os fototipos',
      ],
    },
    {
      id: 'ledterapia',
      icon: '🔵',
      category: 'skincare',
      title: 'LED Azul (Ledterapia)',
      description:
        'Pele com acne inflamada precisa de calma, não de agressão. O LED azul age na bactéria causadora da acne e reduz a inflamação sem irritar. A sessão é indolor e você sai com a pele mais tranquila do que entrou.',
      benefits: [
        'Redução visível de acne e inflamação',
        'Pele mais equilibrada e menos oleosa',
        'Sessão indolor e relaxante',
        'Tecnologia segura, sem exposição UV',
      ],
    },
    {
      id: 'jato-plasma',
      icon: '✨',
      category: 'facial',
      title: 'Jato de Plasma',
      description:
        'Retração e firmeza sem cirurgia. O Jato de Plasma age em regiões específicas com flacidez ou excesso de pele, com um resultado visível e duradouro. Indicação feita só após avaliação, porque cada caso é diferente.',
      benefits: [
        'Firmeza e retração sem cirurgia',
        'Resultado visível e duradouro',
        'Indicação personalizada após avaliação',
        'Alternativa não invasiva ao procedimento cirúrgico',
      ],
    },
    {
      id: 'criolipolise',
      icon: '❄️',
      category: 'corporal',
      title: 'Criolipólise',
      description:
        'Gordura localizada é teimosa. Academia e dieta ajudam, mas há regiões que simplesmente não respondem. A criolipólise age direto na célula de gordura com frio controlado, sem corte e sem repouso obrigatório.',
      benefits: [
        'Redução de gordura localizada resistente',
        'Contorno corporal mais definido',
        'Sem cirurgia, sem repouso',
        'Opções: Tradicional ou em Placas com Pós-Crio',
      ],
      badge: 'Sem Cirurgia',
    },
    {
      id: 'eletrocarbolipolise',
      icon: '🔌',
      category: 'corporal',
      title: 'Eletrocarbolipólise',
      description:
        'Celulite tem graus diferentes e precisa de tratamento específico. A eletrocarbolipólise combina corrente elétrica e CO₂ medicinal para oxigenar os tecidos, melhorar a circulação e atacar a gordura localizada em camadas mais profundas.',
      benefits: [
        'Combate intensivo à celulite',
        'Melhora da circulação e oxigenação tissular',
        'Redução de gordura localizada',
        'Resultados progressivos e acumulativos',
      ],
    },
    {
      id: 'gessoterapia',
      icon: '🪄',
      category: 'corporal',
      title: 'Gessoterapia',
      description:
        'Uma técnica intensa que usa calor e compressão para modelar, firmar e definir o contorno do corpo. Ótima para complementar outros tratamentos corporais e para quem quer resultados mais rápidos no contorno.',
      benefits: [
        'Contorno corporal esculpido e definido',
        'Firmeza e elasticidade aumentadas',
        'Sensação de leveza e bem-estar',
        'Complemento ideal para outros tratamentos corporais',
      ],
    },
    {
      id: 'tratamento-disfuncoes',
      icon: '📋',
      category: 'corporal',
      title: 'Tratamentos de Disfunções Corporais',
      description:
        'Celulite, lipedema e linfedema não são todos iguais. Cada caso pede um olhar específico. Aqui, nenhuma sessão começa antes de uma avaliação detalhada para entender o que está acontecendo no seu corpo de verdade.',
      benefits: [
        'Protocolo individualizado para celulite',
        'Avaliação especializada para lipedema',
        'Direcionamento cuidadoso para linfedema',
        'Nenhuma sessão antes de entender o seu caso',
      ],
    },
  ],
};

/* =====================================================
   DEPOIMENTOS / PROVA SOCIAL
   ===================================================== */
export const socialProofData: SocialProofData = {
  eyebrow: '✦ O que dizem nossas pacientes',
  headline: 'Quem foi, voltou. E indicou.',
  subheadline:
    'Nada fala mais alto do que quem já sentou na cadeira e saiu diferente. Mulheres daqui, que escolheram se cuidar com quem entende de verdade.',
  googleSeal: {
    rating: 5.0,
    reviewCount: '+30',
    url: 'https://g.page/laila-pinheiro-estetica',
  },
  testimonials: [
    {
      id: 'test-04',
      name: 'Yuri Martins',
      initials: 'YM',
      rating: 5,
      text: 'Melhor limpeza de pele que eu já fiz. Muito atenciosa.',
      location: 'Duque de Caxias, RJ',
      date: 'Setembro de 2026',
      featured: true,
    },
    {
      id: 'test-01',
      name: 'Laylla',
      initials: 'L',
      rating: 5,
      text: 'Dignidade renovada com essa limpeza de pele incrível! Profissional excelente, super carismática e atenciosa.',
      location: 'Duque de Caxias, RJ',
      date: 'Agosto de 2026',
      featured: false,
    },
    {
      id: 'test-03',
      name: 'Leila Araujo',
      initials: 'LA',
      rating: 5,
      text: 'Super recomendo!!!! Laila, eu sou tão grata a você. Quando eu operei meu joelho, foi você que me atacou a minha causa, cuidou de mim.... Fiz vários tratamentos para fribose, … Mais',
      location: 'Duque de Caxias, RJ',
      date: 'Maio de 2026',
      featured: false,
    },
    {
      id: 'test-05',
      name: 'viviane luz',
      initials: 'VL',
      rating: 5,
      text: 'Profissional excelente, super dedicada ,,atenciosa e nota mil em tudo que faz .A melhor de todas ,mil estrelas para essa diva maravilhosa .',
      location: 'Duque de Caxias, RJ',
      date: 'Maio de 2026',
      featured: false,
    },
    {
      id: 'test-02',
      name: 'Alice Leocadio Gonçalves',
      initials: 'AG',
      rating: 5,
      text: 'Excelente profissional, onde além do bom bate papo, tem mãos de fada! Super recomendo!',
      location: 'Duque de Caxias, RJ',
      date: 'Abril de 2026',
      featured: false,
    },
    {
      id: 'test-06',
      name: 'Lidiane Rocha',
      initials: 'LR',
      rating: 5,
      text: 'Os melhores tratamentos, com uma esteticista qualificado você não vai encontrar! E sempre tem pacotes tentadores! Amo',
      location: 'Duque de Caxias, RJ',
      date: 'Abril de 2026',
      featured: false,
    },
  ],
};

/* =====================================================
   SOBRE / AUTORIDADE
   ===================================================== */
export const aboutData: AboutData = {
  eyebrow: '✦ Conheça quem vai cuidar de você',
  headline: 'Técnica de ponta com o calor',
  name: 'Laila Pinheiro',
  title: 'Esteticista Especialista em Estética Avançada & Integrativa',
  bioParagraphs: [
    'Laila cresceu na Baixada Fluminense e nunca esqueceu o que é querer se sentir bem sem ter que pegar três conduções para isso. Esteticista especialista, pós-graduada em Estética Avançada e Harmonização Orofacial, ela é o tipo de profissional que ouve antes de indicar qualquer coisa. Cada paciente sai sabendo exatamente o que foi feito, por que foi feito e o que esperar.',
    'Laila está em formação em Biomedicina, e isso faz diferença direta na hora de trabalhar com injetáveis. É o que garante que cada aplicação de toxina botulínica ou bioestimulador seja feita com base científica sólida, respeito à anatomia facial e segurança acima de tudo. Com mais de 8 anos de experiência e centenas de pacientes atendidas, ela não abre mão de uma regra: nenhum protocolo começa sem avaliação.',
    'Aqui você encontra produtos de última geração, atualização técnica constante e um ambiente que foi pensado para você se sentir à vontade. Estética de qualidade real não é luxo de outro lugar. Está aqui, em Caxias.',
  ],
  credentials: [
    { icon: '🎓', text: 'Esteticista Especialista com Pós-Graduação em Estética Avançada' },
    { icon: '🔬', text: 'Graduanda em Biomedicina: base científica para segurança em injetáveis' },
    { icon: '🏆', text: 'Pós-Graduada em Harmonização Orofacial & Pós-Operatório' },
    { icon: '⭐', text: 'Protocolos pensados para valorizar a beleza real de cada mulher' },
    { icon: '📋', text: 'Avaliação gratuita e detalhada antes de qualquer procedimento, sem exceção' },
    { icon: '🌍', text: 'Atendimento no Espaço Delas, no Centro de Duque de Caxias, RJ' },
  ],
  imageSrc: lailaImg,
  imageAlt:
    'Laila Pinheiro, esteticista especialista sorrindo em jaleco branco. Atendimento humanizado em Duque de Caxias, RJ',
  ctaText: 'Conversar sobre meu tratamento',
  ctaHref: WHATSAPP_LINK,
};

/* =====================================================
   FAQ
   ===================================================== */
export const faqData: FAQData = {
  eyebrow: '✦ Suas dúvidas respondidas',
  headline: 'Perguntas frequentes',
  subheadline:
    'A Laila acredita em transparência total. Se sua dúvida não estiver aqui, é só mandar mensagem no WhatsApp.',
  ctaText: 'Ainda com dúvidas? Fale comigo no WhatsApp',
  ctaHref: WHATSAPP_LINK,
  items: [
    {
      id: 'faq-01',
      category: 'segurança',
      question: 'Quem pode aplicar toxina botulínica e preenchedores?',
      answer:
        'Injetáveis exigem conhecimento sólido de anatomia facial. A Laila tem especialização em harmonização facial e está em formação em Biomedicina, o que aprofunda ainda mais seu olhar clínico. Cada aplicação é feita com critério, segurança e foco no resultado que combina com o seu rosto.',
    },
    {
      id: 'faq-02',
      category: 'procedimento',
      question: 'Como funciona a avaliação gratuita?',
      answer:
        'A avaliação é gratuita e sem nenhum compromisso. Na consulta, Laila analisa seu biotipo, histórico de saúde, o que você quer melhorar e o que faz sentido para o seu caso. Ela apresenta as opções com clareza e sem pressão. Você decide com calma.',
    },
    {
      id: 'faq-03',
      category: 'segurança',
      question: 'Os procedimentos são seguros para pele negra e parda?',
      answer:
        'Sim, e com toda a segurança. Laila tem formação e prática específica com fototipos III ao VI, que são peles morenas a negras. Procedimentos como peeling têm protocolo adaptado de concentração e tempo de ação para evitar manchas pós-inflamatórias. Pele escura precisa de profissional que entende das diferenças. Aqui você encontra isso.',
    },
    {
      id: 'faq-04',
      category: 'resultados',
      question: 'Em quanto tempo vejo resultado nos procedimentos faciais?',
      answer:
        'Depende do procedimento. A toxina botulínica começa a agir entre 7 e 14 dias, com resultado completo em 2 semanas e duração de 4 a 6 meses. Preenchedores com ácido hialurônico têm resultado imediato, com durabilidade de 12 a 18 meses. Bioestimuladores como Sculptra têm resultado progressivo de 2 a 3 meses e podem durar até 2 anos.',
    },
    {
      id: 'faq-05',
      category: 'resultados',
      question: 'A criolipólise substitui exercício físico e dieta?',
      answer:
        'Não, e isso é importante deixar claro. A criolipólise trata gordura localizada: aquelas regiões específicas que não cedem mesmo com hábitos saudáveis. Ela complementa bem um estilo de vida ativo. Os resultados se mantêm enquanto o peso for mantido estável.',
    },
    {
      id: 'faq-06',
      category: 'precos',
      question: 'Vocês parcelam os tratamentos?',
      answer:
        'Sim. A maioria dos procedimentos pode ser parcelada em até 12x no cartão de crédito sem juros. Também há pacotes com condições especiais para quem combina mais de um tratamento. Na avaliação, Laila apresenta tudo com clareza antes de qualquer decisão.',
    },
    {
      id: 'faq-07',
      category: 'procedimento',
      question: 'Preciso de cuidados especiais após os procedimentos?',
      answer:
        'Sim, e você vai sair da clínica com tudo explicado por escrito. A regra geral é não expor a pele ao sol direto sem protetor FPS 50+. Para toxina botulínica e preenchedores, evite atividade física intensa e massagens nas primeiras 24 horas. E se surgir qualquer dúvida depois, a Laila está disponível no WhatsApp.',
    },
    {
      id: 'faq-08',
      category: 'agendamento',
      question: 'Como agendar e qual o horário de funcionamento?',
      answer:
        'O agendamento é feito pelo WhatsApp, pelo botão aqui no site. Atendemos de segunda a sexta, das 9h às 19h, e aos sábados das 9h às 14h. A resposta é rápida. Você agenda, confirma e já sabe o dia e horário em poucos minutos.',
    },
  ],
};

/* =====================================================
   FOOTER
   ===================================================== */
export const footerData: FooterData = {
  tagline:
    'Estética avançada com base científica, segurança real e atenção à beleza de cada mulher do jeito que ela é.',
  contactInfo: [
    {
      type: 'address',
      label: 'Av. Dr. Manoel Teles, 77 - Sl 1003 - Centro, Duque de Caxias - RJ, 25010-090',
      href: 'https://www.google.com/maps/search/?api=1&query=Av.+Dr.+Manoel+Teles%2C+77+-+Sl+1003+-+Centro%2C+Duque+de+Caxias+-+RJ%2C+25010-090',
    },
    {
      type: 'whatsapp',
      label: '(21) 99786-7944',
      href: WHATSAPP_LINK,
    },
  ],
  businessHours: [
    { day: 'Segunda-feira', hours: '08:00 – 18:00' },
    { day: 'Terça-feira', hours: '08:00 – 18:00' },
    { day: 'Quarta-feira', hours: '08:00 – 18:00' },
    { day: 'Quinta-feira', hours: '08:00 – 18:00' },
    { day: 'Sexta-feira', hours: '08:00 – 18:30' },
    { day: 'Sábado', hours: '10:00 – 16:00' },
    { day: 'Domingo', hours: 'Fechado' },
  ],
  linkGroups: [
    {
      title: 'Tratamentos',
      links: [
        { label: 'Harmonização Facial', href: '#servicos' },
        { label: 'Toxina Botulínica', href: '#servicos' },
        { label: 'Criolipólise', href: '#servicos' },
        { label: 'Bioestimuladores', href: '#servicos' },
        { label: 'Peeling', href: '#servicos' },
      ],
    },
    {
      title: 'Institucional',
      links: [
        { label: 'Sobre Laila', href: '#sobre' },
        { label: 'Depoimentos', href: '#depoimentos' },
        { label: 'Perguntas Frequentes', href: '#faq' },
        { label: 'Avalie no Google', href: 'https://g.page/laila-pinheiro-estetica', external: true },
      ],
    },
  ],
  socialLinks: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/lailapinheiroestetic',
      ariaLabel: 'Siga Laila Pinheiro Estética no Instagram',
      icon: 'instagram',
    },
    {
      name: 'WhatsApp',
      href: WHATSAPP_LINK,
      ariaLabel: 'Fale com Laila Pinheiro pelo WhatsApp',
      icon: 'whatsapp',
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@lailapinheiroestetica',
      ariaLabel: 'Veja os vídeos de Laila Pinheiro no TikTok',
      icon: 'tiktok',
    },
  ],
copyright: new Date().getFullYear(),
  // Criamos um objeto para os seus dados
  developer: {
    name: 'Tiago Noronha | NLPages',
    url: 'https://www.nlpages.com.br'
  },
  disclaimer:
    'Os resultados dos tratamentos estéticos variam de pessoa para pessoa. Procedimentos realizados por profissional qualificada. As informações deste site têm caráter informativo e não substituem a avaliação presencial.',
};

/* =====================================================
   FLOATING WHATSAPP
   ===================================================== */
export const floatingWhatsAppData: FloatingWhatsAppData = {
  phoneNumber: WHATSAPP_NUMBER,
  message:
    'Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos',
  ariaLabel: 'Abrir conversa no WhatsApp com Laila Pinheiro Estética',
  tooltip: 'Fale comigo pelo WhatsApp',
};

/* =====================================================
   EXPORT PRINCIPAL — Objeto raiz SiteData
   ===================================================== */
export const siteData: SiteData = {
  nav: navItems,
  hero: heroData,
  socialProof: socialProofData,
  services: servicesData,
  about: aboutData,
  faq: faqData,
  footer: footerData,
  floatingWhatsApp: floatingWhatsAppData,
};

export default siteData;
