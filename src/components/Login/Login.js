import React, {
  useState,
  useEffect,
  useReducer,
  // useContext,
  useRef,
  Fragment,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
// import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router";
import MainHeader from "../MainHeader/MainHeader";
import { Link } from "react-router-dom";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@" && ".com") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@" && ".com") };
  }
  if (action.type == "ERROR") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  if (action.type == "ERROR") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrormessage] = useState(false);

  const navigate = useNavigate();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // const [errorState, ]

  // const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { value: email } = emailState;
  const { value: password } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      // authCtx.onLogin(emailState.value, passwordState.value);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailState.value,
          passwordState.value
        );
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } catch (error) {
        console.log(error);
        if (error.code == "auth/invalid-login-credentials") {
          console.log(error.code);
          setErrormessage(true);
          console.log(errorMessage);
          dispatchEmail({ type: "ERROR" });
          dispatchPassword({ type: "ERROR" });
        }
      }
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };
  console.log(errorMessage);
  return (
    <Fragment>
      <MainHeader pageinfo={"User Login Page"} />
      <main>
        <Card className={classes.login}>
          {errorMessage && (
            <div className={classes.errorMessage}>
              <p>
                Credentials Did Not Match.
                <br></br>
                <span style={{ color: "#272a4b" }}>Please Try Again</span>
              </p>
            </div>
          )}
          <form onSubmit={submitHandler}>
            <Input
              ref={emailInputRef}
              id="email"
              label="E-Mail"
              type="email"
              isValid={emailIsValid}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
            <Input
              ref={passwordInputRef}
              id="password"
              label="Password"
              type="password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <div className={classes.actions}>
              <Button
                type="submit"
                className={classes.btn}
              >
                Login
              </Button>
            </div>
          </form>
          {
            <p>
              {" "}
              Not a User Yet? <Link to="/Signup">Register as a User</Link>
            </p>
          }
        </Card>
      </main>
    </Fragment>
  );
};

export default Login;
