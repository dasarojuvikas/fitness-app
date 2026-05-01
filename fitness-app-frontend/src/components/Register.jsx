import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8181/auth/register", form);

      alert("User Registered Successfully ✅");

      navigate("/"); // go back to login
    } catch (err) {
      console.error(err);
      alert("Registration Failed ❌");
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
          backgroundImage: `url("/gym-bg.jpg")`,
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
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ddd" } }}
            InputProps={{
              style: { color: "white" },
            }}
          />

          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ddd" } }}
            InputProps={{
              style: { color: "white" },
            }}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ddd" } }}
            InputProps={{
              style: { color: "white" },
            }}
          />

          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            sx={{ mb: 3 }}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ddd" } }}
            InputProps={{
              style: { color: "white" },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #ff6a00, #ee0979)",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(45deg, #ee0979, #ff6a00)",
              },
            }}
          >
            REGISTER
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#ddd" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ color: "orange", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </span>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;