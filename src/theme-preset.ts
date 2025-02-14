import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const ThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      '50': '#f5f5f6',
      '100': '#e6e6e7',
      '200': '#cfcfd2',
      '300': '#adadb3',
      '400': '#84848c',
      '500': '#71717a',
      '600': '#5a5a60',
      '700': '#4d4c52',
      '800': '#434347',
      '900': '#3c3b3e',
      '950': '#252527',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#000000',
          hoverColor: '{primary.950}',
          activeColor: '{primary.900}',
        },
      },
      dark: {
        primary: {
          color: '#ffffff',
          hoverColor: '{primary.50}',
          activeColor: '{primary.100}',
        },
      },
    },
  },
});
export default ThemePreset;
