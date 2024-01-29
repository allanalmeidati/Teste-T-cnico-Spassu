function formatarNumeroParaReal(numero) {
    const opcoesDeFormatacao = {
        style: 'currency',
        currency: 'BRL'
    };

    const formatoNumero = new Intl.NumberFormat('pt-BR', opcoesDeFormatacao);

    return formatoNumero.format(numero);
}

export { formatarNumeroParaReal }
