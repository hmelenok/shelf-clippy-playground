import { DECISIONS } from "./constants";

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

export const useDecisionMakingCenter = () => {
  const makeDecisionOnContent = (text) => {
    if (text.includes("list")) {
      return DECISIONS.LIST;
    }

    if (text.includes("table")) {
      return DECISIONS.TABLE;
    }

    if (text.includes("faq")) {
      return DECISIONS.FAQ;
    }

    return DECISIONS.NO_DESISION;
  };

  return { makeDecisionOnContent };
};
