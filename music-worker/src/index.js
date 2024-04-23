export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const key = url.pathname.slice(1);

        const object = await env.MUSIC.get(decodeURI(key));

        if (object === null) {
            return new Response('Object Not Found', { status: 404 });
        }

        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        if (object.range) {
            headers.set("content-range", `bytes ${object.range.offset}-${object.range.end ?? object.size - 1}/${object.size}`);
        }
        const status = object.body ? (request.headers.get("range") !== null ? 206 : 200) : 304;

        return new Response(object.body, {
            headers,
            status
        });
    },
};
