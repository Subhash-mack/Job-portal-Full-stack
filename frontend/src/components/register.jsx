import React,{Component} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            phone: "",
            location:"",
            usertype:"",
            errors: {}
          };
        this.handleChange=this.handleChange.bind(this);
        this.formSubmit=this.formSubmit.bind(this);
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });

      };
	  formValidation(userData){
		  let formIsValid;
		  let  errors=this.state.errors;
		
		let lastAtPos = userData["email"].lastIndexOf("@");
        let lastDotPos = userData["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          userData["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          userData["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
	  	this.setState({errors:errors})
	  	return formIsValid;
	  }
      formSubmit = e => {
        e.preventDefault();
        let {username,email,password,usertype,location,phone}=this.state;
        const user={
            username:username,   
            email: email,
            password:password,
            location:location,
            number:phone,
            usertype:usertype
        }
		if(!this.formValidation(user)) return;
		console.log(user);
        axios.post("http://localhost:3000",user)
		.then(res=>console.log(res.data))
		.catch(err=>console.log(err.data))

		window.location="/login";
        
    }
    render(){
        let {username,email,password,usertype,location,phone}=this.state;
        return(
            <div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card1">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src="https://logodix.com/logo/43957.gif" className="brand_logo" alt="Logo" />
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={this.formSubmit}>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="text" name="username" className="form-control input_user" value={username} onChange={this.handleChange}
								placeholder="username" required/>
							<div className="errorMsg">{this.state.errors.username}</div>
						</div>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" name="password" className="form-control input_pass" value={password} onChange={this.handleChange}
								placeholder="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Invalid password" required/>
						</div>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="email" name="email" className="form-control input_user" value={email} onChange={this.handleChange}
								placeholder="Email" required/>
							<div className="errorMsg">{this.state.errors.email}</div>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="text" name="location" className="form-control input_user" value={location} onChange={this.handleChange}
								placeholder="Location" required/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="number" name="phone" className="form-control input_user" value={phone} onChange={this.handleChange}
								placeholder="Phone" pattern="^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$" title="Invalid number" required/>
						</div>
                        <label> User Type: </label> <br />
						<fieldset className="" onChange={this.handleChange} >
							<label className="radio-inline"><input type="radio" name="usertype" value="company" checked={usertype==='company'} onChange={this.handleChange} required />  company </label>
							<label className="radio-inline"><input type="radio" name="usertype" value="job-seeker" checked={usertype=== 'job-seeker'} onChange={this.handleChange} required /> job-seeker </label>
						</fieldset>
						<div className="d-flex justify-content-center mt-3 login_container">
							<button type="submit" name="button" className="btn login_btn">Register</button>
						</div>
					</form>
				</div>
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
						Already have an account? <Link to ="/login" className="ml-2">Sign In</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
        )
    }

}