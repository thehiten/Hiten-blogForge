import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import carousel styles
import { Link } from 'react-router-dom';

function Creator() {
  const [admin, setAdmins] = useState([]);
  

  useEffect(() => {
    // Define an async function to fetch data
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getAdmins', {
          withCredentials: true // Ensure this is correct for your API
        });
        console.log(response.data); // Log the entire response data
        setAdmins(response.data); // Adjust according to the actual structure of your data
      } catch (error) {
        console.error(error);
       
      }
    };

    fetchAdmins();
  }, []);

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Adjust the number of items based on the container width
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="container mx-auto my-8 px-4 min-h">
      <h1 className="text-2xl font-semibold text-blue-400 mb-4"><span className="text-purple-400"> Crea</span>tors </h1>
      <Carousel
        responsive={responsive}
        itemClass="p-2" // Adjusted to ensure proper spacing
      >
        {admin && admin.length > 0 ? (
          admin.map((element) => (
            <Link
              to={`/blog/${element._id}`} // Adjusted path to include dynamic blog ID
              key={element._id}
              className="block h-48 w-48 rounded-full p-16 py-8 border border-blue-400 text-center"
            >
              <img
                src={element.photo.url}
                className="h-16 w-16 rounded-full border  border-purple-500 p-2"
                alt={element.title}
              />
              <div>
                <p>{element.name}</p>
                <p>{element.role}</p>
              </div>
             
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-700">No blogs available.</div>
        )}
      </Carousel>
    </div>

    
  );
}

export default Creator;
