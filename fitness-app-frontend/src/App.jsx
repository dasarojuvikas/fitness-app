import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { logout, setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import bgImage from "./assets/login-bg.png";
import actBgImage from "./assets/activity-bg.png";
import Login from "./components/Login";
import Register from "./components/Register";

const ActvitiesPage = () => {
  const activityListRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleActivitiesAdded = () => {
    // Directly call the refresh method on ActivityList
    if (activityListRef.current) {
      activityListRef.current.refresh();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${actBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Your Activities 💪
        </Typography>

        <Box sx={{ mb: 3 }}>
          <ActivityForm onActivitiesAdded={handleActivitiesAdded} />
        </Box>

        <ActivityList ref={activityListRef} />
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          fontWeight: "bold",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

// Wrapper component that uses useNavigate inside Router context
const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    
    if (storedToken) {
      dispatch(setCredentials({ token: storedToken, userId: storedUserId }));
    }
    setAuthReady(true);
  }, [dispatch]);

  if (!authReady) {
    return null;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          !token ? (
            <Box
              sx={{
                height: "100vh",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1, color: "white" }}>
                <Typography variant="h4" gutterBottom>
                  Welcome to the Fitness Tracker App
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  Please login to access your activities
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </Button>
              </Box>
            </Box>
          ) : (
            <Navigate to="/activities" />
          )
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/activities"
        element={<ActvitiesPage />}
      />

      <Route
        path="/activities/:id"
        element={
          token ? <ActivityDetail /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;