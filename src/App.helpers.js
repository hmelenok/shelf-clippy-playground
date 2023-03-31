import { useState } from "react";
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
  const [currentDecision, setCurrentDecision] = useState(DECISIONS.NO_DESISION);

  const makeDecisionOnContent = (text) => {
    if (text.includes("list")) {
      return setCurrentDecision(DECISIONS.LIST);
    }

    if (text.includes("table")) {
      return setCurrentDecision(DECISIONS.TABLE);
    }

    if (text.includes("faq")) {
      return setCurrentDecision(DECISIONS.FAQ);
    }

    return setCurrentDecision(DECISIONS.NO_DESISION);
  };

  return { makeDecisionOnContent, currentDecision };
};
