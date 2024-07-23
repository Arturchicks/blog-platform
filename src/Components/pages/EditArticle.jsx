import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleArticle } from "../../store/articlesSlice"
import classes from "./CreateArticle/CreateArticle.module.scss"
function CreateArticle({ handleClick }) {
  const { title, text, tags, description } = useSelector(
    (state) => state.article
  )
  const [articleName, setArticleName] = useState(title)
  const [body, setBody] = useState(text)
  const [desc, setDesc] = useState(description)
  const [tagList, setTags] = useState(tags ? [...tags] : [])
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    text: yup.string().required()
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const { slug } = useParams()

  const dispatch = useDispatch()
  const handleTagChange = (index, value) => {
    const newTagList = [...tagList]
    newTagList[index] = value
    setTags(newTagList)
  }
  const onSubmit = (data) => {
    data.tagList = tagList
    handleClick({ ...data, slug })
  }
  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.signHeader}>Edit Article</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes["input-wrapper"]}>
          <label>
            Title
            <input
              size="large"
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              value={articleName}
              onKeyDown={(e) => {
                if (
                  e.target.value.trim() === "" ||
                  e.target.value.length >= 100
                ) {
                  // eslint-disable-next-line no-unused-expressions
                  e.key === "Backspace" || e.target.value === ""
                    ? null
                    : e.preventDefault()
                }
              }}
              style={
                ({ width: "320px" },
                errors.title?.message ? { borderColor: "#f11111b8" } : null)
              }
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("title")}
              onChange={(e) => {
                setArticleName(e.target.value)
              }}
            />
            <p>{errors.title?.message}</p>
          </label>
          <label>
            Short description
            <input
              size="large"
              type="description"
              placeholder="Description"
              name="description"
              id="description"
              value={desc}
              onKeyDown={(e) => {
                if (
                  e.target.value.trim() === "" ||
                  e.target.value.length >= 100
                ) {
                  // eslint-disable-next-line no-unused-expressions
                  e.key === "Backspace" || e.target.value === ""
                    ? null
                    : e.preventDefault()
                }
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("description")}
              style={
                ({ width: "320px" },
                errors.description?.message
                  ? { borderColor: "#f11111b8" }
                  : null)
              }
              onChange={(e) => {
                setDesc(e.target.value)
              }}
            />
            <p>{errors.description?.message}</p>
          </label>
          <div style={{ width: "875px" }}>
            <label style={{ height: 0 }} htmlFor="text">
              Text
              <textarea
                className={classes.text}
                size="large"
                type="text"
                placeholder="Text"
                name="text"
                id="text"
                value={body}
                onKeyDown={(e) => {
                  if (
                    e.target.value.trim() === "" ||
                    e.target.value.length >= 1000
                  ) {
                    // eslint-disable-next-line no-unused-expressions
                    e.key === "Backspace" || e.target.value === ""
                      ? null
                      : e.preventDefault()
                  }
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("text")}
                onChange={(e) => {
                  setBody(e.target.value)
                }}
                style={
                  ({ width: "320px" },
                  errors.text?.message ? { borderColor: "#f11111b8" } : null)
                }
              />
              <p>{errors.text?.message}</p>
            </label>
          </div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              height: "57px",
              // width: "320px",
              display: "inline-block",
              color: "rgba(38, 38, 38, 1)"
            }}
          >
            Tags
            <div className={classes["tag-wrapper"]}>
              {tagList &&
                tagList.map((el, index) => (
                  <div className={classes.tag}>
                    <input
                      size="large"
                      type="text"
                      placeholder="Tag"
                      className="inputs"
                      name={`tag-${index}`}
                      id={`tag-${index}`}
                      style={{ width: "300px" }}
                      value={tagList[index]}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault()
                        }
                      }}
                      {...register(`tagList[${index}]`)}
                      onChange={(e) => {
                        handleTagChange(index, e.target.value)
                      }}
                    />
                    <button
                      type="button"
                      className={classes["delete-btn"]}
                      onClick={(e) => {
                        tagList.splice(e[index], 1)
                        setTags([...tagList])
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </label>
          <button
            type="button"
            className={classes["add-tag"]}
            style={tagList.length ? { left: "440px" } : null}
            onClick={() => {
              tagList.push("")
              setTags([...tagList])
            }}
          >
            Add Tag
          </button>
          <input className={classes.btn} type="submit" value="Send" />
        </div>
      </form>
    </div>
  )
}
export default CreateArticle
