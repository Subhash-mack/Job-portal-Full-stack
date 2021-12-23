import React,{Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Logout extends Component{
    
    componentDidMount(){
        axios.get("http://localhost:3000/logout")
        .then(res=>{
            console.log(res.data);
            window.location="/login"})
        .catch(err=>{
            console.log(err);
        });

    }

    render(){
        return(
            <Link to="/login">Login </Link>
        )
    }
}