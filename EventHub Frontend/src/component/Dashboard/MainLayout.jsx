import React, { useState } from "react";
import Sidebar from "./SideBar"; 
import DashboardPage from "./pages/DashboardPage";
import OrganizedEventsPage from "./pages/OrganizedEventsPage";
import UpcomingEventsPage from "./pages/UpcomingEventsPage";
import EditEventsPage from "./pages/EditEventsPage";
import { useSelector } from "react-redux";
import PendingEventPage from "./pages/PendingEventPage";
import AllEventsPage from "./pages/AllEventsPage";
import AllUserPage from "./pages/AllUserPage";

export default function MainLayout() {

 const {activePage} =  useSelector((state)=>state.sideBar)
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "organizedEvents":
        return <OrganizedEventsPage />;
      case "upcomingEvents":
        return <UpcomingEventsPage />;
        case "pendingEvents":
        return <PendingEventPage />;
        case "allEvents":
          return <AllEventsPage />;
          case "allUsers":
          return <AllUserPage />;
      case "editEvents":
        return <EditEventsPage />;
        
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
     <Sidebar />
  
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {renderContent()}
      </div>
    </div>
  );
}
