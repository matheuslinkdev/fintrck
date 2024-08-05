import { Box, List } from "@mui/material";
import { useState } from "react";
import colors from "../../styles/colors";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Box
        onClick={handleNavOpen}
        sx={{
          position: "absolute",
          top: 20,
          left: 10,
          zIndex: 2,
          bgcolor: colors.common[950],
          color: "#fff",
          borderRadius: "50%",

          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Box>
      <Box
        component="nav"
        sx={{
          bgcolor: colors.common[300],
          position: "absolute",
          top: 0,
          ml: isOpen ? 0 : "-200px",
          width: "200px",
          display: "flex",
          alignItems: "center",
          height: "100dvh",
          pl: 2,
          transition: "left 0.3s ease",
          zIndex: 1,
        }}
      >
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/entries" onClick={() => setIsOpen(false)}>
            Entradas
          </Link>
          <Link to="/expenses" onClick={() => setIsOpen(false)}>
            Saídas
          </Link>
          <Link to="/importants" onClick={() => setIsOpen(false)}>
            Importantes
          </Link>
          <Link to="/reminders" onClick={() => setIsOpen(false)}>
            Lembretes
          </Link>
          <Link to="/add" onClick={() => setIsOpen(false)}>
            Adicionar
          </Link>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
