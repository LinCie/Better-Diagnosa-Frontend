import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import instance from "../lib/instance";

interface QuestionForm {
  question: string;
  belief: number;
}

function AddQuestion() {
  const [formData, setFormData] = useState<QuestionForm>({
    question: "",
    belief: 0,
  });

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");

    await instance.post("question", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setFormData({ question: "", belief: 0 });
  }

  return (
    <Box component="section">
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Tambah Pertanyaan
      </Typography>
      <Box component="form" noValidate maxWidth="sm" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="question"
              label="Pertanyaan"
              name="question"
              value={formData.question}
              onChange={handleChangeEvent}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="belief"
              label="Kepercayaan"
              name="belief"
              type="number"
              value={formData.belief}
              onChange={handleChangeEvent}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Tambah
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function Question() {
  return (
    <Box sx={{ px: 3, mt: 10 }}>
      <AddQuestion />
    </Box>
  );
}

export default Question;
