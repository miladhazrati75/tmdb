import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [movieList, setMovieList] = useState({ results: [] });
  const [genreList, setGenreList] = useState({});
  const [releaseGTE, setReleaseGTE] = useState(null);
  const [releaseLTE, setReleaseLTE] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getGenreList();
    getMovieList();
  }, [page]);

  const getMovieList = () => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: "f62f750b70a8ef11dad44670cfb6aa57",
          "release_date.gte": releaseGTE ? releaseGTE : null,
          "release_date.lte": releaseLTE ? releaseLTE : null,
          page,
        },
      })
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getGenreList = () => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: "f62f750b70a8ef11dad44670cfb6aa57",
        },
      })
      .then((res) => {
        setGenreList((prev) => res.data);
      })
      .catch((err) => console.log(err));
  };

  const genresRendering = (genre_ids) => {
    let genres = [];

    genre_ids.map((genreItem, genreIndex) => {
      let genre = genreList.genres.filter((genre) => genreItem == genre.id)[0];
      genres.push(genre.name);
    });
    return genres ? genres.join(" • ") : "No genre specified.";
  };
  return (
    <div>
      <header>
        <div className="header"></div>
        <div className="container pt-16">
          <div className="box-header flex items-center">
            <div className="container">
              <div className="flex justify-around">
                <div className="flex gap-5">
                  <h5>Search by release date:</h5>
                  <input
                    type="date"
                    onChange={(date) => setReleaseGTE(date.target.value)}
                  />
                  <input
                    type="date"
                    onChange={(date) => setReleaseLTE(date.target.value)}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      setPage(1);
                      getMovieList();
                    }}
                    className="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container mt-28">
          <div className="grid grid-cols-3 gap-12">
            {movieList.results.map((item, index) => (
              <Link to={`/movie/${item.id}/details`}>
                <div key={index} className="movie-item flex">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                        : "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg"
                    }
                    className="movie-poster-home"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="ml-3 mt-3 font-bold text-base">
                        {item.title}
                      </h2>
                    </div>
                    <div>
                      <div className="flex flex-row ml-3 mb-5 gap-3 leading-loose">
                        <h5 className="text-sm text-gray-500">
                          <span class="material-symbols-outlined">
                            calendar_month
                          </span>
                        </h5>
                        <h5 className="text-sm text-gray-500">
                          {item.release_date}
                        </h5>
                      </div>
                      <div className="flex flex-row ml-3 mb-5">
                        <h5 className="text-sm text-gray-500">
                          {genresRendering(item.genre_ids)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <div className="container mt-28 mb-28">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row gap-5 justify-center items-center">
              <div
                onClick={() => (page == 1 ? null : setPage((prev) => prev - 1))}
                className={
                  page == 1 ? "text-gray-500" : "text-blue-500 clickable"
                }
              >
                Previous Page
              </div>
              <div className="pipe"></div>
              <div
                onClick={() =>
                  page == movieList.total_pages
                    ? null
                    : setPage((prev) => prev + 1)
                }
                className={
                  page == movieList.total_pages
                    ? "text-gray-500"
                    : "text-blue-500 clickable"
                }
              >
                Next Page
              </div>
            </div>
            <div className="flex flex-row justify-center items-center text-gray-500">
              Showing results {page * 20 + 1 - 20}-{(page + 1) * 20 - 20}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
