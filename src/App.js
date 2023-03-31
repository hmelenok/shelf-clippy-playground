import "./styles.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ComboBox from "./components/ComboBox";
import { articlesURLs } from "./constants";
import { useCallback, useState } from "react";
import { useFetchArticle } from "./App.helper";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const { fetchArticle } = useFetchArticle();

  const onArticleSelect = useCallback(async (_, article) => {
    const articleText = await fetchArticle(article.url);
    setTextInput(articleText);
  }, []);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <ComboBox options={articlesURLs} onChange={onArticleSelect} />
      </div>
      <div>
        <TextField
          id="manual-text"
          label="Manual Input"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
        />
      </div>
      <div>
        <pre>{textInput}</pre>
      </div>
    </Box>
  );
}
