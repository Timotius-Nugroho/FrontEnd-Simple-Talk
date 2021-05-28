import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Card,
  Image,
} from "react-bootstrap";
import { EyeFill, EyeSlashFill, CaretLeft } from "react-bootstrap-icons";
import styles from "./Register.module.css";
import line from "../../../assets/img/line.png";
import google from "../../../assets/img/googleIcon.png";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("E", email, "P", password, "U", username);
  }, [email, password, username]);

  const handleRegister = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/chat");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleMove = () => {
    props.history.push("/login");
  };

  return (
    <>
      <Container>
        <Card
          className="mt-5 mx-auto p-4 mb-5 shadow"
          style={{ width: "28rem", borderRadius: "35px" }}
        >
          <Card.Body>
            <div className="d-flex justify-content-between mb-5 mt-2">
              <CaretLeft
                color="#7E98DF"
                size={30}
                className={styles.back}
                onClick={handleMove}
              />
              <p className={styles.title}>Register</p>
              <CaretLeft color="white" />
            </div>
            <p className={`${styles.semi} mb-4 pb-2`}>
              Let’s create your account!
            </p>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-5">
                <Form.Label className={styles.label}>Name</Form.Label>
                <Form.Control
                  className={`${styles.input} shadow-none`}
                  type="text"
                  placeholder="Enter Name"
                  value={username}
                  onChange={(event) => changeUsername(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label className={styles.label}>Email</Form.Label>
                <Form.Control
                  className={`${styles.input} shadow-none`}
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => changeEmail(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label className={styles.label}>Password</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    className={`${styles.input} shadow-none`}
                    type={showPassword ? "text" : "password"}
                    onChange={(event) => changePassword(event)}
                    placeholder="Password"
                    required
                  />
                  <InputGroup.Text
                    className={styles.suplement}
                    value={password}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Button
                className={`${styles.btnLogin} mb-4`}
                variant="primary"
                type="submit"
              >
                Register
              </Button>
              <div className="d-flex flex-row mb-4 justify-content-between">
                <Image className={styles.line} src={line} />
                <div className={styles.spacer}>Register with</div>
                <Image className={styles.line} src={line} />
              </div>
              <Button
                className={`${styles.btnGoolge} mb-4`}
                variant="outline-primary"
                type="button"
              >
                <Image src={google} />
                <span> Google</span>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Register;
