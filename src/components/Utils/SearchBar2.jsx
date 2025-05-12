// import { useContext, useState } from 'react';
// import PlacesAutocomplete from 'react-places-autocomplete/dist/PlacesAutocomplete';
// import { WeatherContext } from '../../context/WeatherContextProvider';

// export default function SearchBar({ setSearchedLocation }) {
//   const [input, setInput] = useState('');
//   const { searchWeather } = useContext(WeatherContext);

//   return (
//     <form className="relative z-10 grid grid-cols-2">
//       <PlacesAutocomplete
//         onChange={(address) => setInput(address)}
//         value={input}
//         onSelect={(newAddress) => {
//           setSearchedLocation(newAddress);
//           localStorage.setItem('searchedLocation', newAddress);

//           searchWeather(newAddress); // Pass the string directly, not as an object

//           setInput('');
//         }}

//         googleCallbackName="initOne"
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div className="w-full col-span-3 md:col-end-4 md:col-span-2">
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'w-full h-10 p-3 mt-5 border rounded border-cardGray place-self-end'
//               })}
//             />
//             <div className="absolute z-50 max-w-xs p-3 bg-white border rounded top-15 h-fit empty:hidden border-cardGray place-self-start">
//               {loading && ''}
//               {suggestions.map((suggestion) => {
//                 const className = suggestion.active
//                   ? 'mt-2 border-b border-solid border-cardGray'
//                   : 'mt-2 border-b border-dashed border-cardGray';

//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };

//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style
//                     })}
//                     key={suggestion.description}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </form>
//   );
// }
// import { useContext, useState, useEffect } from "react";
// import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
// import { WeatherContext } from "../../context/WeatherContextProvider";

// export default function SearchBar({ setSearchedLocation }) {
//   const [input, setInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selected, setSelected] = useState(false);
//   const { searchWeather } = useContext(WeatherContext);

//   // Fetch suggestions from Nominatim API when input changes
//   useEffect(() => {
//     if (input.length < 3) {
//       setSuggestions([]);
//       return;
//     }
//     if (selected) return;

//     const timer = setTimeout(() => {
//       setLoading(true);
//       fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
//           input
//         )}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setSuggestions(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching suggestions:", error);
//           setLoading(false);
//         });
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [input, selected]);

//   return (
//     <form className="relative z-10 grid grid-cols-2">
//       <PlacesAutocomplete
//         onChange={(address) => setInput(address)}
//         value={input}
//         onSelect={(newAddress) => {
//           setSearchedLocation(newAddress);
//           localStorage.setItem("searchedLocation", newAddress);
//           searchWeather(newAddress);
//           setInput("");
//           setSelected(true);
//         }}
//         googleCallbackName="initOne"
//       >
//         {({
//           getInputProps,
//           suggestions: googleSuggestions,
//           getSuggestionItemProps,
//           loading: googleLoading,
//         }) => (
//           <div className="w-full col-span-3 md:col-end-4 md:col-span-2">
//             <input
//               {...getInputProps({
//                 placeholder: "Search Places ...",
//                 className:
//                   "w-full h-10 p-3 mt-5 border rounded border-cardGray place-self-end",
//               })}
//               onChange={(e) => {
//                 setInput(e.target.value);
//                 setSelected(false);
//               }}
//             />
//             <div className="absolute z-50 max-w-xs p-3 bg-white border rounded top-15 h-fit empty:hidden border-cardGray place-self-start">
//               {(googleLoading || loading) && (
//                 <div className="text-sm text-gray-500">Loading...</div>
//               )}
//               {[...googleSuggestions, ...suggestions].map(
//                 (suggestion, index) => {
//                   const className = suggestion.active
//                     ? "mt-2 border-b border-solid border-cardGray"
//                     : "mt-2 border-b border-dashed border-cardGray";
//                   const style = suggestion.active
//                     ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                     : { backgroundColor: "#ffffff", cursor: "pointer" };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                       key={
//                         suggestion.place_id || suggestion.display_name || index
//                       }
//                       onClick={() => {
//                         setSearchedLocation(
//                           suggestion.description || suggestion.display_name
//                         );
//                         localStorage.setItem(
//                           "searchedLocation",
//                           suggestion.description || suggestion.display_name
//                         );
//                         searchWeather(
//                           suggestion.description || suggestion.display_name
//                         );
//                         setInput("");
//                         setSelected(true);
//                       }}
//                     >
//                       <span>
//                         {suggestion.description || suggestion.display_name}
//                       </span>
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </form>
//   );
// }

import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContextProvider";

export default function SearchBar2({ setSearchedLocation }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchWeather } = useContext(WeatherContext);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }
    if (selected) return;

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          input
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [input, selected]);

  const handleSelection = (suggestion) => {
    const locationName = suggestion.display_name;
    if (setSearchedLocation) {
      setSearchedLocation(locationName);
      localStorage.setItem("searchedLocation", locationName);
    }
    searchWeather(locationName);
    setInput("");
    setSuggestions([]);
    setSelected(true);
  };

  return (
    <form
      className="relative z-10 grid grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-full col-span-3 md:col-end-4 md:col-span-2">
        <input
          type="text"
          placeholder="Search Places ..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelected(false);
          }}
          className="w-full h-10 p-3 mt-5 border rounded border-cardGray place-self-end"
        />
        <div className="absolute z-50 max-w-xs p-3 bg-white border rounded top-15 h-fit empty:hidden border-cardGray place-self-start">
          {loading && <div className="text-sm text-gray-500">Loading...</div>}
          {suggestions.length === 0 && input.length >= 3 && !loading && (
            <div className="text-sm text-gray-500">No results found</div>
          )}
          {suggestions.map((suggestion) => {
            const className = "mt-2 border-b border-dashed border-cardGray";
            const style = { backgroundColor: "#ffffff", cursor: "pointer" };

            return (
              <div
                key={suggestion.place_id}
                className={className}
                style={style}
                onClick={() => handleSelection(suggestion)}
              >
                <span>{suggestion.display_name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}
