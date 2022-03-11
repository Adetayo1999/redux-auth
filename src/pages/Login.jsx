import React, { useState, useEffect } from 'react';
import { LoginSVG } from '../svg';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import toast from 'react-hot-toast';
const initialValues = {
  email: '',
  password: ''
};

const loginSchema = Yup.object({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required')
});

function Login() {
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="min-h-screen flex  bg-slate-100">
      <div className="flex-[0.65] hidden md:flex justify-center items-center">
        <LoginSVG />
      </div>
      <div className="md:flex-[0.35] md:border-l md:border-slate-100 shadow-md bg-white w-full flex justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            loginUser(
              values,
              (response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                setSubmitting(false);
                resetForm();
                navigate('/');
              },
              (error) => {
                toast.error(
                  error.response && error.response.data
                    ? error.response.data.message
                    : error.message
                );
                setSubmitting(false);
              }
            );
          }}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                labelName="Email"
                fieldType="text"
                fieldName="email"
                fieldPlaceholder="enter your email"
              />
              <InputField
                labelName="Password"
                fieldType={seePassword ? 'text' : 'password'}
                fieldName="password"
                fieldPlaceholder="enter your password"
                setToggle={setSeePassword}
                toggle={seePassword}
                Icon={seePassword ? BsEyeFill : BsEyeSlashFill}
              />
              <div className="flex justify-between items-center mb-3 text-xs text-blue-700">
                <Link to="/register" className="hover:underline">
                  Not a user?
                </Link>
                <Link to="/" className="hover:underline">
                  forgot password
                </Link>
              </div>
              <button
                type="submit"
                className={`w-72 p-2 rounded shadow  bg-yellow-400 text-gray-50 text-sm ${
                  isSubmitting && 'opacity-30 cursor-not-allowed'
                }`}
                disabled={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
