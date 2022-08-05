import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import auth from "../../utils/auth";

export default function LoginPage() {
  const [submitLogin, { data, loading, error }] = useMutation(LOGIN_USER);
  const [formData, setForm] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {
          login: { token, user },
        },
      } = await submitLogin({ variables: { ...formData } });

      if (loading) {
        return <h1>"Loading..."</h1>;
      }
      if (error) {
        return console.log(error);
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
    <form onSubmit={handleSubmit}>
      <input placeholder="email" name="email" onChange={handleInputChange} />
      <input
        placeholder="password"
        name="password"
        onChange={handleInputChange}
      />
      <input type={"submit"} value="Submit" onSubmit={handleSubmit} />
    </form>
  );
}
