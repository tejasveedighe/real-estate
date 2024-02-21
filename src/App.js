import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Property from "./pages/Property/Property";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />

        <Route element={<AuthLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/property" element={<Property />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
