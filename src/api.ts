const BASE_URL = "https://api.coinpaprika.com/v1";
const CHART_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";

// async - new way
export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();

  return json;
}

// promise - old way, simple code - but not the correct version for react-query
// export function fetchCoins() {
//   return fetch("https://api.coinpaprika.com/v1/coins").then((response) => {
//     response.json();
//   });
// }

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  const json = await response.json();

  return json;
}

export async function fetchCoinTickers(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  const json = await response.json();

  return json;
}

export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7; // a week ago
  // ohlcv/historical?start=${startDate}&end=${endDate}
  const response = await fetch(`${CHART_BASE_URL}?coinId=${coinId}`);
  const json = await response.json();

  return json;
}
