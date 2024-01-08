export function moneyFormat(number: number, allowZero = false) {
    if (typeof number === 'string') {
        number = parseInt(number);
    }

    if (allowZero && number === 0) {
        return 'TBD';
    }

    return new Intl.NumberFormat('en-EL', { style: 'currency', currency: 'EUR' }).format(number);
}
