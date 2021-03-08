import * as yup from 'yup';

export const authSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters'),
});

export const eventSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().min(6, 'Description should be 6 chars at least'),
  price: yup.number().positive('Price should be > 0'),
  date: yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date should be valid'),
});
