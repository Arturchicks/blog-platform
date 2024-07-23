import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchLoginUser } from "../store/userSlice"
import SignIn from "./pages/SignIn/SignIn"

function SignInForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate("/")
  const { error, logStatus } = useSelector((state) => state.user)
  useEffect(() => {
    if (logStatus === "loggedIn" && !error) {
      navigate("/")
    }
  }, [logStatus, error, navigate])
  const handleLogin = (data) => {
    dispatch(fetchLoginUser({ ...data }))
  }
  return <SignIn handleClick={handleLogin} />
}
// eslint-disable-next-line import/prefer-default-export
export { SignInForm }
