import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTrailer } from '../redux/userSlice';

const VideoBackground = ({id}) => {

  const trailer=useSelector((store)=>store.app.trailer);
  // console.log(trailer[0].key);
  const dispatch=useDispatch();

  const fetchvideo = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2JmNjFlZTAwMjAzNDQ3ZDhlNmU4ZTEwZTY5N2NjMyIsIm5iZiI6MTcyNDQzMjUzOS44NzU4MTQsInN1YiI6IjY2YzhiZmQzN2YwYTg5ODZlNWYyYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4gtneArMYkUJcn6OeMLnlC2jFdrce1dnkO0uGq7byXY'
      }
    }

    try {
      const response = await axios.get(url, options);
      // console.log(response.data.results);
      const trailer=response.data.results.filter((item)=>{
        return item.type=='Trailer'
      })

      dispatch(setTrailer(trailer.length>0?trailer[0]:response.data.results[0]));
    } catch (error) {
      console.error('error:', error);
    }

  }

  

  useEffect(()=>{
    fetchvideo();
  },[])


  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-none"
      ></iframe>
    </div>
  );
}

export default VideoBackground;
