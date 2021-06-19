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
  FormError
} from "./common";
import { useFormik } from "formik";
import * as yup from  "yup";
import { identityForEmail } from "sshpk";
import { fromPrefixLen } from "ip";
import axios from "axios";


const validationSchema = yup.object(
  {email: yup.string().required(),
   password: yup.string().required()}
)

const LoginForm = (props) => {
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    const response = await axios.post("http://localhost:5000/api/v1/login", values).catch((err) => {
      if (err && err.response) {
        setError(err.response.data.message);
      }


    }
    
    );
    if (response) {
      alert("Auth success");
      console.log(values)
    }
    

  }
  const formik = useFormik({initialValues: {email: "", password: ""}, validateOnBlur: true, onSubmit, validationSchema: validationSchema });
  return (
    <BoxContainer>
      {error && <FormError>{error ? error: ""}</FormError>}

      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
        <Input name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {<FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>}
        </FieldContainer>
        

        <FieldContainer>
        <Input name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {<FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>}

        </FieldContainer>
      <MutedLink href="#">Forget your password?</MutedLink>
      <SubmitButton type="submit" disabled={!formik.isValid}>Signin</SubmitButton>
      </FormContainer>


    </BoxContainer>
  );
}

export default LoginForm;