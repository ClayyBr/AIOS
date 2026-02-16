```markdown
# SPEC.md - Landing Page SaaS Fintech de Gestão Empresarial

## Resumo do Projeto
Criação de uma landing page moderna, minimalista e bonita para um SaaS Fintech de gestão empresarial, visando capturar leads e demonstrar o valor da plataforma para startups.

## Stack Definida
*   **Framework:** Next.js (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** TailwindCSS

## Diretrizes Visuais

### Paleta de Cores
*   **Primary Accent (Ações, CTAs):** `#2563EB` (Azul vibrante e profissional)
*   **Secondary Accent (Destaques sutis, ícones):** `#10B981` (Verde fresco e complementar)
*   **Background Claro:** `#F9FAFB` (Branco suave, para seções principais)
*   **Background Escuro (opcional para contraste):** `#1F2937` (Cinza escuro, para seções de destaque)
*   **Texto Principal:** `#111827` (Preto quase absoluto)
*   **Texto Secundário:** `#6B7280` (Cinza médio, para parágrafos e descrições)
*   **Bordas/Divisores:** `#E5E7EB` (Cinza claro)

### Tipografia (Google Fonts)
*   **Fonte Principal (Headings e Body):** `Inter`
    *   Headings: Inter, pesos `semibold` (600) a `bold` (700).
    *   Body: Inter, pesos `regular` (400) a `medium` (500).

### Estilo dos Componentes
*   **Arredondamento:** `rounded-xl` para cartões, botões e elementos maiores. `rounded-lg` para inputs e elementos menores.
*   **Sombras:** `shadow-lg` para cartões e seções de destaque. `shadow-md` para botões e elementos interativos.
*   **Gradientes:** Gradientes sutis (`bg-gradient-to-r from-primary-accent to-secondary-accent`) podem ser usados em CTAs ou backgrounds de seções para adicionar dinamismo minimalista.
*   **Ícones:** Estilo "outline" (contorno) ou "solid" (preenchido) consistente, preferencialmente Heroicons ou um set similar, que complemente o design minimalista.
*   **Animações:** Transições suaves em hover (`transition-all duration-300 ease-in-out`) e animações de entrada de seção leves (`fade-in`, `slide-up`) para enriquecer a experiência do usuário.

## Mapa de Seções

1.  **Hero Section:**
    *   **Título Principal:** Benefício claro e impactante da plataforma.
    *   **Subtítulo:** Explicação concisa do problema que o SaaS resolve para startups.
    *   **Call to Action (CTA):** Botão principal ("Experimente Grátis" ou "Solicite uma Demo").
    *   **Imagem/Vídeo:** Mockup de interface do usuário limpo e atraente da plataforma em ação.
    *   **Prova Social inicial:** Logotipos de empresas conhecidas ou depoimentos curtos.

2.  **Problem/Solution Section:**
    *   **Título:** "Os desafios que sua startup enfrenta."
    *   **Conteúdo:** Pontos de dor comuns na gestão financeira/empresarial de startups.
    *   **Título:** "Como [Nome do SaaS] Resolve."
    *   **Conteúdo:** Breve introdução à solução oferecida pelo SaaS.

3.  **Key Features Section:**
    *   **Título:** "Recursos que Impulsionam seu Crescimento."
    *   **Conteúdo:** 3-4 cards de recursos principais, cada um com ícone, título e descrição detalhada dos benefícios. Exemplos: "Gestão Financeira Simplificada", "Relatórios Inteligentes", "Automação de Processos".
    *   **Visual:** Mockups de telas ou ilustrações minimalistas para cada recurso.

4.  **How It Works / Product Tour Section:**
    *   **Título:** "Como Funciona em 3 Passos Simples."
    *   **Conteúdo:** Seção visualmente guiada mostrando o fluxo de uso principal da plataforma (e.g., "1. Conecte Suas Contas", "2. Visualize Seus Dados", "3. Tome Decisões Inteligentes").
    *   **Visual:** Sequência de screenshots ou micro-interações que simulam a experiência do usuário.

5.  **Testimonials / Social Proof Section:**
    *   **Título:** "O que nossos Clientes Dizem."
    *   **Conteúdo:** Carrossel de depoimentos de clientes satisfeitos (foto, nome, cargo, empresa, citação).
    *   **Visual:** Logotipos de empresas clientes.

6.  **Pricing Section:**
    *   **Título:** "Escolha o Plano Certo Para Sua Startup."
    *   **Conteúdo:** 2-3 planos de preços (Básico, Pro, Enterprise), listando recursos incluídos, preço (mensal/anual), e CTA para cada plano.
    *   **Destaque:** Um plano pode ser destacado como "Mais Popular" ou "Recomendado".

7.  **FAQ Section:**
    *   **Título:** "Perguntas Frequentes."
    *   **Conteúdo:** Acordeão com 5-7 perguntas e respostas comuns sobre o serviço, funcionalidades, preços, etc.

8.  **Final Call to Action (CTA) Section:**
    *   **Título:** "Pronto para Transformar sua Gestão?"
    *   **Subtítulo:** Reforço do benefício final.
    *   **CTA:** Botão principal ("Comece Agora") e um secundário (e.g., "Fale Conosco").

9.  **Footer:**
    *   Links de navegação (Home, Recursos, Preços, Contato).
    *   Links legais (Termos de Uso, Política de Privacidade).
    *   Links para redes sociais.
    *   Informações de contato (endereço, e-mail).
    *   Copyright.

## Contrato de Componentes (React)

*   `Navbar.tsx`
*   `HeroSection.tsx`
*   `FeatureCard.tsx` (reutilizável)
*   `FeaturesSection.tsx`
*   `HowItWorksSection.tsx`
*   `TestimonialCard.tsx` (reutilizável)
*   `TestimonialsSection.tsx`
*   `PricingCard.tsx` (reutilizável)
*   `PricingSection.tsx`
*   `FAQItem.tsx` (reutilizável)
*   `FAQSection.tsx`
*   `CTABanner.tsx` (para a CTA final)
*   `Footer.tsx`
*   `Button.tsx` (componente de botão genérico)
*   `Input.tsx` (componente de input genérico, se houver formulário de contato/newsletter)

## Regras de CRO (Conversion Rate Optimization)

*   **Clareza da Oferta:** O valor do SaaS deve ser imediatamente compreendido na Hero Section e reforçado em todas as seções.
*   **Prova Social:** Logotipos de clientes, depoimentos detalhados e, se aplicável, números (ex: "mais de X startups confiam em nós").
*   **Chamadas para Ação (CTAs) Fortes:** Botões claros, contrastantes e com textos orientados a benefício ("Experimente Grátis", "Otimize sua Gestão").
*   **Hierarquia Visual:** Elementos mais importantes (CTAs, títulos) devem ter destaque visual através de tamanho, cor e contraste.
*   **Foco no Benefício:** Em vez de listar apenas recursos, descrever os benefícios diretos para o usuário (economiza tempo, reduz custos, aumenta a eficiência).
*   **Design Clean e Confiável:** Um layout minimalista e profissional transmite seriedade e facilidade de uso, elementos cruciais para fintechs e startups.
*   **Eliminação de Distrações:** Foco total na jornada do usuário para a conversão, removendo elementos desnecessários.
```