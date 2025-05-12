import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeatherContext } from "../../context/WeatherContextProvider";

export default function Header() {
  const { degreeType, changeDegreeType } = useContext(WeatherContext);
  const [degree, setDegree] = useState("C");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const changeDegree = () => {
    if (degreeType === "C") {
      setDegree("F");
      changeDegreeType("F");
    } else {
      setDegree("C");
      changeDegreeType("C");
    }
  };

  return (
    <div className="flex justify-around w-full p-4 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-900 items-center">
      <h1 className="text-2xl font-bold lg:col-start-2">Weather.IO</h1>
      <div className="flex gap-1 text-base">
        <button
          className={degree === "C" ? "text-yellow-500 font-bold" : "font-bold"}
          type="button"
          onClick={() => changeDegree()}
        >
          Cº
        </button>
        <span className="font-bold">/</span>
        <button
          className={degree === "F" ? "text-yellow-500 font-bold" : "font-bold"}
          type="button"
          onClick={() => changeDegree()}
        >
          Fº
        </button>
      </div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleLoginClick} // Trigger navigation on click
        >
          Login
        </button>
      </div>
    </div>
  );
}
