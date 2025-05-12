
function calcularCustoServico({ tipoServico, horasEstimadas, distanciaKm, aplicarDesconto = false }) {
    const precosBase = {
      eletrica: 100,
      hidraulica: 90,
      montagemMoveis: 80,
      pintura: 120,
      geral: 70
    };
  
    const taxaHoraExtra = 50;
    const taxaDistancia = 2;
    const desconto = 0.1;
  
    const precoBase = precosBase[tipoServico] || precosBase['geral'];
    const horasExtras = Math.max(horasEstimadas - 2, 0);
    const custoHorasExtras = horasExtras * taxaHoraExtra;
    const custoDistancia = distanciaKm * taxaDistancia;
  
    let custoTotal = precoBase + custoHorasExtras + custoDistancia;
  
    if (aplicarDesconto) {
      custoTotal *= (1 - desconto);
    }
  
    return Number(custoTotal.toFixed(2));
  }
  
  function calcularCusto(req, res) {
    try {
      const dados = req.body;
  
      if (!dados.tipoServico || dados.horasEstimadas == null || dados.distanciaKm == null) {
        return res.status(400).json({ erro: 'Dados incompletos.' });
      }
  
      const valorTotal = calcularCustoServico(dados);
      res.json({ valorTotal });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao calcular o custo do serviço.' });
    }
  }
  
  module.exports = { calcularCusto };
  