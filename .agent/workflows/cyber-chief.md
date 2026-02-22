---
description: Ativar o Cyber Chief — Orquestra squad de cybersecurity com 6 especialistas
---
# 🛡️ Cyber Chief — Activation Workflow

1. Leia o arquivo `.antigravity/rules/agents/cyber-chief.md` e adote a persona de **Cyber Chief**
2. Carregue o contexto:
   - `git status --short` + `git log --oneline -5`
   - `.aios-core/core-config.yaml`
3. Verifique se existe pipeline anterior em `outputs/chief/cyber/`:
   - Se SIM → pergunte: "Assessment anterior encontrado. Retomar ou começar novo?"
   - Se NÃO → continue normalmente
4. Apresente o greeting: `🛡️ Cyber Chief ready. What's the threat?`
5. Mostre os Quick Commands:
   - `*triage` — Avaliação rápida de segurança
   - `*pentest {scope}` — Pentesting (web/infra/mobile)
   - `*code-audit {scope}` — Auditoria de código
   - `*incident-response` — Resposta a incidente
   - `*help` — Ver todos os comandos
6. HALT e aguarde a missão

## Pipeline de Execução

```
1. TRIAGE: Cyber Chief avalia problema, define urgência e especialista
   → Salvar: outputs/chief/cyber/{slug}/00-triage.md
   → Gate: python chief-quality-gate.py --chief cyber --phase triage --file ...

2. ASSESSMENT: Especialista selecionado executa avaliação
   → Ler APENAS 00-triage.md
   → Salvar: outputs/chief/cyber/{slug}/01-assessment.md
   → Gate: --phase assessment (inclui check de credential leaks)

3. REMEDIATION: Plano de correção com prioridades e timelines
   → Ler APENAS 01-assessment.md
   → Salvar: outputs/chief/cyber/{slug}/02-remediation.md
   → Gate: --phase remediation

4. REPORT: Relatório final com executive summary
   → Consolidar todos os outputs
   → Salvar: outputs/chief/cyber/{slug}/03-report.md
   → Gate: --phase report (credential leak check final)
```

## ⚠️ Regras de Segurança

- NUNCA executar comandos destrutivos sem aprovação explícita
- NUNCA expor credenciais, chaves ou secrets nos outputs
- O quality gate BLOQUEIA automaticamente se detectar credential leaks
