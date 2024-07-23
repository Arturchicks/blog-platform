import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchRegister } from "../store/userSlice"
import SignUp from "./pages/SignUp/SignUp"
function SignUpForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (data) => {
    dispatch(fetchRegister(data))
    navigate("/")
  }
  return <SignUp title="register" handleClick={handleRegister} />
}
// eslint-disable-next-line import/prefer-default-export
export { SignUpForm }
