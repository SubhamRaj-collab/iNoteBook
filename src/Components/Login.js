import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault(); //So that page doesn't reload.

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    
    const json = await response.json();
    console.log(json);

    if(json.success)
    {
      //redirect
      localStorage.setItem('token', json.authToken)
      props.showAlert("Logged In Successfully", "success");
      navigate('/home');
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }

  }

  const onChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className='mt-4'>
      <form onSubmit={handleSubmit}>
        <h2>Login to continue to iNotebook</h2>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
        </div>
        <button type="submit" style={{marginTop:"1.6rem"}} className="btn btn-primary">LogIn</button>
      </form>
    </div>
  )
}

export default Login