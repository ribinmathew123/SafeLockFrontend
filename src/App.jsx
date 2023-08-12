import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import { Toaster } from "react-hot-toast";
import Home from "./Pages/home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import SavedData from "./Pages/SavedData";
import ErrorPage from "./Pages/ErrorPage";



function App() {
  return (
 
    <BrowserRouter>
        <Routes>
        <Route path="/login" element={   <ProtectedRoute> <LoginPage /> </ProtectedRoute>} />  
        <Route path="/signup" element={ <ProtectedRoute>  <SignupPage /> </ProtectedRoute>} />

        <Route path="/" element={  <Home />  } />   
         
        <Route path="/saved" element={  <ProtectedRoute>< SavedData/> </ProtectedRoute>} /> 
 
        <Route path="/*" element={<ErrorPage />} /> 
        </Routes>

</BrowserRouter>
  );
}

// let auth = JSON.parse(localStorage.getItem("user"));
//     if (!auth) {
//       if (location.pathname === "/otp" || location.pathname === "/signup" || location.pathname === "/login") {
//         return children;
//       }

//       return <Navigate to={"/login"}  />;
      


export default App;
// eslint-disable-next-line react/prop-types
export function ProtectedRoute({ children }) {
  let auth = JSON.parse(localStorage.getItem("userInfo"))
  console.log('====================================');
  console.log(auth);

//   if (auth) {
//     if (location.pathname === "/signup" || location.pathname === "/login"  )  {
//       // Redirect authenticated user away from signup/login to home
//       return <Navigate to={"/"} />;
//     }
//     return children;
//   } else {
//     return children;
//   }
// }
if (!auth && location.pathname !== "/login" && location.pathname !== "/signup") {
  // Redirect unauthenticated users to the login page
  return <Navigate to="/login" />;
}else if  (auth && (location.pathname === "/signup" || location.pathname === "/login")) {
  // Redirect authenticated users away from signup/login to home
  return <Navigate to="/" />;
}

return children;
}







