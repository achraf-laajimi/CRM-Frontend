import * as Yup from 'yup';

const addUserSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  adresse: Yup.string().required('Address is required'),
  telephone: Yup.string().required('Telephone is required'),
  role: Yup.string().required('Role is required'),
});

export default addUserSchema;
