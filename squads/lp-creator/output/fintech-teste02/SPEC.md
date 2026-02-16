```markdown
# SPEC.md: Landing Page SaaS Fintech de Gestão Empresarial

## Resumo do Projeto
Uma Landing Page moderna e minimalista em dark mode para um SaaS Fintech de gestão empresarial, focada em capturar leads de startups através de demonstrações ou trials. O objetivo é transmitir confiança, inovação e eficiência.

## Stack Definida
*   **Framework:** Next.js (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** TailwindCSS

## Diretrizes Visuais

### Paleta de Cores
*   **Fundo Principal:** `#0D1117` (Dark Blue Gray - base sólida e sofisticada)
*   **Texto Principal:** `#E6EDF3` (Light Gray - alta legibilidade em fundo escuro)
*   **Texto Secundário/Detalhes:** `#8B949E` (Medium Gray - para informações menos proeminentes)
*   **Accent Primário (Botões/Destaques):** `#00C896` (Vibrant Teal Green - moderno, techy e financeiro)
*   **Accent Secundário (Gradientes Sutis/Detalhes):** `#1D2631` (Darker Gray - para contraste interno e profundidade)
*   **Sucesso:** `#34C759` (Verde claro para feedback positivo)
*   **Erro:** `#FF3B30` (Vermelho para feedback negativo)
*   **Info:** `#0A84FF` (Azul para informações ou avisos)

### Tipografia (Google Fonts)
*   **Headings (H1, H2, H3):** 'Inter' (sans-serif, peso 700 para impacto, 600 para subtítulos)
*   **Body Text (P, Links, UI):** 'Inter' (sans-serif, peso 400 para legibilidade, 500 para destaques)

### Estilo dos Componentes
*   **Arredondamento:** Bordas sutilmente arredondadas (`rounded-lg` a `rounded-xl` no Tailwind) para um toque moderno e amigável, sem perder a seriedade.
*   **Sombras:** Sombras suaves e discretas (ex: `shadow-xl` com cores de sombra muito escuras e transparentes como `shadow-[0_0_20px_rgba(0,0,0,0.5)]`) para dar profundidade e destaque em cards e botões.
*   **Gradientes:** Gradientes sutis, utilizando o `Accent Primário` e `Accent Secundário` ou variações de tons do `Accent Primário`, aplicados a CTAs, cards de destaque ou divisores para um visual premium e tecnológico.
*   **Ícones:** Preferência por ícones de linha ou solid (ex: Lucide Icons ou Heroicons) que se alinhem ao estilo minimalista e clean.
*   **Espaçamento:** Utilização generosa de espaço em branco (`padding`, `margin`) para garantir clareza, respiração visual e um design clean.
*   **Transições:** Transições suaves (`transition-all duration-300 ease-in-out`) em interações (hover em botões, links, aberturas de acordeão) para uma experiência de usuário fluida e responsiva.

## Mapa de Seções da Landing Page

1.  **Hero Section:**
    *   **Conteúdo:** Título principal impactante ("Transforme sua Gestão Financeira. Deixe sua Startup decolar."), subtítulo explicativo conciso, CTA primário claro ("Experimente Grátis" ou "Agende uma Demo").
    *   **Visual:** Imagem ou mock-up animado (vídeo curto) do software em uso, otimizado para dark mode.

2.  **Problema & Solução:**
    *   **Conteúdo:** Breve descrição dos desafios comuns de gestão financeira para startups e como o SaaS oferece uma solução eficiente e inovadora.

3.  **Features em Destaque:**
    *   **Conteúdo:** 3-4 blocos ou cards destacando os principais recursos do software (ex: "Controle de Fluxo de Caixa Inteligente", "Automação de Faturas", "Relatórios Personalizados"). Cada um com ícone relevante, título e breve descrição.

4.  **Prova Social / Confiança:**
    *   **Conteúdo:** Logotipos de empresas clientes (fictícias ou placeholders) e/ou citações de depoimentos com foto e nome/cargo. Indicadores de segurança (ex: "Criptografia de pontos", "Certificação ISO").

5.  **Como Funciona:**
    *   **Conteúdo:** Seção visualmente explicativa (3-4 passos com ícones e texto) sobre a facilidade de uso do software, desde a configuração até a utilização diária.

6.  **Benefícios Aprofundados:**
    *   **Conteúdo:** Detalhamento dos benefícios chave para o usuário (ex: "Economia de Tempo", "Visão Financeira Clara", "Decisões Estratégicas Aprimoradas") em formato de lista ou cards expandidos.

7.  **FAQ (Perguntas Frequentes):**
    *   **Conteúdo:** Lista de perguntas e respostas comuns, implementadas como um componente de acordeão para otimizar espaço.

8.  **CTA Final:**
    *   **Conteúdo:** Reforço do CTA primário com um apelo à ação final, talvez com um formulário de contato simplificado para agendamento de demo.

9.  **Footer:**
    *   **Conteúdo:** Links essenciais (Termos de Serviço, Política de Privacidade), links para redes sociais, informações de copyright e logo.

## Contrato de Componentes (Next.js/React)

*   `Navbar.tsx`: Componente de navegação superior com logo, links principais e CTA secundário (ex: "Login").
*   `Hero.tsx`: Seção principal de boas-vindas com título, subtítulo, CTA e imagem/vídeo ilustrativo.
*   `FeatureCard.tsx`: Componente reutilizável para exibir um recurso, incluindo ícone, título e descrição.
*   `TestimonialCard.tsx`: Componente para exibir um depoimento de cliente, incluindo foto, citação e informações do cliente.
*   `HowItWorksStep.tsx`: Componente reutilizável para um único passo na seção "Como Funciona".
*   `BenefitItem.tsx`: Componente para listar um benefício específico com ícone e texto.
*   `FAQItem.tsx`: Componente de acordeão para uma única pergunta e resposta.
*   `CallToAction.tsx`: Componente de botão ou formulário para chamadas à ação.
*   `Footer.tsx`: Componente de rodapé com links e informações legais.
*   `Layout.tsx`: Componente de layout global que envolve toda a página, incluindo elementos como `<head>` (SEO) e potencialmente a `Navbar` e `Footer`.

## Regras de CRO (Otimização para Conversão)

*   **Clareza da Proposta de Valor:** A mensagem principal no Hero Section deve ser instantaneamente compreensível e relevante para o público-alvo (startups).
*   **Chamadas para Ação (CTAs) Fortes e Visíveis:** Botões de CTA primários devem ser proeminentes, com texto direto e persuasivo ("Experimente Grátis", "Agende uma Demo").
*   **Prova Social e Credibilidade:** Depoimentos, logotipos de clientes e selos de segurança para construir confiança e reduzir a percepção de risco.
*   **Foco nos Benefícios:** Em vez de listar apenas recursos, enfatizar como o SaaS resolve problemas e melhora a vida do usuário.
*   **Minimalismo no Formulário:** Se houver um formulário de contato/demo, mantê-lo com o mínimo de campos possível para reduzir a fricção.
*   **Design Responsivo:** A landing page deve ser totalmente responsiva e otimizada para visualização em qualquer dispositivo (desktop, tablet, mobile) para garantir uma boa experiência em todas as plataformas.
*   **Velocidade de Carregamento:** Otimização de imagens, minificação de código e uso eficiente de recursos para garantir um carregamento rápido da página, essencial para CRO.
```