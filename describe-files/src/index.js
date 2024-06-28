export default {
	async fetch(request, env, ctx) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: corsHeaders,
            });
        }

        const keys = await env.MUSIC.list();
        const { objects } = keys;
        Object.groupBy(objects, x => x.key.substring(0, x.key.lastIndexOf("/")));

		return new Response(JSON.stringify(objects), {
            status: 200,
            headers: corsHeaders
        });
	},
};
