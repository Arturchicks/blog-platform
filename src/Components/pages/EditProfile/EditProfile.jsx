import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import classes from "./EditProfile.module.scss"
function EditProfile({ handleClick }) {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    newPassword: yup.string().min(6).max(15).required()
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
      <h3 className={classes.signHeader}>Edit Profile</h3>
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
                errors.username?.message && !username
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              {...register("username")}
            />
            <p>{!username ? errors.username?.message : null}</p>
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
              {...register("email")}
              style={
                ({ width: "320px" },
                errors.email?.message ? { borderColor: "#f11111b8" } : null)
              }
            />
            <p>{!email ? errors.email?.message : null}</p>
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
            New password
            <input
              size="large"
              type="password"
              placeholder="Password"
              name="newPassword"
              id="password"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              style={
                ({ width: "320px" },
                errors.newPassword?.message && !pass
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              {...register("newPassword")}
            />
            <p>{!pass ? errors.newPassword?.message : null}</p>
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
            Avatar (url)
            <input
              size="large"
              type="url"
              placeholder="Url"
              id="url"
              name="image"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault()
                }
              }}
              {...register("url")}
            />
          </label>
          <input
            className={classes.btn}
            type="submit"
            value="Save"
            onClick={() => {
              checkValues()
            }}
          />
        </div>
      </form>
    </div>
  )
}
export default EditProfile
