import { useState, useEffect } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { CaretLeft } from "react-bootstrap-icons";
import styles from "./ForgotPassword.module.css";

function ForgetPassword(props) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("E", email);
  }, [email]);

  const handleRegister = (event) => {
    event.preventDefault();
    props.history.push("/");
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleMoveLogin = () => {
    props.history.push("/");
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
                onClick={handleMoveLogin}
              />
              <p className={styles.title}>Forgot Password</p>
              <CaretLeft color="white" />
            </div>
            <p className={`${styles.semi} mb-4 pb-2`}>
              You’ll get messages soon on your e-mail
            </p>
            <Form onSubmit={handleRegister}>
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
              <Button
                className={`${styles.btnSend} mb-4`}
                variant="primary"
                type="submit"
              >
                Send
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ForgetPassword;
