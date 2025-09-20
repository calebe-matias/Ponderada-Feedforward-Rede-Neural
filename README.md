# Ponderada-Feedforward-Rede-Neural
Ponderada Semana 07 - Feedforward de Rede Neural

## Descrição

Este projeto apresenta uma demonstração visual e interativa de uma rede neural feedforward implementada com HTML, CSS e JavaScript. A demonstração permite visualizar como os dados fluem através de uma rede neural, desde a camada de entrada até a camada de saída.

## Características da Rede Neural

- **Camada de Entrada**: 3 neurônios (X₁, X₂, X₃)
- **Camada Oculta**: 4 neurônios (H₁, H₂, H₃, H₄)
- **Camada de Saída**: 2 neurônios (Y₁, Y₂)
- **Função de Ativação**: Sigmoid
- **Visualização**: Conexões entre todas as camadas
- **Interatividade**: Controles para ajustar valores de entrada

## Como Executar

### Opção 1: Abrir diretamente no navegador
1. Clone este repositório ou baixe os arquivos
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. A demonstração será carregada automaticamente

### Opção 2: Servidor local (recomendado)
1. Clone este repositório:
   ```bash
   git clone https://github.com/calebe-matias/Ponderada-Feedforward-Rede-Neural.git
   cd Ponderada-Feedforward-Rede-Neural
   ```

2. Execute um servidor HTTP local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (se tiver npx instalado)
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. Abra o navegador e acesse `http://localhost:8000`

## Como Usar

1. **Ajustar Entradas**: Use os controles deslizantes para modificar os valores de entrada (X₁, X₂, X₃)
2. **Calcular Feedforward**: Clique no botão "Calcular Feedforward" para ver a animação do processamento
3. **Visualizar Resultados**: Observe como os valores se propagam através da rede
4. **Resetar**: Use o botão "Resetar" para voltar aos valores iniciais

## Funcionalidades

### Visualização Interativa
- **Neurônios coloridos**: Diferentes cores para cada tipo de camada
- **Animações**: Visualização do fluxo de dados através da rede
- **Conexões**: Linhas representando as conexões entre neurônios
- **Tooltips**: Informações detalhadas ao passar o mouse sobre os neurônios

### Controles
- **Sliders**: Ajuste dinâmico dos valores de entrada
- **Botões**: Calcular feedforward e resetar valores
- **Valores em tempo real**: Atualização imediata dos displays

### Informações Educacionais
- **Explicação da arquitetura**: Detalhes sobre a estrutura da rede
- **Função de ativação**: Informações sobre a função sigmoid
- **Processo feedforward**: Descrição do fluxo de dados

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página e elementos semânticos
- **CSS3**: Estilização, animações e layout responsivo
- **JavaScript**: Lógica da rede neural e interatividade
- **SVG**: Renderização das conexões entre neurônios

## Estrutura dos Arquivos

```
/
├── index.html          # Página principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica da rede neural
└── README.md          # Este arquivo
```

## Conceitos Implementados

### Rede Neural Feedforward
- Propagação direta dos dados
- Múltiplas camadas de neurônios
- Pesos e bias aleatórios
- Função de ativação sigmoid

### Algoritmo
1. **Entrada**: Recebe os valores de entrada
2. **Processamento**: Calcula as ativações da camada oculta
3. **Saída**: Produz os valores finais na camada de saída
4. **Visualização**: Anima todo o processo

## Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móveis (design responsivo)

## Autor

Desenvolvido como parte da Ponderada Semana 07 - Feedforward de Rede Neural
