import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutWithNav from "./components/LayoutWithNav/LayoutWithNav";
import AdminRoutes from "./components/ProtectedRoutes/AdminRoutes";
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
import MyProperties from "./pages/MyProperties/MyProperties";
import SellerRoutes from "./components/ProtectedRoutes/SellerRoutes";
import Offers from "./pages/Offers/Offers";
import AuthRoutes from "./components/ProtectedRoutes/AuthRoutes";
import Owned from "./pages/Owned/Owned";
import Payments from "./pages/Payments/Payments";
import React, { Component } from "react";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import NotFound from "./pages/NotFound/NotFound";
import EditProperty from "./pages/AddProperty/EditProperty";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  redirect() {
    window.history.back();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center flex-column container mt-5 justify-content-center h-100">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.toString()}</p>
          <p>Component stack trace: {this.state.errorInfo?.componentStack}</p>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.redirect}
          >
            Get Back to Previous Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route element={<LogOutNav />}>
            <Route caseSensitive path="/login" element={<Login />} />
            <Route caseSensitive path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<LayoutWithNav />}>
            <Route caseSensitive path="/" element={<Home />} />
            <Route caseSensitive path="/property" element={<AllProperty />} />
            <Route caseSensitive path="/property/:propertyId" element={<Property />} />
            <Route caseSensitive path="/about" element={<About />} />

            {/* Auth Routes */}
            <Route element={<AuthRoutes />}>
              {/* Common to all authenticated users */}
              <Route caseSensitive path="/offers" element={<Offers />} />
              <Route caseSensitive path="/owned" element={<Owned />} />

              {/* Admin Routes */}
              <Route element={<AdminRoutes />}>
                <Route
                  caseSensitive
                  path="/adminDashboard"
                  element={<AdminDashboard />}
                />
                <Route caseSensitive path="/requests" element={<Requests />} />
                <Route caseSensitive path="/manageUsers" element={<ManageUser />} />
                <Route caseSensitive path="/user/:userId" element={<User />} />
                <Route caseSensitive path="/payments" element={<Payments />} />
              </Route>

              {/* Seller Routes */}
              <Route element={<SellerRoutes />}>
                <Route caseSensitive path="/myProperties" element={<MyProperties />} />
                <Route caseSensitive path="/addProperty" element={<AddProperty />} />
                <Route
                  caseSensitive
                  path="/editProperty/:propertyId"
                  element={<EditProperty />}
                />
              </Route>
            </Route>

            {/* 404 */}
            <Route caseSensitive path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      <ToastContainer />
    </>
  );
}

export default App;
