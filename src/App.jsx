import { BrowserRouter, Routes, Route } from "react-router-dom";

import Produtos from "./pages/Produtos";
import CadastroProduto from "./pages/CadastroProduto";
import EditarProduto from "./pages/EditarProduto";


function App(){

return(

<BrowserRouter>

<Routes>

<Route 
path="/" 
element={<Produtos/>}
/>


<Route 
path="/cadastro" 
element={<CadastroProduto/>}
/>


<Route 
path="/editar/:id" 
element={<EditarProduto/>}
/>


</Routes>

</BrowserRouter>

)

}


export default App;