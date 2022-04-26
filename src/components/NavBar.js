import React from "react";
import './styles/NavBar.css';
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";

class Navbar extends React.Component{
    render(){
    return(
         <nav>
             <figure>
                 <Link to="/">
                     <img className="logo" src={logo} alt="Logo"/>
                 </Link>
             </figure>
             <ul>
                 <li>
                     <Link to="/">Home</Link>
                 </li>
                 <li>
                     <Link to="../SobreNosotros.js">SobreNosotros</Link>
                 </li>
                 <li>
                     <Link to="../Productos">Productos</Link>
                 </li>
             </ul>
         </nav>
    );
}
}
export default Navbar;