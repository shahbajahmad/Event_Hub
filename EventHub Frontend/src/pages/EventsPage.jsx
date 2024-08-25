import React from 'react'
import { Typography } from "@mui/material";
import UpcomingCard from "../component/UpcomingCard";
import { events } from "../data/homeCrousel";
export default function EventsPage() {
  return (
    <div className='mt-16'>  <div className="mx-auto space-y-6 max-w-7xl px-5 sm:px-6 lg:px-8">
    <Typography variant="h4" fontWeight={"bold"} className='text-center mb-10'>
     Upcoming <span className="text-orange-400 font-extrabold">Events </span>
    </Typography>
   
   {[1,1,1].map(()=><div className="flex flex-col gap-5 flex-wrap w-full  justify-start items-center sm:items-start sm:flex-row">
      {events.map(
        (item, i) =>
           <UpcomingCard key={item.name} src={item.src} name={item.name} />
      )}
    </div>) }
  </div></div>
  )
}
