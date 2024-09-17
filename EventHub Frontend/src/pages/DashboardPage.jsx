import {React,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../component/Dashboard/MainLayout';
import { fetchOrganizerEvents } from '../service/features/eventSlice';

export default function DashboardPage() {

  const { user: { _id,role } } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrganizerEvents(_id)); // Fetch organizer's tickets
  }, [dispatch, _id]);

  return (
   <MainLayout/ >
  );
}
