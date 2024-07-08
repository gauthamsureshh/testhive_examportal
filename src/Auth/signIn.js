import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testCategory } from "../Store/dataSlice";
import { User } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import "../Style/signIn.css";



function Login(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [isSignUp, setIsSignUp]=useState(false);
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd,setConfirmPwd]=useState('');
    const [category,setCategory]= useState('');
    const [error,setError]= useState('');

    const handleSignUp=(e)=>{
        e.preventDefault();
        if(!validatePasswordStrength(password)){
            setError('Password must be at least 8 characters long and contain at least one letter and one number.');
            return;
          }
        if(password !== confirmPwd){
            setError('Passwords do not match');
            return;
        }
        const existingUsers = JSON.parse(localStorage.getItem('users')) || []; // fetches existing user from local storage.
        const isUserExists = existingUsers.some(user => user.email === email); //compares the email user entered with emails in local storage to make emails unique to user.
        if (isUserExists) {
            toastr.warning('Email already exists');
            return;
          }
          const newUser = { email, password };
          const updatedUsers = [...existingUsers, newUser];
          localStorage.setItem('users', JSON.stringify(updatedUsers));// stores the new user to local storage.
          toastr.success('Registration successful!');
          setIsSignUp(false);
    };

    const validatePasswordStrength = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
      };

    const handleSignIn=(e)=>{
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem('users')) || []; // fetches existing user from local storage.
        const user = existingUsers.find(user => user.email === email && user.password === password);// checks if such an user exists in local storage.
        if(user || email === 'testuser@gmail.com' && password === 'testuser@2021'){
            dispatch(testCategory(category));
            dispatch(User(1));
            navigate('testpage');
        }
        else if(!user){
            toastr.error("No User Found");
        }
        else{
            setError('Invalid Email Or Password');
        }
    }
    return(
        <div className="login-container">
            <div className="left">
                <h1>TestHive</h1>
            </div>
            <div className="right">
                {isSignUp ? (
                    //Form for user to register
                    <form className="form-container" onSubmit={handleSignUp}>
                        <h2>Sign up</h2>
                        {error? <div className="alert alert-danger">{error}</div>:''}
                        <div className="form-group">
                            <label>Your Email</label>
                            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm Password" value={confirmPwd} onChange={(e)=>setConfirmPwd(e.target.value)} required/>
                        </div>
                        <button type="submit" className="form-button">Sign up</button>
                        <p className="toggle">
                            Already have an account? <span onClick={()=>setIsSignUp(false)}>Sign in </span>
                        </p>
                    </form>
                ) : (
                    //form for registered user to signin
                    <form className="form-container" onSubmit={handleSignIn}>
                        <h2>Sign In</h2>
                        {error? <div className="alert alert-danger">{error}</div>:''}
                        <div className="form-group">
                            <label>Your Email</label>
                            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter Your Password:" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Exam Category</label>
                            <select value={category} onChange={(e)=>setCategory(e.target.value)} required>
                                <option value='' disabled >Select Category</option>
                                <option value='sports'>Sports</option>
                                <option value='arts'>Arts</option>
                                <option value='history'>History</option>
                                <option value='physics'>Physics</option>
                            </select>
                        </div>
                        <button type="submit" className="form-button">Sign In</button>
                        <p className="toggle">
                            Don't have an account? <span onClick={()=>setIsSignUp(true)}>Sign Up</span>
                        </p>
                    </form>
                    )};
            </div>
        </div>
    );
};

export default Login;
