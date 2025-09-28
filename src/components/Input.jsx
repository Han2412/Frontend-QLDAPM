import TextField from "@mui/material/TextField";

function Input({ label, name, value, onChange, type = "text", isView }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <TextField
        id={name}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        disabled={isView}
      />
    </div>
  );
}

export default Input;
