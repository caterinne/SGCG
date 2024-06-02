import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginService from '../services/LoginService';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Ingrese un usuario'),
    password: Yup.string().required('Ingrese una contraseña')
  });

  const onSubmit = (values) => {
    const user = loginService.login(values.username, values.password);
    if (user) {
      navigate('/home');
    } else {
      setError('El usuario o la contraseña no son correctos');
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
                type="text"
                name="username"
                placeholder="Usuario"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage name="password" component="div" className="error" />
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

