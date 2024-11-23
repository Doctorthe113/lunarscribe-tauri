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
        extend: {},
    },
    plugins: [],
};
