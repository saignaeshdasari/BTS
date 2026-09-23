import axios from "axios";

export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,

          lon: longitude,

          format: "json",

          zoom: 18,
        },

        headers: {
          "User-Agent": "CollegeBusTrackingSystem/1.0",
        },
      },
    );

    return response.data?.display_name || "Unknown location";
  } catch (error) {
    console.log("Geocoding error:", error.message);

    return "Location unavailable";
  }
};
