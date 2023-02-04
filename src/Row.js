import React, { useEffect, useState } from "react";
import instance from "./axios";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row ({ title, fetchUrl, isLargeRow }) {

    const [ movies, setMovies] = useState([]);

    const [ trailerUrl, setTrailerUrl ] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            console.log(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                console.log("::: " + url);
                // https://www.youtube.com/watch?v=XtMThy8QKqU
                // const urlParams = new URL(url).search; // '?v=XtMThy8QKqU'
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v')); // urlParams.get('v') => 'XtMThy8QKqU'
            }).catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) =>
                    <img className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                    key={movie.id}
                    onClick={() => handleClick(movie)} />
                )}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row ;