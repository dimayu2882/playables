// vite.config.js
import { defineConfig } from 'vite';
import { glob } from 'glob';
import { resolve } from 'path';
import handlebars from "vite-plugin-handlebars";
import babel from 'rollup-plugin-babel';
import stylelint from 'vite-plugin-stylelint';
import viteJoinMediaQueries from 'vite-join-media-queries';
import autoprefixer from 'autoprefixer';
import viteImagemin from 'vite-plugin-imagemin';
import webp from 'vite-plugin-webp';

export default defineConfig({
  base: './',
  root: resolve(__dirname, 'src'),
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],

  server: {
    port: 8080,
    host: '0.0.0.0',
    open: true
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/components"),
    }),
    stylelint({
      fix: true,
    }),
    webp({
      onlyWebp: resolve(__dirname, 'src/img'),
      imageType: ['.png', '.jpg']
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      webp: {
        optimizationLevel: 7,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    viteJoinMediaQueries({
      paths2css: ['./dist/css'],
      cssnanoConfig: { preset: 'default' },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
    devSourcemap: true,
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    exclude: [
      'src/components/**',
      'src/img/**',
    ],
    cssCodeSplit: false,
    rollupOptions: {
      input: glob.sync(resolve(__dirname, 'src', '**/*.html')),
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'img/[name][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]';
          }

          return '[name][extname]';
        },
      },
    },
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
});
