import React from "react";
import HomeCarousel from "../component/HomeCarousel";
import { Typography } from "@mui/material";
import UpcomingCard from "../component/UpcomingCard";
import { events } from "../data/homeCrousel";

export default function HomePage() {
  return (
    <div className=" space-y-14 ">
      <HomeCarousel />

      <div className="mx-auto space-y-6 max-w-7xl px-5 sm:px-6 lg:px-8">
        <Typography variant="h4" fontWeight={"bold"}>
          Upcoming Events
        </Typography>
        <div className="flex flex-col gap-5 flex-wrap w-full  justify-start items-center sm:items-start sm:flex-row">
          {events.map(
            (item, i) =>
              i <= 4 && <UpcomingCard key={item.name}  src={item.src} name={item.name} />
          )}
        </div>
      </div>

      <div className="mx-auto space-y-6 max-w-7xl px-5 sm:px-6 lg:px-8">
        <Typography variant="h4" fontWeight={"bold"}>
         Popular Event of <span className="text-orange-400 font-extrabold">2024</span>
        </Typography>
       
        <div className="flex flex-col gap-5 flex-wrap w-full  justify-start items-center sm:items-start sm:flex-row">
          {events.map(
            (item, i) =>
              i <= 4 && <UpcomingCard key={item.name} src={item.src} name={item.name} />
          )}
        </div>
      </div>
    </div>
  );
}
