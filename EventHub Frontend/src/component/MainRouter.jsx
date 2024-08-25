import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Navbar from './Navbar'
import Footer from './Footer'
import NotFound from '../pages/NotFoundPage'
import OrganizePage from '../pages/OrganizePage'
import ProfilePage from '../pages/ProfilePage'
import EventsPage from '../pages/EventsPage'
import EventDetailPage from '../pages/EventDetailPages'
import DashboardPage from '../pages/DashboardPage'
export default function MainRouter() {
  return (
 <>    <div className="flex flex-col min-h-screen">
 <Navbar/>
 <main className="flex-grow">
 <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/organize-event" element={<OrganizePage/>}></Route>
    <Route path="/profile" element={<ProfilePage/>}></Route>
    <Route path="/event" element={<EventsPage/>}></Route>
    <Route path="/event/:id" element={<EventDetailPage/>}></Route>
    <Route path="/dashboard" element={<DashboardPage/>}></Route>
    <Route path="*" element={<NotFound/>} />
 </Routes>
 </main>
<Footer/>
</div>
 </>
  )
}
