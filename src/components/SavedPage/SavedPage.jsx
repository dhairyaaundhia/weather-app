import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SavedPage = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Function to delete a location
  const deleteLocation = (locationToDelete) => {
    axios.post('http://localhost:3001/delete-location', { email, location: locationToDelete })
      .then(response => {
        if (response.data === "Location deleted successfully") {
          alert("Location deleted!");
          setSavedLocations(savedLocations.filter(location => location !== locationToDelete));
        } else {
          alert("Error deleting location");
        }
      })
      .catch(err => console.error('Error deleting location:', err));
  };

  // Function to handle clicking a location to search it in the main panel
  const handleLocationClick = (location) => {
    localStorage.setItem('searchedLocation', location); // Save the location to localStorage
    navigate('/home'); // Redirect to the main panel
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
      axios.post('http://localhost:3001/get-saved-locations', { email: userEmail })
        .then(response => {
          setSavedLocations(response.data);
        })
        .catch(err => console.error('Error fetching saved locations:', err));
    } else {
      alert("Please log in to view saved locations.");
    }
  }, [email]);

  return (
    <div className="w-full min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Saved Locations</h2>
        {savedLocations.length ? (
          <ul className="list-none w-full max-w-2xl mx-auto">
            {savedLocations.map((location, index) => (
              <li
                key={index}
                className="bg-gray-700 rounded-md p-4 mb-4 flex justify-between items-center shadow-md hover:bg-gray-600 transition duration-300"
              >
                <span
                  className="text-lg font-bold mr-4 cursor-pointer"
                  onClick={() => handleLocationClick(location)} // Handle location click
                >
                  {index + 1}. {location}
                </span>
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-400"
                  onClick={() => deleteLocation(location)}  // Delete the location
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-300">No saved locations yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
