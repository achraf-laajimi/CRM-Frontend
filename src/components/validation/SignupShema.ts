import * as Yup from 'yup';


const addUserSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  adresse: Yup.string().required('Address is required'),
  telephone: Yup.string().required('Telephone is required'),
  role: Yup.string().required('Role is required'),
});


export default addUserSchema;
