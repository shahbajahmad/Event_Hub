import {React,useEffect} from 'react';
import MiniDashboard from '../MiniDashboard';
import AdminDashboard from '../AdminDashboard';
import OrganizerDashboard from '../OrganizerDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizerEvents } from "../../../service/features/eventSlice";

export default function DashboardPage() {

  const { user } = useSelector((state) => state.auth);


  return (
<>
      {user?.role === "Admin" ? (
        <AdminDashboard />
      ) : user?.role  === "Organizer" ? (
        <OrganizerDashboard  />
      ) : null}
</>
  );
}
