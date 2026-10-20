# Regras de Negócio — Mandato Aberto

## Princípios Fundamentais
1. **Neutralidade Institucional**: O sistema não avalia a qualidade do mandato, não emite notas de desempenho, não utiliza cores com juízo de valor (verde para bom / vermelho para ruim) e não faz inferências sobre corrupção ou alinhamento político.
2. **Exatidão de Cálculos Monetários**: Os valores da Cota Parlamentar (CEAP) são exibidos em formato monetário brasileiro (`R$ 1.234.567,89`) com números tabulares (`tnum`) para evitar distorções visuais.
3. **Tratamento de Dados Ausentes**: 
   - `0`: Zero confirmado.
   - `null` ou ausente: "Sem informação" ou "Ainda não disponível".
   - Nunca substituir falhas de integração por zeros.
4. **Comparação Restrita**: Permite comparar até 3 deputados simultaneamente em tabelas estruturadas lado a lado, destacando diferenças de cobertura e período de exercício quando aplicável.
