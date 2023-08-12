import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import server from "../../Axios/axios"

import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function UserSignup() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      // const onSubmit = async (data) => {
      //   const { name, email, phoneNumber, password  } = data;
      // }

      const onSubmit = async (data) => {
        try {
          alert(data)
          console.log("usersignup",data)
          
          const response = await server.post("/api/v1/user-signup", data); 
          console.log(response.data); 
          if(response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data))
            toast.success("Registration success!.")
            navigate('/')
        }
        return response.data
        
        } catch (error) {
          toast.error("Error during user signup:", error);
          
        }
      };


    //   const onSubmit = async (userData) => {
    //     const response = await axios.post('/signup',userData)
    
    //     if(response.data) {
    //         localStorage.setItem('userData', JSON.stringify(userData))
    //         message.success("Success! The OTP has been sent successfully.")
    //     }
    //     return response.data
    // }
    







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




              {/* <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400"
                  {...register("password", { required: "Please Enter Password", minLength: { value: 5, message: "Password must be 8 characters" } })}
                />
              </div>
              <div
              className="absolute  flex items-center inset-y-0  cursor-pointer  "
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>


            {errors.password && <p className='errorMessage text-[#ff0000]'>{errors.password?.message}</p>} */}




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
</div>










              <div className="flex items-center space-x-2">
                
              </div>
              <div>
                <button
                  type="submit" 

                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-teal-700 rounded-md shadow hover:bg-teal-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  SIGN UP
                </button>
              </div>
              <div className="flex flex-col space-y-5">
                {/* <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-gray-400 w-14"></span>
                  <span className="font-normal text-gray-500">or login with</span>
                  <span className="h-px bg-gray-400 w-14"></span>
                </span> */}



                {/* <div className="flex flex-col space-y-4">
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                  >
                    <span>
                      <svg
                        className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                        viewBox="0 0 16 16"
                        version="1.1"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
                  >
                    <span>
                      <svg className="text-blue-500 group-hover:text-white" width="20" height="20" fill="currentColor">
                        <path
                          d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-blue-500 group-hover:text-white">Twitter</span>
                  </a>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      
  
      </>
    )
  }
  
  export default UserSignup
  