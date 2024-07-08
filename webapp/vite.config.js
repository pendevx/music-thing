import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        sourcemap: true,
        target: "esnext",
    },
    server: {
        host: "0.0.0.0",
    },
});
