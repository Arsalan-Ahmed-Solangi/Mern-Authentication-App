import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = 'http://localhost:5000/api';
function Home() {
    const navigate = useNavigate();
    const [quote,setQuote] = useState("");
    const generateQuote = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            console.log(token);
            const response = await axios.get(`${BASE_URL}/auth/quote`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle the response data here
            console.log('Quote:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching quote:', error);
            throw error;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { replace: true });
        } else {
            const quoteGen = generateQuote();
            setQuote(quoteGen);
        }
    }, []);

    return (
        <div className='container mt-5'>
            <div className='card bg-dark text-light'>
                <div className='card-body'>
                    <h4>Welcome Dashboard</h4>
                    <h6>Arsalan Ahmed</h6>
                    <button className='btn btn-danger'>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
