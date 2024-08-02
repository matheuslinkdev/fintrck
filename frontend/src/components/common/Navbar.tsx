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
          <Link to="/">Home</Link>
          <Link to="/dash">Dashboard</Link>
          <Link to="/entries">Entries</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/importants">Importants</Link>
          <Link to="/reminders">Reminders</Link>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
