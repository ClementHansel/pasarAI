let cachedRates: Record<string, number>;

    export async function getExchangeRates(): Promise<Record<string, number>> {
    if (cachedRates) return cachedRates;
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await res.json();
    cachedRates = data.rates;
    return cachedRates;
    }   