import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../store/userSlice"
import classes from "./AppHeader.module.scss"
import avatar from "./image.svg"

function AppHeader() {
  const { logged, username, image } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  return (
    <header className={classes["app-header"]}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h6 className={classes["header-text"]}>Realworld Blog</h6>
      </Link>
      {!logged && (
        <div className={classes.logs}>
          <Link to="/sign-in">
            <button type="button" className={classes["sign-in"]}>
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button type="button" className={classes["sign-up"]}>
              Sign Up
            </button>
          </Link>
        </div>
      )}
      {logged && (
        <div className={classes["user-group"]}>
          <Link to="/new-article">
            <button type="button" className={classes["create-article"]}>
              Create article
            </button>
          </Link>
          <div className={classes["image-username"]}>
            <span className={classes.username}>{username}</span>
            <Link to="/edit-profile">
              <img
                alt="avatar"
                src={image || avatar}
                className={classes["user-image"]}
              />
            </Link>
            <Link to="/">
              <button
                type="button"
                className={classes["log-out"]}
                onClick={() => dispatch(logOut())}
              >
                Log Out
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
export default AppHeader
