import React, { useState } from "react";

// my components
import URLBox from "./components/URLBox";
import SpamCountSelector from "./components/SpamCountSelector";
import ErrorBox from "./components/ErrorBox";
import FormInfoBox from "./components/FormInfoBox";

// bootstrap components
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";

// utility functions
import { fetchAndProcessData, genrateAnswers, submitResponse } from "./utils";

const App = () => {
  const [googleFormURL, setGoogleFormURL] = useState("");
  const [fetchingForm, setFetchingForm] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [formID, setFormID] = useState("");
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);

  const [spamCount, setSpamCount] = useState(1);
  const [spammingProgress, setSpammingProgress] = useState(0);

  const fetchForm = async () => {
    setFetchingForm(true);
    setErrorMessage("");
    setFormID("");

    const result = await fetchAndProcessData(googleFormURL);
    if (typeof result === "string") {
      setErrorMessage(result);
    } else {
      const [formID, formName, questions] = result;

      setFormID(formID);
      setFormName(formName);
      setQuestions(questions);
    }

    setFetchingForm(false);
  };

  const startSpamming = async () => {
    for (var i = 1; i <= spamCount; i++) {
      await submitResponse(formID, genrateAnswers(questions));

      setSpammingProgress(Math.ceil((i / spamCount) * 100));
    }
  };

  return (
    <Container>
      <URLBox
        setGoogleFormURL={setGoogleFormURL}
        fetchingForm={fetchingForm}
        fetchForm={fetchForm}
      />

      {errorMessage && <ErrorBox message={errorMessage} />}
      {formID && <FormInfoBox formName={formName} questions={questions} />}

      {formID && (
        <SpamCountSelector
          spamCount={spamCount}
          setSpamCount={setSpamCount}
          startSpamming={startSpamming}
        />
      )}
      {spammingProgress !== 0 && (
        <ProgressBar
          style={{ height: "30px", fontSize: "20px" }}
          className="mx-1 mt-3"
          animated
          variant="success"
          now={spammingProgress}
          label={`${spammingProgress}% Complete`}
        />
      )}
    </Container>
  );
};

export default App;
