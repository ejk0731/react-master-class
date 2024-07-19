const BASE_URL = "https://api.coinpaprika.com/v1";

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
