import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../Context/notes/noteContext';

const Navbar = (props) => {

    let location = useLocation();
    let navigate = useNavigate();
    //We are using useNavigate instead of useHistory()
    const context = useContext(noteContext);

    const handleLogout = () => {
        context.setNotes([]);
        localStorage.removeItem('token');
        props.showAlert("Logged Out Successfully", "success");
        navigate('/login');
    }

    // useEffect(() => {
    //     console.log(location)
    // }, [location]);

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/home'?"active":""}`} aria-current="page" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/about'?"active":""}`} to="/about">About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token')?<form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
                </form>: <button onClick={handleLogout} type="button" className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar