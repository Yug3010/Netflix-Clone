import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
 
  const isLoading=useSelector((store)=>store.app.isLoading);

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch=useDispatch();

  const loginhandler = () => {
    setIsLogin(!isLogin);
  };

  const changehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value
    });
  };

  const navigate=useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (isLogin) {
      // login
      try {
        const res = await axios.post('http://localhost:3000/api/user/login', data,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        console.log(res);
        if(res.data.success)
        {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
          navigate('/browse');
        }
        
      } 
      
      catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
      finally{
        dispatch(setLoading(false));
      }
    } else {
      // register
      dispatch(setLoading(true));
      try {
        const res = await axios.post('http://localhost:3000/api/user/register', data,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        console.log(res);
        if(res.data.success)
        {
          toast.success(res.data.message);
          setIsLogin(true);
          
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
      finally{
        dispatch(setLoading(false));
      }
    }

    setData({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow relative">
        <img
          src="https://www.okynemedialab.com/wp-content/uploads/2019/11/netflix-background-50-Black-1080x608.jpg"
          alt="Netflix background"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="flex items-center justify-center h-full absolute inset-0">
          <form className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg max-w-sm mx-auto" onSubmit={submithandler}>
            <h1 className="text-2xl font-bold text-white mb-6 text-center">{isLogin ? "Login" : "Sign up"}</h1>
            <div className="mb-4">
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={data.name}
                  onChange={changehandler}
                />
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={changehandler}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Enter your password"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={changehandler}
              />
            </div>
            <button
              className="w-full bg-red-600 text-white p-3 rounded mt-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out"
            >
              {`${isLoading?"Loading ....":isLogin ? "Login" : "Sign up"}`}
            </button>
            <p className="text-white text-center mt-4">
              {isLogin ? "New to Netflix? " : "Already have an account? "}
              <span className="text-red-600 cursor-pointer hover:underline" onClick={loginhandler}>
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
