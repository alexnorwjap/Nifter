export async function syncPriceWithAPI(price) {
  try {
    const response = await fetch('https://api.livecoinwatch.com/coins/single', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        'x-api-key': '3ff0128b-09b0-4a5a-bffb-d5e634da3f80',
      }),
      body: JSON.stringify({
        currency: 'USD',
        code: 'ETH',
      }),
    });

    const data = await response.json();
    price.textContent = `$ ${(5 * data.rate).toFixed(2)}`;
  } catch (error) {
    console.error('Error:', error);
  }
}
