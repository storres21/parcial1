import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import imagenLogIn from "./cafe.png";

function Login() {
  const navigate = useNavigate();
  const intl = useIntl();
  const [formData, setFormData] = useState({ id: 1, email: "", password: "" });
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState("");
  const [lastId, setLastId] = useState(1);

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    validatePassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setEmailValid(isEmailValid);
    setError("");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{6,}$/; // Expresión regular para validar la contraseña
    const isPasswordValid = passwordRegex.test(password);
    console.log("Password validation:", isPasswordValid);
    setPasswordValid(isPasswordValid);
    setError("");
  };

  async function handlePost() {
    validateEmail(formData.email);
    validatePassword(formData.password);

    if (!emailValid || !passwordValid) {
      setError(intl.formatMessage({ id:"Error de autenticación. Revise sus credenciales"}));
      return;
    }

    // Si pasa las validaciones, continuar con la solicitud POST
    const response = await fetch(
      "https://my.api.mockaroo.com/users.json?key=304f2b60&__method=POST"
    );

    if (!response.ok) {
      setError("Error al iniciar sesión");
      return;
    }

    const data = await response.json();
    if (data && data.role !== undefined) {
      // Si el inicio de sesión es exitoso y 'role' está definido en el primer elemento de 'data'
      navigate("/Home", { state: { userRole: data.role } });
    } else {
      setError("No se pudo obtener el rol del usuario");
    }

    setLastId(lastId + 1);
    setFormData({ id: lastId + 1, email: "", password: "" });
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <h1>El aroma mágico</h1>
        <div className="linea"></div>
        <img
          src={imagenLogIn}
          alt="Imagen de inicio de sesión"
          className="img-fluid"
        />
        <div className="linea"></div>
        <div className="col-md-6 mx-auto">
          <div htmlFor="email" className="labelTituloInicio">
          <FormattedMessage id="Inicio de sesión" /> 
          </div>
          <div className="card carddiv">
            <div className="cardlogin">
              <form>
                <div className="form-group">
                  <div htmlFor="email" className="labelInicio">
                  <FormattedMessage id= "Nombre de usuario" />
                  </div>
                  <input
                    type="email"
                    className={`form-control ${emailValid ? "" : "is-invalid"} inputsLogIn`}
                    id="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <div htmlFor="password" className="labelInicio">
                  <FormattedMessage id="Contraseña"/>
                  </div>
                  <input
                    type="password"
                    className={`form-control ${
                      passwordValid ? "" : "is-invalid"
                    } inputsLogIn`}
                    id="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn  btn-custom-ingresar"
                  onClick={handlePost}
                >
                  <FormattedMessage id="Ingresar"/>
                </button>
                <button
                  type="button"
                  className="btn btn-custom-cancelar"
                  onClick={handlePost}
                >
                  <FormattedMessage id="Cancelar"/>
                </button>
              </form>
              {error && <div  className="labelError">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
