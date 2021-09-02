const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    // These paths are just examples, customize them to match your project structure
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto Slab', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.coolGray[900],
                secondary: colors.coolGray[100],
                footer: '#e0e3e8',
            },
            maxWidth: (theme) => ({
                ...theme('spacing'),
            }),
            minWidth: (theme) => ({
                ...theme('spacing'),
            }),

            minHeight: (theme) => ({
                ...theme('spacing'),
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
