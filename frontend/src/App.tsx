import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import colors from "./styles/colors"
import Navbar from "./components/common/Navbar"

function App() {

  return (
    <>
    <Navbar/>
      <Typography color={colors.common[100]}>HomePage</Typography>
      <Button variant="contained" onClick={()=> alert("Você apertou meu botão")}>Aperte o botao</Button>
    </>
  )
}

export default App
