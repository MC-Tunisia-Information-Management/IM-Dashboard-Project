import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Form,
  Col,
  InputGroup,
  Label,
} from "reactstrap";
import { useState } from "react";
import { withRouter } from "react-router-dom";

import "assets/css/loginform.scss";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Login({ history }) {
  const url2 = "http://127.0.0.1:8000/";
  const url = "https://im_fastapi-1-e2418416.deta.app/";
  const [password, setPassword] = useState("");
  const [showpassword, setShow] = useState("password");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}login?password=${password}`);

      const data = await response.json();
      if (data.message == "Login successful") {
        console.log(data.message);
        history.push("/admin/dashboard"); // redirect to /dashboard upon successful login
      } else {
        console.log("Invalid password");
      }

      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const toggleShow = (event) => {
    if (showpassword === "password") {
      setShow("text");
      return;
    }
    setShow("password");
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col className="loginform" md={{ size: 4, offset: 4 }}>
            <Card className="logincard">
              <CardHeader>
                <h2 className="title">Login</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pl-1" md={{ size: 6, offset: 2 }}>
                      <label>Passcode</label>
                      <Input
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Passcode"
                        type={showpassword}
                      />
                    </Col>
                    <Col md={{ size: 6, offset: 3 }}>
                      <InputGroup>
                        <Input type="checkbox" onChange={toggleShow} />
                        <Label>Show password</Label>
                      </InputGroup>
                    </Col>
                    <Col md={{ size: 6, offset: 2 }}>
                      <Button color="info" style={{ width: "80%" }}>
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
