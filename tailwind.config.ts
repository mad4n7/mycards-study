import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      gridTemplateColumns: {
        '10': 'repeat(10, minmax(0, 1fr))'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

export default config
