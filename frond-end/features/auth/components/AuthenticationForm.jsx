import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import "../../../src/App.css";

export const AuthForm = () => {
  const { user, signIn, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUpActive && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const action = isSignUpActive ? signUp : signIn;
    const { success, error } = await action(email, password);

    if (success) {
      alert(
        isSignUpActive
          ? "Sign up successful! Please check your email to confirm."
          : "Sign in successful!"
      );
      navigate("/");
      // Clear fields after successful action
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-body">
      <h1 className="auth-title">Welcome To Academy Sports</h1>
      <div
        className={`auth-container ${
          isSignUpActive ? "right-panel-active" : ""
        }`}
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <p>Sign up to start making a shopping!</p>

            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button className="form-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <p>Welcome back! Please login to your account</p>

            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <a href="#" className="forgot-password">
              Forgot your password?
            </a>

            <button className="form-button" type="submit">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost-button" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>New here?</h1>
              <p>Then Sign Up and Start Shopping!</p>
              <button className="ghost-button" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
