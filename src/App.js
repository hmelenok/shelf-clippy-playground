import "./styles.css";
import { useDebounce } from "usehooks-ts";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import ComboBox from "./components/ComboBox";
import { articlesURLs } from "./constants";
import { useDecisionMakingCenter, useFetchArticle } from "./App.helpers";
import Item from "./components/Item";
import Clippy from "./components/Clippy";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const { fetchArticle } = useFetchArticle();
  const { makeDecisionOnContent, currentDecision } = useDecisionMakingCenter();
  const debouncedText = useDebounce(textInput, 500);

  const onArticleSelect = useCallback(async (_, article) => {
    const articleText = await fetchArticle(article.url);
    setTextInput(articleText);
  }, []);

  const onManualInput = useCallback((event) => {
    setTextInput(event.currentTarget.value);
  }, []);

  useEffect(() => {
    makeDecisionOnContent(debouncedText);
  }, [debouncedText]);

  return (
    <>
      <Clippy decision={currentDecision} />
      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
        <Typography variant="h1" gutterBottom>
          📎 Clippy playground
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <Typography variant="h2" gutterBottom>
                User Input
              </Typography>
              <Typography variant="h3" gutterBottom>
                Sources
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item>
                    {" "}
                    <ComboBox
                      fullWidth
                      options={articlesURLs}
                      onChange={onArticleSelect}
                    />
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <TextField
                      fullWidth
                      id="manual-text"
                      label="Manual Input"
                      multiline
                      rows={10}
                      defaultValue=""
                      variant="filled"
                      onChange={onManualInput}
                    />
                  </Item>
                </Grid>
              </Grid>

              <Typography variant="h3" gutterBottom>
                Selected text
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: debouncedText }} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography variant="h2" gutterBottom>
                Server Output
              </Typography>
              <Typography variant="h3" gutterBottom>
                Suggested decision
              </Typography>
              <p>{currentDecision}</p>

              <Typography variant="h3" gutterBottom>
                Transformed output
              </Typography>
              <p>//TODO</p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
