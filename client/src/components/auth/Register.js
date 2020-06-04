import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alertActions';
import { registerUser, clearErrors } from '../actions/authActions';

const Register = ({error, setAlert, registerUser, clearErrors}) => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { name, email, password, passwordConfirm } = user;

  useEffect(() => {
   if(error === "User already exists") {
     setAlert(error, 'danger');
     clearErrors();
   }
  }, [error])

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === '' || email === '' || password === '' ) {
      setAlert('Please, enter all fields', 'danger');
    } else if(password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container" >
    <h1>Account <span className="text-primary">Register</span> </h1>
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="6"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
        />
      </div>
      <input
          type="submit"
          id="submit"
          value="Register"
          className="btn btn-primaty btn-block"
          onChange={handleChange}
        />
    </form>
  </div>
  )
};

const mapStateToProps = state => ({
  error: state.auth.error 
});

export default connect(mapStateToProps, {setAlert, registerUser, clearErrors})(Register);
