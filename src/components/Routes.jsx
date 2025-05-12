// import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
// import Login from './Auth/Login';  // Import Login component
// import Register from './Auth/Register';  // Import Register component
// import MainPanel from './MainPanel';  // Import Home page
// import Header from './HeaderFooter/Header';  // Import Header component
// import { useContext, useEffect } from 'react';
// import { WeatherContext } from '../context/WeatherContextProvider';
// import useCurrentLocation from '../hooks/useCurrentLocation';
// import { DEFAULT_LOCATIONS, geolocationOptions } from './Const';

// const WithoutHeader = () => <Outlet />;  // No header for login/register
// const WithHeader = () => (
//   <>
//     <Header />  {/* Use header for other pages */}
//     <Outlet />
//   </>
// );

// export default function AppRoutes() {
//   const { location } = useCurrentLocation(geolocationOptions);
//   const { getWeather } = useContext(WeatherContext);

//   useEffect(() => {
//     if (location !== undefined) {
//       getWeather(location);
//     } else {
//       getWeather(
//         DEFAULT_LOCATIONS[Math.floor(Math.random() * DEFAULT_LOCATIONS.length)]
//       );
//     }
//   }, [location, getWeather]);

//   return (
//     <Router>
//       <Routes>
//         {/* Show Login as the default page */}
//         <Route element={<WithoutHeader />}>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//         {/* Main home page after login */}
//         <Route element={<WithHeader />}>
//           <Route path="/home" element={<MainPanel />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }


import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WeatherContext } from '../context/WeatherContextProvider';
import useCurrentLocation from '../hooks/useCurrentLocation';
import { DEFAULT_LOCATIONS, geolocationOptions } from './Const';
import Header2 from './HeaderFooter/Header2';
import Header from './HeaderFooter/Header';
import MainPanel from './MainPanel';
import MainPanel2 from './MainPanel2';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import SavedPage from '../components/SavedPage/SavedPage';

export default function AppRoutes() {
  const { location } = useCurrentLocation(geolocationOptions);
  const { getWeather } = useContext(WeatherContext);

  useEffect(() => {
    if (location !== undefined) {
      getWeather(location)
    } else {
      getWeather(
        DEFAULT_LOCATIONS[Math.floor(Math.random() * DEFAULT_LOCATIONS.length)]
      )
    }
  }, [location])


  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <MainPanel />
            </>
          }
        />
        {/* <Route path="/home" element={<MainPanel />} /> */}
        <Route path="/" element={<>
              <Header2 />
              <MainPanel2 />
            </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved" element={<SavedPage />} />

      </Routes>
    </Router>
  );
}


