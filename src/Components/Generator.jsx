import { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import generatePassword from "../Utilities/GeneratePassword";
import toast, { Toaster } from 'react-hot-toast';
import SavePasswordModal from '../Components/Modal/Modal'
import Copy from "../Utilities/Clipboard";
import Navbar from "./Navbar/Navbar";
import server from "../Axios/axios";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";



function PasswordGenerator() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [number, setNumber] = useState(false);
  const [loading,setLoading]=useState(false)



  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [value, setValue] = useState(5);
  const [password, setPassword] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const navigate = useNavigate();




  const handlePasswordModalToggle = () => {
    if (!password) {
      toast.error("Please generate a password.");
      return; 
    }

    if (!user) {
     
      toast.error("Please log in to access this feature.");

    } else {
      setShowPasswordModal(!showPasswordModal);

    }
  };
  

  const handleSave = async (passwordName) => {
    try {
      const token = user?.token;
      const userId = user?._id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await server.post(
        `/api/v1/save/${userId}`,
        {
          password: password,
          name: passwordName,
        },
        config
      );

      if (response.data) {
        console.log(response.data);
        toast.success("Password Saved!");
        handlePasswordModalToggle(); 
      }
      
    } catch (error) {
    

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error during password save");
      }
    }
  };








  const handleClick = () => {
    setLoading(true)
  
    if (!user) {
      // Swal.fire({
      //   title: "Please Login",
      //   icon: "warning",
      //   confirmButtonText: "OK",
      // });
      toast.error("Please log in to access this feature.");

    } else {
      navigate('/saved');
    }
    setLoading(false)
  };
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlenumber = () => {
    setNumber(!number);
  };

  const Lowercase = () => {
    setLowercase(!lowercase);
  };

  const Uppercase = () => {
    setUppercase(!uppercase);
  };

  const handlecharactor = () => {
    setSymbol(!symbol);
  };

  const handilGenerate = () => {
    if(!number && !lowercase && !uppercase && !symbol )
    {
      toast.error("Please Select any field");
     
    }

    setPassword(
      generatePassword(value, number, lowercase, uppercase, symbol)
    );
  };

  const handleCopy = () => {
    Copy(password);
    toast.success("Password Copied!", { autoClose: 1000 });
  };



  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-teal-900 min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2 max-h-full overflow-y-auto  mt-14 ">

          <h1 className="text-2xl font-bold text-center mb-2">PASSWORD GENERATOR</h1>
          <div className="relative w-full">
            <input
              type="text"
              value={password}
              readOnly
              id="success"
              className="w-full text-xl font-semibold text-teal-900 p-2 pl-8 mb-4 border-2 border-teal-800 rounded-lg focus:ring focus:border-deep-orange-500"
              placeholder="Success input"
            />
            <button
              onClick={handleCopy}
              className="absolute top-1/2  right-2 transform -translate-y-4"
            >
              <FiClipboard className="w-5 h-5 text-teal-900" />
            </button>
          </div>


          <label htmlFor="default-range" className="block  text-sm font-medium text-gray-900 dark:text-black">
            Password Length {value}

          </label>
          <input
            id="default-range"
            type="range"

            value={value}
            min={5}
            max={20}
            onChange={handleChange}

            className="w-full h-2 bg-teal-800 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-4"
          />

          <div className=" space-y-5">

            <div className="flex  items-center bg-teal-800 p-3 rounded-lg shadow-xl ">
              <label className="relative inline-flex items-center cursor-pointer ml-3">
                <input type="checkbox" onChange={Uppercase} className="sr-only peer" checked={uppercase} />
                <div className="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-900 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-teal-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
              <span className="ml-3  text-base font-medium text-white"> INCLUDE UPPERCASE </span>
            </div>


            {showPasswordModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex justify-center items-center z-50">
                <SavePasswordModal closeModal={handlePasswordModalToggle}
                  onSave={handleSave} password={password} />
              </div>
            )}


            <div className="flex items-center bg-teal-800 p-3 rounded-lg shadow-xl ">
              <label className="relative inline-flex items-center cursor-pointer ml-3">
                <input onChange={Lowercase} type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-900 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-teal-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>

              </label>
              <span className="ml-3 text-base font-medium text-white">INCLUDE LOWERCASE</span>
            </div>


            <div className="flex items-center bg-teal-800 p-3 rounded-lg shadow-xl">
              <label className="relative inline-flex items-center cursor-pointer ml-3">
                <input type="checkbox" onChange={handlenumber}
                  value="" className="sr-only peer" />

<div className="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-900 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-teal-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
              <span className="ml-3 text-base font-medium text-white">INCLUDE NUMBERS </span>
            </div>




            <div className="flex items-center bg-teal-800 p-3 rounded-lg shadow-xl mt-11 ">
              <label className="relative inline-flex items-center cursor-pointer ml-3">
                <input type="checkbox" value="" onChange={handlecharactor} className="sr-only peer" />

                <div className="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-900 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-teal-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
              <span className="ml-3 text-base font-medium text-white"> INCLUDE SYMBOLS</span>
            </div>


          </div>


          <div className="mt-4">
       
            <button onClick={handilGenerate} className="w-full py-4 px-4 bg-teal-800 hover:bg-teal-700 text-white  font-bold rounded-md shadow-md">
             <div className="flex justify-center gap-2">
             <p className="font-serif text-xl">

                 GENERATE PASSWORD
</p>
            <img
          src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1691954078/icons8-settings-64_1_jhfgvy.png"

          alt="generater"
          className="  h-7 w-7 animate-spin-slow "
        />
     
        </div>
            </button>
          </div>


          <div className="flex  md:gap-3 gap-1  mt-5">
         
            <div className=" w-1/2">
              <button onClick={handlePasswordModalToggle}  className="w-full py-4 px-4 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-md shadow-md text-sm">
                SAVE PASSWORD
              </button>
            </div>

            <div className="w-1/2 ">
           
              <button onClick={handleClick} className="w-full py-4 px-4 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-md shadow-md text-sm">
                              {loading ? 'Loading...' : 'SHOW PASSWORD'}

              </button>
            </div>
          </div>







        </div>
        <Toaster
        // position="top-right"
        // reverseOrder={false}
        />
      </div>
 

    </>

  );
}

export default PasswordGenerator;

