import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// eslint-disable-next-line import/prefer-default-export
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  // eslint-disable-next-line consistent-return
  async (params, { rejectWithValue }) => {
    const { limit, offset } = params
    const token = sessionStorage.getItem("token")
    try {
      const articles = fetch(
        `https://blog.kata.academy/api/articles?offset=${offset}&limit=${limit}`,
        { headers: { Authorization: `Token ${token}` } },
        {
          method: "GET"
        }
      ).then((response) => response.json())
      return articles
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        statusText: err.response.statusText
      })
    }
  }
)
export const fetchSingleArticle = createAsyncThunk(
  "articles/fetchSingleArticle",
  // eslint-disable-next-line consistent-return
  async (slug, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token")

    try {
      const article = fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        { headers: { Authorization: `Token ${token}` } },
        {
          method: "GET"
        }
      ).then((response) => response.json())
      return article
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        statusText: err.response.statusText
      })
    }
  }
)
export const fetchCreateArticle = createAsyncThunk(
  "article/createArticle",
  async (data) => {
    const { title, description, text, tag } = data
    try {
      const token = sessionStorage.getItem("token")
      const response = await axios.post(
        "https://blog.kata.academy/api/articles",
        {
          article: {
            title,
            description,
            body: text,
            tagList: tag ? [...tag] : null
          }
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    }
  }
)
export const fetchDeleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (slug) => {
    try {
      const token = sessionStorage.getItem("token")
      const response = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    }
  }
)
export const fetchUpdateArticle = createAsyncThunk(
  "article/updateArticle",
  async (params) => {
    const { slug, title, text, description, tagList } = params
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.put(
        `https://blog.kata.academy/api/articles/${slug}`,
        { article: { title, description, body: text, tagList: [...tagList] } },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    }
  }
)
export const fetchSetFavourite = createAsyncThunk(
  "article/setFavourite",
  async (slug) => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.post(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    }
  }
)
export const fetchDeleteFavourite = createAsyncThunk(
  "article/deleteFavourite",
  async (slug) => {
    try {
      const token = sessionStorage.getItem("token")

      const response = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    }
  }
)
const articlesSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    article: null,
    articlesCount: null,
    requestStatus: null,
    singleRequestStatus: null,
    favoritesCount: 0,
    articleUpdated: null,
    title: null,
    onEdit: false,
    description: null,
    text: null,
    tags: [],
    modalWindow: false
  },
  reducers: {
    setEdited(state) {
      state.onEdit = true
    },
    setModal(state, action) {
      state.modalWindow = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = [...action.payload.articles]
        state.articlesCount = action.payload.articlesCount
        state.requestStatus = "fulfilled"
      })
      .addCase(fetchArticles.pending, (state) => {
        state.requestStatus = "pending"
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.singleRequestStatus = "pending"
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.singleRequestStatus = "fulfilled"
        state.article = action.payload.article
        state.favoritesCount = action.payload.favoritesCount
        state.title = action.payload.article.title
        state.description = action.payload.article.description
        state.text = action.payload.article.body
        state.tags = action.payload.article.tagList
      })
      .addCase(fetchCreateArticle.pending, (state) => {
        state.articleUpdated = "pending"
      })
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.articleUpdated = "fulfilled"
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.articleUpdated = "deleted"
      })
      .addCase(fetchDeleteArticle.pending, (state) => {
        state.articleUpdated = "pending"
      })
      .addCase(fetchUpdateArticle.fulfilled, (state) => {
        state.articleUpdated = "updated"
      })
      .addCase(fetchUpdateArticle.pending, (state) => {
        state.articleUpdated = "pendingUpdated"
      })
      .addCase(fetchSetFavourite.fulfilled, (state, action) => {
        state.articles = [
          ...state.articles.filter(
            (e) => e.slug !== action.payload.article.slug
          ),
          action.payload.article
        ].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return dateB - dateA
        })
        state.article = action.payload.article
      })

      .addCase(fetchDeleteFavourite.fulfilled, (state, action) => {
        state.articles = [
          ...state.articles.filter(
            (e) => e.slug !== action.payload.article.slug
          ),
          action.payload.article
        ].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return dateB - dateA
        })
        state.article = action.payload.article
      })
  }
})
export const { setEdited, setModal } = articlesSlice.actions
export default articlesSlice.reducer
