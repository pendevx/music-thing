import { Hono } from 'hono'
import Home from "./pages/index";
import { Layout } from './Layout';

const app = new Hono()

const renderPage = (pageComponent: JSX.Element) => {
    return <Layout title="Page">
        {pageComponent}
    </Layout>
}

// Controller
app.get('/', async (c) => {
    return c.html(renderPage(<Home env={c.env} />));
});

export default app;
