import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import classes from "./CreateArticle.module.scss"
function CreateArticle({ handleClick }) {
  const schema = yup.object().shape({
    title: yup.string().max(100).required(),
    description: yup.string().max(100).required(),
    text: yup.string().max(1000).required()
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    handleClick({ ...data })
  }
  const [tagList, setTag] = useState([])
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.signHeader}>Create Article</h3>
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
              {...register("title")}
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
            />
            <p>{errors.description?.message}</p>
          </label>
          <div style={{ width: "875px" }}>
            <label style={{ height: 0 }} htmlFor="text">
              Text
            </label>
            <textarea
              className={classes.text}
              size="large"
              type="text"
              placeholder="Text"
              name="text"
              id="text"
              onKeyDown={(e) =>
                e.target.value.length > 1000
                  ? e.key === "Backspace"
                    ? null
                    : e.preventDefault()
                  : null
              }
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("text")}
              style={
                ({ width: "320px" },
                errors.text?.message ? { borderColor: "#f11111b8" } : null)
              }
            />
            <p>{errors.text?.message}</p>
          </div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              height: "57px",
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
                      className={classes.inputs}
                      name={`tag-${index}`}
                      key={new Date() * Math.random()}
                      id={`tag-${index}`}
                      style={{ width: "300px" }}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault()
                        }
                      }}
                      {...register(`tag[${index}]`)}
                    />
                    <button
                      type="button"
                      className={classes["delete-btn"]}
                      onClick={(e) => {
                        tagList.splice(e[index], 1)
                        setTag([...tagList])
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
              setTag([...tagList])
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
