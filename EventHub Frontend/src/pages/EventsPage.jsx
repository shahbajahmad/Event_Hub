import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import EventCard from "../component/EventCard";
import Skeleton from "@mui/material/Skeleton";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/public/events/upcoming`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="mt-16">
      <div className="mx-auto space-y-6 max-w-7xl px-5 sm:px-6 lg:px-8">
        <Typography variant="h4" fontWeight={"bold"} className="text-center mb-10">
          Upcoming <span className="text-orange-400 font-extrabold">Events</span>
        </Typography>

        {isLoading ? (
          <div className="flex flex-col gap-5 flex-wrap w-full justify-start items-center sm:items-start sm:flex-row">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                sx={{ maxWidth: 400 }}
                variant="rectangular"
                className="min-w-[200px] w-full h-[300px] sm:h-[300px] sm:w-[23.33%]"
              />
            ))}
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <div className="flex flex-col gap-5 flex-wrap w-full justify-start items-center sm:items-start sm:flex-row">
            {events.map((item, i) => (
              <EventCard key={item._id} src={item.banner} name={item.name} event={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
