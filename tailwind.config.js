/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4',
    'col-span-5', 'col-span-6', 'col-span-7', 'col-span-8',
    'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12',
  ],
  theme: {
    extend: {
      colors: {
        // 主题色 - 映射 CSS 变量
        body: 'var(--bg-body)',
        card: 'var(--bg-card)',
        element: 'var(--bg-element)',
        'element-hover': 'var(--bg-element-hover)',
        accent: 'var(--bg-accent)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'text-on-accent': 'var(--text-on-accent)',
        border: 'var(--border-color)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
      },
      fontFamily: {
        sans: 'var(--font-main)',
        mono: 'var(--font-mono)',
      },
    },
  },
  plugins: [],
}
