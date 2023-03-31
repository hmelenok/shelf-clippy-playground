import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ options, onChange }) {
  return (
    <Autocomplete
      disablePortal
      id="predefined-text"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Article" />}
    onChange={onChange}
    />
  );
}
