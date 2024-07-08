import {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate } from "react-router-dom";
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
import { isDengue, Symptom } from "../lib/logic";
import instance from "../lib/instance";
import { LoginContext, UsernameContext } from "../rootContext";

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
        width: "50vw",
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
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [answer, setAnswer] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  const loginContext = useContext(LoginContext);
  const accessToken = localStorage.getItem("access_token");
  const usernameContext = useContext(UsernameContext);

  useEffect(() => {
    instance
      .get("/questions", {
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
    setIsAnswered(true);
    const result = isDengue(answer, symptoms);
    setResult(result);
    await instance.post(
      "history",
      { isDengue: result },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }

  if (!loginContext?.isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Container
        sx={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="h1">
          Halo, {usernameContext?.username}
        </Typography>
        <Typography>
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
      {isAnswered && (
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2">
            {result ? "Anda terdiagnosa DBD" : "Anda tidak terdiagnosa DBD"}
          </Typography>
        </Container>
      )}
    </>
  );
}

export default Diagnosa;
