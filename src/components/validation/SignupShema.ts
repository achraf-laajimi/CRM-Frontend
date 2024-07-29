import * as Yup from 'yup';

const addUserSchema = Yup.object().shape({


  firstName: Yup.string().required('FirstName is required'),
  lastName: Yup.string().required('LastName is required'),
  username: Yup.string().required('UserName is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  adresse: Yup.string().required('Adress is required'),
  telephone: Yup.string().required('Telephone is required'),
  role: Yup.string().required('Required'), // Valider que le rôle est requis
});


export default addUserSchema;
