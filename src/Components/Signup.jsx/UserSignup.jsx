import { useState } from "react";
import { useForm } from "react-hook-form";
import server from "../../Axios/axios"

import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
function UserSignup() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

     

      const onSubmit = async (data) => {
        try {
          setIsLoading(true); 

          
          const response = await server.post("/api/v1/user-signup", data); 
          if(response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data))
            toast.success("Registration success!.")
            navigate('/')
        }
        setIsLoading(false); 

        return response.data
        } catch (error) {
           console.log("error is ",error)
          toast.error(error.response.data.error);
          
        }
      };


    return (
      <>
  
  <div className="flex items-center min-h-screen p-4  bg-gray-100 lg:justify-center">
        <div
          className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
        >
          <div
            className="p-4 py-6 text-white bg-teal-700 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
          >
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <h1>SafeLock
  </h1>
            </div>
           
            
            <img
            src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/unlock_lfp8fs.svg"
            className="hidden lg:block w-64 hover:scale-125 transition-all duration-500 transform mx-auto"
            style={{ zIndex: 1000 }}
          />
   <Link to={"/login"}>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Already a member?</span>
                          < span className="underline font-bold text-lg">Login</span>

            </p> 
 </Link>
          </div>
          <div className="p-4 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-teal-800 mb-6">Account Signup</h3>


            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col space-y-5">

              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className='errorMessage  text-[#ff0000]'>{errors.name?.message}</p>}



              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"

                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400"
                  {...register('email', { required: 'Please Enter Email', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email Address" } })}


/>
              </div>
              {errors.email && <p className=' text-[#ff0000] errorMessage'>{errors.email?.message}</p>}


<div className="flex flex-col space-y-1 relative">
    <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
  <div className="flex items-center justify-between">
    <div className="relative flex-grow">
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400 pr-8 w-full"
        {...register("password", { required: "Please Enter Password", minLength: { value: 5, message: "Password must be 8 characters" } })}
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <HiEye className="h-5 w-5" /> : <HiEyeOff className="h-5 w-5" />}
      </button>
    </div>

  </div>
    {errors.password && <p className=' text-[#ff0000] errorMessage'>{errors.password?.message}</p>}
</div>










              <div className="flex items-center space-x-2">
                
              </div>
              <div>
                <button
                  type="submit" 

                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-teal-700 rounded-md shadow hover:bg-teal-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
               {isLoading ? 'Loading...' : 'SIGN UP'}
                </button>
              </div>
              <div className="flex flex-col space-y-5">
                
              </div>
            </form>
          </div>
        </div>
        <Toaster />

      </div>
      
  
      </>
    )
  }
  
  export default UserSignup
  