const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData"); // Make sure this model is correct

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string (Consider moving this to environment variables)
const uri =
  "mongodb+srv://dhairya1234ja:dhairya2005@cluster0.xqhg7lp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Registration Route
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  FormDataModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.json("Already registered");
      }

      const newUser = new FormDataModel({ name, email, password });

      newUser
        .save()
        .then(() => res.json("Registered successfully!"))
        .catch((err) => {
          console.error("Error saving user:", err);
          res.status(500).json("Server error");
        });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json("Server error");
    });
});

// Route to get saved locations
app.post("/get-saved-locations", (req, res) => {
  const { email } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        res.json(user.savedLocations); // Send the saved locations
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching saved locations:", err);
      res.status(500).json("Server error");
    });
});

// Route to delete a location
app.post("/delete-location", (req, res) => {
  const { email, location } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        // Filter out the location to delete it
        user.savedLocations = user.savedLocations.filter(
          (loc) => loc !== location
        );

        user
          .save()
          .then(() => res.json("Location deleted successfully"))
          .catch((err) => {
            console.error("Error deleting location:", err);
            res.status(500).json("Server error");
          });
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json("Server error");
    });
});

// Route to save a new location
app.post("/save-location", (req, res) => {
  const { email, location } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        // Check if the location is already saved
        if (user.savedLocations.includes(location)) {
          return res.json("Location already saved");
        }

        user.savedLocations.push(location);
        user
          .save()
          .then(() => res.json("Location saved successfully"))
          .catch((err) => {
            console.error("Error saving location:", err);
            res.status(500).json("Server error");
          });
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json("Server error");
    });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json("No records found!");
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json("Server error");
    });
});

const PORT = process.env.PORT || 3001; // Change the port number if 3001 is in use
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
