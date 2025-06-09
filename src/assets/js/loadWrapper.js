
export async function  loadWrapper(arrayPath, wrapper, initCallbacks) {
  try {
    for(const path of arrayPath) {
      if(Array.isArray(path)
      ) {
        console.log(typeof path);
        await loadWrapper(path, document.querySelector('#page'), initCallbacks)
        continue;
      };
      const response = await fetch(path);
      const data = await response.text();
      wrapper.insertAdjacentHTML('beforeend', data);

      const fileName = path.split('/').pop().replace('.html', '');
      const initCallback = initCallbacks[fileName];

      if(initCallback) {
        await initCallback();
      }

    }
  } catch (error) {
    console.log(error.message);
  }
}