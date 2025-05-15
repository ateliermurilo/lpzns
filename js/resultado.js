function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function calcularIdade(dataNascimento) {
  const [ano, mes, dia] = dataNascimento.split('-').map(Number);
  const nascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let meses = hoje.getMonth() - nascimento.getMonth();
  let dias = hoje.getDate() - nascimento.getDate();
  if (meses < 0 || (meses === 0 && dias < 0)) anos--;
  return anos * 12 + meses + (dias >= 0 ? 0 : -1);
}

function renderizarResultado({ genero, idadeMeses, score }) {
  const container = document.getElementById('resultado-container');
  container.innerHTML = '';

  const idadeMinima = genero === 'Mulher' ? 740 : 776;
  const scoreMinimo = genero === 'Mulher' ? 91 : 96;

  const podeAposentar = idadeMeses >= idadeMinima && score >= scoreMinimo;

  if (podeAposentar) {
    container.innerHTML = `
      <h1 style="color: #28A745;">PARABÉNS</h1>
      <p>Você tem chances de se aposentar pelo INSS!</p>
      <a class="whatsapp" href="https://api.whatsapp.com/send?phone=5551996207789&text=Ol%C3%A1%21+Acabei+de+responder+o+formul%C3%A1rio+no+site+Aposentadoria+Descomplicada+e+obtive++de+chances%2C+gostaria+de+solicitar+gratuitamente+um+c%C3%A1lculo+detalhado+para+verificar+se+j%C3%A1+posso+me+aposentar." target="_blank">QUERO ME APOSENTAR</a>
      <p style="margin-top: 1rem; font-size: 0.8rem;">Seus dados estão seguros</p>
    `;
  } else {
    container.innerHTML = `
      <h1 style="color: #cc0000;">VOCÊ AINDA NÃO PODE SE APOSENTAR</h1>
      <p>De acordo com as suas respostas, você não tem tempo e/ou idade suficiente para se aposentar pelo INSS.</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const genero = getQueryParam('genero');
  const nascimento = getQueryParam('data_nascimento');
  const score = parseInt(getQueryParam('score'));

  console.log({ genero, nascimento, score });

  if (!genero || !nascimento || isNaN(score)) {
    window.location.href = "/erro.html";
    return;
  }

  const idadeMeses = calcularIdade(nascimento);
  renderizarResultado({ genero, idadeMeses, score });
});
