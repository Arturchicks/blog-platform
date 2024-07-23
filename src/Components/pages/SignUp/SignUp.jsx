import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import { useSelector } from "react-redux"
import classes from "./SignUp.module.scss"
function SignUp({ handleClick }) {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(15).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must confirm"),
    agreeToTerms: yup.boolean().oneOf([true], "You must agree to the terms")
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [email, setEmail] = useState(false)
  const [pass, setPass] = useState(false)
  const [username, setUsername] = useState(false)
  const { error } = useSelector((state) => state.user)
  const onSubmit = (data) => {
    handleClick({ ...data })
  }
  const checkValues = () => {
    const userInput = document.getElementById("user")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    if (userInput.value.trim() !== "") {
      setUsername(true)
    } else {
      setUsername(false)
    }
    if (emailInput.value.trim() !== "") {
      setEmail(true)
    } else {
      setEmail(false)
    }
    if (passwordInput.value.length >= 6) {
      setPass(true)
    } else {
      setPass(false)
    }
  }
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.signHeader}>Create new account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes["input-wrapper"]}>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              width: "320px",
              height: "57px",
              display: "inline-block",
              color: "rgba(38, 38, 38, 1)"
            }}
          >
            Username
            <input
              size="large"
              type="text"
              placeholder="Username"
              id="user"
              name="username"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              style={
                ({ width: "320px" },
                (errors.username?.message && !username) || error
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("username")}
            />
            <p>
              {!error
                ? !username
                  ? errors.username?.message
                  : null
                : JSON.stringify(error).includes("username")
                  ? "username is already taken"
                  : null}
            </p>
          </label>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              width: "320px",
              height: "57px",
              display: "inline-block",
              color: "rgba(38, 38, 38, 1)"
            }}
          >
            Email address
            <input
              size="large"
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("email")}
              style={
                ({ width: "320px" },
                errors.email?.message || error
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
            />
            <p>
              {!error
                ? !email
                  ? errors.email?.message
                  : null
                : JSON.stringify(error).includes("email")
                  ? "email is already taken"
                  : null}
            </p>
          </label>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              height: "57px",
              width: "320px",
              display: "inline-block",
              color: "rgba(38, 38, 38, 1)"
            }}
          >
            Password
            <input
              size="large"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              style={
                ({ width: "320px" },
                errors.password?.message && !pass
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("password")}
            />
            <p>{!pass ? errors.password?.message : null}</p>
          </label>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              width: "320px",
              height: "57px",
              display: "inline-block",
              color: "rgba(38, 38, 38, 1)"
            }}
          >
            Repeat password
            <input
              size="large"
              type="password"
              placeholder="Repeat password"
              name="repeatPassword"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              style={
                ({ width: "320px" },
                errors.repeatPassword?.message
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("repeatPassword")}
            />
            <p>{errors.repeatPassword?.message}</p>
          </label>
          <div className={classes.divider} />
          <label className={classes["checkbox-container"]}>
            <input
              type="checkbox"
              className={classes["real-checkbox"]}
              style={{ width: 0, height: 0 }}
              name="agreeToTerms"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("agreeToTerms")}
            />
            <span className={classes["custom-checkbox"]} />

            <span className={classes.policy}>
              I agree to the processing of my personal information
            </span>
            <p
              style={{
                fontFamily: "Roboto",
                paddingLeft: "30px",
                margin: "0",
                height: "0"
              }}
            >
              {errors.agreeToTerms?.message}
            </p>
          </label>
          <input
            className={classes.btn}
            type="submit"
            value="Create"
            onClick={() => {
              checkValues()
            }}
          />
          <span className={classes["have-an-acc"]}>
            Already have an account?
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <span> Sign In</span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}
export default SignUp
