import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
const BASE_URL = 'http://localhost:5000/api';

export const signInApi = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, formData);
      return response.data;
    } catch (error) {
      console.error('Sign In Error:', error);
      throw error;
    }
  };


function Login() {

    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])



    const signIn = async (e) => {
        e.preventDefault();

        try {


            if ( !email || !password) {
                toastr.error('All fields are required');
                return;
            }


            const formData = {email, password };
            const response = await signInApi(formData);

            console.log(response);
            if (response.success === true) {
                
                if(response.token){
                    localStorage.setItem('token',response.token)
                    window.location.href = '/home'
                }
                toastr.success('SignIn Successful', 'Success');
            } else {
               
                toastr.error('SignIn Failed!', response.message);
            }
        } catch (error) {
            console.error('Sign up error:', error);
            toastr.error('Error', 'An error occurred while signing up');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-dark">
                            <h4 className="text-light">Login </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={signIn}>


                                <div className="form-group mb-2">
                                    <label>Email Address <span className='text-danger'>*</span></label>
                                    <input className='form-control' type="text" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group mb-2">
                                    <label>Password <span className='text-danger'>*</span></label>
                                    <input className='form-control' type="text" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <button type='submit' className='btn btn-dark btn-sm'>Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login