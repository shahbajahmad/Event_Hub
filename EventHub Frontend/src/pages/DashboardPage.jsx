import {React,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../component/Dashboard/MainLayout';
import { fetchOrganizerEvents } from '../service/features/eventSlice';

export default function DashboardPage() {

  return (
   <MainLayout/ >
  );
}
