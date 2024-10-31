import atImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    atImport,
    tailwindcss,
    nested,
    autoprefixer,
  ],
};
