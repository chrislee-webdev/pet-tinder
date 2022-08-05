import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../../utils/mutations";
import auth from "../../utils/auth";

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
  const [usernameValid, setUsername] = useState(false);
  const [emailValid, setEmail] = useState(false);
  const [passValid, setPass] = useState(false);
  const [showLoginAlert, setLoginAlert] = useState(false);
  const [showSignupAlert, setSignupAlert] = useState(false);
  const [alertMsg, setMsg] = useState(
    "Must have valid username/email/password"
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...formData, [name]: value });
  };
  const validate = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    if (value === "") {
      e.currentTarget.placeholder = `Must have ${e.target.name}`;
      return;
    }

    const valTest = {
      username: /^[a-zA-Z0-9]{6,20}$/i,
      email: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
      password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/,
    };

    switch (name) {
      case "email":
        valTest.email.test(value)
          ? setEmail(true)
          : setMsg(`Must have valid ${name}`);
        if (!emailValid) {
          setLoginAlert(true);
        }
        break;

      case "username":
        console.log(value);
        valTest.username.test(value)
          ? setUsername(true)
          : setMsg(`Must have valid ${name}`);
        if (!usernameValid) {
          setSignupAlert(true);
        }
        break;

      case "password":
        valTest.password.test(value)
          ? setPass(true)
          : setMsg(`Must have valid ${name}`);
        if (!passValid) {
          setLoginAlert(true);
        }
        break;
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (emailValid === false || passValid === false) {
      return setLoginAlert(true);
    }

    setLoginAlert(false);

    try {
      const {
        data: {
          login: { token, user },
        },
      } = await submitLogin({ variables: { ...formData } });

      if (loggingIn) {
        return <h1>"Loading..."</h1>;
      }
      if (loginError) {
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (
      usernameValid === false ||
      emailValid === false ||
      passValid === false
    ) {
      return setSignupAlert(true);
    }

    setSignupAlert(false);

    try {
      const {
        data: {
          login: { token, user },
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
    <>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          onBlur={validate}
        />
        <input
          placeholder="Password"
          type={"password"}
          name="password"
          onChange={handleInputChange}
          onBlur={validate}
        />
        <input type={"submit"} value="Submit" />
        {showLoginAlert && <h3 style={{ color: "red" }}>{alertMsg}</h3>}
      </form>

      <h2>Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          onBlur={validate}
        />
        <input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={validate}
        />
        <input
          placeholder="Password"
          type={"password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={validate}
        />
        <input
          placeholder="Confirm Password"
          type={"password"}
          name="confirm password"
          onBlur={validate}
        />
        <input type={"submit"} value="Submit" />
        {showSignupAlert && (
          <h3 style={{ color: "red" }}>
            Please enter a valid Username/Email/Password
          </h3>
        )}
      </form>
    </>
  );
}
