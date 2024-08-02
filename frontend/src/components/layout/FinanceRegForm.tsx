import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import colors from "../../styles/colors";
import axios from "axios";

const FinanceRegForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    transactionType: "income",
    isImportant: false,
    date: "",
    description: "",
    bank: "",
    recurring: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3333/dash", formData);
      console.log(res)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        bgcolor: colors.blue[500],
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <TextField
        label="Label"
        variant="outlined"
        name="label"
        value={formData.label}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Quantia"
        variant="outlined"
        name="value"
        type="number"
        value={formData.value}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo de Transação</FormLabel>
        <RadioGroup
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="income"
            control={<Radio />}
            label="Entrada"
          />
          <FormControlLabel value="expense" control={<Radio />} label="Saída" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name="isImportant"
            checked={formData.isImportant}
            onChange={handleChange}
          />
        }
        label="Is Important"
      />
      <TextField
        label="Date"
        variant="outlined"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
      />
      <TextField
        label="Bank"
        variant="outlined"
        name="bank"
        value={formData.bank}
        onChange={handleChange}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
          />
        }
        label="Recurring"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default FinanceRegForm;
