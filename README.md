# Ponderada - Feedforward de Rede Neural (Semana 07)

## 1) Contexto e representação (Bag-of-Words)

Vocabulário e ordem das features:

1. **libras**
2. **legenda**
3. **descrição**
4. **leitor\_tela**
5. **deficiência**

Cada frase vira um vetor binário $x\in\{0,1\}^5$ (1 = palavra presente; 0 = ausente):

* **P1** = $[1,\,1,\,0,\,0,\,1]$
* **P2** = $[0,\,0,\,1,\,1,\,1]$
* **P3** = $[1,\,1,\,1,\,0,\,0]$

---

## 2) Rede (1ª camada) — Pesos e vieses

**Neurônio A (auditiva)**

* Pesos $w_A = [0.8,\; 0.6,\; 0.2,\; 0.1,\; 0.5]$
* Viés $b_A = 0.1$

**Neurônio B (visual)**

* Pesos $w_B = [0.2,\; 0.4,\; 0.9,\; 0.7,\; 0.3]$
* Viés $b_B = -0.2$

**Saída linear** (pré-ativação) de um neurônio:

$$
z = w\cdot x + b \;=\; \sum_{i=1}^{5} w_i\,x_i + b
$$

**Ativação sigmoide** (probabilidade):

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

---

## 3) Cálculos — Passo a passo

### 3.1) Frase P1 = $[1,1,0,0,1]$

**Neurônio A (auditiva)**

$$
\begin{aligned}
z_A(P1) &= 0.8(1)+0.6(1)+0.2(0)+0.1(0)+0.5(1)+0.1 \\
        &= 0.8 + 0.6 + 0 + 0 + 0.5 + 0.1 \\
        &= 2.0 \\
\sigma(z_A(P1)) &\approx \sigma(2.0) \approx 0.8808
\end{aligned}
$$

**Neurônio B (visual)**

$$
\begin{aligned}
z_B(P1) &= 0.2(1)+0.4(1)+0.9(0)+0.7(0)+0.3(1) - 0.2 \\
        &= 0.2 + 0.4 + 0 + 0 + 0.3 - 0.2 \\
        &= 0.7 \\
\sigma(z_B(P1)) &\approx \sigma(0.7) \approx 0.6682
\end{aligned}
$$

---

### 3.2) Frase P2 = $[0,0,1,1,1]$

**Neurônio A (auditiva)**

$$
\begin{aligned}
z_A(P2) &= 0.8(0)+0.6(0)+0.2(1)+0.1(1)+0.5(1)+0.1 \\
        &= 0 + 0 + 0.2 + 0.1 + 0.5 + 0.1 \\
        &= 0.9 \\
\sigma(z_A(P2)) &\approx \sigma(0.9) \approx 0.7110
\end{aligned}
$$

**Neurônio B (visual)**

$$
\begin{aligned}
z_B(P2) &= 0.2(0)+0.4(0)+0.9(1)+0.7(1)+0.3(1) - 0.2 \\
        &= 0 + 0 + 0.9 + 0.7 + 0.3 - 0.2 \\
        &= 1.7 \\
\sigma(z_B(P2)) &\approx \sigma(1.7) \approx 0.8455
\end{aligned}
$$

---

### 3.3) Frase P3 = $[1,1,1,0,0]$

**Neurônio A (auditiva)**

$$
\begin{aligned}
z_A(P3) &= 0.8(1)+0.6(1)+0.2(1)+0.1(0)+0.5(0)+0.1 \\
        &= 0.8 + 0.6 + 0.2 + 0 + 0 + 0.1 \\
        &= 1.7 \\
\sigma(z_A(P3)) &\approx \sigma(1.7) \approx 0.8455
\end{aligned}
$$

**Neurônio B (visual)**

$$
\begin{aligned}
z_B(P3) &= 0.2(1)+0.4(1)+0.9(1)+0.7(0)+0.3(0) - 0.2 \\
        &= 0.2 + 0.4 + 0.9 + 0 + 0 - 0.2 \\
        &= 1.3 \\
\sigma(z_B(P3)) &\approx \sigma(1.3) \approx 0.7858
\end{aligned}
$$

---

## 4) Resultados (tabela-resumo)

| Frase  | Vetor $[libras,\;legenda,\;descrição,\;leitor\_tela,\;deficiência]$ | $z_A$ | $\sigma(z_A)$ | $z_B$ | $\sigma(z_B)$ |
| ------ | ------------------------------------------------------------------- | ----: | ------------: | ----: | ------------: |
| **P1** | \[1, 1, 0, 0, 1]                                                    | 2.000 |     **0.881** | 0.700 |     **0.668** |
| **P2** | \[0, 0, 1, 1, 1]                                                    | 0.900 |     **0.711** | 1.700 |     **0.846** |
| **P3** | \[1, 1, 1, 0, 0]                                                    | 1.700 |     **0.846** | 1.300 |     **0.786** |

> (Arredondei para 3 casas decimais nas probabilidades.)

---

## 5) Interpretação

* **Neurônio A (auditiva)** foca em **libras** (0.8) e **legenda** (0.6).

  * **P1**: muito forte em A (0.881) — tem *libras* e *legenda*.
  * **P2**: razoável (0.711) — sobe por *descrição*, *leitor\_tela*, *deficiência* com pesos menores + viés.
  * **P3**: forte (0.846) — combina *libras*, *legenda* e *descrição*.

* **Neurônio B (visual)** é fortemente “puxado” por **descrição** (0.9) e **leitor\_tela** (0.7).

  * **P1**: moderado (0.668) — sem *descrição* e *leitor\_tela*, sobe pouco.
  * **P2**: muito forte (0.846) — tem *descrição* + *leitor\_tela*.
  * **P3**: alto-moderado (0.786) — tem *descrição*, mas não *leitor\_tela*.

**Se adotar um limiar simples de 0,70 para “positivar”:**

* **P1**: Auditiva ✅ (0.881), Visual ⚪ (0.668 \~ limítrofe).
* **P2**: Auditiva ✅ (0.711), Visual ✅ (0.846).
* **P3**: Auditiva ✅ (0.846), Visual ✅ (0.786).

> **Leitura final por frase**
>
> * **P1**: muito boa para **acessibilidade auditiva**; sinais moderados para **visual**.
> * **P2**: forte para **visual** (descrição/leitor de tela) e também **auditiva** aceitável.
> * **P3**: **bem balanceada**, alta para **auditiva** e boa para **visual**.

---

## 6) Gráfico explicativo (Mermaid)

```mermaid
graph LR
  subgraph Input[Vocabulário (Bag-of-Words)]
    LBR[libras (x1)]
    LGD[legenda (x2)]
    DSC[descrição (x3)]
    LTR[leitor_tela (x4)]
    DEF[deficiência (x5)]
  end

  subgraph Layer1[1ª Camada Densa (2 neurônios)]
    A[Neurônio A (auditiva)\n w=[0.8, 0.6, 0.2, 0.1, 0.5]\n b=0.1]
    B[Neurônio B (visual)\n w=[0.2, 0.4, 0.9, 0.7, 0.3]\n b=-0.2]
  end

  subgraph Activation[Ativação]
    SA[σ(z_A) → prob. auditiva]
    SB[σ(z_B) → prob. visual]
  end

  LBR -->|0.8| A
  LGD -->|0.6| A
  DSC -->|0.2| A
  LTR -->|0.1| A
  DEF -->|0.5| A

  LBR -->|0.2| B
  LGD -->|0.4| B
  DSC -->|0.9| B
  LTR -->|0.7| B
  DEF -->|0.3| B

  A --> SA
  B --> SB
```

---

## 7) Conclusão (em linguagem de negócio)

* O **Neurônio A** responde principalmente a **Libras** e **legendas**, sinalizando **acessibilidade auditiva**.
* O **Neurônio B** responde a **descrição** e **leitor de tela**, sinalizando **acessibilidade visual**.
* Para as três frases, temos indicações fortes de acessibilidade em pelo menos uma dimensão; **P2 e P3** sugerem **boas práticas multimodais** (auditiva + visual).
* Esse tipo de leitura ajuda times de conteúdo e produto a checarem se uma comunicação cobre **diferentes necessidades de PCDs**, priorizando onde reforçar (ex.: incluir descrição de imagem quando B estiver baixo).

---

### Quer praticar mais?

Se quiser, te passo **novos vetores** (mudando as palavras presentes) e você calcula os $z$ e $\sigma(z)$. A gente confere juntos e discute como cada termo “puxa” cada neurônio.
