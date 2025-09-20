# Ponderada - Feedforward de Rede Neural (Semana 07)

## Contexto do Enunciado

Foi proposta à turma uma Ponderada de Feedforward de Redes Neurais na aula de Funções de Ativação (Semana 07). Devemos calcular a saída da primeira camada de uma rede neural que utiliza Bag-of-Words (BoW) para classificar se um trecho de texto apresenta indícios de acessibilidade auditiva e/ou acessibilidade visual. O vocabulário do BoW contém cinco termos, nesta ordem: libras, legenda, descrição, leitor\_tela e deficiência. Cada frase é representada como um vetor binário de cinco posições, indicando presença (1) ou ausência (0) de cada palavra do vocabulário.

* P1 = \[1, 1, 0, 0, 1]
* P2 = \[0, 0, 1, 1, 1]
* P3 = \[1, 1, 1, 0, 0]

A primeira camada da rede possui dois neurônios. O Neurônio A está calibrado para detectar acessibilidade auditiva (por exemplo, Libras e legendas), enquanto o Neurônio B está calibrado para acessibilidade visual (por exemplo, descrições de imagem e compatibilidade com leitores de tela). Cada neurônio possui um vetor de pesos (um peso por palavra do vocabulário) e um bias (viés). Após a soma ponderada com o bias, aplicamos a função sigmoide para obter uma probabilidade entre 0 e 1.

---

## Análise da Rede
A fórmula para a saída linear $z$ de cada neurônio, segundo o auto-estudo, é dada por:

$$
z = w \cdot x + b = \sum_{i=1}^{5} w_i x_i + b,
$$

em que $x$ é o vetor BoW da frase, $w$ é o vetor de pesos do neurônio e $b$ é o bias.

Em seguida, aplicamos a sigmoide:

$$
\sigma(z) = \frac{1}{1 + e^{-z}},
$$

que mapeia qualquer número real $z$ para o intervalo $(0,1)$.

Os pesos e biases informados são:

* Neurônio A (auditiva): $w_A = [0.8,\; 0.6,\; 0.2,\; 0.1,\; 0.5]$, $b_A = 0.1$.
  Já dá pra observar que as palavras libras (0.8) e legenda (0.6) têm maior peso, o que faz sentido para acessibilidade auditiva.

* Neurônio B (visual): $w_B = [0.2,\; 0.4,\; 0.9,\; 0.7,\; 0.3]$, $b_B = -0.2$.
  Aqui, descrição (0.9) e leitor\_tela (0.7) têm maior peso, o que tmabém faz sentido.

---

## Cálculo

Cálculo de $z$ e $\sigma(z)$ para cada frase e cada neurônio:

### P1 = $[1, 1, 0, 0, 1]$

Neurônio A (auditiva)

$$
\begin{aligned}
z_A(P1) &= 0.8(1)+0.6(1)+0.2(0)+0.1(0)+0.5(1)+0.1 \\
        &= 0.8 + 0.6 + 0 + 0 + 0.5 + 0.1 \\
        &= 2.0 \\
\sigma(z_A(P1)) &\approx \frac{1}{1+e^{-2.0}} \approx 0.8808
\end{aligned}
$$

Neurônio B (visual)

$$
\begin{aligned}
z_B(P1) &= 0.2(1)+0.4(1)+0.9(0)+0.7(0)+0.3(1) - 0.2 \\
        &= 0.2 + 0.4 + 0 + 0 + 0.3 - 0.2 \\
        &= 0.7 \\
\sigma(z_B(P1)) &\approx \frac{1}{1+e^{-0.7}} \approx 0.6682
\end{aligned}
$$

### P2 = $[0, 0, 1, 1, 1]$

Neurônio A (auditiva)

$$
\begin{aligned}
z_A(P2) &= 0.8(0)+0.6(0)+0.2(1)+0.1(1)+0.5(1)+0.1 \\
        &= 0 + 0 + 0.2 + 0.1 + 0.5 + 0.1 \\
        &= 0.9 \\
\sigma(z_A(P2)) &\approx \frac{1}{1+e^{-0.9}} \approx 0.7110
\end{aligned}
$$

Neurônio B (visual)

$$
\begin{aligned}
z_B(P2) &= 0.2(0)+0.4(0)+0.9(1)+0.7(1)+0.3(1) - 0.2 \\
        &= 0 + 0 + 0.9 + 0.7 + 0.3 - 0.2 \\
        &= 1.7 \\
\sigma(z_B(P2)) &\approx \frac{1}{1+e^{-1.7}} \approx 0.8455
\end{aligned}
$$

### P3 = $[1, 1, 1, 0, 0]$

Neurônio A (auditiva)

$$
\begin{aligned}
z_A(P3) &= 0.8(1)+0.6(1)+0.2(1)+0.1(0)+0.5(0)+0.1 \\
        &= 0.8 + 0.6 + 0.2 + 0 + 0 + 0.1 \\
        &= 1.7 \\
\sigma(z_A(P3)) &\approx \frac{1}{1+e^{-1.7}} \approx 0.8455
\end{aligned}
$$

Neurônio B (visual)

$$
\begin{aligned}
z_B(P3) &= 0.2(1)+0.4(1)+0.9(1)+0.7(0)+0.3(0) - 0.2 \\
        &= 0.2 + 0.4 + 0.9 + 0 + 0 - 0.2 \\
        &= 1.3 \\
\sigma(z_B(P3)) &\approx \frac{1}{1+e^{-1.3}} \approx 0.7858
\end{aligned}
$$

---

## Resultados

As probabilidades finais (após a sigmoide) para cada frase e cada neurônio ficaram:

| Frase  | Vetor $[libras,\;legenda,\;descrição,\;leitor\_tela,\;deficiência]$ | $z_A$ | $\sigma(z_A)$ | $z_B$ | $\sigma(z_B)$ |
| ------ | ------------------------------------------------------------------- | ----: | ------------: | ----: | ------------: |
| P1 | \[1, 1, 0, 0, 1]                                                    | 2.000 |     0.881 | 0.700 |     0.668 |
| P2 | \[0, 0, 1, 1, 1]                                                    | 0.900 |     0.711 | 1.700 |     0.846 |
| P3 | \[1, 1, 1, 0, 0]                                                    | 1.700 |     0.846 | 1.300 |     0.786 |


A seguir, pedi para o ChatGPT gerar um diagrama da rede com os pesos e biases indicados, para ilustrar a estrutura da rede:

```mermaid
graph LR
  %% Entradas (Bag-of-Words)
  subgraph Input
    direction TB
    LBR["libras (x1)"]
    LGD["legenda (x2)"]
    DSC["descrição (x3)"]
    LTR["leitor_tela (x4)"]
    DEF["deficiência (x5)"]
  end

  %% Primeira camada (2 neurônios)
  subgraph Layer1
    direction TB
    A["Neurônio A (auditiva)\nw=[0.8, 0.6, 0.2, 0.1, 0.5]\nb=0.1"]
    B["Neurônio B (visual)\nw=[0.2, 0.4, 0.9, 0.7, 0.3]\nb=-0.2"]
  end

  %% Ativações (sigmoide)
  subgraph Activation
    direction TB
    SA["σ(z_A) → prob. auditiva"]
    SB["σ(z_B) → prob. visual"]
  end

  %% Conexões e pesos para A
  LBR -->|0.8| A
  LGD -->|0.6| A
  DSC -->|0.2| A
  LTR -->|0.1| A
  DEF -->|0.5| A

  %% Conexões e pesos para B
  LBR -->|0.2| B
  LGD -->|0.4| B
  DSC -->|0.9| B
  LTR -->|0.7| B
  DEF -->|0.3| B

  %% Saídas da camada
  A --> SA
  B --> SB
```

---

## Interpretação

 Os resultados fazem muito sentido com o que os pesos mostravam. O Neurônio *A* sobe mais quando a frase contém libras e legenda, o que faz sentido para conteúdos direcionados a deficientes auditivos. Na prática, *P1* apresenta ambos e, por isso, alcança $\sigma(z_A)\approx 0.88$, um valor alto que sugere forte evidência auditiva; para o visual, *P1* fica em torno de 0.67, o que significa sinais mais moderados porque faltaram descrição e leitor\_tela, que são os maiores influenciadores do Neurônio *B*.

Já *P2* traz descrição e leitor\_tela, e por isso o Neurônio B (visual) dispara para $\sigma(z_B)\approx 0.85$, indicando conformidade para acessibilidade visual. Ao mesmo tempo, *P2* também atinge $\sigma(z_A)\approx 0.71$, um valor razoável para auditiva, impulsionado por pesos menores (como deficiência) e pelo bias positivo do neurônio A.

*P3* contém libras, legenda e descrição. Essa composição de ambos os vocabulários eleva tanto o valor do Neurônio A ($\approx 0.85$) quanto o do Neurônio B ($\approx 0.79$), apesar de que, no caso visual, a ausência de leitor\_tela impeça que o valor chegue tão alto quanto em *P2*.