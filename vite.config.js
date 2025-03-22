import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/html/*', // Путь к вашим HTML-файлам
          dest: 'html', // Куда копировать в dist
        },
      ],
    }),
  ],
  base: '',
});
