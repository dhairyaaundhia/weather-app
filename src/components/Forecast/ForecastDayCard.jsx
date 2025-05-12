// import { DAY, WEATHER_CODES } from '../Const'
// import { useContext, useEffect, useState } from 'react'
// import Img from '../Utils/Img'
// import Temp from '../../img/Temp.png'
// import { WeatherContext } from '../../context/WeatherContextProvider'
// import WindHumData from '../Utils/WindHumData'

// export default function ForecastDayCard({ active }) {
//   const { forecast, degreeType } = useContext(WeatherContext)
//   const day = forecast?.forecastday?.[active]

//   const [data, setData] = useState([])

//   useEffect(() => {
//     setData([])
//     day?.hour?.forEach((day, index) => {
//       setData((prev) => [
//         ...prev,
//         {
//           x: index,
//           y: degreeType === 'C' ? day.temp_c : day.temp_f
//         }
//       ])
//     })
//   }, [forecast, degreeType, active])

//   // Get tomorrow's date
//   const tomorrow = new Date(day?.date)
//   tomorrow.setDate(tomorrow.getDate() + 1)

//   return (
//     <div
//       className='grid grid-cols-1 bg-[#282c34] dark:bg-slate-700 gap-y-3 md:gap-y-0 gap-x-0 md:gap-x-3 md:grid-cols-3 delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out'
//       data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
//     >
//       <div className='relative border-[3px] border-cardGray dark:border-slate-900 col-span-3 h-80 w-full grid grid-cols-2 sm:grid-cols-4 grid-rows-4 justify-center items-center px-3 sm:px-6'>
//         <div className='col-start-1 row-start-1'>
//           {/* Display tomorrow's day */}
//           <h3 className='mt-8 text-2xl place-self-start dark:text-gray-100'>
//             {DAY[tomorrow.getDay()]} {/* This will show tomorrow's day */}
//           </h3>
//           <h3 className='mb-4 text-lg text-gray-500 dark:text-cardGray'>
//             {day?.day?.condition?.text}
//           </h3>
//         </div>
//         <div className='col-span-1 col-start-3 '></div>
//         <Img
//           className='mt-4 place-self-end'
//           src={
//             WEATHER_CODES[day?.day?.condition?.code]?.[
//               (day?.day?.condition?.code === 1000 && day?.day?.is_day) === 0
//                 ? 1
//                 : 0
//             ]
//           }
//           alt='Weather'
//           width={70}  // Decrease the image size
//           height={70}
//         />
//         <div className='col-span-3 gap-2'>
//           <WindHumData
//             src='wind'
//             title='Max Wind: '
//             text=' km/h '
//             data={`${day?.day?.maxwind_kph}`}
//           />
//           <WindHumData
//             src='humidity'
//             title='Avg Humidity: '
//             text='%'
//             data={day?.day?.avghumidity}
//           />
//         </div>
//         <div className='flex flex-col col-start-4 mt-4 place-items-end'>
//           <div className='flex items-center flex-col-reverse sm:flex-row'>
//             <h2 className='col-span-2 text-xl font-bold sm:text-2xl lg:text-3xl dark:text-gray-100'>
//               {degreeType === 'C'
//                 ? day?.day?.avgtemp_c + '°C'
//                 : day?.day?.avgtemp_f + '°F'}
//             </h2>
//             <img className='w-10 h-10' src={Temp} alt='Max temp' />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { DAY, WEATHER_CODES } from "../Const";
import { useContext, useEffect, useState } from "react";
import Img from "../Utils/Img";
import Temp from "../../img/Temp.png";
import { WeatherContext } from "../../context/WeatherContextProvider";
import WindHumData from "../Utils/WindHumData";

export default function ForecastDayCard({ active }) {
  const { forecast, degreeType } = useContext(WeatherContext);
  const day = forecast?.forecastday?.[active];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    day?.hour?.forEach((day, index) => {
      setData((prev) => [
        ...prev,
        {
          x: index,
          y: degreeType === "C" ? day.temp_c : day.temp_f,
        },
      ]);
    });
  }, [forecast, degreeType, active]);

  // Get tomorrow's date
  const tomorrow = new Date(day?.date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div
      className="grid grid-cols-1 bg-[#282c34] dark:bg-slate-700 gap-y-3 md:gap-y-0 gap-x-0 md:gap-x-3 md:grid-cols-3 delay-300 duration-700 transform opacity-0 transition-all translate-y-12 ease-out"
      data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'
    >
      <div className="relative border-[3px] border-cardGray dark:border-slate-900 col-span-3 h-auto w-full grid grid-cols-2 sm:grid-cols-4 justify-center items-center px-3 sm:px-6 py-8">
        <div className="col-start-1 row-start-1 mb-4">
          {/* Display tomorrow's day */}
          <h3 className="text-2xl place-self-start dark:text-gray-100">
            {DAY[tomorrow.getDay()]} {/* This will show tomorrow's day */}
          </h3>
          <h3 className="text-lg text-gray-500 dark:text-cardGray">
            {day?.day?.condition?.text}
          </h3>
        </div>

        <div className="col-span-1 col-start-3 sm:col-start-4 row-start-1 flex justify-end">
          <Img
            className="place-self-end"
            src={
              WEATHER_CODES[day?.day?.condition?.code]?.[
                (day?.day?.condition?.code === 1000 && day?.day?.is_day) === 0
                  ? 1
                  : 0
              ]
            }
            alt="Weather"
            width={70}
            height={70}
          />
        </div>

        <div className="col-span-2 col-start-1 row-start-2 mt-2">
          <WindHumData
            src="wind"
            title="Max Wind: "
            text=" km/h "
            data={`${day?.day?.maxwind_kph}`}
          />
          <WindHumData
            src="humidity"
            title="Avg Humidity: "
            text="%"
            data={day?.day?.avghumidity}
          />
        </div>

        <div className="col-span-2 col-start-3 sm:col-start-4 row-start-2 flex justify-end mt-2">
          <div className="flex items-center">
            <img className="w-10 h-10 mr-2" src={Temp} alt="Avg temp" />
            <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl dark:text-gray-100">
              {degreeType === "C"
                ? day?.day?.avgtemp_c + "°C"
                : day?.day?.avgtemp_f + "°F"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
