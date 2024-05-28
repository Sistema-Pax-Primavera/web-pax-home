export function converterData(dateString) {
  if (!dateString) {
    return '';
  }
  const [year, month, day] = dateString.split('-');
  // Verifica se year, month e day não são nulos ou indefinidos antes de criar a formattedDate
  const formattedDate = (year && month && day) ? `${day}/${month}/${year}` : '';
  return formattedDate;
}

// Função para formatar um Cnpj
export function formatCNPJ(cnpj) {
  const cnpjDigits = cnpj.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  const formattedCNPJ = cnpjDigits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  return formattedCNPJ;
}


// Função para formatar um CEP
export function formatCEP(cep) {
  const cepDigits = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  const formattedCEP = cepDigits.replace(/(\d{5})(\d{3})/, '$1-$2');
  return formattedCEP;
}

// Função para formatar um número de telefone
export function formatarTelefone(telefone) {
  const numeroLimpo = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (numeroLimpo.length === 10) {
    return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 6)}-${numeroLimpo.slice(6)}`;
  } else if (numeroLimpo.length === 11) {
    return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo[2]} ${numeroLimpo.slice(3, 7)}-${numeroLimpo.slice(7)}`;
  } else {
    return telefone; // Retorna o número original se não for um número de telefone válido
  }
}

//Função para formata data e hora
export function converterDataHora(dateTimeString) {
  if (!dateTimeString) {
    return '';
  }

  const [datePart, timePart] = dateTimeString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hour, minute] = timePart.substring(0, 5).split(':');

  // Verifica se year, month, day, hour e minute não são nulos ou indefinidos antes de criar a formattedDateTime
  const formattedDateTime = (year && month && day && hour && minute) ?
    `${day}/${month}/${year} ${hour}:${minute}` :
    '';

  return formattedDateTime;
}

//Função para formata valor adicionando duas casas decimais
export function formatarValor(valor) {
  if (typeof valor !== 'number') {
    return '';
  }

  const valorFormatado = valor.toFixed(2).replace('.', ',');
  return valorFormatado;
}

//Formata data para ISO (yyyy-mm-dd)
export function converterDataParaFormatoISO(dataString) {
  if (!dataString) {
    return '';
  }

  const partes = dataString.split(' '); // Divide a data e a hora, se houver
  const dataPartes = partes[0].split('/'); // Divide a data em dia, mês e ano

  // Verifica se a data está no formato esperado
  if (dataPartes.length !== 3) {
    return '';
  }

  let horaParte = '';
  if (partes.length > 1) {
    horaParte = ` ${partes[1]}`; // Se houver parte da hora, adiciona ao resultado
  }

  const [dia, mes, ano] = dataPartes; // Extrai dia, mês e ano
  const dataFormatoISO = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}${horaParte}`; // Formata a data em formato ISO

  return dataFormatoISO;
}

export function formatCPF(cpf) {
  const cpfDigits = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  const formattedCPF = cpfDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return formattedCPF;
}