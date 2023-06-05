/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const WHITE_PURE = '#FFFFFF';
const RED_BRANDING = '#FF005C';
const RED_BOLD = '#DF0252';
const BLACK_DEFAULT = '#221533';
const BLACK_BG = '#F2F1F5';
const BLUE_BG = '#F1F1FF';
const GREEN_BOLD = '#04B793';
const GREEN = '#05C9A1';
const BLACK_DISABLE = '#868098';
const IRIS = '#A5A6F6';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: WHITE_PURE,
        redBold: RED_BOLD,
        blackDefault: BLACK_DEFAULT,
        blackBg: BLACK_BG,
        blueBg: BLUE_BG,
        greenBold: GREEN_BOLD,
        success: GREEN,
        danger: RED_BRANDING,
        disabled: BLACK_DISABLE,
        iris: IRIS,
      },
      boxShadow: {
        '3xl': '0px 4px 50px #EAEAFD',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn-default': {
          padding: '8px 16px',
          borderRadius: '8px',
          backgroundColor: BLACK_BG,
          fontSize: '14px',
        },
        '.btn-small': {
          padding: '6px 8px',
          borderRadius: '6px',
          backgroundColor: BLACK_BG,
        },
        '.btn-big': {
          padding: '20px',
          fontSize: '18px',
          borderRadius: '12px',
          textTransform: 'uppercase',
        },
        '.btn-outlined': {
          backgroundColor: WHITE_PURE,
          color: BLACK_DEFAULT,
          border: '2px solid #221533',
          '&:hover': {
            backgroundColor: BLACK_DISABLE,
            color: WHITE_PURE,
          },
          '&:focus': {
            backgroundColor: BLACK_DEFAULT,
            color: WHITE_PURE,
          },
        },
        '.btn-success': {
          backgroundColor: GREEN,
          color: '#fff',
          '&:hover': {
            filter: 'drop-shadow(0px 8px 35px rgba(5, 201, 161, 0.3))',
          },
          '&:focus': {
            backgroundColor: GREEN_BOLD,
          },
        },
        '.btn-danger': {
          backgroundColor: RED_BRANDING,
          color: '#fff',
          '&:hover': {
            filter: 'drop-shadow(0px 8px 35px rgba(255, 0, 92, 0.3));',
          },
          '&:focus': {
            backgroundColor: RED_BOLD,
          },
        },
        '.btn-disabled': {
          backgroundColor: BLACK_DISABLE,
          color: '#fff',
          '&:focus': {
            backgroundColor: BLACK_DISABLE,
          },
        },
      });
    }),
  ],
};
