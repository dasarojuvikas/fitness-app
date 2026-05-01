import { Card, CardContent, Grid2, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { useNavigate } from 'react-router';
import { getActivities, deleteActivity } from '../services/api';

// Simple Delete Icon SVG component
const DeleteSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const ActivityList = forwardRef(({ refreshKey }, ref) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting activity with ID:", id);
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    try {
      await deleteActivity(id);
      fetchActivities();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("Failed to delete activity. Please try again.");
    }
  };

  // Expose refresh method to parent components
  useImperativeHandle(ref, () => ({
    refresh: fetchActivities
  }));

  useEffect(() => {
    fetchActivities();
  }, [refreshKey]);
  
  return (
    <Grid2 container spacing={2}>
      {activities.map((activity) => (
        <Grid2 key={activity.id} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Card sx={{ cursor: 'pointer', position: 'relative' }}>
            <CardContent onClick={() => navigate(`/activities/${activity.id}`)}>
              <Typography variant='h6'>{activity.type}</Typography>
              <Typography>Duration: {activity.duration}</Typography>
              <Typography>Calories: {activity.caloriesBurned}</Typography>
            </CardContent>
            <IconButton
              aria-label="Delete"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'grey.500',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'error.main',
                  transform: 'scale(1.1)',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                },
              }}
              onClick={e => {
                e.stopPropagation();
                handleDelete(activity.id);
              }}
            >
              <DeleteSvg />
            </IconButton>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
});

export default ActivityList