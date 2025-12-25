import type {Config} from 'tailwindcss';

const pawSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'>
  <path
    d='M21.73,8.22c0-1-0.81-1.82-1.82-1.82s-1.82,0.81-1.82,1.82s0.81,1.82,1.82,1.82S21.73,9.22,21.73,8.22z M17.37,4.86c0-1-0.81-1.82-1.82-1.82s-1.82,0.81-1.82,1.82s0.81,1.82,1.82,1.82S17.37,5.86,17.37,4.86z M12,8.22c0-1-0.81-1.82-1.82-1.82S8.37,7.22,8.37,8.22s0.81,1.82,1.82,1.82S12,9.22,12,8.22z M6.64,4.86c0-1-0.81-1.82-1.82-1.82S3,3.86,3,4.86s0.81,1.82,1.82,1.82S6.64,5.86,6.64,4.86z M20.92,11.33c-2.3-0.56-4.23,1.3-4.23,3.56c0,1.24,0.67,2.37,1.7,3.06c1.55,1.04,3.52,0.87,4.92-0.42c1.23-1.13,1.6-2.79,0.92-4.22C23.63,12.01,22.3,11.33,20.92,11.33z M8.11,11.33c-1.38,0-2.71,0.68-3.31,1.98c-0.68,1.43-0.31,3.09,0.92,4.22c1.4,1.29,3.37,1.46,4.92,0.42c1.03-0.69,1.7-1.82,1.7-3.06c0-2.26-1.92-4.12-4.23-3.56z'
    fill='%23F7D8C8'
    opacity='0.5'
  />
</svg>
`;

const pawPattern = `url("data:image/svg+xml,${pawSvg.replace(/\s+/g, ' ')}")`;

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'paw-pattern': pawPattern,
      },
      fontFamily: {
        body: ['Lora', 'serif'],
        headline: ['Lexend', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'paw-print': {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(15deg)' },
          '100%': { opacity: '0', transform: 'scale(1) rotate(0deg) translateY(-20px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'paw-print': 'paw-print 0.7s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
