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
import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Registro feito com sucesso !");
    } catch (err) {
      console.error(err);
    }

    setFormData({
      label: "",
      value: "",
      transactionType: "income",
      isImportant: false,
      date: "",
      description: "",
      bank: "",
      recurring: false,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 600,
        maxWidth: "95dvw",
        margin: "auto",
        bgcolor: colors.common[900],
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        border: `2px solid ${colors.blue[600]}`,
      }}
    >
      <TextField
        label="Título"
        variant="filled"
        InputProps={{
          sx: {
            bgcolor: colors.common[700],
            color: colors.common[100],
          },
          style: { color: colors.common[100] },
        }}
        InputLabelProps={{
          style: {
            color: colors.common[100],
            fontSize: 16,
            fontWeight: 600,
            opacity: "50%",
          },
        }}
        name="label"
        value={formData.label}
        onChange={handleChange}
        fullWidth
        required
      />

      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
      >
        <TextField
          label="Quantia"
          variant="filled"
          InputProps={{
            sx: {
              bgcolor: colors.common[700],
              color: colors.common[100],
            },
            style: { color: colors.common[100] },
          }}
          InputLabelProps={{
            style: {
              color: colors.common[100],
              fontSize: 16,
              fontWeight: 600,
              opacity: "50%",
            },
          }}
          name="value"
          type="number"
          value={formData.value}
          onChange={handleChange}
          required
        />
        <TextField
          label="Data"
          variant="filled"
          InputProps={{
            sx: {
              bgcolor: colors.common[700],
              color: colors.common[100],
            },
            style: { color: colors.common[100] },
          }}
          InputLabelProps={{
            style: {
              color: colors.common[100],
              fontSize: 16,
              fontWeight: 600,
              opacity: "50%",
            },
            shrink: true,
          }}
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: colors.common[100] }}>
            Tipo de Transação
          </FormLabel>
          <RadioGroup
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="income"
              control={<Radio sx={{ color: colors.common[100] }} />}
              label="Entrada"
              sx={{ color: colors.common[100] }}
            />
            <FormControlLabel
              value="expense"
              control={<Radio sx={{ color: colors.common[100] }} />}
              label="Saída"
              sx={{ color: colors.common[100] }}
            />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleChange}
              sx={{ color: colors.common[100] }}
            />
          }
          label="Importante"
          sx={{ color: colors.common[100] }}
        />
      </Box>

      <TextField
        label="Descrição"
        variant="filled"
        InputProps={{
          sx: {
            bgcolor: colors.common[700],
            color: colors.common[100],
          },
          style: { color: colors.common[100] },
        }}
        InputLabelProps={{
          style: {
            color: colors.common[100],
            fontSize: 16,
            fontWeight: 600,
            opacity: "50%",
          },
        }}
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
      >
        <TextField
          label="Banco ou Método de pagamento"
          variant="filled"
          InputProps={{
            sx: {
              bgcolor: colors.common[700],
              color: colors.common[100],
            },
            style: { color: colors.common[100] },
          }}
          InputLabelProps={{
            style: {
              color: colors.common[100],
              fontSize: 16,
              fontWeight: 600,
              opacity: "50%",
            },
          }}
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          sx={{
            flex: 2,
            bgcolor: colors.common[700],
            color: colors.common[100],
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
              sx={{ color: colors.common[100] }}
            />
          }
          label="Recorrente"
          sx={{ color: colors.common[100] }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          fontWeight: 600,
          textTransform: "none",
          bgcolor:
            formData.transactionType === "income"
              ? colors.green[600]
              : colors.red[600],
          "&:hover": {
            bgcolor:
              formData.transactionType === "income"
                ? colors.green[700]
                : colors.red[700],
          },
        }}
      >
        {formData.transactionType === "income"
          ? "Registrar Entrada"
          : "Registrar Saída"}
      </Button>
      <ToastContainer autoClose={3000} style={{color: "#212121"}}/>
    </Box>
  );
};

export default FinanceRegForm;
