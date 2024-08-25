import * as React from 'react';
import { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
export default function UpcomingCard({src,name}) {
const [loading, setloading] = useState(true)
useEffect(() => {
  

  return () => {
    setTimeout(() => {
        setloading(false)
    }, 3000);
  }
}, [])

    return (
        loading ? <Skeleton sx={{ maxWidth: 400 }}  variant="rectangular" className='min-w-[200px] w-full h-[300px] sm:h-[300px] sm:w-[23.33%] '/>:
        <Link to={"/event/21"} className='min-w-[200px]  sm:w-[23.33%] hover:scale-110  cursor-pointer transition-all hover:text-gray-800'>
        <Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={src}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='hover:text-orange-300'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}