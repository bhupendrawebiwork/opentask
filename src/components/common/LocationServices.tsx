"use client";

import { useState, useEffect } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  OutlinedInput,
} from "@mui/material";

const skillsList = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "AC Technician",
  "Gardener",
  "Mason",
  "Welder",
  "Mechanic",
  "Pest Control",
  "Cleaner",
  "Driver",
  "CCTV Installer",
  "Interior Designer",
  "Other",
];

export default function LocationAndServices({ user, handleUpdate }: any) {
  /** ---------------- LOCATION STATES ---------------- */
  const [addressLine, setAddressLine] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [radius, setRadius] = useState<number | string>("");
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  /** ---------------- SERVICES STATES ---------------- */
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /** ---------------- INITIALIZE DATA ---------------- */
  useEffect(() => {
    if (user?.location) {
      const location = JSON.parse(user.location);
      setAddressLine(location.addressLine || "");
      setStreet(location.street || "");
      setCity(location.city || "");
      setState(location.state || "");
      if (location.radius) setRadius(location.radius);
    }
    if (user?.services) {
      setSelectedSkills(user.services || []);
    }
  }, [user]);

  /** ---------------- REVERSE GEOCODING ---------------- */
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5ca9686cf0b7446395c8084f36bdd53b`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;

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
        setAddressLine(`${latitude}, ${longitude}`);
        toast.success(`Location set to coordinates: ${latitude}, ${longitude}`);
      }
    } catch {
      setAddressLine(`${latitude}, ${longitude}`);
      toast.success(`Location set to coordinates: ${latitude}, ${longitude}`);
    }
  };

  /** ---------------- CURRENT LOCATION ---------------- */
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);
        setGeoLoading(false);
      },
      () => {
        toast.error("Unable to retrieve your location.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  /** ---------------- SKILLS CHANGE ---------------- */
  const handleSkillsChange = (event: any) => {
    const value = event.target.value;
    setSelectedSkills(value);
  };

  /** ---------------- SUBMIT BOTH LOCATION + SERVICES ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!addressLine || !street || !city || !state) {
      toast.error("Please fill all required location fields.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        location: { addressLine, street, city, state, radius },
        services: selectedSkills,
        otherSkill: selectedSkills.includes("Other") ? otherSkill : "",
      };

      await handleUpdate(payload);
      toast.success("Location and Services updated successfully!");
    } catch {
      toast.error("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** ---------------- INPUT STYLE ---------------- */
  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm";

  return (
    <div className="">
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* ---------------- LOCATION SECTION ---------------- */}
        <h3 className="text-xl font-semibold text-gray-800 mb-6 col-span-2">
          Update Your Work Location
        </h3>

        {[
          { label: "Address Line", value: addressLine, setter: setAddressLine, placeholder: "e.g. 221B Baker Street" },
          { label: "Street", value: street, setter: setStreet, placeholder: "e.g. Baker Street" },
          { label: "City", value: city, setter: setCity, placeholder: "e.g. London" },
          { label: "State", value: state, setter: setState, placeholder: "e.g. Maharashtra" },
        ].map((field, i) => (
          <div key={i}>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              {field.label}
            </label>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" size={16} />
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                required
                className={inputClass}
              />
            </div>
          </div>
        ))}

        {/* ---------------- RADIUS FIELD ---------------- */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Choose Your Radius (in km)
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="e.g. 10"
              className={inputClass}
            />
          </div>
        </div>

        {/* ---------------- SERVICES DROPDOWN ---------------- */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Select Your Skills
          </label>
          <FormControl fullWidth>
            <Select
              multiple
              open={dropdownOpen}
              onOpen={() => setDropdownOpen(true)}
              onClose={() => setDropdownOpen(false)}
              value={selectedSkills}
              onChange={handleSkillsChange}
              input={
                <OutlinedInput
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#93c5fd", // Tailwind blue-300
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#60a5fa", // Tailwind blue-400
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3b82f6", // Tailwind blue-500
                    },
                  }}
                />
              }
              renderValue={(selected) => (selected as string[]).join(", ")}
              MenuProps={{ PaperProps: { style: { maxHeight: 300, width: 250 } } }}
            >
              {skillsList.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  <Checkbox checked={selectedSkills.includes(skill)} />
                  <ListItemText primary={skill} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* ---------------- OTHER SKILL TEXTAREA FULL WIDTH ---------------- */}
        {selectedSkills.includes("Other") && (
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Please specify your skill
            </label>
            <TextField
              placeholder="Enter your skill here..."
              value={otherSkill}
              onChange={(e) => setOtherSkill(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "#93c5fd" },
                  "&:hover fieldset": { borderColor: "#60a5fa" },
                  "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                },
              }}
            />
          </div>
        )}

        {/* ---------------- USE CURRENT LOCATION BUTTON ---------------- */}
        <div className="col-span-2">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={geoLoading}
            className="flex items-center gap-2 text-[#27548a] hover:text-[#425a78] transition text-sm"
          >
            <LocateFixed size={16} />
            {geoLoading ? "Fetching location..." : "Use Current Location"}
          </button>
        </div>

        {/* ---------------- SUBMIT BUTTON ---------------- */}
        <div className="text-left col-span-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#27548a] text-white px-8 py-3 rounded-xl hover:bg-[#425a78] transition"
          >
            {loading ? "Updating..." : "Save Location & Services"}
          </button>
        </div>
      </form>
    </div>
  );
}
