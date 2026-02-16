```markdown
# SPEC.md: Landing Page SaaS Fintech de Gestão Empresarial

## Resumo do Projeto
Criação de uma landing page moderna, minimalista e em dark mode para um SaaS Fintech de gestão empresarial, visando capturar leads e demonstrar o valor do produto para startups.

## Stack Definida
*   **Framework:** Next.js (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** TailwindCSS

## Diretrizes Visuais

### Paleta de Cores
*   **Background Principal:** `#0A0A0F` (Deep Space Black)
*   **Superfícies/Cards:** `#1A1A22` (Charcoal Gray)
*   **Acento Primário:** `#6C63FF` (Vibrant Violet)
*   **Texto Claro:** `#E0E0E0` (Light Gray)
*   **Texto Secundário/Muted:** `#A0A0A0` (Medium Gray)
*   **Hover/Interativo:** `#8B83FF` (Bright Violet)

### Tipografia (Google Fonts)
*   **Títulos (Headings):** `Montserrat` (para um visual moderno e forte)
*   **Corpo do Texto (Body):** `Inter` (para alta legibilidade e minimalismo)

### Estilo dos Componentes
*   **Bordas:** Arredondamento suave (`rounded-lg` para cards, `rounded-md` para botões e inputs).
*   **Sombras:** Sutis e difusas (`shadow-xl` com cor escura e baixa opacidade, e.g., `shadow-purple-900/20`) para criar profundidade em dark mode.
*   **Gradientes:** Utilização estratégica de gradientes lineares de baixa opacidade (misturando cores da paleta principal e acento) para fundos de seções ou elementos de destaque (CTAs).
*   **Ícones:** Estilo minimalista, linear ou "solid" com preenchimento, em harmonia com as cores da interface.

## Mapa de Seções

1.  **Hero Section:**
    *   **Conteúdo:** Título impactante (headline), subtítulo explicativo, mockups do produto (capturas de tela da interface em dark mode), Call-to-Action primário para "Solicitar Demonstração" ou "Experimentar Grátis".
    *   **Estilo:** Fundo com gradiente sutil ou formas geométricas abstratas.

2.  **Recursos Principais (Features):**
    *   **Conteúdo:** Cards ou blocos destacando 3 a 4 funcionalidades chave do SaaS (ex: Fluxo de Caixa Inteligente, Relatórios Personalizados, Integrações Bancárias). Cada card deve ter um ícone, título e breve descrição.
    *   **Estilo:** Layout de grid ou flexbox, com animações leves ao scroll (fade-in, slide-up).

3.  **Como Funciona (How It Works/Process):**
    *   **Conteúdo:** Ilustração ou lista numerada de 3-4 passos simples que o usuário deve seguir para começar a usar o SaaS.
    *   **Estilo:** Design sequencial, com ícones ou ilustrações simples para cada passo.

4.  **Depoimentos (Testimonials / Social Proof):**
    *   **Conteúdo:** Carrossel ou grid de depoimentos de clientes (startups), incluindo nome, cargo e foto (opcional). Foco em resultados e facilidade de uso.
    *   **Estilo:** Cards de depoimento com bordas sutis e sombras, nome da empresa em destaque.

5.  **Chamada para Ação Final (CTA):**
    *   **Conteúdo:** Título persuasivo ("Revolucione sua Gestão Financeira"), subtítulo com benefícios finais e um Call-to-Action secundário para "Ver Planos" ou "Cadastre-se Agora".
    *   **Estilo:** Seção de destaque, fundo com gradiente forte ou pattern, botão CTA proeminente.

6.  **FAQ (Perguntas Frequentes):**
    *   **Conteúdo:** Lista de perguntas e respostas comuns em formato de acordeão (accordion).
    *   **Estilo:** Clean, com ícones de expansão/contração.

7.  **Footer:**
    *   **Conteúdo:** Links de navegação (Sobre, Privacidade, Termos), informações de contato, ícones de redes sociais.
    *   **Estilo:** Minimalista, em dark mode, texto em `text-muted`.

## Contrato de Componentes
Os seguintes componentes React devem ser criados:

*   `layout/Navbar.tsx`: Navegação principal, com logo e link para CTA (e.g., "Login" ou "Demonstração").
*   `sections/Hero.tsx`: Seção principal de boas-vindas.
*   `sections/Features.tsx`: Seção de funcionalidades com cards.
*   `sections/HowItWorks.tsx`: Seção de processo ou passos.
*   `sections/Testimonials.tsx`: Seção de prova social (pode incluir componente `TestimonialCard.tsx`).
*   `sections/CallToAction.tsx`: Seção final de CTA.
*   `sections/FAQ.tsx`: Seção de perguntas frequentes (pode incluir componente `AccordionItem.tsx`).
*   `layout/Footer.tsx`: Rodapé da página.
*   `ui/Button.tsx`: Botão reutilizável com variantes de estilo.
*   `ui/Input.tsx`: Componente para campos de entrada de texto.
*   `ui/Modal.tsx`: Para formulários de demonstração/cadastro.

## Regras de CRO (Conversion Rate Optimization)
*   **Clareza da Proposta de Valor:** Headline e sub-headline da Hero Section devem comunicar instantaneamente o principal benefício.
*   **Prova Social:** Depoimentos de clientes e, se disponível, logotipos de startups que já utilizam o serviço.
*   **Call to Action Direto:** Botões de CTA claros, visíveis e com texto persuasivo (ex: "Solicitar Demonstração Gratuita").
*   **Visualização do Produto:** Mockups ou vídeos curtos da interface do SaaS em ação para engajar o usuário.
*   **Escassez/Urgência (Opcional):** Se aplicável, "Últimas vagas para trial gratuito" ou "Promoção por tempo limitado". (NÃO usaremos neste projeto inicialmente, foco em valor e clareza).
*   **Foco no Benefício:** Todo o texto deve focar em como o SaaS resolve problemas específicos das startups, não apenas nas funcionalidades.
```