"use client";

import { useState, useEffect } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import { toast } from "react-toastify";

export default function Location({ user, handleUpdate }: any) {
  const [addressLine, setAddressLine] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  // Initialize form with user location data
  useEffect(() => {
    if (user?.location) {
      const location = JSON.parse(user.location);
      // user.location = JSON.parse(user.location);
      setAddressLine(location.addressLine || "");
      setStreet(location.street || "");
      setCity(location.city || "");
      setState(location.state || "");
    }
  }, [user]);

  // Reverse geocoding function
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5ca9686cf0b7446395c8084f36bdd53b`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const components = result.components;

        setAddressLine(
          components.house_number
            ? `${components.house_number} ${components.road || ""}`.trim()
            : components.road || ""
        );
        setStreet(components.road || "");
        setCity(components.city || components.town || components.village || "");
        setState(components.state || components.state_district || "");

        toast.success("Location updated from current position!");
      } else {
        // Fallback: just show coordinates if geocoding fails
        setAddressLine(`${latitude}, ${longitude}`);
        toast.success(`Location set to coordinates: ${latitude}, ${longitude}`);
      }
    } catch (error) {
      // Fallback: use coordinates if reverse geocoding fails
      setAddressLine(`${latitude}, ${longitude}`);
      toast.success(`Location set to coordinates: ${latitude}, ${longitude}`);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Perform reverse geocoding to get address
        await reverseGeocode(latitude, longitude);

        setGeoLoading(false);
      },
      () => {
        toast.error("Unable to retrieve your location.");
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleUpdateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!addressLine || !street || !city || !state) {
      toast.error("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Create location object to pass to handleUpdate
      const locationData = {
        location: {
          addressLine,
          street,
          city,
          state,
        },
      };

      // Call the handleUpdate function passed from parent
      await handleUpdate(locationData);

      toast.success("Location updated successfully!");
    } catch (error) {
      toast.error("Failed to update location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm";

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Update Location
      </h3>
      <form className="grid grid-cols-2 gap-6" onSubmit={handleUpdateLocation}>
        {/* Address Line */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Address Line
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="e.g. 221B Baker Street"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Street */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Street
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Baker Street"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. London"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* State */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            State
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. Maharashtra"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Use Current Location Button */}
        <div className="col-span-2">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={geoLoading}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition text-sm"
          >
            <LocateFixed size={16} />
            {geoLoading ? "Fetching location..." : "Use Current Location"}
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-left col-span-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition"
          >
            {loading ? "Updating..." : "Update Location"}
          </button>
        </div>
      </form>
    </>
  );
}
