import {React,useEffect} from 'react';
import MiniDashboard from '../MiniDashboard';
import AdminDashboard from '../AdminDashboard';
import OrganizerDashboard from '../OrganizerDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizerEvents } from "../../../service/features/eventSlice";

export default function DashboardPage() {

  const { user: { _id,role } } = useSelector((state) => state.auth);
  const { data: analytics } = useSelector((state) => state.analytics);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrganizerEvents(_id)); // Fetch organizer's tickets
  }, [dispatch, _id]);

  return (
<>
      <MiniDashboard
        noOfEvents={analytics?.total_events}
        totalSales={analytics?.total_sales}
        soldTickes={analytics?.sold_tickets}
      />
      {role === "Admin" ? (
        <AdminDashboard />
      ) : role === "Organizer" ? (
        <OrganizerDashboard upcoming_events={analytics?.upcoming_events || 0} />
      ) : null}
</>
  );
}
