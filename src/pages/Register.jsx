import React, { useState } from 'react';
import { LoginSVG } from '../svg';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import toast from 'react-hot-toast';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  reenter: ''
};

const loginSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required'),
  reenter: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'password must match')
});

function Register() {
  const [seePassword, setSeePassword] = useState(false);
  const [seePassword2, setSeePassword2] = useState(false);

  return (
    <div className="min-h-screen flex  bg-slate-100">
      <div className="flex-[0.65] hidden md:flex justify-center items-center">
        <LoginSVG />
      </div>
      <div className="md:flex-[0.35] md:border-l md:border-slate-100 shadow-md bg-white w-full flex justify-center items-center">
        <div className="w-4/5 mx-auto flex justify-center items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              registerUser(
                values,
                (response) => {
                  resetForm();
                  toast.success(response.data.message);
                  setSubmitting(false);
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
                <div className="flex justify-between items-center">
                  <InputField
                    labelName="Firstname"
                    fieldType="text"
                    fieldName="firstName"
                    fieldPlaceholder="first-name"
                    half
                  />
                  <InputField
                    labelName="Lastname"
                    fieldType="text"
                    fieldName="lastName"
                    fieldPlaceholder="last-name"
                    half
                  />
                </div>
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
                  fieldPlaceholder="enter  password"
                  setToggle={setSeePassword}
                  toggle={seePassword}
                  Icon={seePassword ? BsEyeFill : BsEyeSlashFill}
                />
                <InputField
                  labelName="Re-enter Password"
                  fieldType={seePassword2 ? 'text' : 'password'}
                  fieldName="reenter"
                  fieldPlaceholder="re-enter  password"
                  setToggle={setSeePassword2}
                  toggle={seePassword2}
                  Icon={seePassword2 ? BsEyeFill : BsEyeSlashFill}
                />
                <div className="flex justify-between items-center mb-3 text-xs text-blue-700">
                  <Link to="/login" className="hover:underline">
                    Have an account ?
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`w-full p-2 rounded shadow  bg-yellow-400 text-gray-50 text-sm ${
                    isSubmitting && 'opacity-30 cursor-not-allowed'
                  }`}
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Loading...' : 'Register'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
