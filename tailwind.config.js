const colors = require('tailwindcss/colors');

const gray = {
    50: 'hsl(216, 33%, 97%)',
    100: 'hsl(214, 15%, 91%)',
    200: 'hsl(210, 16%, 82%)',
    300: 'hsl(211, 13%, 65%)',
    400: 'hsl(211, 10%, 53%)',
    500: 'hsl(211, 12%, 43%)',
    600: 'hsl(209, 14%, 37%)',
    700: 'hsl(209, 18%, 30%)',
    800: 'hsl(209, 20%, 25%)',
    900: 'hsl(210, 24%, 16%)',
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ["Clear Sans"],
            },
            colors: {
                black: '#131a20',

                primary: {
                    50: "#f0e6fc",
                    100: "#E9D8FD",
                    200: "#D6BCFA",
                    300: "#B794F4",
                    400: "#9F7AEA",
                    500: "#805AD5",
                    600: "#6B46C1",
                    700: "#553C9A",
                    800: "#44337A",
                    900: "#322659",
                  },
                gray: {
                    50: "#F7FAFC",
                    100: "#EDF2F7",
                    200: "#E2E8F0",
                    300: "#CBD5E0",
                    400: "#A0AEC0",
                    500: "#718096",
                    600: "#4A5568",
                    700: "#2D3748",
                    800: "#1A202C",
                    900: "#171923",
                  },
                neutral: {
                    50: "#F7FAFC",
                    100: "#EDF2F7",
                    200: "#E2E8F0",
                    300: "#CBD5E0",
                    400: "#A0AEC0",
                    500: "#718096",
                    600: "#4A5568",
                    700: "#2D3748",
                    800: "#1A202C",
                    900: "#171923",
                  },
                  blue: {
                    50: "#f0e6fc",
                    100: "#E9D8FD",
                    200: "#D6BCFA",
                    300: "#B794F4",
                    400: "#9F7AEA",
                    500: "#805AD5",
                    600: "#6B46C1",
                    700: "#553C9A",
                    800: "#44337A",
                    900: "#322659",
                  },
                cyan: colors.cyan,
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            transitionDuration: {
                250: '250ms',
            },
            borderColor: theme => ({
                default: theme('colors.neutral.400', 'currentColor'),
            }),
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ]
};
