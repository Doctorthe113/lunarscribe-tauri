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
                bgColor: "#1e1e2e",
                fontColor: "#cdd6f4",
                accent: "#89b4fa",
                titleBgColor: "#11111b",
                titleBarColor: "#f5e0dc",
                yellow: "#f9e2af",
                teal: "#94e2d5",
                pink: "#f5c2e7",
                green: "#a6e3a1",
                sapphire: "#74c7ec",
                peach: "#fab387",
                red: "#f38ba8",
            },
            fontFamily: {
                lexend: ["Lexend", "Arial"],
                jetBrainsMonoNerd: ["JetBrainsMono Nerd", "monospace"],
                ndot: ["NDot", "monospace"],
                montserrat: ["Montserrat", "Arial"],
                minecraft: ["Minecraft"],
                "space-mono": ["Space Mono", "monospace"],
                playfair: ["Playfair", "serif"],
                "sourgummy": ["Sourgummy", "serif"],
            },
            boxShadow: {
                titlebar: "0px 1px 20px 0px rgba(0, 0, 0, 0.8)",
            },
        },
        screens: {},
    },
    plugins: [],
};
