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
                bgColor: "#141324",
                fontColor: "#979DBC",
                accent: "#B673AF",
                titleBgColor: "#071324",
                titleBarColor: "#80B3B4",
            },
            fontFamily: {
                lexend: ["Lexend", "Arial"],
                jetBrainsMonoNerd: ["JetBrainsMono Nerd", "monospace"],
                ndot: ["NDot", "monospace"],
                montserrat: ["Montserrat", "Arial"],
                minecraft: ["Minecraft"],
                "space-mono": ["Space Mono", "monospace"],
            },
            boxShadow: {
                titlebar: "0px 1px 20px 0px rgba(0, 0, 0, 0.8)",
            },
        },
        screens: {},
    },
    plugins: [],
};
