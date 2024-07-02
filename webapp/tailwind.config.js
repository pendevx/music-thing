/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            keyframes: {
                "spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" }
                }
            },
            animation: {
                "spin": "spin 12s linear infinite"
            }
        },
        screens: {
            "mobile": "640px",
            "tablet": "768px",
            "laptop": "1024px",
            "desktop": "1280px"
        }
    }
}
