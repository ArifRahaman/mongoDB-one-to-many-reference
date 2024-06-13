import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const email = localStorage.getItem('email');

    const handleOtpChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, '');
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Move focus to the next input field
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        try {
            const response = await axios.post('http://localhost:3001/verify-otp', { email, otp: otpValue });
            setMessage(response.data.message);

            if (response.data.message === 'OTP verified') {
                localStorage.setItem('userId', response.data.userId); // Store userId in localStorage
                navigate('/upload');
            }
        } catch (error) {
            setMessage('Invalid or expired OTP');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">OTP Verification</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center space-x-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                id={`otp-input-${index}`}
                                value={data}
                                onChange={(e) => handleOtpChange(e.target, index)}
                                className="w-12 px-2 py-2 text-center text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                maxLength="1"
                                required
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Verify OTP
                    </button>
                </form>
                {message && (
                    <p className="text-center text-sm font-medium text-red-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OtpVerification;

