/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,txs}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            margin: {
                "15px": "15px",
                "96": "24rem",
                "128": "32rem"
            },
            colors:{
                "dark-purple":"#081A51",
                "light-white":"rgba(255,255,255,0.17)"
            }
        },
    },
    plugins: [require("flowbite/plugin")],
}

