import React, { useState } from 'react';
import { Button, Input, FormGroup, Label } from 'reactstrap';  // Reactstrap components
import { FaUserPlus } from 'react-icons/fa';  // React Icon for Register icon
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RegisterForm = () => {

  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData, navigate);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div style={{ backgroundColor: '#0D0D0D', padding: '10px', borderRadius: '8px', width: '80%', maxWidth: '400px' }}>
        <h5 className='text-center'>REGISTER</h5>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"  // Add name attribute
              placeholder="Enter your full name"
              value={formData.fullName}  // Use formData.fullName
              onChange={handleChange}  // Use handleChange to update formData
              style={{ backgroundColor: '#0D0D0D', color: 'white' }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"  // Add name attribute
              placeholder="Enter your email"
              value={formData.email}  // Use formData.email
              onChange={handleChange}  // Use handleChange to update formData
              style={{ backgroundColor: '#0D0D0D', color: 'white' }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"  // Add name attribute
              placeholder="Enter your password"
              value={formData.password}  // Use formData.password
              onChange={handleChange}  // Use handleChange to update formData
              style={{ backgroundColor: '#0D0D0D', color: 'white' }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="role">Role</Label>
            <select
              id="role"
              name="role"  // Add name attribute
              value={formData.role}  // Use formData.role
              onChange={handleChange}  // Use handleChange to update formData
              className="form-control"
              style={{ backgroundColor: '#0D0D0D', color: 'white' }}
            >
              <option value="ROLE_CUSTOMER">Customer</option>
              <option value="ROLE_RESTAURANT_OWNER">Restaurant Owner</option>
            </select>
          </FormGroup>

          <Button style={{ backgroundColor: '#E91E63' }} type="submit" block>
             REGISTER
          </Button>
        </form>

        <div className="text-center mt-3">
          <p>If you have an account already? 
            <Button color="link" style={{ color: '#E91E63' }} onClick={() => navigate("/account/login")}>LOGIN</Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
