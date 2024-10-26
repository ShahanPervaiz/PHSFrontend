import React, { useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { SignInSchema } from '../../schemas/index';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '../../services/toastifyservices';
import 'react-toastify/dist/ReactToastify.css';
import { postRequest } from '../../api/api';
import CommonSpinner from '../../services/commonSpinner'
import './signIn.css'

const initialValues = {
    email: '',
    password: '',
    otp: ''
}
const SignIn = ({ }) => {
    const navigate = useNavigate();
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            try {
                const payloadObject = {
                    email: values.email,
                    password: values.password,
                };
                const response = await postRequest('assistant_api/login', payloadObject);
                setLoading(false);
                console.log("Login", response)
                var result = response.data;
                //   if(response.status == 200){
                if (result.status) {
                    showToast('success', '', result.message);
                    setShowOTP(true);
                } else {
                    showToast('error', '', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    const handleOTPSubmit = async () => {
        setLoading(true);
        const otpPayload = {
            email: values.email,
            otp_code: values.otp, // Assuming you need the email and otp for this call
        };
        try {
            localStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyOTc1ODUwNywiaWF0IjoxNzI5NzU4NTA3fQ.C3WBWlhRTUwNvSqcyrlsxNOppz8__jeU0VRwOoFmfOQ");
                
            const response = await postRequest('assistant_api/verify-otp', otpPayload);
            setLoading(false);
            var result = response.data;
            console.log("Login", result)
            debugger
            if (result.message == "OTP verified") {
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                showToast('success', '', result.message);
                navigate('/assistant');

            } else {
                showToast('error', '', result.message);
            }

        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>
            {/* {loading && <CommonSpinner loading={loading} />} */}
            <div className='container'>
                <div className="row g-4">
                    {/* You can add content here if needed */}
                </div>

                <div className='card'>
                    <div className='card-body cardColor'>
                        <p className='heading text-center'>Sign in to your account</p>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" style={{ display: 'none' }} />

                            {/* Show email and password fields if OTP is not shown */}
                            {!showOTP ? (
                                <>
                                    <div className="d-flex justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <div className="position-relative">
                                                <span className="iconInsideTextbox">
                                                    <IoPersonSharp />
                                                </span>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control textbox-with-icon"
                                                    placeholder="Email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mt-3">
                                        <div className="col-12 col-md-8">
                                            <div className="position-relative">
                                                <span className="iconInsideTextbox">
                                                    <FaLock />
                                                </span>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control textbox-with-icon"
                                                    placeholder="Password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            {errors.password && touched.password ? <p className='form-error'>{errors.password}</p> : null}
                                        </div>
                                    </div>

                                    <div className="mt-4 d-flex justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <button type="submit" className="btnColor form-control"  disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Signing in...
                                                </>
                                            ) : (
                                                "Sign In"
                                            )}
                                            </button>
                                        </div>
                                        
                                    </div>
                                </>
                            ) : (
                                // Show OTP input if showOTP is true
                                <div className="d-flex justify-content-center">
                                    <div className="col-12 col-md-8">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                id="otp"
                                                name="otp"
                                                className="form-control textbox-with-icon"
                                                placeholder="Enter OTP"
                                                value={values.otp}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {errors.otp && touched.otp ? <p className='form-error'>{errors.otp}</p> : null}

                                        <div className="mt-4 d-flex justify-content-center">
                                            <div className="col-12 col-md-8">
                                                <button type="button" onClick={handleOTPSubmit} className="btnColor form-control">
                                                   {loading ?(
                                                     <>
                                                     <span
                                                         className="spinner-border spinner-border-sm me-2"
                                                         role="status"
                                                         aria-hidden="true"
                                                     ></span>
                                                    Verifying OTP...
                                                 </>
                                                 ): (
                                                "Verify"
                                            )}
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>


    )
}
export default SignIn;
