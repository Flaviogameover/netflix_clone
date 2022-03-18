const PORT = 8000;
const axios = require("axios");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const API_BASE = "https://api.themoviedb.org/3/";
const API_KEY = process.env.API_KEY;

app.get("/titles", async (req, res) => {
    const get_link = async (link) => {
        const request = await axios.get(
            `${API_BASE}${link}api_key=${API_KEY}&language=pt-BR`
        );
        const json = await request.data;
        return json;
    };
    const get_data = async () => {
        const URL = `${API_BASE}discover/tv?with_network=213&api_key=${API_KEY}&language=pt-BR`;
        return [
            {
                slug: "originals",
                title: "Originais do Netflix",
                items: await get_link("discover/tv?with_network=213&"),
            },
            
            {
                slug: "trending",
                title: "Recomendados para Você",
                items: await get_link("trending/all/week?"),
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await get_link('movie/top_rated?')
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await get_link('discover/movie?with_genres=28&')
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await get_link('discover/movie?with_genres=35&')
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await get_link('discover/movie?with_genres=27&')
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await get_link('discover/movie?with_genres=10749&')
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await get_link('discover/movie?with_genres=99&')
            },
            {
                slug: 'animation',
                title: 'Animação',
                items: await get_link('discover/movie?with_genres=16&')
            },
            {
                slug: 'science-fiction',
                title: 'Ficção Científica',
                items: await get_link('discover/movie?with_genres=878&')
            },
        ];
    };

    const result = await get_data();
    res.json(result);
});

app.get("/movie-info", (req, res) => {
    const { movie_id, movie_type } = req.query;
    (async () => {
        const URL = `${API_BASE}${movie_type}/${movie_id}?api_key=${API_KEY}&language=pt-BR`;
        const response = await axios.get(URL);
        res.json(response.data);
    })();
});

app.listen(PORT, console.log("Listening on port " + PORT));
