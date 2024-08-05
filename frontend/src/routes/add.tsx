import { Container } from "@mui/material";
import FinanceRegForm from "../components/layout/FinanceRegForm";

const AddPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
      }}
    >
      <FinanceRegForm />
    </Container>
  );
};

export default AddPage;
