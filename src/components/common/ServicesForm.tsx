"use client";

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Box,
  Button,
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

export default function ServicesForm() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (event: any) => {
    const value = event.target.value;

    // Handle "Select All"
    if (value.includes("Select All")) {
      const allSelected = selectedSkills.length === skillsList.length;
      setSelectedSkills(allSelected ? [] : skillsList);
      return;
    }

    // Handle "Other" and close dropdown immediately
    if (value.includes("Other") && !selectedSkills.includes("Other")) {
      setSelectedSkills([...value]);
      setDropdownOpen(false);
    } else {
      setSelectedSkills(value);
    }
  };

  const isAllSelected = selectedSkills.length === skillsList.length;

  const handleSave = () => {
    const data = {
      skills: selectedSkills,
      other: selectedSkills.includes("Other") ? otherSkill : "",
    };
    console.log("Submitted Data:", data);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mt: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // aligns left
      }}
    >
        <h4 className="text-xl font-semibold text-gray-800 mb-6">Select Your Skills</h4>
     <FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel id="skills-label">Select Your Skills</InputLabel>
  <Select
    labelId="skills-label"
    id="skills-select"
    multiple
    open={dropdownOpen}
    onOpen={() => setDropdownOpen(true)}
    onClose={() => setDropdownOpen(false)}
    value={selectedSkills}
    onChange={handleChange}
    input={<OutlinedInput label="Select Your Skills" />}
    renderValue={(selected) => selected.join(", ")}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 300,
          width: 250,
        },
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left",
      },
    }}
  >
    <MenuItem value="Select All">
      <Checkbox checked={isAllSelected} />
      <ListItemText primary="Select All" />
    </MenuItem>

    {skillsList.map((skill) => (
      <MenuItem key={skill} value={skill}>
        <Checkbox checked={selectedSkills.includes(skill)} />
        <ListItemText primary={skill} />
      </MenuItem>
    ))}
  </Select>
</FormControl>


      {selectedSkills.includes("Other") && (
        <TextField
          label="Please specify your skill"
          placeholder="Enter your skill here..."
          value={otherSkill}
          onChange={(e) => setOtherSkill(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      )}

      <Button variant="contained" color="primary" onClick={handleSave} className="mt-6">
        Save
      </Button>
    </Box>
  );
}
