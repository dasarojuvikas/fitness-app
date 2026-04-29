import { Card, CardContent, Grid2, Typography, Button } from '@mui/material'
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { useNavigate } from 'react-router';
import { getActivities, deleteActivity } from '../services/api';

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
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={e => {
                e.stopPropagation();
                handleDelete(activity.id);
              }}
            >
              Delete
            </Button>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
});

export default ActivityList