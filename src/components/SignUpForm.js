import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  FieldContainer,
  FieldError,
  FormError,
  FormSuccess
} from "./common";

import { FormikContext, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const PASSWORD_REGEX = /^[a-z\d]{8,100}$/i;

const validationSchema = yup.object({
  fullName: yup.string().min(3, "Please enter your full Name").required("your full name is required"),
  email: yup.string().email("Please enter valid email").required(),
  password: yup.string().matches(PASSWORD_REGEX, "Please enter strong password").required(),
  confirmPassword: yup.string().when("password", {
    is: val => ( val && val.length > 0 ? true : false ),
    then: yup.string().oneOf([yup.ref("password")], "Check the password")
  })

})

const SignupForm = (props) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);


  // values: {fullName: "", email: "", password: "", cofirmPassword: ""}
  const onSubmit = async (values) => {
    const {confirmPassword, ...data} = values;
    const postedData = {
      name: data.fullName, email: data.email, password: data.password
    } 
    console.log("postedData", postedData);

    const response = await axios.post("https://api-for-missions-and-railways.herokuapp.com/users", postedData).catch((err) => {
      if (err && err.response) setError(err.response.data.message);
      setSuccess(null);
    });

  if (response && response.data){
    setError(null);
    console.log('success!', response.data.message);
    setSuccess(response.data.message);
    formik.resetForm()
  }
  console.log('test_here', response.data);
  }

  const formik = useFormik(
    { initialValues: {fullName: "", email: "", password: "", cofirmPassword: ""},
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema
  })

  return (
    <BoxContainer>

      {!error && <FormSuccess>{success ? success: ""}</FormSuccess>}
      {!success && <FormError>{error ? error: ""}</FormError>}

      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
        <Input name="fullName" type="text" placeholder="Full Name" value={formik.values.fullName} onChange={formik.handleChange} 
        onBlur={formik.handleBlur}/>
        </FieldContainer>
        <FieldError>{formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}</FieldError>
        <FieldContainer>
        <Input name="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} 
        onBlur={formik.handleBlur}/>
        </FieldContainer>
        <FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>
        <FieldContainer>
        <Input name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} 
        onBlur={formik.handleBlur}/>
        </FieldContainer>
        <FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>
        <FieldContainer>
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} 
        onBlur={formik.handleBlur}/>
        </FieldContainer>
        <FieldError>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</FieldError>
        <SubmitButton type="submit" disabled={!formik.isValid}>Signup</SubmitButton>
        {/* you have to contain submit button in inner FormContainer */}
      </FormContainer>

    </BoxContainer>
  );
}

export default SignupForm;