import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./SignUp.module.scss";
import signup from "../../Images/signin.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SignUp() {
	const navigator = useNavigate();
	const [loading,setLoading] = useState(false);
	const [user, setUser] = useState({
		username: "",
		email: "",
		contact: "",
		profession: "",
		password: "",
		confirmPassword: "",
	});

	const createUser = async ()=>{
		setLoading(true);
		try {
			const {username, email, contact, profession, password}=user;
			const result = await axios({
				method:"post",
				url:"/userSignUp",
				data:{
					username,
					email,
					contact,
					profession,
					password
				}
			});
			document.querySelector(".signup_err").innerHTML = "";
			navigator(`/`)
		} catch (error) {
			document.querySelector(".signup_err").innerHTML = "Username or Email already taken!";
			console.error(error);
		};
		setLoading(false);
	};

	function submit(){
		if(user.password===user.confirmPassword){
			createUser();
		}else{
			document.querySelector(".signup_err").innerHTML = "Passwords don't match!";
		};
	}


	return (
		<div className={Styles.signup}>
			<div className={Styles.signup_wrapper}>
				<div className={Styles.signup_img}>
					<img src={signup} alt="" />
				</div>
				<div className={Styles.signup_inputs}>
					<Stack direction={"column"} spacing={2}>
						<h1>Register</h1>
						<TextField
							label="Username"
							autoFocus
							value={user.username}
							onChange={(e) => {
								setUser((prev) => ({ ...prev, username: e.target.value }));
							}}
							size="small"
							variant="standard"
						/>
						<TextField
							label="Email"
							type={"email"}
							value={user.email}
							onChange={(e) => {
								setUser((prev) => ({ ...prev, email: e.target.value }));
							}}
							size="small"
							variant="standard"
						/>
						<TextField
							label="Contact No."
							type={"tel"}
							size="small"
							value={user.contact}
							onChange={(e) => {
								setUser((prev) => ({ ...prev, contact: e.target.value }));
							}}
							variant="standard"
						/>
						<TextField
							label="Profession"
							value={user.profession}
							onChange={(e) => {
								setUser((prev) => ({ ...prev, profession: e.target.value }));
							}}
							size="small"
							variant="standard"
						/>
						<TextField
							label="Password"
							type={"password"}
							size="small"
							value={user.password}
							onChange={(e)=>{
								setUser((prev)=>({...prev,password:e.target.value}))
							}}
							variant="standard"
						/>
						<TextField
							label="Confirm Password"
							type={"password"}
							size="small"
							value={user.confirmPassword}
							onChange={(e)=>{
								setUser((prev)=>({...prev,confirmPassword:e.target.value}))
							}}
							variant="standard"
						/>
						<p className="signup_err" style={{color:"red", fontSize:"10px", fontWeight:"600"}}></p>
						<div className={Styles.bottom_btns}>
							<Button onClick={submit}>{loading?"loading":"Register"}</Button>
						</div>
						<p className={Styles.login_link}>
							Already have an account? <NavLink to="/">Sign-In</NavLink>{" "}
						</p>
					</Stack>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
