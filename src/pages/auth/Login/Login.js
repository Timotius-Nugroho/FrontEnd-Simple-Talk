import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Card,
  Image,
  Alert,
} from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import styles from "./Login.module.css";
import line from "../../../assets/img/line.png";
import google from "../../../assets/img/googleIcon.png";
import { login, logout } from "../../../redux/action/auth";
import axios from "axios";

function Login(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (auth.msg.length > 0) {
      setShowAlert(true);
    }
    if (auth.data.token) {
      const testingToken = auth.data.token || "";
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}user/by-id/${auth.data.user_id}`,
          {
            headers: {
              Authorization: "Bearer " + testingToken,
            },
          }
        )
        .then((res) => {
          setShowAlert(true);
          localStorage.setItem("token", auth.data.token);
          props.history.push("/chat-list");
        })
        .catch((err) => {
          setShowAlert(false);
          dispatch(logout(auth.data.user_id));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, props]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        userEmail: email,
        userPassword: password,
      })
    );
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleMoveRegister = () => {
    props.history.push("/register");
  };

  const handleMoveForgetPass = () => {
    props.history.push("/forget-password");
  };

  return (
    <>
      <Container>
        <Card
          className={`mt-5 mx-auto p-4 mb-5 shadow ${styles.cardBox}`}
          style={{ borderRadius: "35px" }}
        >
          <Card.Body>
            <p className={`text-center ${styles.title} mb-5 mt-3`}>Login</p>
            <p className={`${styles.semi} mb-4 pb-2`}>Hi, Welcome back!</p>
            <Form onSubmit={handleLogin}>
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
                    value={password}
                    placeholder="Password"
                    required
                  />
                  <InputGroup.Text
                    className={styles.suplement}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              {showAlert ? (
                <Alert className="text-center" variant="warning">
                  {auth.msg}
                </Alert>
              ) : (
                ""
              )}
              <div className="d-flex flex-row-reverse mb-4">
                <p className={styles.forgot} onClick={handleMoveForgetPass}>
                  Forgot password?
                </p>
              </div>
              <Button
                className={`${styles.btnLogin} mb-4`}
                variant="primary"
                type="submit"
              >
                Login
              </Button>
              <div className="d-flex flex-row mb-4 justify-content-between">
                <Image className={styles.line} src={line} />
                <div className={styles.spacer}>Login with</div>
                <Image className={styles.line} src={line} />
              </div>
              <Button
                className={`${styles.btnGoolge} mb-5`}
                variant="outline-primary"
                type="button"
              >
                <Image src={google} />
                <span> Google</span>
              </Button>
            </Form>
            <p className={`${styles.spacer} text-center`}>
              Don’t have an account?{" "}
              <span className={styles.signUp} onClick={handleMoveRegister}>
                Sign Up
              </span>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
