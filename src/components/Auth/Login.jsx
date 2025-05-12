import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWrongPassword, setShowWrongPassword] = useState(false);
    const [showNoRecords, setShowNoRecords] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
        }
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3001/login', { email, password })
                .then(result => {
                    if (result.data === "Success") {
                        localStorage.setItem('userEmail', email);
                        setShowSuccess(true);
                        setTimeout(() => {
                            setShowSuccess(false);
                            navigate('/home');
                        }, 1000);
                    } else if (result.data === "Wrong password") {
                        setShowWrongPassword(true);
                        setTimeout(() => setShowWrongPassword(false), 2000);
                    } else {
                        setShowNoRecords(true);
                        setTimeout(() => setShowNoRecords(false), 2000);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-center" style={{ height: '100vh', backgroundColor: '#282c34' }}>
            <div className="p-4 rounded shadow-lg" style={{ width: '400px', backgroundColor: '#333', color: '#fff' }}>
                <h2 className="mb-4 text-light">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label text-light"><strong>Email</strong></label>
                        <input
                            type="email"
                            className="form-control bg-dark text-light"
                            id="email"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
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
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            required
                        />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="mt-3 text-light">Don't have an account? <Link to="/register" className="text-info">Register here</Link></p>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="custom-modal success-animation">
                    <h4>Login Successful!</h4>
                    <p>Redirecting...</p>
                </div>
            )}

            {/* Wrong Password Modal */}
            {showWrongPassword && (
                <div className="custom-modal error-animation">
                    <h4>Incorrect Password!</h4>
                    <p>Please try again.</p>
                </div>
            )}

            {/* No Records Found Modal */}
            {showNoRecords && (
                <div className="custom-modal warning-animation">
                    <h4>No Records Found</h4>
                    <p>Please register to continue.</p>
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
                    animation-duration: 0.5s;
                }
                .success-animation {
                    background-color: #28a745;
                    animation: fadeInScaleCenter 0.5s ease-out;
                }
                .error-animation {
                    background-color: #dc3545;
                    animation: fadeInScaleCenter 0.5s ease-out;
                }
                .warning-animation {
                    background-color: #ffc107;
                    color: #333;
                    animation: fadeInScaleCenter 0.5s ease-out;
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

export default Login;
