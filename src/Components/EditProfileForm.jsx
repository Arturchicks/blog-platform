import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { fetchUpdateUser, setUserUpdated } from "../store/userSlice"
import EditProfile from "./pages/EditProfile/EditProfile"

function EditProfileForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, userUpdated } = useSelector((state) => state.user)

  useEffect(() => {
    if (userUpdated === "fulfilled" && !error) {
      navigate("/")
      dispatch(setUserUpdated())
    }
  }, [dispatch, error, navigate, userUpdated])
  const handleEdit = (data) => {
    dispatch(fetchUpdateUser({ ...data }))
  }
  return <EditProfile handleClick={handleEdit} />
}
// eslint-disable-next-line import/prefer-default-export
export { EditProfileForm }
