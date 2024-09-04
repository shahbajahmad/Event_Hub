import React, { useEffect, useState } from "react";
import HomeCarousel from "../component/HomeCarousel";
import { Typography } from "@mui/material";
import EventCard from "../component/EventCard";
import Skeleton from '@mui/material/Skeleton';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setitems] = useState([])
  useEffect(() => {
    // Fetch all events
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/public/events`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch upcoming events
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/public/events/upcoming`);
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }
        const data = await response.json();
        setUpcomingEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
    fetchUpcomingEvents();
    
  }, []);

  useEffect(() => {
    const items = upcomingEvents.filter((item, i) => i < 3) // Filter only the first 3 items
    .map((item, i) => (
      <div key={item.name} className=' overflow-y-hidden max-h-[200px] sm:max-h-[300px] px-0 sm:px-10'>
        <img src={item.banner} alt={item.name} className='w-[600px] mx-auto h-full object-contain' />
      </div>
    ));
  setitems(items)
  }, [upcomingEvents]);

  return (
    
    <div className="space-y-14">
      <HomeCarousel items={items}/>

      <div className="mx-auto space-y-6 max-w-7xl px-5 sm:px-6 lg:px-8">
        <Typography variant="h4" fontWeight={"bold"}>
          Upcoming <span className="text-orange-400 font-extrabold">Events</span>
        </Typography>
        <div className="flex flex-col gap-5 flex-wrap w-full justify-start items-center sm:items-start sm:flex-row">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  sx={{ maxWidth: 400 }}
                  variant="rectangular"
                  className="min-w-[200px] w-full h-[300px] sm:h-[300px] sm:w-[23.33%]"
                />
              ))
            : upcomingEvents?.map((item, i) =>
                i <= 3 ? (
                  <EventCard key={item._id} event={item} isLoading={isLoading}/>
                ) : null
              )}
        </div>
      </div>

      <div className="mx-auto space-y-6 max-w-7xl px-5 sm:px-6 lg:px-8">
        <Typography variant="h4" fontWeight={"bold"}>
          Popular Event of <span className="text-orange-400 font-extrabold">2024</span>
        </Typography>

        <div className="flex flex-col gap-5 flex-wrap w-full justify-start items-center sm:items-start sm:flex-row">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  sx={{ maxWidth: 400 }}
                  variant="rectangular"
                  className="min-w-[200px] w-full h-[300px] sm:h-[300px] sm:w-[23.33%]"
                />
              ))
            : events?.map((item, i) =>
                i <= 4 ? (
                  <EventCard key={item._id} event={item} isLoading={isLoading}/>

                ) : null
              )}
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
