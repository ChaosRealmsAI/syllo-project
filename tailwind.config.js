/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
