export const useFetchArticle = () => {
  const fetchArticle = async (url) => {
    let article = "";
    try {
      const response = await fetch(`/articles/${url}`);
      article = await response.text();
    } catch (e) {
      console.err(e);
    }
    return article;
  };

  return { fetchArticle };
};
