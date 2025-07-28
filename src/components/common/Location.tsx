"use client";

import { useState } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import { toast } from "react-toastify";

export default function Location() {
  const [addressLine, setAddressLine] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        toast.success(`Lat: ${latitude}, Long: ${longitude}`);
        // TODO: Replace this with reverse geocoding
        setGeoLoading(false);
      },
      () => {
        toast.error("Unable to retrieve your location.");
        setGeoLoading(false);
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
      // Replace this with your update/store logic
      toast.success("Location updated successfully!");
      setAddressLine("");
      setStreet("");
      setCity("");
      setState("");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm";

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Update Location</h3>
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
