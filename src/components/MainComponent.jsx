import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainComponent = () => {
  const movie = useSelector((store) => store.app.movies);

  console.log(movie);

  if (movie.length > 4) {
    const { title, overview, id } = movie[4]; 
    console.log("Title is: " + title); 

    return (
      <div className="relative">
        <VideoBackground  id={id}/>
        <VideoTitle title={title} overview={overview} id={id} />
      </div>
    );
  } else {
    console.log("No movie data available.");
    return null;
  }
}

export default MainComponent
