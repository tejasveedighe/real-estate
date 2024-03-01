import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutWithNav from "./components/LayoutWithNav/LayoutWithNav";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import About from "./pages/About/About";
import AddProperty from "./pages/AddProperty/AddProperty";
import AllProperty from "./pages/AllProperty/AllProperty";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ManageUser from "./pages/ManageUser/ManageUsers";
import Property from "./pages/Property/Property";
import Requests from "./pages/Requests/Requests";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOutNav from "./components/LogOutNav/LogOutNav";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LogOutNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<LayoutWithNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<AllProperty />} />
          <Route path="/property/:propertyId" element={<Property />} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/addProperty" element={<AddProperty />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/manageUsers" element={<ManageUser />} />
            <Route path="/user/:userId" element={<User />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
