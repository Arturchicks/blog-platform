import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Button, message, Popconfirm, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, Link } from "react-router-dom"
import {
  fetchDeleteArticle,
  fetchSingleArticle,
  fetchDeleteFavourite,
  fetchSetFavourite,
  setEdited
} from "../../store/articlesSlice"
import avatar from "../Article/image.svg"
import formatText from "../../utils/formatText"
import classes from "../Article/Article.module.scss"
function SinglePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const confirm = () => {
    dispatch(fetchDeleteArticle(slug))
    navigate("/")
    message.success("Статья удалена")
  }
  const cancel = () => {
    message.error("Cancelled")
  }
  const { article, singleRequestStatus } = useSelector((state) => state.article)
  const { username, logged } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
    setLoading(true)
  }, [dispatch, slug])
  return (
    <>
      {!loading && (
        <Spin
          style={{ display: "block", marginTop: "20px" }}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 48
              }}
              spin
            />
          }
        />
      )}
      {singleRequestStatus === "fulfilled" && (
        <div
          className={classes["singlePage-wrapper"]}
          style={{ overflowY: "auto" }}
        >
          <div className={classes["article-header"]}>
            <div className={classes["title-like"]}>
              <h1 className={classes.title}>
                {article ? article.title : null}
              </h1>
              <span className={classes.like}>
                <button
                  type="button"
                  className={
                    !article.favorited ? classes["like-button"] : classes.liked
                  }
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    !article.favorited
                      ? dispatch(fetchSetFavourite(slug))
                      : dispatch(fetchDeleteFavourite(slug))
                  }}
                />
                {article ? article.favoritesCount : 0}
              </span>
            </div>
            <div className={classes.user}>
              <div className={classes["date-name"]}>
                <span className={classes.name}>
                  {article ? article.author.username : null}
                </span>
                <span className={classes.createdAt}>
                  {format(
                    new Date(article ? article.createdAt : null),
                    "MMMM d, yyyy"
                  )}
                </span>
              </div>
              <img
                alt="avatar"
                src={
                  // eslint-disable-next-line no-nested-ternary
                  article
                    ? article.author.image ===
                      "https://static.productionready.io/images/smiley-cyrus.jpg"
                      ? avatar
                      : article.author.image
                    : null
                }
                className={classes.avatar}
              />
            </div>
          </div>
          {article.tagList && (
            <ul className={classes.tagList}>
              {article.tagList
                .filter((e) => e !== null)
                .map((e) => {
                  return e.trim().length > 0 ? (
                    <li
                      className={classes.tag}
                      key={new Date() * Math.random()}
                    >
                      {e}
                    </li>
                  ) : null
                })
                .toSpliced(3)}
            </ul>
          )}
          <span className={classes.description}>
            {formatText(article ? article.description : null)}
          </span>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "400",
              color: "rgba(0, 0, 0, 0.75)",
              marginTop: "45px"
            }}
          >
            <ReactMarkdown>{article ? article.body : null}</ReactMarkdown>
          </div>
          {article.author.username === username && logged && (
            <div className={classes["article-btns"]}>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                style={{ width: "100px", height: "100px" }}
              >
                <Button
                  danger
                  style={{ borderRadius: "10px", fontWeight: "600px" }}
                >
                  Delete
                </Button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`}>
                <button
                  type="button"
                  className={classes["edit-btn"]}
                  onClick={() => dispatch(setEdited())}
                >
                  Edit
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default SinglePage
