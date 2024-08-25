import React from 'react';

const VideoTitle = ({ title, overview, id }) => {
  return (
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex flex-col justify-center items-start text-white z-10 p-4">
      <div className="bg-black bg-opacity-50 p-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">
          {overview}
        </p>
        <div>
          <button className="bg-red-600 text-white px-4 py-2 mr-4 rounded hover:bg-red-700 transition duration-200">
            Play
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-200">
            Watch more
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
