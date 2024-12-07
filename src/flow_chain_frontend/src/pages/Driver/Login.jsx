
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIILogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting II authentication...");
      await login();
      console.log("II Authentication successful");
      navigate("/driver");
    } catch (error) {
      console.error("II authentication error:", error);
      setError(
        "Failed to authenticate with Internet Identity. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center flex-column text-center "
      style={{ background: "#000", minHeight: "100vh", color: "white" }}
    >
      <div className="mt-auto flex flex-col justify-center text-light mb-5">
        <div
          className=" ratio ratio-1x1 mx-auto mb-2"
          style={{ maxWidth: "320px" }}
        ></div>
        <h1>Driver Login</h1>
        <p>Please connect your wallet to continue.</p>
        <button
          onClick={handleIILogin}
          variant="outline"
          className="rounded-pill btn btn-outline-success mx-auto px-3 mt-3"
        >
          {isLoading ? "Authenticating..." : "Sign Up with Internet Identity"}
        </button>
      </div>
      <p className="mt-auto text-secondary">Powered by Internet Computer</p>
    </div>
  );
};

export default Login;
