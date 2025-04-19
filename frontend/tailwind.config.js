/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'grey': 'var(--grey)',
                'grey-light': 'var(--grey-light)',
            },
            maxWidth: {
                'container': '1350px',
            },
            fontSize: {
                'menu': '20px',
            },
            height: {
                'header-bottom': '62px',
            },
            container: {
                center: true,
                padding: '15px',
            },
        },
    },
    plugins: [],
}