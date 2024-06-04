import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginService from '../services/LoginService';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = {
    email: '',
    contrasena: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Ingrese un email válido').required('Ingrese un email'),
    contrasena: Yup.string().required('Ingrese una contraseña')
  });

  const onSubmit = async (values) => {
    const user = await loginService.login(values.email, values.contrasena);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user)); // Guardar el usuario en sessionStorage
      navigate('/home');
    } else {
      setError('El email o la contraseña no son correctos');
    }
  };

  return (
    <div className="login-container">
      <img src={`${process.env.PUBLIC_URL}/logo3.png`} alt="Logo Ori" />
      <h1>Ingresar</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="form-group">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage name="contrasena" component="div" className="error" />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Iniciar Sesión</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;