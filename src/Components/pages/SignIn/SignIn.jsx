import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector } from "react-redux"
import classes from "./SignIn.module.scss"
export default function SignIn({ handleClick }) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(15).required()
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
  const { error } = useSelector((state) => state.user)
  const onSubmit = (data) => {
    handleClick(data)
  }
  const checkValues = () => {
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    if (emailInput.value.trim() !== "") {
      setEmail(true)
    }
    if (passwordInput.value.length >= 6) {
      setPass(true)
    }
  }

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.signHeader}>Sign In</h3>
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
            Email address
            <input
              size="large"
              type="email"
              id="email"
              placeholder="Email address"
              name="email"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              style={
                ({ width: "320px" },
                (errors.email?.message && !pass) || error
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
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
              id="password"
              placeholder="Password"
              name="password"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
                if (e.key === "Enter") {
                  handleSubmit(onSubmit)
                }
              }}
              style={
                ({ width: "320px" },
                errors.password?.message || error
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("password")}
            />
            <p>
              {pass.length < 6 || !pass
                ? errors.password?.message
                : error
                  ? "Invalid email or password"
                  : null}
            </p>
          </label>

          <input
            className={classes.btn}
            type="submit"
            onClick={(e) => {
              if (pass.length < 6 && !email) {
                e.preventDefault()
              }
              checkValues()
            }}
            value="Login"
          />
          <span className={classes["have-an-acc"]}>
            {`Don't have an account? `}
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <span>Sign Up</span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}
