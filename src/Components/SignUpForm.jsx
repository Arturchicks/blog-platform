import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { fetchRegister } from "../store/userSlice"
import SignUp from "./pages/SignUp/SignUp"
function SignUpForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, logStatus } = useSelector((state) => state.user)
  useEffect(() => {
    if (logStatus === "loggedIn" && !error) {
      navigate("/")
    }
  }, [logStatus, error, navigate])
  const handleRegister = (data) => {
    dispatch(fetchRegister(data))
  }
  return <SignUp title="register" handleClick={handleRegister} />
}
// eslint-disable-next-line import/prefer-default-export
export { SignUpForm }
