export async function loadWrapper(arrayPath, wrapp) {
  try {
    const results = await Promise.allSettled(
      arrayPath.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Ошибка: ${response.status}!`);
          return await response.text();
        } catch (err) {
          console.warn(`Не удалось загрузить ${url}:`, err.message);
          return null;
        }
      }),
    );

    const wrapperContent = results.map(({ value }) => value);

    console.log(wrapperContent);
    wrapp.insertAdjacentHTML('beforeend', wrapperContent.join(''));
  } catch (error) {
    console.log(error.message);
  }
}
