import { html } from 'hono/html'

export const Layout = (props: { title: string; children?: any }) => {
    return html`
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${props.title}</title>
        <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { background: black; }
            a { color: inherit; text-decoration: none; }

            .playing { background: #5e5e5e; color: #f2b200; }
            svg { fill: black; background: transparent; height: 100%; width: auto; }
            #music-icon { animation: spin 12s linear infinite; animation-play-state: paused; }
            :root:has(audio[data-playing="true"]) #music-icon { animation-play-state: running; }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="font-sans">
        ${props.children}
    </body>
</html>`
}
