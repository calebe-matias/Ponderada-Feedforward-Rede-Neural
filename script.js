// Neural Network Feedforward Implementation
class NeuralNetwork {
    constructor() {
        // Initialize weights (random values between -1 and 1)
        this.weightsInputHidden = this.generateRandomWeights(3, 4);
        this.weightsHiddenOutput = this.generateRandomWeights(4, 2);
        
        // Biases
        this.biasHidden = [0.1, -0.2, 0.3, -0.1];
        this.biasOutput = [0.2, -0.3];
        
        this.setupEventListeners();
        this.createConnections();
        this.updateDisplay();
    }

    generateRandomWeights(inputSize, outputSize) {
        const weights = [];
        for (let i = 0; i < inputSize; i++) {
            weights[i] = [];
            for (let j = 0; j < outputSize; j++) {
                weights[i][j] = (Math.random() * 2 - 1).toFixed(2);
            }
        }
        return weights;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    feedforward(inputs) {
        // Input to Hidden Layer
        const hiddenInputs = [];
        for (let j = 0; j < 4; j++) {
            let sum = this.biasHidden[j];
            for (let i = 0; i < 3; i++) {
                sum += inputs[i] * this.weightsInputHidden[i][j];
            }
            hiddenInputs[j] = this.sigmoid(sum);
        }

        // Hidden to Output Layer
        const outputs = [];
        for (let j = 0; j < 2; j++) {
            let sum = this.biasOutput[j];
            for (let i = 0; i < 4; i++) {
                sum += hiddenInputs[i] * this.weightsHiddenOutput[i][j];
            }
            outputs[j] = this.sigmoid(sum);
        }

        return { hiddenInputs, outputs };
    }

    setupEventListeners() {
        // Input range sliders
        document.getElementById('input1').addEventListener('input', this.updateInputValues.bind(this));
        document.getElementById('input2').addEventListener('input', this.updateInputValues.bind(this));
        document.getElementById('input3').addEventListener('input', this.updateInputValues.bind(this));

        // Buttons
        document.getElementById('calculate').addEventListener('click', this.calculate.bind(this));
        document.getElementById('reset').addEventListener('click', this.reset.bind(this));

        // Node hover effects
        document.querySelectorAll('.node').forEach(node => {
            node.addEventListener('mouseenter', this.showTooltip.bind(this));
            node.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    updateInputValues() {
        const input1 = parseFloat(document.getElementById('input1').value);
        const input2 = parseFloat(document.getElementById('input2').value);
        const input3 = parseFloat(document.getElementById('input3').value);

        // Update display values
        document.querySelector('.input-controls:nth-child(2) .input-display').textContent = input1.toFixed(1);
        document.querySelector('.input-controls:nth-child(3) .input-display').textContent = input2.toFixed(1);
        document.querySelector('.input-controls:nth-child(4) .input-display').textContent = input3.toFixed(1);

        // Update node values
        document.querySelector('[data-node="input-1"] .node-value').textContent = input1.toFixed(1);
        document.querySelector('[data-node="input-2"] .node-value').textContent = input2.toFixed(1);
        document.querySelector('[data-node="input-3"] .node-value').textContent = input3.toFixed(1);
    }

    calculate() {
        const inputs = [
            parseFloat(document.getElementById('input1').value),
            parseFloat(document.getElementById('input2').value),
            parseFloat(document.getElementById('input3').value)
        ];

        // Animate the calculation process
        this.animateCalculation(inputs);
    }

    async animateCalculation(inputs) {
        // Reset all nodes
        document.querySelectorAll('.node').forEach(node => {
            node.classList.remove('active', 'processing');
        });

        // Step 1: Activate input nodes
        await this.delay(300);
        document.querySelectorAll('.input-node').forEach(node => {
            node.classList.add('active');
        });

        // Step 2: Process hidden layer
        await this.delay(800);
        document.querySelectorAll('.input-node').forEach(node => {
            node.classList.remove('active');
        });
        
        document.querySelectorAll('.hidden-node').forEach(node => {
            node.classList.add('processing');
        });

        // Calculate and update hidden layer values
        const result = this.feedforward(inputs);
        
        await this.delay(1000);
        result.hiddenInputs.forEach((value, index) => {
            document.querySelector(`[data-node="hidden-${index + 1}"] .node-value`).textContent = value.toFixed(3);
        });

        // Step 3: Process output layer
        await this.delay(500);
        document.querySelectorAll('.hidden-node').forEach(node => {
            node.classList.remove('processing');
            node.classList.add('active');
        });

        document.querySelectorAll('.output-node').forEach(node => {
            node.classList.add('processing');
        });

        await this.delay(1000);
        result.outputs.forEach((value, index) => {
            document.querySelector(`[data-node="output-${index + 1}"] .node-value`).textContent = value.toFixed(3);
        });

        // Step 4: Finish animation
        await this.delay(500);
        document.querySelectorAll('.node').forEach(node => {
            node.classList.remove('active', 'processing');
        });

        document.querySelectorAll('.output-node').forEach(node => {
            node.classList.add('active');
        });

        await this.delay(1500);
        document.querySelectorAll('.output-node').forEach(node => {
            node.classList.remove('active');
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset() {
        // Reset input values
        document.getElementById('input1').value = 0.8;
        document.getElementById('input2').value = 0.6;
        document.getElementById('input3').value = 0.4;

        // Reset display values
        this.updateInputValues();

        // Reset hidden and output layer values
        document.querySelectorAll('.hidden-node .node-value').forEach(node => {
            node.textContent = '0.000';
        });

        document.querySelectorAll('.output-node .node-value').forEach(node => {
            node.textContent = '0.000';
        });

        // Remove all animations
        document.querySelectorAll('.node').forEach(node => {
            node.classList.remove('active', 'processing');
        });
    }

    createConnections() {
        const svg = document.querySelector('.connections');
        const inputNodes = document.querySelectorAll('.input-node');
        const hiddenNodes = document.querySelectorAll('.hidden-node');
        const outputNodes = document.querySelectorAll('.output-node');

        // Clear existing connections
        svg.innerHTML = '';

        // Input to Hidden connections
        inputNodes.forEach((inputNode, i) => {
            hiddenNodes.forEach((hiddenNode, j) => {
                const line = this.createConnection(inputNode, hiddenNode, `input-hidden-${i}-${j}`);
                svg.appendChild(line);
            });
        });

        // Hidden to Output connections
        hiddenNodes.forEach((hiddenNode, i) => {
            outputNodes.forEach((outputNode, j) => {
                const line = this.createConnection(hiddenNode, outputNode, `hidden-output-${i}-${j}`);
                svg.appendChild(line);
            });
        });
    }

    createConnection(node1, node2, id) {
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();
        const svgRect = document.querySelector('.connections').getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - svgRect.left;
        const y1 = rect1.top + rect1.height / 2 - svgRect.top;
        const x2 = rect2.left + rect2.width / 2 - svgRect.left;
        const y2 = rect2.top + rect2.height / 2 - svgRect.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'connection-line');
        line.setAttribute('id', id);

        return line;
    }

    updateDisplay() {
        // Update connections on window resize
        window.addEventListener('resize', () => {
            setTimeout(() => this.createConnections(), 100);
        });
    }

    showTooltip(event) {
        const node = event.target.closest('.node');
        if (!node) return;

        const nodeData = node.dataset.node;
        const nodeValue = node.querySelector('.node-value').textContent;
        const nodeLabel = node.querySelector('.node-label').textContent;

        let tooltipText = '';
        if (nodeData.includes('input')) {
            tooltipText = `Entrada ${nodeLabel}: ${nodeValue}`;
        } else if (nodeData.includes('hidden')) {
            tooltipText = `Neurônio Oculto ${nodeLabel}: ${nodeValue}`;
        } else if (nodeData.includes('output')) {
            tooltipText = `Saída ${nodeLabel}: ${nodeValue}`;
        }

        // Create or update tooltip
        let tooltip = document.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = tooltipText;
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 30 + 'px';
        tooltip.classList.add('show');
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }
}

// Initialize the neural network when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetwork();
});

// Add some educational information
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler for additional info
    const infoSection = document.querySelector('.info-content');
    const moreInfo = document.createElement('div');
    moreInfo.innerHTML = `
        <p><strong>Função Sigmoid:</strong></p>
        <p>f(x) = 1 / (1 + e^(-x))</p>
        <p>A função sigmoid é usada para introduzir não-linearidade na rede neural, permitindo que ela aprenda padrões complexos.</p>
    `;
    infoSection.appendChild(moreInfo);
});