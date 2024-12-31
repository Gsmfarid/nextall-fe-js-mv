'use client';
// mui
import { GlobalStyles as GlobalThemeStyles } from '@mui/material';
import palette from './palette';
// ----------------------------------------------------------------------

export default function GlobalStyles() {
  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          textDecoration: 'none',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },

        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          width: '100%',
          height: '100%'
        },

        '#__next': {
          width: '100%',
          height: '100%'
        },

        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            }
          }
        },

        '@keyframes radius': {
          '0%': { borderRadius: '50px', transform: 'scale(1.05)', backgroundColor: palette.light.primary.main },
          '25%': { borderRadius: '80px', transform: 'scale(1.05)', backgroundColor: palette.light.secondary.main },
          '50%': { borderRadius: '50%', transform: 'scale(1)', backgroundColor: palette.light.info.main },
          '75%': { borderRadius: '80px', transform: 'scale(1.0.5)', backgroundColor: palette.light.secondary.main },
          '100%': { borderRadius: '50px', transform: 'scale(1.05)', backgroundColor: palette.light.primary.main }
        },

        '.animate-main': {
          animation: 'radius 3s infinite',
          animationTimingFunction: 'Linear'
        }

        /* HTML: <div class="loader"></div> */
        // .loader {
        //   width: 100px;
        //   height: 45px;
        //   position: relative;
        // }
        // .loader:before,
        // .loader:after {
        //   content: "";
        //   position: absolute;
        //   inset: 0;
        //   background: #000;
        //   box-shadow: 0 0 0 50px;
        //   clip-path: polygon(-50px -20px,10% -12px,20% 0,calc(50% - 15px) 0,calc(50% - 10px) -20px,calc(50% - 8px) -15px,calc(50% + 8px) -15px,calc(50% + 10px) -20px,calc(50% + 15px) 0,80% 0,90% -12px,calc(100% + 50px) -20px,100% 80%,calc(100% + 10px) calc(100% + 10px),60% 100%,50% calc(100% + 15px),40% 100%,-10px calc(100% + 10px),0 80%);
        // }
        // .loader:after {
        //   animation: l9 1s infinite;
        //   transform: perspective(300px) translateZ(0px)
        // }
        // @keyframes l9 {
        //   to {transform:perspective(300px) translateZ(100px);opacity:0}
        // }
        // https://css-loaders.com/pulsing/
        // textarea: {
        //   '&::-webkit-input-placeholder': {
        //     color: theme.palette.text.disabled
        //   },
        //   '&::-moz-placeholder': {
        //     opacity: 1,
        //     color: theme.palette.text.disabled
        //   },
        //   '&:-ms-input-placeholder': {
        //     color: theme.palette.text.disabled
        //   },
        //   '&::placeholder': {
        //     color: theme.palette.text.disabled
        //   }
        // },
      }}
    />
  );
}
