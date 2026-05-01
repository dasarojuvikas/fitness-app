import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8181/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      const { token, userId } = res.data;
      
      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Dispatch to Redux
      dispatch(setCredentials({ token, userId }));

      // Navigate without reload
      navigate("/activities");

    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <Box
  sx={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 🖼️ IMAGE BACKGROUND */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url("/gym-bg.jpg")`, // 👉 put image in public folder
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.6)",

      animation: "zoomMove 25s ease-in-out infinite",

      "@keyframes zoomMove": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.1)" },
        "100%": { transform: "scale(1)" },
      },
    }}
  />

  {/* 🎨 GRADIENT OVERLAY */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(270deg, rgba(30,60,114,0.6), rgba(238,9,121,0.6))",
      backgroundSize: "400% 400%",
      animation: "gradientMove 12s ease infinite",

      "@keyframes gradientMove": {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" },
      },
    }}
  />

      {/* 🔥 Glass Card */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: 320,
          p: 4,
          borderRadius: 3,

          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",

          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "#ddd" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 3 }}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "#ddd" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            background: "linear-gradient(45deg, #ff6a00, #ee0979)",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(45deg, #ee0979, #ff6a00)",
            },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#ddd" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "orange", cursor: "pointer", fontWeight: "bold" }}
          >
            Register
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;