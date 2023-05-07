import React, { useContext, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utilis.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";

const ForgotPwdScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    // Send a request to the backend to generate a password reset token and send an email to the user with the link to reset their password
    try {
      const { data } = await axios.post("/api/users/forgot-pwd", { email });
      console.log(data);
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/profile");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Confirm Email</Button>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPwdScreen;
