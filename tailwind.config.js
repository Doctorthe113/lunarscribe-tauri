/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,t s,jsx,tsx,mdx}",
        "./src/*.{js,t s,jsx,tsx,mdx}",
        "./src/App.jsx",
        "./pages/**/*.{ts,tsx}",
        "./common/components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                writeBgColor: "#0A192E",
                fontColor: "#FBA585",
                accent: "#6DCBC1",
                titleBgColor: "#071324",
            },
            fontFamily: {
                lexend: ["Lexend", "sans-serif"],
                jetBrainsMonoNerd: ["JetBrainsMono Nerd", "monospace"],
                ndot: ["NDot", "monospace"],
                montserrat: ["Montserrat", "sans-serif"],
            },
            boxShadow: {
                titlebar: "0px 1px 20px 0px black",
            },
        },
        screens: {},
    },
    plugins: [],
};
