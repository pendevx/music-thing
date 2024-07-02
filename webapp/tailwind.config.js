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
            // "mobile": { max: "640px" },
            // "tablet": { min: "641px", max: "768px" },
            // "laptop": { min: "769px", max: "1024px" },
            // "desktop": { min: "1280px" }
            "mobile": "0px",
            "tablet": "641px",
            "laptop": "769px",
            "desktop": "1280px"
        }
    }
}
