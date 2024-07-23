import { useSelector } from "react-redux"
import Article from "../Article/Article"
import classes from "./Articles.module.scss"
export default function Articles() {
  const { articles } = useSelector((state) => state.article)
  const { requestStatus } = useSelector((state) => state.article)
  return (
    <div className={classes.wrapper}>
      {requestStatus === "fulfilled" &&
        articles.map((e) => (
          <Article
            following={e.author.following}
            image={e.author.image}
            username={e.author.username}
            body={e.body}
            slug={e.slug}
            key={e.slug}
            createdAt={e.createdAt}
            description={e.description}
            favorited={e.favorited}
            favoritesCount={e.favoritesCount}
            tagList={e.tagList}
            title={e.title}
            updatedAt={e.updatedAt}
          />
        ))}
    </div>
  )
}
