const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
    apiKey: 'fe50aa21965dca70be37adcee7799fd1',
    apiSecretKey: '0ea2ded49f08206b8b1106e40a8d706b',
    scopes: ['write_publications', 'read_publications', 'write_content', 'read_content'],
    hostName: 'https://6f992e-2.myshopify.com/',
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/api/blog/article/create", (req, res) => {
    let data = JSON.stringify({
        "article": {
            "title": "My New Article",
            "author": "Marwen A. Valeroso",
            "tags": "News Post",
            "body_html": req.body.body_html,
            "published_at": "Thu Aug 16 00:00:00"
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://6f992e-2.myshopify.com/admin/api/2023-07/blogs/103999668544/articles.json',
        headers: {
            'X-Shopify-Access-Token': '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',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
});