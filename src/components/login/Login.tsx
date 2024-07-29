import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginUser } from "../../api/auth";
import { UserContext } from "../../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginSchema from '../validation/loginShema';


const Login: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useContext(UserContext);
  const [error, setError] = useState<string>('');
  const initialValues = {
    email: '',
    password: '',
  };

  const googleAuth = (): void => {
    window.open(
      `http://localhost:3000/auth/google/callback`,
      "_self"
    );
  };

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    try {
      console.log('Submitting values:', values);
      const { token, role } = await loginUser(values);
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('role', role);
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        console.error("Server response data:", error.response.data);
        const { data } = error.response;
        Object.keys(data).forEach((key) => {
          setError(data[key]);
        });
      } else {
        setError('Identifiants invalides. Veuillez réessayer.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#FBFBFB] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-[#2c444e] relative flex items-center justify-center m-5">
        Log in Form
        <span className="absolute bottom-[-10px] w-full h-1 bg-[#2c444e] rounded-sm"></span>
      </h1>
      <div className="flex border border-double border-black rounded-2xl shadow-lg overflow-hidden">
        <div className="w-1/2 bg-white flex justify-center items-center">
          <img className="w-[90%] h-auto object-cover" src='src/assets/login.svg' alt="login" />
        </div>
        <div className="relative w-1/2 p-8 backdrop-saturate-200">
          <h2 className="text-2xl font-medium text-[#2c444e] mb-5">Members Log in</h2>
          <div className='absolute inset-0 bg-white opacity-50 blur-sm -z-10'></div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full max-w-md h-10 p-2 border border-[#2c444e] rounded mt-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full max-w-md h-10 p-2 border border-[#2c444e] rounded mt-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <button type="submit" className="text-lg font-medium py-3 px-6 text-white bg-[#FD693F] rounded-lg border-none cursor-pointer my-2" disabled={isSubmitting}>
                  Log In
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </Form>
            )}
          </Formik>
          <p className="text-sm text-[#2c444e] my-2">or</p>
          <button className="w-full max-w-xs h-10 rounded-md bg-white shadow-md text-lg font-medium my-2 text-[#2c444e] flex items-center justify-center cursor-pointer" onClick={googleAuth}>
            <img src='src/assets/google.png' alt="google icon" className="w-6 h-6 object-cover mr-2" />
            <span>Sign in with Google</span>
          </button>
          <p className="text-sm text-[#2c444e] my-2">
            New Here? <Link to="/signup" className="text-lg font-medium text-[#FD693F]">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
