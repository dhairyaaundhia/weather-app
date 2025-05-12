import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [errors, setErrors] = useState({});
    const [showRegistered, setShowRegistered] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const validateField = (field, value) => {
        let error = "";
        if (field === "name") {
            if (!value.trim()) {
                error = "Name is required";
            } else if (value.length < 2) {
                error = "Name must be at least 2 characters";
            }
        } else if (field === "email") {
            if (!value.trim()) {
                error = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = "Invalid email format";
            }
        } else if (field === "password") {
            if (!value.trim()) {
                error = "Password is required";
            } else if (value.length < 6) {
                error = "Password must be at least 6 characters";
            } else if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) {
                error = "Password must include an uppercase letter and a number";
            }
        }if (field === "confirmPassword") {
            if (!value.trim()) {
                error = "Confirm Password is required";
            } else if (value !== password) {
                error = "Passwords do not match";
            }
        }            
        return error;
    };

    const handleFieldChange = (field, value) => {
        if (field === "name") setName(value);
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);

        // Validate and update errors immediately
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: validateField(field, value),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = {
            name: validateField("name", name),
            email: validateField("email", email),
            password: validateField("password", password),
        };

        setErrors(validationErrors);

        if (!Object.values(validationErrors).some((error) => error)) {
            // Proceed with API call if no errors
            axios.post('http://localhost:3001/register', { name, email, password })
                .then(result => {
                    if (result.data === "Already registered") {
                        setShowRegistered(true);
                        setTimeout(() => {
                            setShowRegistered(false);
                            navigate('/login');
                        }, 2000);
                    } else {
                        setShowSuccess(true);
                        setTimeout(() => {
                            setShowSuccess(false);
                            navigate('/login');
                        }, 2000);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-center" style={{ height: '100vh', backgroundColor: '#282c34' }}>
            <div className="p-4 rounded shadow-lg" style={{ width: '400px', backgroundColor: '#333', color: '#fff' }}>
                <h2 className="mb-4 text-light">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="name" className="form-label text-light"><strong>Name</strong></label>
                        <input 
                            type="text"
                            className="form-control bg-dark text-light"
                            id="name" 
                            value={name}
                            onChange={(e) => handleFieldChange("name", e.target.value)}
                            required
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label text-light"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            className="form-control bg-dark text-light"
                            id="email" 
                            value={email}
                            onChange={(e) => handleFieldChange("email", e.target.value)}
                            required
                        /> 
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label text-light"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            className="form-control bg-dark text-light"
                            id="password" 
                            value={password}
                            onChange={(e) => handleFieldChange("password", e.target.value)}
                            required
                        />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="mt-3 text-light">Already have an account? <Link to="/login" className="text-info">Login</Link></p>
            </div>

            {/* Already Registered Modal */}
            {showRegistered && (
                <div className="custom-modal warning-animation">
                    <h4>Email Already Registered!</h4>
                    <p>Please login to proceed.</p>
                </div>
            )}

            {/* Registration Success Modal */}
            {showSuccess && (
                <div className="custom-modal success-animation">
                    <h4>Registration Successful!</h4>
                    <p>Please login to continue.</p>
                </div>
            )}

            {/* Inline CSS for animations */}
            <style jsx="true">{`
                .custom-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(0, 0, 0, 0.85);
                    padding: 20px;
                    border-radius: 8px;
                    color: #fff;
                    text-align: center;
                    width: 300px;
                    animation: fadeInScaleCenter 0.5s ease-out;
                }
                .success-animation {
                    background-color: #28a745;
                }
                .warning-animation {
                    background-color: #ffc107;
                    color: #333;
                }
                @keyframes fadeInScaleCenter {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;
