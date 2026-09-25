const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const dataPath = path.join(__dirname, "data", "facilities.json");

app.use(cors());
app.use(express.json());

function readFacilities() {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

function writeFacilities(facilities) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(facilities, null, 2),
    "utf-8"
  );
}

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Facility Inspection API is running",
    status: "success"
  });
});

// Get all facilities
app.get("/api/facilities", (req, res) => {
  try {
    const facilities = readFacilities();

    res.json({
      status: "success",
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to load facilities"
    });
  }
});

// Get facility by ID
app.get("/api/facilities/:id", (req, res) => {
  try {
    const facilities = readFacilities();
    const id = Number(req.params.id);

    const facility = facilities.find(
      (item) => item.id === id
    );

    if (!facility) {
      return res.status(404).json({
        status: "error",
        message: "Facility not found"
      });
    }

    res.json({
      status: "success",
      data: facility
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to load facility"
    });
  }
});

// Add new facility inspection
app.post("/api/facilities", (req, res) => {
  try {
    const facilities = readFacilities();

    const {
      name,
      location,
      cleanlinessScore,
      odorScore,
      wasteLevel,
      waterAvailability,
      footfall,
      complaints,
      inspectionDate,
      inspector,
      status
    } = req.body;

    if (!name || !location || !inspectionDate) {
      return res.status(400).json({
        status: "error",
        message: "Name, location and inspection date are required"
      });
    }

    const newFacility = {
      id: facilities.length > 0
        ? Math.max(...facilities.map((item) => item.id)) + 1
        : 1,
      name,
      location,
      cleanlinessScore: Number(cleanlinessScore) || 0,
      odorScore: Number(odorScore) || 0,
      wasteLevel: Number(wasteLevel) || 0,
      waterAvailability: waterAvailability ?? true,
      footfall: Number(footfall) || 0,
      complaints: Number(complaints) || 0,
      inspectionDate,
      inspector: inspector || "Not Assigned",
      status: status || "Pending"
    };

    facilities.push(newFacility);
    writeFacilities(facilities);

    res.status(201).json({
      status: "success",
      message: "Facility inspection added successfully",
      data: newFacility
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to add facility"
    });
  }
});

// Get inspection history
app.get("/api/inspections/history", (req, res) => {
  try {
    const facilities = readFacilities();

    const history = facilities
      .filter((facility) => facility.inspectionDate)
      .map((facility) => ({
        id: facility.id,
        facilityName: facility.name,
        location: facility.location,
        inspectionDate: facility.inspectionDate,
        inspector: facility.inspector,
        cleanlinessScore: facility.cleanlinessScore,
        status: facility.status
      }));

    res.json({
      status: "success",
      count: history.length,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to load inspection history"
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "API endpoint not found"
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Facility Inspection API running on http://localhost:${PORT}`);
});