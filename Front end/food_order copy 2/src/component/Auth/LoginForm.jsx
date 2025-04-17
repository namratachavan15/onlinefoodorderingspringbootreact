import React, { useState } from 'react';
import { Button, Input, FormGroup, Label } from 'reactstrap';  // Reactstrap components
import { FaSignInAlt } from 'react-icons/fa';  // React Icon for Login icon
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {

  const { login } = useAuth();
  const navigate = useNavigate(); // Define navigate using the hook

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, navigate); // Pass the formData to the login function
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div style={{ backgroundColor: '#0D0D0D', padding: '10px', borderRadius: '8px', width: '80%', maxWidth: '400px' }}>
        <h5 className='text-center' style={{ color: 'white' }}>Login</h5>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email" style={{ color: 'white' }}>Email</Label>
            <Input
              type="email"
              id="email"
              name="email"  // Added the name attribute
              placeholder="Enter your email"
              value={formData.email} // Use formData.email
              onChange={handleChange} // Use handleChange for both fields
              style={{ backgroundColor: '#0D0D0D', color: 'white' }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" style={{ color: 'white' }}>Password</Label>
            <Input
              type="password"
              id="password"
              name="password"  // Added the name attribute
              placeholder="Enter your password"
              value={formData.password} // Use formData.password
              onChange={handleChange} // Use handleChange for both fields
              style={{ backgroundColor: '#0D0D0D', color: 'white' }}
            />
          </FormGroup>

          <Button style={{ backgroundColor: '#E91E63' }} type="submit" block>
             LOGIN
          </Button>
        </form>

        <div className="text-center mt-3" style={{ color: 'white' }}>
          <p>Don't have an account? 
            <Button color="link" onClick={() => navigate("/account/register")} style={{ color: '#E91E63' }}>REGISTER</Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
