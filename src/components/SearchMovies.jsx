import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setMoviename, setSearchmovie } from '../redux/userSlice';

const SearchMovies = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.app.isLoading);
    const searchmovie = useSelector((store) => store.app.searchmovie);

    const submithandler = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer YOUR_BEARER_TOKEN', // Replace with your actual token
            }
        };
        dispatch(setLoading(true));
        try {
            const response = await axios.get(url, options);
            console.log(response.data.results);
            dispatch(setSearchmovie(response.data.results));
            dispatch(setMoviename(search));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={submithandler} className="flex mb-8 w-full max-w-lg">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search movies"
                    className="px-4 py-2 w-full text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isLoading ? "Loading..." : "Search"}
                </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
                {searchmovie.map((movie) => (
                    <div key={movie.id} className="flex flex-col items-center">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                        <h3 className="mt-2 text-lg font-semibold text-center text-gray-800">
                            {movie.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchMovies;
