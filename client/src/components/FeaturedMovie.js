import './FeaturedMovie.css';
import Tmdb from './Tmdb';


export default (props)=>{
    
    let first_air = new Date(props.item.first_air_date);
    let genres = [];
    let description = props.item.overview;
    if(description.length > 200){
        description = description.substring(0, 250) + '...';
    }

    for(let i in props.item.genres){
        genres.push(props.item.genres[i].name);
    }

    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage:`url(${Tmdb.BaseImageUrl('original',props.item.backdrop_path)})`
        }}>
            <div className="featured-overlay-vertical">
                <div className="featured-overlay-horizontal">
                    <div className="featured-name">{props.item.original_name}</div>
                    <div className="featured-info">
                        <div className="featured-points">{props.item.vote_average} pontos</div>
                        <div className="featured-year">{first_air.getFullYear()}</div>
                        <div className="featured-seasons">{props.item.number_of_seasons} Temporada{(props.item.number_of_seasons != 1)? 's' : ''}</div>
                    </div>
                    <div className="featured-description">{description}</div>
                    <div className="featured-buttons">
                        <a href={`/watch/${props.item.id}`}>► Assistir</a>
                        <a href={`/list/add/${props.item.id}`}>+ Minha Lista</a>
                    </div>
                    <div className="featured-genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}