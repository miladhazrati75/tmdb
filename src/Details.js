import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRatings from 'react-star-ratings';
import { Link, useParams } from "react-router-dom";
import "./Details.css";

function Details() {
  const [movieDetails, setMovieDetails] = useState({ genres: [] });
  const [movieCredits, setMovieCredits] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMovieCredits(id);
    getMovieDetails(id);
  }, [id]);

  const getMovieDetails = (id) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: "f62f750b70a8ef11dad44670cfb6aa57",
        },
      })
      .then((res) => {
        console.log(res.data);
        setMovieDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getMovieCredits = (id) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
          api_key: "f62f750b70a8ef11dad44670cfb6aa57",
        },
      })
      .then((res) => {
        let cast = res.data.cast;
        cast.sort(function (a, b) {
          var keyA = a.popularity,
            keyB = b.popularity;
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
        console.log(cast);
        setMovieCredits(cast);
      })
      .catch((err) => console.log(err));
  };

  const runtimeRendering = (runtime) => {
    let hour = runtime / 60;
    let min = runtime % 60;
    return `${hour >= 1 ? parseInt(hour) + "h " : null}${
      min >= 1 ? parseInt(min) + "m" : null
    }`;
  };

  const genresRendering = (genres) => {
    console.log(genres);
    let genresTitle = [];

    genres.map((genreItem, genreIndex) => {
      genresTitle.push(genreItem.name);
    });
    return genresTitle ? genresTitle.join(", ") : "No genre specified.";
  };
  return (
    <div>
      <header>
        <div className="header"></div>
        <div className="container pt-16">
          <div className="box-header flex items-center">
            <div className="container">
              <div className="flex justify-start items-center ml-10 gap-20">
                <div>
                  <button onClick={()=>window.history.back()} className="button flex items-center">
                    <span class="material-symbols-outlined">
                      keyboard_backspace
                    </span>{" "}
                    Back
                  </button>
                </div>
                <div>
                  <h3 className="movieTitle">{movieDetails.title}</h3>
                  <h5>{movieDetails.tagline}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <section>
        <div className="container mt-28">
          <div className="grid grid-cols-2">
            <div>
              <img
                alt="poster"
                src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                className="movie-poster"
              />
            </div>
            <div className="grid grid-cols-2 mt-8 h-48 gap-3">
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
attach_money
</span> Budget</h2>
              </div>{" "}
              <div dir="rtl">
                <h2 className="text-base text-right">{`${movieDetails.budget?.toLocaleString("en-US",{ style: "currency", currency: "USD" })}`}</h2>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
payments
</span> Revenue</h2>
              </div>{" "}
              <div dir="rtl">
                <h2 className="text-base text-right">{`${movieDetails.revenue?.toLocaleString("en-US",{ style: "currency", currency: "USD" })}`}</h2>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
event
</span> Release Date</h2>
              </div>{" "}
              <div dir="rtl">
                <h2 className="text-base text-right">
                  {movieDetails.release_date}
                </h2>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
movie
</span> Runtime</h2>
              </div>{" "}
              <div dir="rtl">
                <h2 className="text-base text-right">
                  {runtimeRendering(movieDetails.runtime)}
                </h2>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
star
</span> Score</h2>
              </div>{" "}
              <div dir="ltr">
                <h2 className="text-base text-right">
                {movieDetails.vote_average && <StarRatings
          rating={movieDetails.vote_average/2}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="25px"
          name='rating'
        />}

                  <span className="text-sm">
                    {" (" + movieDetails.vote_count + " votes) "}
                  </span>
                </h2>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
category
</span> Genres</h2>
              </div>{" "}
              <div>
                <h2 className="text-base text-right">
                  {genresRendering(movieDetails.genres)}
                </h2>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
link
</span> IMDB Link</h2>
              </div>{" "}
              <div dir="rtl">
                <a
                  href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                  className="text-base text-blue-800 underline"
                >
                  Link
                </a>
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center"><span class="material-symbols-outlined mr-2">
link
</span> Homepage Link</h2>
              </div>{" "}
              <div dir="rtl">
                <a
                  href={movieDetails.homepage}
                  className="text-base text-blue-800 underline"
                >
                  Link
                </a>
              </div>
              <h5 className="font-bold text-base">Presented by:</h5>

              <div dir="ltr" className="grid grid-cols-2 mt-8 gap-3 items-center">
            {movieDetails.production_companies&&movieDetails.production_companies.map((item,index)=>(
                <div className="text-center">
                  <img alt="" src={item.logo_path?`https://image.tmdb.org/t/p/original${item.logo_path}`:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}/>
                  <h5 className="text-base mt-2">{item.name}</h5>
                </div>
              ))}
</div>
            </div>
            
          </div>
        </div>
      </section>
      <section className="container mt-20 mb-28">
        <div >
          <p className="text-justify">{movieDetails.overview}</p>
        </div>
        <div className="container mt-5 mb-28">
          <h5 className="font-bold">Credit:</h5>
          <div className="grid grid-cols-5 gap-10 mt-10 mb-10">
            {movieCredits &&
              movieCredits.map((item, index) => {
                if (index < 10) {
                  return (
                    <div className="flex flex-col gap-2">
                      <img
                        className="movie-poster mx-auto"
                        alt=""
                        src={
                          item.profile_path
                            ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                            : "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg"
                        }
                      />
                      <h5 className="text-base text-center font-bold">
                        {item.original_name}
                      </h5>
                      <h6 className="text-sm text-center text-gray-500">
                        {item.character}
                      </h6>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Details;
