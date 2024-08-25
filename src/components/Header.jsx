import axios from 'axios';
import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle, setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle=useSelector((store)=>store.app.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // console.log(user);

  const logouthandler = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/logout')
      console.log(res);
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const searchhandler=()=>{
    dispatch(setToggle());
  }

  return (
    <div className="flex justify-between items-center p-4 bg-gray-400">
      <img
        src="https://static.vecteezy.com/system/resources/previews/006/874/233/original/netflix-logo-icon-on-white-background-free-vector.jpg"
        alt="netflix logo"
        className="w-12" // Reduced width
      />
      {user && (
        <div className="flex items-center space-x-4">
          <IoIosArrowDropdown size="30px" color='white' />
          <h1 className="text-white text-xl font-bold">Welcome {user.name}</h1>
          <button className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700" onClick={logouthandler}>Logout</button>
          <button className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-800" onClick={searchhandler}>{toggle ? "Home":"Search"}</button>
        </div>
      )}

    </div>
  );
};

export default Header