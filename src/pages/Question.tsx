import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import instance from "../lib/instance";
import { Delete, Edit } from "@mui/icons-material";

interface AddQuestionInterface {
  pushQuestion: (q: QuestionInterface) => void;
}

interface QuestionForm {
  question: string;
  belief: number;
}

function AddQuestion({ pushQuestion }: AddQuestionInterface) {
  const [formData, setFormData] = useState<QuestionForm>({
    question: "",
    belief: 0,
  });
  const [error, setError] = useState<string | null>(null);

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await instance.post(
        "questions",
        { question: formData.question, belief: +formData.belief },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      pushQuestion(response.data);
      setFormData({ question: "", belief: 0 });
      setError(null); // Clear the error if the request is successful
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    }
  }

  return (
    <Box component="section" sx={{ flex: 1 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Tambah Pertanyaan
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" noValidate sx={{ mx: 2 }} onSubmit={handleSubmit}>
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

interface QuestionInterface {
  id: string;
  question: string;
  belief: number;
}

interface ShowQuestionInterface {
  questionList: QuestionInterface[];
  onEdit: (question: QuestionInterface) => void;
  onDelete: (id: string) => void;
}

function ShowQuestion({
  questionList,
  onEdit,
  onDelete,
}: ShowQuestionInterface) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        List Pertanyaan
      </Typography>
      <List>
        {questionList.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </List>
    </Box>
  );
}

interface QuestionItemProps {
  question: QuestionInterface;
  onEdit: (question: QuestionInterface) => void;
  onDelete: (id: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [error, setError] = useState<string | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      onEdit(editedQuestion);
      setIsEditing(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setError(null);
    }
  };

  const handleCancelClick = () => {
    setEditedQuestion(question);
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      onDelete(question.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setError(null);
    }
  };

  function handleChangeEvent(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEditedQuestion({ ...editedQuestion, [e.target.name]: e.target.value });
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <ListItem>
        {isEditing ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              value={editedQuestion.question}
              onChange={handleChangeEvent}
              variant="outlined"
              size="small"
              name="question"
            />
            <TextField
              value={editedQuestion.belief}
              onChange={handleChangeEvent}
              variant="outlined"
              size="small"
              name="belief"
              type="number"
            />
            <Button
              onClick={handleSaveClick}
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
            <Button
              onClick={handleCancelClick}
              variant="contained"
              color="secondary"
              size="small"
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <ListItemText
              primary={question.question}
              secondary={`Belief: ${question.belief}`}
            />
            <IconButton onClick={handleEditClick} edge="end">
              <Edit />
            </IconButton>
            <IconButton onClick={handleDeleteClick} edge="end">
              <Delete />
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  );
};

function Question() {
  const [questionList, setQuestionList] = useState<QuestionInterface[]>([]);
  const accessToken = localStorage.getItem("access_token");

  function pushQuestion(q: QuestionInterface) {
    setQuestionList([...questionList, q]);
  }

  useEffect(() => {
    instance
      .get("/questions", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setQuestionList(response.data);
      });
  }, [accessToken]);

  const handleEdit = async (question: QuestionInterface) => {
    const response = await instance.patch(
      `questions/${question.id}`,
      { question: question.question, belief: +question.belief },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (response.status === 200) {
      setQuestionList(
        questionList.map((q) => (q.id === question.id ? question : q))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const response = await instance.delete(`questions/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      setQuestionList(questionList.filter((q) => q.id !== id));
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        pt: 10,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      <AddQuestion pushQuestion={pushQuestion} />
      <ShowQuestion
        questionList={questionList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default Question;
