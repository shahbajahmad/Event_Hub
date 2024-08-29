import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Navbar from './Navbar'
import Footer from './Footer'
import NotFound from '../pages/NotFoundPage'
import OrganizePage from '../pages/OrganizePage'
import ProfilePage from '../pages/ProfilePage'
import EventsPage from '../pages/EventsPage'
import EventDetailPage from '../pages/EventDetailPages'
import DashboardPage from '../pages/DashboardPage'
import { useSelector } from 'react-redux'
export default function MainRouter() {
  const {user} = useSelector((state)=>state.auth)
  return (
 <>    <div className="flex flex-col min-h-screen">
 <Navbar/>
 <main className="flex-grow">
 <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/organize-event" element={user ? <OrganizePage/>: <Navigate to="/" />}></Route>
    <Route path="/profile"  element={user ? <ProfilePage /> : <Navigate to="/" />}></Route>
    <Route path="/event" element={<EventsPage/>}></Route>
    <Route path="/event/:id" element={<EventDetailPage/>}></Route>
    <Route path="/dashboard" element={user ? <DashboardPage/>: <Navigate to="/" />}></Route>
    <Route path="*" element={<NotFound/>} />
 </Routes>
 </main>
<Footer/>
</div>
 </>
  )
}
