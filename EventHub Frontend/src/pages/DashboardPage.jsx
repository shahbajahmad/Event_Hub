import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniDashboard from '../component/MiniDashboard';
import AdminDashboard from '../component/AdminDashboard';
import OrganizerDashboard from '../component/OrganizerDashboard';
import { updateAnalytics } from '../service/features/analyticsSlice';
import { Backdrop,
  CircularProgress,} from "@mui/material"
import Sidebar from '../component/SideBar';

export default function DashboardPage() {

 const {user:{role}} = useSelector((state)=>{return state.auth})
const dispatch = useDispatch();
  const { data: analytics, loading } = useSelector((state) => state.analytics); // Fetch analytics state

  useEffect(() => {
    dispatch(updateAnalytics()); // Fetch analytics data on page load
  }, [dispatch]);

  if (loading) {
    return   <Backdrop
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.drawer + 1,
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    }}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>; // Display a loading state while analytics data is being fetched
  }

  return (
    <div>
      {/* <Sidebar/> */}
          <MiniDashboard
        noOfEvents={analytics?.total_events}
        totalSales={analytics?.total_sales}
        soldTickes={analytics?.sold_tickets}
      />
        
         {role === "Admin"?  <AdminDashboard/> : role === "Organizer" ?<OrganizerDashboard upcoming_events={analytics?.upcoming_events || 0}/>:null}</div>
  )
}
