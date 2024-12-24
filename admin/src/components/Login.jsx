import { useEffect, useState } from "react";
import axios from "axios"
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {

  const [email,setEmail] =useState('');
  const  [password,setPassword] =useState('');
  const onSubmitHandler =async(event)=>{
    try {
      event.preventDefault();
      const response = await axios.post(backendUrl +'/api/user/admin',{email,password})
      if (response.data.success) {
        setToken(response.data.token)
      }else{
        toast.error("invalid credentials!")
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
    
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center  w-[90%] sm:max-w-96 m-auto mt-16 mb-52  gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-serif text-3xl">Admin Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input
      onChange={(e)=>setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="E-mail"
        required
      />
      <input
       onChange={(e)=>setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot your password</p>
      </div>
      <button className="bg-black text-white font-light py-2 px-20">Login</button>
    </form>
  );
};

export default Login;
