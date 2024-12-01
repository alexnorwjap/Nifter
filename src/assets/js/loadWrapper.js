export async function loadWrapper(arrayPath, wrapp) {
  try {
    const responses = await Promise.all(arrayPath.map((url) => fetch(url)));
    const wrapperContent = await Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      }),
    );

    wrapp.insertAdjacentHTML('beforeend', wrapperContent.join(''));
  } catch (error) {
    console.log(error);
  }
}
