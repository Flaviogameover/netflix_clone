import "./MovieRow.css";
import { useState } from "react";
import Tmdb from "./Tmdb";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export default (props) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.floor(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    };

    const handleRightArrow = () => {
        let x = scrollX - Math.floor(window.innerWidth / 2);
        let listW = props.items?.results.length * 150;
        if (window.innerWidth - listW > x) {
            x = window.innerWidth - listW - 60;
        }
        setScrollX(x);
    };

    return (
        <div className="movie-row">
            <h2>{props.title}</h2>
            <div onClick={handleLeftArrow} className="movie-row-left">
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div onClick={handleRightArrow} className="movie-row-right">
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movie-row-listarea">
                <div
                    className="movie-row-list"
                    style={{
                        marginLeft: scrollX,
                        width: props.items?.results.length * 150,
                    }}
                >
                    {props.items?.results.map((item, key) => {
                        return (
                            <div key={key} className="movie-row-item">
                                <img
                                    alt={item.original_title}
                                    src={Tmdb.BaseImageUrl(
                                        "w300",
                                        item.poster_path
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
