import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault(); //So that page doesn't reload.

    const { name, email, password } = credentials;

    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authToken)
      navigate('/home');
      props.showAlert("Successfully Account created", "success");
    }
    else {
      props.showAlert("Invalid Details", "danger");
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='mt-4 mx-5'>
      <form onSubmit={handleSubmit}>
        <h2>Create an Account to use iNotebook</h2>
        <div className='mt-5'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' minLength={5} required onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} />
          </div>
          <button type="submit" style={{ marginTop: "1.6rem" }} className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup