// Seleciona elementos
const form = document.getElementById('calculator-form');
const tabelaBody = document.getElementById('tabela-body');
const taxaInput = document.getElementById('taxa');
const principalInput = document.getElementById('principal');
const aporteInput = document.getElementById('aporte');
const tempoInput = document.getElementById('time');
const ctx = document.getElementById('graficoJuros').getContext('2d');

const totalInvestidoEl = document.getElementById('total-investido');
const totalComJurosEl = document.getElementById('total-com-juros');
const jurosAcumuladosEl = document.getElementById('juros-acumulados');

// ==================== Gráfico Inicial ====================
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Total Acumulado',
      data: [],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { title: { display: true, text: 'Mês' } },
      y: { title: { display: true, text: 'R$' }, beginAtZero: true }
    }
  }
});

// ==================== Funções Auxiliares ====================
// Formatar moeda (R$ 1.000,00)
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Formatar inputs de moeda
function aplicarMascaraMoeda(input) {
  input.addEventListener("input", () => {
    let value = input.value.replace(/\D/g, "");
    if (value === "") {
      input.value = "R$ 0,00";
      return;
    }
    value = (parseInt(value, 10) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    input.value = `R$ ${value}`;
  });
}

// Formatar input percentual
function aplicarMascaraPercentual(input) {
  input.addEventListener("input", () => {
    // Mantém exatamente o que o usuário digitar
    let valor = input.value.replace(/[^\d,]/g,''); 
    input.value = valor ? valor + '%' : '';
  });
}

// Aceitar somente números
function aplicarMascaraNumeros(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
}

// Extrair valor numérico de inputs formatados
function extrairNumero(input) {
  return parseFloat(input.value.replace(/\D/g, "")) / 100 || 0;
}

// ==================== Inicialização ====================
document.addEventListener("DOMContentLoaded", () => {
  // Define valores iniciais
  principalInput.value = "R$ 0,00";
  aporteInput.value = "R$ 0,00";

  // Aplica máscaras
  aplicarMascaraMoeda(principalInput);
  aplicarMascaraMoeda(aporteInput);
  aplicarMascaraPercentual(taxaInput);
  aplicarMascaraNumeros(tempoInput);
});

// ==================== Cálculo Principal ====================
form.addEventListener('submit', (event) => {
  event.preventDefault();

  let principal = extrairNumero(principalInput);
  let aporte = extrairNumero(aporteInput);
  let taxa = extrairNumero(taxaInput);
  const tipoTaxa = document.getElementById('tempo').value;
  const anos = parseInt(tempoInput.value) || 0;
  const meses = anos * 12;

  let saldo = principal;
  let jurosAcumulados = 0;
  let totalInvestido = principal;

  // Limpa tabela e gráfico
  tabelaBody.innerHTML = '';
  chart.data.labels = [];
  chart.data.datasets[0].data = [];

  for (let i = 1; i <= meses; i++) {
    // Converte taxa anual p/ mensal
    let taxaMes = tipoTaxa === 'anual' ? Math.pow(1 + taxa, 1 / 12) - 1 : taxa;

    // Calcula juros
    let jurosMes = saldo * taxaMes;

    // Atualiza valores
    saldo += jurosMes + aporte;
    jurosAcumulados += jurosMes;
    totalInvestido += aporte;

    // Cria linha da tabela
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>Mês ${i}${i % 12 === 0 ? ' / ' + Math.ceil(i/12) + 'º ano' : ''}</td>
      <td>${formatarMoeda(totalInvestido)}</td>
      <td>${formatarMoeda(jurosMes)}</td>
      <td>${formatarMoeda(jurosAcumulados)}</td>
      <td>${formatarMoeda(saldo)}</td>
    `;
    tabelaBody.appendChild(tr);

    // Atualiza gráfico
    chart.data.labels.push(i);
    chart.data.datasets[0].data.push(saldo);
  }

  chart.update();

  // Atualiza resultados finais
  totalInvestidoEl.textContent = formatarMoeda(totalInvestido);
  totalComJurosEl.textContent = formatarMoeda(saldo);
  jurosAcumuladosEl.textContent = formatarMoeda(jurosAcumulados);
});
