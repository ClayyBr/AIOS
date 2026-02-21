# Arquitetura do Squad CFO - Restaurante

## 🏛️ Hierarquia de Agentes

O Squad CFO opera em uma estrutura hierárquica clara para garantir que a estratégia (Gerente Geral) guie a execução (Especialistas).

```mermaid
graph TD
    User((👤 Dono / Usuário))
    
    subgraph "Master Layer (Estratégia)"
        GG[👔 Gerente Geral]
        noteGG[Orquestração, Análise Cruzada, Dashboards]
    end
    
    subgraph "Specialist Layer (Execução)"
        AL[💰 Arquiteto de Lucro]
        FIN[📊 Financeiro]
        EST[📦 Estoque]
        VEND[🎯 Vendas]
    end

    User -->|Comandos Gerais| GG
    User -.->|Acesso Direto Opcional| AL
    User -.->|Acesso Direto Opcional| FIN
    User -.->|Acesso Direto Opcional| EST
    User -.->|Acesso Direto Opcional| VEND

    GG -->|Solicita Fichas/Preços| AL
    GG -->|Solicita DRE/Relatórios| FIN
    GG -->|Solicita Inventário/Compras| EST
    GG -->|Solicita Campanhas/Promoções| VEND

    %% Dependências Cruzadas
    VEND -.->|Checa Validade| EST
    VEND -.->|Checa Margem| AL
    AL -.->|Base de Custo| EST
    FIN -.->|Dados de Custo| AL
    FIN -.->|Valor de Estoque| EST

    style GG fill:#2c3e50,stroke:#f1c40f,stroke-width:4px,color:white
    style AL fill:#27ae60,stroke:#2ecc71,color:white
    style FIN fill:#2980b9,stroke:#3498db,color:white
    style EST fill:#e67e22,stroke:#d35400,color:white
    style VEND fill:#8e44ad,stroke:#9b59b6,color:white
```

## 📋 Responsabilidades por Agente

### 1. 👔 Gerente Geral (Master)
*   **Função:** Cérebro central. Não faz cálculos manuais, mas entende o todo.
*   **Superpoder:** Análise cruzada (ex: cruzar dados de estoque parado com necessidade de caixa).
*   **Outputs:** Dashboards estratégicos, planos de ação, resolução de conflitos.

### 2. 💰 Arquiteto de Lucro (Engenharia de Menu)
*   **Função:** Garante que cada prato vendido dê lucro.
*   **Tarefas:** Fichas técnicas, Precificação, Engenharia de Cardápio, Análise de CMV Teórico.

### 3. 📊 Financeiro (Controller)
*   **Função:** Cuida da saúde financeira da empresa (macro).
*   **Tarefas:** DRE (Demonstrativo de Resultados), Fluxo de Caixa, Contas a Pagar/Receber, Impostos.

### 4. 📦 Estoque (Operações)
*   **Função:** Garante que não falte nem sobre insumos.
*   **Tarefas:** Registro de Entradas/Saídas, Inventário, Par Stock, Controle de Validade (PVPS).

### 5. 🎯 Vendas (Growth & Revenue)
*   **Função:** Maximiza a receita e a ocupação.
*   **Tarefas:** Campanhas "Raspadinha", RevPASH (Ocupação), Promoções de itens prestes a vencer.
