import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import SavedData from "./Pages/SavedData";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";



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

      


export default App;
// eslint-disable-next-line react/prop-types
export function ProtectedRoute({ children }) {
  let auth = JSON.parse(localStorage.getItem("userInfo"))
  console.log('====================================');
  console.log(auth);


if (!auth && location.pathname !== "/login" && location.pathname !== "/signup") {
  return <Navigate to="/login" />;
}else if  (auth && (location.pathname === "/signup" || location.pathname === "/login")) {
  return <Navigate to="/" />;
}

return children;
}







