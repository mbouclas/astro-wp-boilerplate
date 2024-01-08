export function formatString(num: number, suffix: string) {
    return `${new Intl.NumberFormat().format(num)} ${suffix}`;
}
