import { useState, useEffect } from "react";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import axios from "axios";
const App = () => {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista total
            const response_items = await axios.get(
                "http://localhost:8000/titles"
            );
            setMovieList(response_items.data);

            // Pegando o Featured Movie

            let originals = response_items.data.filter(
                (i) => i.slug === "originals"
            );
            let randomChoice = Math.floor(
                Math.random() * (originals[0].items.results.length - 1)
            );
            let chosen = originals[0].items.results[randomChoice];
            const response = await axios.get(
                "http://localhost:8000/movie-info",
                { params: { movie_id: chosen.id, movie_type: "tv" } }
            );
            setFeaturedData(response.data);
        };

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        };

        window.addEventListener("scroll", scrollListener);

        return () => {
            window.removeEventListener("scroll", scrollListener);
        };
    }, []);

    return (
        <div className="App">
            <Header black={blackHeader} />
            {featuredData && <FeaturedMovie item={featuredData} />}
            <section className="lists">
                <div className="list-single">
                    {movieList.map((val, key) => {
                        return (
                            <MovieRow
                                key={key}
                                title={val.title}
                                items={val.items}
                            />
                        );
                    })}
                </div>
            </section>
            {movieList.length <= 0 && (
                <div className="loading">
                    <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
                </div>
            )}
        </div>
    );
};

export default App;
