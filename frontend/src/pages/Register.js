
import { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';

import 'toastr/build/toastr.css';
const BASE_URL = 'http://localhost:5000/api';

export const signUpApi = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
        return response.data;
    } catch (error) {
        console.error('Sign Up Error:', error);
        throw error;
    }
};


function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home', { replace: true });
        }
    }, []);




    const signUp = async (e) => {
        e.preventDefault();

        try {


            if (!name || !email || !password) {
                toastr.error('All fields are required');
                return;
            }


            const formData = { name, email, password };
            const response = await signUpApi(formData);

            console.log(response);
            if (response.success === true) {

                console.log('Sign up successful:', response);
                toastr.success('Sign up successful', 'Success');
            } else {
                console.error('Sign up failed:', response.message);
                toastr.error('Sign up failed', response.message);
            }
        } catch (error) {
            console.error('Sign up error:', error);
            toastr.error('Error', 'An error occurred while signing up');
        }
    }


    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header bg-dark">
                                <h4 className="text-light">Register </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={signUp}>
                                    <div className="form-group mb-2">
                                        <label>Full Name <span className='text-danger'>*</span></label>
                                        <input className='form-control' type="text" onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label>Email Address <span className='text-danger'>*</span></label>
                                        <input className='form-control' type="text" onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label>Password <span className='text-danger'>*</span></label>
                                        <input className='form-control' type="text" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <p className='text-dark'>Already have an account ? SignIn</p>
                                    <button type='submit' className='btn btn-dark btn-sm'>Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
