import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../../utils/mutations";
import auth from "../../utils/auth";
import  '../../styles/Login.css';


export default function LoginPage() {
  const [
    submitLogin,
    { data: LoginData, loading: loggingIn, error: loginError },
  ] = useMutation(LOGIN_USER);
  const [
    submitSignup,
    { data: SignupData, loading: creatingUser, error: signupError },
  ] = useMutation(ADD_USER);
  const [formData, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginErrMsg, setLoginErrMsg] = useState(``);
  const [signupErrMsg, setSignupErrMsg] = useState(``);

  const usernameVal = (username) => {
    const regex = /^[a-zA-Z0-9]{2,12}$/i;
    const val = regex.test(username);
    val
      ? setSignupErrMsg(``)
      : setSignupErrMsg(`Must enter Alphanumeric username`);
    return val;
  };

  const emailVal = (email, form) => {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
    const val = regex.test(email);
    if (form === "login") {
      val ? setLoginErrMsg(``) : setLoginErrMsg(`Must enter a valid email`);
    }
    if (form === "signup") {
      val ? setSignupErrMsg(``) : setSignupErrMsg(`Must enter a valid email`);
    }
    return val;
  };

  const passwordVal = (password, form) => {
    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,}/;
    const val = regex.test(password);
    if (form === "login") {
      val
        ? setLoginErrMsg(``)
        : setLoginErrMsg(`Password must 
      be 6+ characters long and feature at least 1 upper and 
      lowercase letter, 1 number, and a special character`);
    }
    if (form === "signup") {
      val
        ? setSignupErrMsg(``)
        : setSignupErrMsg(`Password must 
      be 6+ characters long and feature at least 1 upper and 
      lowercase letter, 1 number, and a special character`);
    }
    return val;
  };

  const passConf = (pass) => {
    const val = formData.password === pass ? true : false;
    val
      ? setSignupErrMsg(``)
      : setSignupErrMsg(`Password Does Not Match Confirmation`);
    return val;
  };

  const handleInputChange = (input, name) => {
    setForm({
      ...formData,
      [name]: input,
    });
  };
  useEffect(() => {
    console.dir(formData);
  }, [formData]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!usernameVal || !emailVal || !passwordVal || !passConf) {
      return setLoginErrMsg(`Please Complete Form With Valid Responses`);
    }

    try {
      const {
        data: {
          login: { token, user },
        },
      } = await submitLogin({ variables: { ...formData } });

      if (loggingIn) {
        return <h1>"Loading..."</h1>;
      }

      auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!usernameVal || !emailVal || !passwordVal || !passConf) {
      return setSignupErrMsg(`Please Complete Form With Valid Responses`);
    }
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return setSignupErrMsg(`Please Complete Form With Valid Responses`);
    }

    try {
      const {
        data: {
          addUser: { token, user },
        },
      } = await submitSignup({ variables: { ...formData } });

      if (creatingUser) {
        return <h1>"Loading..."</h1>;
      }
      if (signupError) {
        return console.log(loginError);
      }
      if (user) {
        alert(`Logged in`);
      }

      auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section>
      <h2 className="login">Login</h2>
      <form className="loginContainer" onSubmit={handleLoginSubmit}>
        <div>
          <div className="input">
            <input
              placeholder="Email"
              name="email"
              onBlur={(e) => emailVal(e.target.value, "login")}
              onChange={(e) => handleInputChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="input">
            <input
              placeholder="Password"
              type={"password"}
              name="password"
              onBlur={(e) => passwordVal(e.target.value, "login")}
              onChange={(e) => handleInputChange(e.target.value, e.target.name)}
            />
          </div>
        </div>
        <input className="submitBtn" type={"submit"} value="Submit" />
        <h3 style={{ color: "red" }}>{loginErrMsg}</h3>
      </form>

      <h2 className="signUp">Sign Up</h2>
      <form className="signUpContainer" onSubmit={handleSignupSubmit}>
        <div>
          <div className="input">
            <input
              placeholder="Username"
              name="username"
              onBlur={(e) => usernameVal(e.target.value)}
              onChange={(e) => handleInputChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="input">
            <input
              placeholder="Email"
              type={"email"}
              name="email"
              onBlur={(e) => emailVal(e.target.value, "signup")}
              onChange={(e) => handleInputChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="input">
            <input
              placeholder="Password"
              type={"password"}
              name="password"
              onBlur={(e) => passwordVal(e.target.value, "signup")}
              onChange={(e) => handleInputChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="input">
            <input
              placeholder="Confirm Password"
              type={"password"}
              name="confirm password"
              onBlur={(e) => passConf(e.target.value)}
            />
          </div>
        </div>
        <input className="submitBtn2" type={"submit"} value="Submit" />
        <h3 style={{ color: "red" }}>{signupErrMsg}</h3>
      </form>
    </section>
  );
}
