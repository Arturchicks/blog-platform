const formatText = (text) => {
  if (text && text.length > 500) {
    return `${text.split("").toSpliced(500).join("")}`
  }
  return text
}
export default formatText
