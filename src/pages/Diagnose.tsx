import {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { isDengue } from "../lib/logic";
import instance from "../lib/instance";
import { LoginContext, UserContext } from "../rootContext";
import SymptomQuestion from "../interfaces/question";

interface QuestionProps extends ComponentPropsWithoutRef<"fieldset"> {
  index: number;
  answer: boolean;
  handleAnswer: (index: number, isYes: boolean) => void;
}

function Question({ children, index, answer, handleAnswer }: QuestionProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "85vw", md: "65vw" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <FormLabel
        component="legend"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        <Typography variant="h5">{children}</Typography>
      </FormLabel>
      <RadioGroup
        row
        name={`jawaban-${index}`}
        value={answer}
        onChange={(e) => handleAnswer(index, e.target.value === "true")}
      >
        <FormControlLabel value="true" control={<Radio />} label="Iya" />
        <FormControlLabel value="false" control={<Radio />} label="Tidak" />
      </RadioGroup>
    </Paper>
  );
}

function Diagnosa() {
  const [symptoms, setSymptoms] = useState<SymptomQuestion[]>([]);
  const [answer, setAnswer] = useState<boolean[]>([]);

  const loginContext = useContext(LoginContext);
  const userContext = useContext(UserContext);
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/question", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setSymptoms(response.data);
        setAnswer(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error fetching symptoms:", error);
      });
  }, [accessToken]);

  function handleAnswer(index: number, isYes: boolean) {
    const newAnswer = [...answer];
    newAnswer[index] = isYes;
    setAnswer(newAnswer);
  }

  async function handleDiagnose() {
    const result = isDengue(answer, symptoms);
    await instance.post(
      "history",
      { isDengue: result },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    navigate("/result", { state: { result } });
  }

  if (!loginContext?.isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Container
        sx={{
          mt: 15,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="h1" textAlign="center">
          Halo, {userContext?.user?.username}
        </Typography>
        <Typography textAlign="center">
          Mulai diagnosa dengan menjawab pertanyaan pertanyaan di bawah ini
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          marginBottom: 4,
        }}
      >
        <FormControl component="fieldset">
          {symptoms.map((symptom, index) => (
            <Question
              key={`pertanyaan ${index}`}
              index={index}
              answer={answer[index]}
              handleAnswer={handleAnswer}
            >
              {symptom.question}
            </Question>
          ))}
        </FormControl>
        <Button variant="contained" onClick={handleDiagnose}>
          Diagnosa
        </Button>
      </Container>
    </>
  );
}

export default Diagnosa;
