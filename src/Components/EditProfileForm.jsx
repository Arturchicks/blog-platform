import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUpdateUser } from "../store/userSlice"
import EditProfile from "./pages/EditProfile/EditProfile"

function EditProfileForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleEdit = (data) => {
    dispatch(fetchUpdateUser({ ...data }))
    navigate("/")
  }
  return <EditProfile handleClick={handleEdit} />
}
// eslint-disable-next-line import/prefer-default-export
export { EditProfileForm }
