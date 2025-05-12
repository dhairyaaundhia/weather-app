import { DAY, MONTHS } from '../components/Const';
import { WeatherContext } from '../context/WeatherContextProvider';
import { useContext } from 'react';

const useDate = () => {
  const { location } = useContext(WeatherContext);

  const { localtime } = location || '';
  const time = localtime?.slice(-5);
  const month = localtime?.slice(5, 7);
  const day = localtime?.slice(8, 10);
  const year = localtime?.slice(0, 4);
  const currentDate = ` ${day} ${MONTHS[month]} ${year}`;
  const weekday = new Date(currentDate).getDay() || 0;

  const date = `${DAY[weekday] + ', ' + currentDate}`;

  // Function to convert 24-hour time to 12-hour format
  const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert '0' hour to '12'
    return `${hours}:${minutes} ${period}`;
  };

  const time12 = convertTo12HourFormat(time);

  return {time: time12, date };
};

export default useDate;
