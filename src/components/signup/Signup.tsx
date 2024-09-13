import { Field, Form, Formik, FormikHelpers } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupUser } from '../../api/auth'; // Adjust the import path if necessary
import img1 from '../../assets/Signup.svg';
import img2 from '../../assets/google.png';
import addUserSchema from '../validation/SignupShema'; // Adjust the import path if necessary
import './signup.css';
import { SignupFormValues, UserData, SignupResponse } from './types';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: FormikHelpers<SignupFormValues>
  ): Promise<void> => {
    try {
      // Adjust the function signature of signupUser if necessary
      const response: SignupResponse = await signupUser(values);
      const { token } = response;
      Cookies.set('token', token, { expires: 7 });
      toast.success('Signup successful!');
      navigate('/login', { state: { user: values } });
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error && error.message.includes('User already exists')) {
        toast.error('Email already in use');
      } else {
        toast.error('An error occurred during signup');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const googleAuth = (): void => {
    window.open(`http://localhost:3000/auth/google/callback`, '_self');
  };

  return (
    <div className="container1">
      <h1 className="heading">Sign up Form</h1>
      <div className="form_container1">
        <div className="left">
          <img className="img1" src={img1} alt="signup" />
        </div>
        <div className="right">
          <h2 className="form_heading">Create Account</h2>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
              adresse: '',
              telephone: '',
              role: ''
            }}
            validationSchema={addUserSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              errors
            }) => (
              <Form>
                <div className="input_group">
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="input_group">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    {touched.username && errors.username && (
                      <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>
                <div className="input_group">
                  <div className="mb-4">
                    <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <Field
                      type="text"
                      id="adresse"
                      name="adresse"
                      placeholder="Adresse"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.adresse}
                    />
                    {touched.adresse && errors.adresse && (
                      <div className="text-red-500 text-sm mt-1">{errors.adresse}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
                    <Field
                      type="text"
                      id="telephone"
                      name="telephone"
                      placeholder="Telephone"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telephone}
                    />
                    {touched.telephone && errors.telephone && (
                      <div className="text-red-500 text-sm mt-1">{errors.telephone}</div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                  <Field as="select" id="role" name="role" className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Select Role</option>
                    <option value="client">Client</option>
                    <option value="Rep commerciale">Rep Commerciale</option>
                    <option value="admin">Admin</option>
                  </Field>
                  {touched.role && errors.role && (
                    <div className="text-red-500 text-sm mt-1">{errors.role}</div>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-Pink text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text">or</p>
          <button className="google_btn" onClick={googleAuth}>
            <img src={img2} alt="google icon" />
            <span>Sign up with Google</span>
          </button>
          <p className="text1">
            Already Have Account? <Link to="/login" className="log">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
