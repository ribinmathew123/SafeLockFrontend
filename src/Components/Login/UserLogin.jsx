import { Link, useNavigate } from "react-router-dom";
import server from "../../Axios/axios";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

function UserLogin() {

  const navigate = useNavigate(); // Create a navigate function


  const { register, handleSubmit, formState: { errors } } = useForm()


  const onSubmit = async (data) => {
    try {
      alert(data)
      console.log("usersignup",data)
      
      const response = await server.post("/api/v1/user-login", data); 
      console.log(response.data); 
      if(response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        toast.success("Login success!.")
        navigate('/')
    }
    return response.data
    
    } catch (error) {
      toast.error("Error during user signup:", error);
      
    }
  };






  return (
    <>


<div className="flex items-center min-h-screen p-6 bg-gray-100 lg:justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          className="p-4 py-6 text-white bg-teal-700  md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className=" text-4xl font-bold tracking-wider text-center mb-4">
            <h1> SecurePassLock</h1>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
             
          <img
            src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/unlock_lfp8fs.svg"
            className="hidden lg:block w-64 hover:scale-125 transition-all duration-500 transform mx-auto"
            style={{ zIndex: 1000 }}
          />
          </p>
          <Link to="/signup">
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            < span className="underline font-bold text-lg">Get Started!</span>
          </p>
          </Link>
         
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-teal-700 mb-8">Account Login</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoFocus
                className="px-4 py-2   transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400"
                {...register('email', { required: 'Please Enter Email', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email Address" } })}

              />
             {errors.email && <p className=' text-[#ff0000] errorMessage'>{errors.email?.message}</p>}

            </div>


            <div className="flex flex-col space-y-1 ">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm mt-3 font-semibold text-gray-500">Password</label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400"
                {...register("password", { required: "Please Enter Password", minLength: { value: 5, message: "Password must be 8 characters" } })}

              />
                          {errors.password && <p className='errorMessage text-[#ff0000]'>{errors.password?.message}</p>}

            </div>
            <div className="flex items-center space-x-2">
              
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold mt-3 text-white transition-colors duration-300 bg-teal-700 rounded-md shadow hover:bg-teal-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            <div className="flex flex-col space-y-5">
            
              <div className="flex flex-col space-y-4">
              
            </div>
            </div>

          </form>
        </div>
      </div>
      <Toaster />

    </div>

    </>
  )
}

export default UserLogin
