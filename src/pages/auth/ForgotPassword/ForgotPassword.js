import { useState } from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../../../redux/action/auth";
import { Button, Container, Form, Card, Alert, Spinner } from "react-bootstrap";
import { CaretLeft } from "react-bootstrap-icons";
import styles from "./ForgotPassword.module.css";

function ForgetPassword(props) {
  const [email, setEmail] = useState("");
  const [cardMsg, setCardMsg] = useState(
    "Enter your email to find your account"
  );
  const [alertMsg, setAlertMsg] = useState([false, ""]);
  const [isRequestSetPassword, setIsRequestSetPassword] = useState([
    false,
    "Search your account",
  ]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgot = (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (isRequestSetPassword[0]) {
      if (newPassword === confirmNewPassword) {
        props
          .forgotPassword({ userEmail: email, userPassword: newPassword })
          .then((res) => {
            setAlertMsg([true, res.value.data.msg]);
            setIsLoading(false);
            setTimeout(() => {
              props.history.push("/");
            }, 2000);
          })
          .catch((err) => {
            setAlertMsg([true, err.response.data.msg]);
            setIsLoading(false);
            setTimeout(() => {
              setAlertMsg([false, ""]);
            }, 2000);
          });
      } else {
        setAlertMsg([true, "Passwords are not the same"]);
        setIsLoading(false);
        setTimeout(() => {
          setAlertMsg([false, ""]);
        }, 2000);
      }
    } else {
      props
        .forgotPassword({ userEmail: email })
        .then((res) => {
          setAlertMsg([true, res.value.data.msg]);
          setIsLoading(false);
          setTimeout(() => {
            setAlertMsg([false, ""]);
            setCardMsg("You’ll get messages soon on your e-mail ");
            setIsRequestSetPassword([true, "Send request"]);
          }, 1000);
        })
        .catch((err) => {
          setAlertMsg([true, err.response.data.msg]);
          setIsLoading(false);
          setTimeout(() => {
            setAlertMsg([false, ""]);
          }, 2000);
        });
    }
  };

  const handleMoveLogin = () => {
    props.history.push("/");
  };

  // console.log("prosss", props);

  return (
    <>
      <Container>
        <Card
          className={`mt-5 mx-auto p-4 mb-5 shadow ${styles.cardBox}`}
          style={{ borderRadius: "35px" }}
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
            <p className={`${styles.semi} mb-4 pb-2`}>{cardMsg}</p>
            <Form onSubmit={handleForgot}>
              {isRequestSetPassword[0] ? (
                <div>
                  <Form.Group className="mb-5">
                    <Form.Label className={styles.label}>
                      New password
                    </Form.Label>
                    <Form.Control
                      className={`${styles.input} shadow-none`}
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label className={styles.label}>
                      Confirm new password
                    </Form.Label>
                    <Form.Control
                      className={`${styles.input} shadow-none`}
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={(event) =>
                        setConfirmNewPassword(event.target.value)
                      }
                      required
                    />
                  </Form.Group>
                </div>
              ) : (
                <Form.Group className="mb-5">
                  <Form.Label className={styles.label}>Email</Form.Label>
                  <Form.Control
                    className={`${styles.input} shadow-none`}
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Button
                className={`${styles.btnSend} mb-4`}
                variant="primary"
                type="submit"
              >
                {isLoading ? (
                  <Spinner animation="border" variant="primary" size="sm" />
                ) : (
                  isRequestSetPassword[1]
                )}
              </Button>
              {alertMsg[0] ? (
                <Alert variant="warning" className="text-center">
                  {alertMsg[1]}
                </Alert>
              ) : (
                ""
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(null, mapDispatchToProps)(ForgetPassword);
