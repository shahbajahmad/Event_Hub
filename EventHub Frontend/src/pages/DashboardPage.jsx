import {React,useEffect} from 'react';
import MiniDashboard from '../component/Dashboard/MiniDashboard';
import AdminDashboard from '../component/Dashboard/AdminDashboard';
import OrganizerDashboard from '../component/Dashboard/OrganizerDashboard';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../component/Dashboard/MainLayout';
import { fetchOrganizerEvents } from '../service/features/eventSlice';

export default function DashboardPage() {

  const { user: { role } } = useSelector((state) => state.auth);
  const { data: analytics } = useSelector((state) => state.analytics);
  const { user: { _id } } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrganizerEvents(_id)); // Fetch organizer's tickets
  }, [dispatch, _id]);

  return (
    <MainLayout>
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
    </MainLayout>
  );
}
