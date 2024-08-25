import React, { useEffect } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainComponent from './MainComponent';
import MovieContainer from './MovieContainer';
import axios from 'axios';
import { setMovie, setPopularMovies, setTopMovies, setUpcomingmovies } from '../redux/userSlice';
import SearchMovies from './SearchMovies';

const Browse = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.app.toggle);
  const navigate = useNavigate();
  const movie = useSelector((store) => store.app.movies);
  const popularmovie = useSelector((store) => store.app.popularmovies);
  const topmovies = useSelector((store) => store.app.topmovies);
  const upcomingmovie = useSelector((store) => store.app.upcomingmovie);
  const dispatch = useDispatch();

  const fetchNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2JmNjFlZTAwMjAzNDQ3ZDhlNmU4ZTEwZTY5N2NjMyIsIm5iZiI6MTcyNDQzMjUzOS44NzU4MTQsInN1YiI6IjY2YzhiZmQzN2YwYTg5ODZlNWYyYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4gtneArMYkUJcn6OeMLnlC2jFdrce1dnkO0uGq7byXY'
      }
    };

    try {
      const response = await axios.get(url, options);
      // console.log(response.data.results);
      dispatch(setMovie(response.data.results));
      return response.data; // Return the data if you need it elsewhere
    } catch (error) {
      console.error('error:', error);
    }
  };

  const fetchPopularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2JmNjFlZTAwMjAzNDQ3ZDhlNmU4ZTEwZTY5N2NjMyIsIm5iZiI6MTcyNDQzMjUzOS44NzU4MTQsInN1YiI6IjY2YzhiZmQzN2YwYTg5ODZlNWYyYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4gtneArMYkUJcn6OeMLnlC2jFdrce1dnkO0uGq7byXY'
      }
    };

    try {
      const response = await axios.get(url, options);
      // console.log(response.data.results);
      dispatch(setPopularMovies(response.data.results));
      return response.data; // Return the data if you need it elsewhere
    } catch (error) {
      console.error('error:', error);
    }
  };

  const fetchtopratedMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2JmNjFlZTAwMjAzNDQ3ZDhlNmU4ZTEwZTY5N2NjMyIsIm5iZiI6MTcyNDQzMjUzOS44NzU4MTQsInN1YiI6IjY2YzhiZmQzN2YwYTg5ODZlNWYyYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4gtneArMYkUJcn6OeMLnlC2jFdrce1dnkO0uGq7byXY'
      }
    };

    try {
      const response = await axios.get(url, options);
      // console.log(response.data.results);
      dispatch(setTopMovies(response.data.results));
      return response.data; // Return the data if you need it elsewhere
    } catch (error) {
      console.error('error:', error);
    }
  };

  const fetchupcomingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2JmNjFlZTAwMjAzNDQ3ZDhlNmU4ZTEwZTY5N2NjMyIsIm5iZiI6MTcyNDQzMjUzOS44NzU4MTQsInN1YiI6IjY2YzhiZmQzN2YwYTg5ODZlNWYyYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4gtneArMYkUJcn6OeMLnlC2jFdrce1dnkO0uGq7byXY'
      }
    };

    try {
      const response = await axios.get(url, options);
      // console.log(response.data.results);
      dispatch(setUpcomingmovies(response.data.results));
      return response.data; // Return the data if you need it elsewhere
    } catch (error) {
      console.error('error:', error);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
    fetchPopularMovies();
    fetchtopratedMovies();
    fetchupcomingMovies();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {toggle ? <SearchMovies /> :
          <>
            <MainComponent />
            <MovieContainer />
            <Section title="Now Playing" movies={movie} />
            <Section title="Popular" movies={popularmovie} />
            <Section title="Top Rated" movies={topmovies} />
            <Section title="Upcoming" movies={upcomingmovie} />
          </>}

      </div>
    </div>
  );
};

const Section = ({ title, movies }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((e) => (
        <div key={e.id} className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
            alt={e.title}
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-center py-2 rounded-b-lg">
            <p className="text-sm font-medium">{e.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Browse;
