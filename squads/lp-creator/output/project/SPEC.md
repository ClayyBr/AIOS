```markdown
# SPEC.md: Landing Page SaaS Fintech de Gestão Empresarial

## Resumo do Projeto
Desenvolvimento de uma Landing Page moderna e minimalista para um SaaS Fintech de gestão empresarial, visando capturar leads qualificados de startups através de uma experiência visual impactante em dark mode.

## Stack Definida
*   **Framework:** Next.js (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** TailwindCSS

## Diretrizes Visuais

### Paleta de Cores
*   **Fundo Principal:** `#0F172A` (Slate-900) - Um tom escuro e profundo de azul acinzentado.
*   **Fundo Secundário/Card:** `#1E293B` (Slate-800) - Um tom ligeiramente mais claro para cards e seções internas.
*   **Texto Principal:** `#E2E8F0` (Slate-200) - Texto claro e legível.
*   **Texto Secundário:** `#94A3B8` (Slate-400) - Para descrições e informações complementares.
*   **Cor de Acento (CTA/Highlight):** `#8B5CF6` (Violet-500) - Um roxo vibrante e sofisticado para botões e elementos interativos.
*   **Bordas/Separadores:** `#334155` (Slate-700)
*   **Sucesso:** `#22C55E` (Green-500)
*   **Erro:** `#EF4444` (Red-500)

### Tipografia (Google Fonts)
*   **Headings (H1, H2, H3):** `Inter` (Bold, Semibold) - Moderna, clean, com boa legibilidade.
*   **Corpo do Texto (P, Li):** `Inter` (Regular, Medium) - Consistente, legível e profissional.

### Estilo dos Componentes
*   **Arredondamento:** Bordas levemente arredondadas (`rounded-lg` ou `rounded-xl` do Tailwind) para um visual suave e moderno.
*   **Sombras:** Sutis e elevadas, utilizando tons da cor de fundo ou do acento para dar profundidade em dark mode (ex: `shadow-lg` com `shadow-violet-900/20`).
*   **Bordas:** Finas, discretas, usando `border` com `border-slate-700` para separar elementos.
*   **Gradientes:** Gradientes sutis podem ser usados em backgrounds abstratos, CTAs ou como detalhe em ícones/ilustrações, utilizando tons da paleta principal e de acento.
*   **Ícones:** Preferencialmente ícones de linha ou preenchidos de estilo minimalista (ex: Lucide, Heroicons), alinhados com a cor de acento ou texto secundário.
*   **Ilustrações:** Vetoriais, minimalistas, utilizando as cores da paleta para representar dashboards e conceitos financeiros.

## Mapa de Seções da Landing Page

1.  **Hero Section:**
    *   **Headline Impactante:** Proposta de valor clara e concisa para startups.
    *   **Sub-headline:** Detalha o benefício principal.
    *   **Call to Action (CTA):** Botão "Experimente Grátis" ou "Solicitar Demonstração".
    *   **Visual:** Mockup de dashboard minimalista, responsivo, com dados fictícios atraentes.
    *   **Prova Social:** Logos de clientes parceiros ou selos de segurança.

2.  **Problema & Solução:**
    *   **Dores das Startups:** Aborda os desafios de gestão financeira e operacional.
    *   **Nossa Solução:** Como o SaaS resolve esses problemas de forma eficiente.
    *   **Visual:** Ícones ou ilustrações que representem os desafios e soluções.

3.  **Funcionalidades Principais:**
    *   **Gestão Financeira:** Controle de fluxo de caixa, despesas, faturamento.
    *   **Automação:** Pagamentos, conciliação bancária, relatórios.
    *   **Relatórios e Insights:** Dashboards personalizáveis, análise de dados.
    *   **Visual:** Cards de funcionalidades com títulos, descrições concisas e ícones ou mini-ilustrações.

4.  **Diferenciais:**
    *   **Tecnologia:** Segurança de dados, IA, integração.
    *   **Foco em Startups:** Recursos específicos para o crescimento de negócios emergentes.
    *   **Experiência do Usuário (UX):** Facilidade de uso, interface intuitiva.
    *   **Visual:** Layout em grid ou lista com descrições e ícones.

5.  **Prova Social / Depoimentos:**
    *   **Testemunhos:** Citações de clientes satisfeitos, com nome, cargo e foto (opcional).
    *   **Logos de Clientes:** Empresas que já utilizam a plataforma.
    *   **Visual:** Carrossel de depoimentos ou grid estático.

6.  **Call to Action (Final):**
    *   **Reforço do CTA:** Último convite à ação antes do footer.
    *   **Visual:** Seção impactante com um fundo diferenciado ou gradiente, e o CTA principal em destaque.

7.  **FAQ (Perguntas Frequentes):**
    *   **Lista de Perguntas:** Aborda dúvidas comuns sobre o serviço, segurança e integração.
    *   **Visual:** Acordeão interativo para exibir/ocultar respostas.

8.  **Footer:**
    *   **Links Essenciais:** Sobre Nós, Termos de Uso, Política de Privacidade, Contato.
    *   **Redes Sociais:** Ícones com links.
    *   **Copyright:** Informações legais.

## Contrato de Componentes React (Exemplos)

*   `components/Navbar.tsx`
*   `components/Hero.tsx`
*   `components/ProblemSolution.tsx`
*   `components/FeaturesGrid.tsx`
*   `components/TestimonialCard.tsx`
*   `components/Differentiators.tsx`
*   `components/CtaSection.tsx`
*   `components/FaqAccordion.tsx`
*   `components/Footer.tsx`
*   `components/Button.tsx` (Botão reutilizável)
*   `components/Input.tsx` (Campo de formulário reutilizável)
*   `components/LogoCloud.tsx`

## Regras de CRO (Otimização de Conversão)

1.  **Clareza da Proposta de Valor:** A headline principal deve comunicar imediatamente o valor do SaaS.
2.  **CTAs Proeminentes:** Múltiplos botões de CTA com cores de acento, estrategicamente posicionados (Hero, meio da página, final).
3.  **Prova Social:** Inclusão de depoimentos e logos de clientes para construir confiança e credibilidade.
4.  **Foco em Benefícios:** Priorizar os benefícios que o SaaS oferece em vez de apenas listar funcionalidades.
5.  **Simplicidade no Formulário:** Se houver formulário para demo/trial, que seja conciso e peça apenas informações essenciais.
6.  **Design Minimalista e Moderno:** Reduzir distrações visuais, manter um layout limpo para focar o usuário no conteúdo e no CTA.
7.  **Mobile Responsiveness:** Experiência otimizada em todos os dispositivos para não perder leads de usuários mobile.
8.  **Gatilhos Mentais:** Utilizar a escassez ou urgência (se aplicável, para ofertas limitadas ou trials) de forma sutil. Gatilho de autoridade e segurança para fintech.
```