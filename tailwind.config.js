/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#E9FAF0',
          100: '#D1F4E0',
          600: '#08B94E',
          700: '#02983E',
          800: '#00732E',
          900: '#00481D'
        },
        'gray-soft': {
          10: '#F9F9F9',
          25: '#FAFAFA',
          50: '#F0F1F3',
          100: '#E0E2E7',
          300: '#A3A9B6',
          400: '#858D9D',
          500: '#667085',
          700: '#525D73',
          900: '#404A60'
        },
        slate: {
          700: '#334155'
        },
        red: {
          50: '#FFF1F0',
          100: '#FFE2E0',
          700: '#E5372B',
          800: '#C6190D'
        },
        orange: {
          600: '#FF9500'
        },
        yellow: {
          50: '#FFF9ED',
          600: '#EBA622'
        },
        'gray-2': '#F2F3F7',
        'gray-7': '#656575',
        'night-blue': '#383874',
        blue: {
          50: '#ECF5FF',
          100: '#D7EAFF',
          600: '#1873DE',
          700: '#0053B5'
        },
        purple: {
          50: '#F2EDFF',
          100: '#F3E8FF',
          500: '#7A44FF',
          600: '#6236CC'
        },
        white: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Public Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace']
      },
      fontSize: {
        '2xs': ['11px', '1.04em'],
        xs: ['9.45px', '1.07em'],
        sm: ['12px', '1.75em'],
        md: ['13px', '1.04em'],
        'md-lg': ['14px', '1.47em'],
        base: ['15px', '1.47em'],
        'icon': ['18px', '1'],
        lg: ['18px', '1.1em'],
        xl: ['20px', '1.1em']
      },
      letterSpacing: {
        base: '0.01em'
      },
      spacing: {
        '0.5': '2px',
        '0.75': '3px',
        '1': '4px',
        '1.25': '5px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '13.5px',
        '3.625': '14px',
        '4': '16px',
        '4.5': '18px',
        '5': '20px',
        '5.25': '21px',
        '6': '24px',
        '7': '28px',
        '7.5': '30px',
        '8': '32px',
        '8.75': '35px',
        '9': '36px',
        '12': '48px',
        '12.5': '50px',
        '12.75': '51px',
        '218': '218px',
        '80': '80px'
      },
      borderRadius: {
        xs: '3px',
        pill: '6px',
        sm: '8px',
        md: '12px',
        lg: '15px',
        xl: '16px',
        '2xl': '20px',
        'node': '22.5px',
        'full': '100px'
      },
      boxShadow: {
        'background-md': '0px 16px 18px 0px rgba(0, 0, 0, 0.06)',
        'background-xsm': '0px 2px 2px 2px rgba(0, 0, 0, 0.16)',
        'drop-100': '0px 1px 4px 0px rgba(12, 12, 13, 0.05)',
        'xs': '0px 1px 3px 0px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
        'medium': '0px 2.9px 4px 0px rgba(0, 0, 0, 0.05)',
        'popover-md': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      width: {
        '18': '18px',
        '20': '20px',
        '48': '48px',
        '15': '15px',
        '30.35': '30.35px',
        '36': '36px',
        '39.69': '39.69px',
        '106': '106px',
        '114': '114px',
        '216': '216px',
        '218': '218px',
        '385': '385px',
        '391': '391px',
        '460': '460px',
        '1192': '1192px'
      },
      gridTemplateColumns: {
        'details-graph': '385px minmax(0, 1fr)',
        'popover-chips': '106px 114px 114px'
      },
      height: {
        '18': '18px',
        '20': '20px',
        '32': '32px',
        '48': '48px',
        '15': '15px',
        '30.35': '30.35px',
        '36': '36px',
        '39.69': '39.69px',
        '168': '168px',
        '96': '384px',
        '120': '480px',
        '919': '919px'
      },
      lineHeight: {
        'popover': '1.6923076923076923em',
        '104': '1.0384615384615385em',
        '146': '1.4666666666666666em'
      },
      maxHeight: {
        '120': '480px',
        '919': '919px',
        'panel': 'var(--panel-max-height)'
      },
      maxWidth: {
        '391': '391px',
        '460': '460px',
        'popover-mobile': '90vw'
      },
      minHeight: {
        '96': '384px'
      },
      minWidth: {
        '385': '385px'
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '350': '350ms'
      },
      zIndex: {
        '10': '10',
        '11': '11',
        '100': '100',
        '200': '200',
        '9999': '9999'
      },
      borderWidth: {
        '3': '3px'
      },
      inset: {
        '-16': '-16px'
      }
    }
  },
  plugins: []
}
