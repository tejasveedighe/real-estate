import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Property from "./pages/Property/Property";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route element={<AuthLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/property" element={<Property />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
