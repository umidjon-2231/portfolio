"use client";
import axios from 'axios';
import {FormEvent, useState} from 'react';
import {useReCaptcha} from "next-recaptcha-v3";

const RegisterPage = () => {
    const {executeRecaptcha} = useReCaptcha();
    const [submitStatus, setSubmitStatus] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitStatus('');

        if (!executeRecaptcha) {
            console.error('ReCAPTCHA not available');
            return;
        }

        const recaptchaToken = await executeRecaptcha('loginSubmit');

        try {
            const response = await axios.post('/api/auth', {
                recaptchaToken,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                console.log(`Registration success with score: ${response.data.score}`);
                setSubmitStatus('Registration Successful. Welcome!');
            } else {
                console.error(`Registration failure with score: ${response.data.score}`);
                setSubmitStatus('Registration Failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Admin auth</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <button
                        type={"submit"}
                        className={"w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"}>
                        Send key to email
                    </button>
                </form>
                {submitStatus && <p className="mt-4 text-center text-sm text-red-600">{submitStatus}</p>}
            </div>
        </div>
    );
};

export default RegisterPage;