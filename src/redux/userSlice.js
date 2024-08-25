import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoading:false,
  movies:[],
  popularmovies:[],
  topmovies:[],
  upcomingmovie:[],
  toggle:false,
  trailer:[],
  searchmovie:[],
  movieName:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.user=action.payload;
    },
    setLoading:(state,action)=>{
      state.isLoading=action.payload
    },
    setMovie:(state,action)=>{
      state.movies=action.payload
    },
    setPopularMovies:(state,action)=>{
      state.popularmovies=action.payload
    },
    setTopMovies:(state,action)=>{
      state.topmovies=action.payload
    },
    setUpcomingmovies:(state,action)=>{
      state.upcomingmovie=action.payload
    },
    setToggle:(state)=>{
      state.toggle=!state.toggle;
    },
    setTrailer:(state,action)=>{
      state.trailer=action.payload
    },
    setSearchmovie:(state,action)=>{
      state.searchmovie=action.payload
    },
    setMoviename:(state,action)=>{
      state.movieName=action.payload
    }
  }
})


export const { setUser,setLoading,setMovie,setPopularMovies,setTopMovies,setUpcomingmovies,setToggle,setTrailer,setSearchmovie,setMoviename} = userSlice.actions

export default userSlice.reducer