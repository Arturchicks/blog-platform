import { format } from "date-fns"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import formatText from "../../utils/formatText"
import {
  fetchDeleteFavourite,
  fetchSetFavourite,
  fetchSingleArticle
} from "../../store/articlesSlice"
import classes from "./Article.module.scss"
import avatar from "./image.svg"
export default function Article({
  image,
  username,
  createdAt,
  description,
  favoritesCount,
  favorited,
  slug,
  tagList,
  title
}) {
  const dispatch = useDispatch()
  return (
    <div className={classes["article-wrapper"]}>
      <div className={classes["article-header"]}>
        <div className={classes["title-like"]}>
          <Link
            to={`/articles/${slug}`}
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(fetchSingleArticle(slug))}
          >
            <h1 className={classes.title}>
              {title.trim().length > 0 ? title : "Untitled"}
            </h1>
          </Link>
          <span className={classes.like}>
            <button
              type="button"
              className={!favorited ? classes["like-button"] : classes.liked}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                !favorited
                  ? dispatch(fetchSetFavourite(slug))
                  : dispatch(fetchDeleteFavourite(slug))
              }}
            />
            {favoritesCount}
          </span>
        </div>
        <div className={classes.user}>
          <div className={classes["date-name"]}>
            <span className={classes.name}>{username}</span>
            <span className={classes.createdAt}>
              {format(new Date(createdAt), "MMMM d, yyyy")}
            </span>
          </div>
          <img
            alt="avatar"
            src={
              image ===
              "https://static.productionready.io/images/smiley-cyrus.jpg"
                ? avatar
                : image
            }
            className={classes.avatar}
          />
        </div>
      </div>
      {tagList && (
        <ul className={classes.tagList}>
          {tagList
            .filter((e) => e !== null)
            // eslint-disable-next-line array-callback-return
            .map((e) => {
              // eslint-disable-next-line no-unused-expressions

              return e.trim().length > 0 ? (
                <li className={classes.tag} key={new Date() * Math.random()}>
                  {e}
                </li>
              ) : null
            })
            .toSpliced(3)}
        </ul>
      )}
      <span className={classes.description}>{formatText(description)}</span>
    </div>
  )
}
