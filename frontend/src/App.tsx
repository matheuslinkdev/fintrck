import { Button } from "@mui/material"
import { Link } from "react-router-dom"

function App() {

  return (
    <>
      <h2>HomePage</h2>
      <ul>
        <Link to="/dash">dash</Link>
        <Link to="/transactions">transactions</Link>
        <Link to="/entries">entries</Link>
        <Link to="/expenses">expenses</Link>
        <Link to="/transactions/:id">details</Link>
      </ul>
      <Button variant="contained" onClick={()=> alert("Você apertou meu botão")}>Aperte o botao</Button>
    </>
  )
}

export default App
