import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchCreateArticle } from "../store/articlesSlice"
import CreateArticle from "./pages/CreateArticle/CreateArticle"
function CreateArticleForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleEdit = (data) => {
    dispatch(fetchCreateArticle({ ...data }))
    navigate("/")
  }
  return <CreateArticle handleClick={handleEdit} />
}
// eslint-disable-next-line import/prefer-default-export
export { CreateArticleForm }
