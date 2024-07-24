import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pagination, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { fetchArticles } from "../../store/articlesSlice"
import Articles from "../Articles/Articles"
import AppHeader from "../AppHeader/AppHeader"
import SinglePage from "../pages/singlePage"
import { SignInForm } from "../SignInForm"
import { SignUpForm } from "../SignUpForm"
import { setLog } from "../../store/userSlice"
import { EditProfileForm } from "../EditProfileForm"
import { CreateArticleForm } from "../CreateArticleForm"
import { EditArticleForm } from "../EditArticleForm"
import "./App.module.scss"
export default function App() {
  const dispatch = useDispatch()
  const { articlesCount, requestStatus, articleUpdated } = useSelector(
    (state) => state.article
  )
  const { logged, userUpdated } = useSelector((state) => state.user)
  const [offset, setOffset] = useState(0)
  const location = useLocation()
  // eslint-disable-next-line react/no-unstable-nested-components
  function PrivateRoute({ children }) {
    return logged ? children : <Navigate to="/sign-in" />
  }
  useEffect(() => {
    dispatch(fetchArticles({ limit: 5, offset }))
  }, [dispatch, offset, articleUpdated, userUpdated, logged])
  const token = sessionStorage.getItem("token")
  useEffect(() => {
    if (token) {
      fetch("https://blog.kata.academy/api/user", {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then((response) => response.json())
        .then((response) => dispatch(setLog(response)))
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error fetching user data:", error)
        })
    }
  }, [dispatch, userUpdated, token])
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<SinglePage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        {logged && (
          <>
            <Route path="/edit-profile" element={<EditProfileForm />} />
            <Route path="/articles/:slug/edit" element={<EditArticleForm />} />
          </>
        )}
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <CreateArticleForm />
            </PrivateRoute>
          }
        />
      </Routes>
      {requestStatus === "pending" && (
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
      {(requestStatus === "fulfilled" && location.pathname === "/articles") ||
        (requestStatus === "fulfilled" && location.pathname === "/" && (
          <Pagination
            total={articlesCount}
            current={offset / 5 + 1}
            onChange={(num) => {
              setOffset((num - 1) * 5)
            }}
            style={{
              justifyContent: "center",
              height: "50px",
              alignItems: "center"
            }}
            showSizeChanger={false}
          />
        ))}
    </>
  )
}
