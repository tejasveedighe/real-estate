import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import AddProperty from "./pages/AddProperty/AddProperty";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AllProperty from "./pages/AllProperty/AllProperty";
import SignUp from "./pages/SignUp/SignUp";
import Property from "./pages/Property/Property";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/property" element={<AllProperty />} />
          <Route path="/property/:propertyId" element={<Property />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
