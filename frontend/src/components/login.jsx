import React,{Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });

      };
    handleSubmit=e=>{
        let {username,password}=this.state;
        e.preventDefault();
        const user={
            username,
            password
        }
        console.log(user);
        axios.post("http://localhost:3000/login",user,{withCredentials:true})
		.then(res=>{
            console.log(res.data);
            if(res.data.usertype==='company') return window.location="/postJob";
            return window.location="/applyJob";
        })
		.catch(err=>{console.log(err.data)
        window.location='/login';
        })
		
    }

    render(){
      console.log(this.props);
        let {username,password}=this.state;
            return(
                <div className="container h-100">
    <div className="d-flex justify-content-center h-100">
      <div className="user_card">
        <div className="d-flex justify-content-center">
          <div className="brand_logo_container">
            <img src="https://logodix.com/logo/43957.gif" className="brand_logo" alt="Logo" />
          </div>
        </div>
        <div className="d-flex justify-content-center form_container">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input type="text" name="username" className="form-control input_user" value={username} onChange={this.handleChange} placeholder="username" required/>
            </div>
            <div className="input-group mb-2">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-key"></i></span>
              </div>
              <input type="password" name="password" className="form-control input_pass" value={password} onChange={this.handleChange} placeholder="password" required/>
            </div>
            <div className="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" className="btn login_btn">Login</button>
            </div>
          </form>
        </div>

        <div className="mt-4">
          <div className="d-flex justify-content-center links">
            Don't have an account? <Link to ="/" className="ml-2">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
            )
    }

}