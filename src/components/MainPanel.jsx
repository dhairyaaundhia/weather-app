// import { useContext, useEffect, useState } from 'react';
// import { WeatherContext } from '../context/WeatherContextProvider';
// import locationImage from '../img/location.png';
// import useDate from '../hooks/useDate';
// import axios from 'axios';
// import { SearchBar2 } from '../components/Utils';
// import { CurrentDayCard, CurrentHourCard } from './Current';
// import { ForecastCards, ForecastDayCard } from '../components/Forecast';

// export default function MainPanel() {
//   const [active, setActive] = useState(0);
//   const { time, date } = useDate();
//   const { address, forecast } = useContext(WeatherContext); // Using WeatherContext to get address
//   const [email, setEmail] = useState('');
//   const [searchedLocation, setSearchedLocation] = useState(null);

//   // Function to handle saving location
//   const handleSaveLocation = () => {
//     if (email) {
//       axios
//         .post('http://localhost:3001/save-location', { email, location: address })
//         .then((response) => {
//           alert(response.data); // Display success or error message
//         })
//         .catch((err) => console.error('Error saving location:', err));
//     } else {
//       alert('Please log in to save locations.');
//     }
//   };

//   // On component mount, retrieve the email from localStorage and search for the location
//   useEffect(() => {
//     const storedEmail = localStorage.getItem('userEmail');
//     if (storedEmail) {
//       setEmail(storedEmail); // Set the email in state
//     }

//     // Get the searched location from localStorage and update the address
//     const locationFromStorage = localStorage.getItem('searchedLocation');
//     if (locationFromStorage) {
//       setSearchedLocation(locationFromStorage);
//     }
//   }, []);

//   // Effect to reset searched location from localStorage when a new location is searched
//   useEffect(() => {
//     if (searchedLocation) {
//       localStorage.setItem('searchedLocation', searchedLocation); // Save searched location in localStorage
//     }
//   }, [searchedLocation]);

//   useEffect(() => {
//     if (searchedLocation) {
//       console.log(`Searching weather data for: ${searchedLocation}`);
//       // Example: axios call to fetch weather data based on the searched location
//     }
//   }, [searchedLocation]);

//   useEffect(() => {
//     const transition = () => {
//       setTimeout(function () {
//         const replacers = document.querySelectorAll('[data-replace]');
//         for (let i = 0; i < replacers.length; i++) {
//           const replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
//           Object.keys(replaceClasses).forEach(function (key) {
//             replacers[i].classList.remove(key);
//             replacers[i].classList.add(replaceClasses[key]);
//           });
//         }
//       }, 100);
//     };
//     transition();
//   }, []);

//   return (
//     <div className="relative z-0 grid justify-center min-h-screen gap-3 p-8" style={{ backgroundColor: '#282c34' }}>
//       {(searchedLocation || address) ? (
//         <div className="container max-w-5xl">
//           <div
//             className="relative z-20 grid items-start w-full grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 sm:items-center delay-150 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
//             data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
//           >
//             <div>
//               <h2 className="text-xl font-bold dark:text-gray-100">Local time:</h2>
//               <h2 className="font-bold text-7xl dark:text-gray-100">{time || ''}</h2>
//               <h2 className="col-span-2 text-2xl dark:text-gray-100">{date || ''} </h2>
//             </div>

//             <div className="w-full col-span-1 gap-3 text-left md:col-span-2">
//               <SearchBar2 setSearchedLocation={setSearchedLocation} />
//               <div className="flex items-center justify-end w-full my-3">
//                 <img src={locationImage} alt="Location" width={25} height={25} />
//                 <h2 className="text-base font-bold dark:text-gray-100">
//   {searchedLocation || address} {/* Prioritize searchedLocation or address */}
// </h2>

//               </div>
//               <div className="flex justify-end w-full">
//                 <button className="btn btn-primary mt-2" onClick={handleSaveLocation}>
//                   Save Location
//                 </button>
//               </div>
//             </div>
//           </div>

//           <h2
//             className="relative -z-10 my-5 text-3xl delay-200 duration-700 transform opacity-0 transition-all translate-y-12 ease-out dark:text-gray-100"
//             data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
//           >
//             Current Day
//           </h2>
//           <CurrentDayCard />
//           <div className="whitespace-nowrap overflow-x-auto overflow-y-hidden max-w-[90vw] m-auto">
//             {forecast?.forecastday?.[0].hour.map((element, index) => (
//               <CurrentHourCard key={index} element={element} />
//             ))}
//           </div>

//           <h2
//             className="my-5 text-3xl delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out dark:text-gray-100"
//             data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
//           >
//             Forecast
//           </h2>
//           <ForecastCards active={active} setActive={setActive} />
//           <ForecastDayCard active={active} />
//           <div className="whitespace-nowrap overflow-x-auto overflow-y-hidden max-w-[90vw] ">
//             {forecast?.forecastday?.[active].hour.map((element, index) => (
//               <CurrentHourCard key={index} element={element} />
//             ))}
//           </div>

//           {/* Inquiry Section */}
//           <div className="mt-8 text-center">
//             <p className="text-lg text-gray-100 mb-4">Have any questions? Contact us!</p>
//             <div className="flex justify-center space-x-8">
//               {/* Email */}
//               <a href="mailto:ruchit.kapuriya114432@marwadiuniversity.ac.in" className="text-blue-400 underline hover:text-blue-300">
//                 Email
//               </a>
//               {/* Contact */}
//               <a href="tel:+919924114432" className="text-blue-400 underline hover:text-blue-300">
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Loading</p>
//       )}
//     </div>
//   );
// }
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContextProvider";
import locationImage from "../img/location.png";
import useDate from "../hooks/useDate";
import axios from "axios";
import { SearchBar2 } from "../components/Utils";
import { CurrentDayCard, CurrentHourCard } from "./Current";
import { ForecastCards, ForecastDayCard } from "../components/Forecast";

export default function MainPanel() {
  const [active, setActive] = useState(0);
  const { time, date } = useDate();
  const { address, forecast, searchWeather } = useContext(WeatherContext);
  const [email, setEmail] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");

  // Function to handle saving location
  const handleSaveLocation = () => {
    if (email) {
      const locationToSave = searchedLocation || address;

      axios
        .post("http://localhost:3001/save-location", {
          email,
          location: locationToSave,
        })
        .then((response) => {
          alert(response.data); // Display success or error message
        })
        .catch((err) => console.error("Error saving location:", err));
    } else {
      alert("Please log in to save locations.");
    }
  };

  // On component mount, retrieve the email and location from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const locationFromStorage = localStorage.getItem("searchedLocation");
    if (locationFromStorage) {
      setSearchedLocation(locationFromStorage);
      // If we have a saved location, fetch its weather data
      searchWeather(locationFromStorage);
    }
  }, [searchWeather]);

  // Handle UI transitions
  useEffect(() => {
    const transition = () => {
      setTimeout(function () {
        const replacers = document.querySelectorAll("[data-replace]");
        for (let i = 0; i < replacers.length; i++) {
          const replaceClasses = JSON.parse(
            replacers[i].dataset.replace.replace(/'/g, '"')
          );
          Object.keys(replaceClasses).forEach(function (key) {
            replacers[i].classList.remove(key);
            replacers[i].classList.add(replaceClasses[key]);
          });
        }
      }, 100);
    };
    transition();
  }, []);

  return (
    <div
      className="relative z-0 grid justify-center min-h-screen gap-3 p-8"
      style={{ backgroundColor: "#282c34" }}
    >
      {searchedLocation || address ? (
        <div className="container max-w-5xl">
          <div
            className="relative z-20 grid items-start w-full grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 sm:items-center delay-150 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
            data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
          >
            <div>
              <h2 className="text-xl font-bold dark:text-gray-100">
                Local time:
              </h2>
              <h2 className="font-bold text-7xl dark:text-gray-100">
                {time || ""}
              </h2>
              <h2 className="col-span-2 text-2xl dark:text-gray-100">
                {date || ""}{" "}
              </h2>
            </div>

            <div className="w-full col-span-1 gap-3 text-left md:col-span-2">
              <SearchBar2 setSearchedLocation={setSearchedLocation} />
              <div className="flex items-center justify-end w-full my-3">
                <img
                  src={locationImage}
                  alt="Location"
                  width={25}
                  height={25}
                />
                <h2 className="text-base font-bold dark:text-gray-100">
                  {searchedLocation || address}
                </h2>
              </div>
              <div className="flex justify-end w-full">
                <button
                  className="btn btn-primary mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSaveLocation}
                >
                  Save Location
                </button>
              </div>
            </div>
          </div>

          <h2
            className="relative -z-10 my-5 text-3xl delay-200 duration-700 transform opacity-0 transition-all translate-y-12 ease-out dark:text-gray-100"
            data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
          >
            Current Day
          </h2>
          <CurrentDayCard />
          <div className="whitespace-nowrap overflow-x-auto overflow-y-hidden max-w-[90vw] m-auto">
            {forecast?.forecastday?.[0]?.hour?.map((element, index) => (
              <CurrentHourCard key={index} element={element} />
            ))}
          </div>

          <h2
            className="my-5 text-3xl delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out dark:text-gray-100"
            data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
          >
            Forecast
          </h2>
          <ForecastCards active={active} setActive={setActive} />
          <ForecastDayCard active={active} />
          <div className="whitespace-nowrap overflow-x-auto overflow-y-hidden max-w-[90vw] ">
            {forecast?.forecastday?.[active]?.hour?.map((element, index) => (
              <CurrentHourCard key={index} element={element} />
            ))}
          </div>

          {/* Inquiry Section */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-100 mb-4">
              Have any questions? Contact us!
            </p>
            <div className="flex justify-center space-x-8">
              {/* Email */}
              <a
                href="mailto:dhairya.aundhia119887@marwadiuniversity.ac.in"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Email
              </a>
              {/* Contact */}
              <a
                href="tel:+919499882054"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center text-xl">
          Loading weather data...
        </p>
      )}
    </div>
  );
}
