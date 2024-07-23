import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUpdateArticle } from "../store/articlesSlice"
import EditArticle from "./pages/EditArticle"
function EditArticleForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleEdit = (data) => {
    dispatch(fetchUpdateArticle({ ...data }))
    navigate("/")
  }
  return <EditArticle handleClick={handleEdit} />
}
// eslint-disable-next-line import/prefer-default-export
export { EditArticleForm }
