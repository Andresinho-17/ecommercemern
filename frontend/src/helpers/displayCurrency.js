const displayCOPCurrency = (num) => {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: "currency",
        currency: 'COP',
        minimumFractionDigits: 2
    });

    return formatter.format(num);
}

export default displayCOPCurrency;
