import React, { useState, useEffect } from "react";
import URLBox from "./components/URLBox";
import { fetchAndProcessData, genrateAnswers, submitResponse } from "./utils";
import Container from "react-bootstrap/Container";
import ErrorBox from "./components/ErrorBox";
import FormInfoBox from "./components/FormInfoBox";
import SpamCountSelector from "./components/SpamCountSelector";

const App = () => {
  const [googleFormURL, setGoogleFormURL] = useState("");
  const [fetchingForm, setFetchingForm] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [formID, setFormID] = useState("");
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);

  const [spamCount, setSpamCount] = useState(1);

  const fetchForm = async () => {
    setFetchingForm(true);
    setErrorMessage("");
    setFormID("");

    const result = await fetchAndProcessData(googleFormURL);
    if (typeof result === "string") {
      console.log(result);
      setErrorMessage(result);
    } else {
      const [formID, formName, questions] = result;
      console.log(formID, formName, questions);
      setFormID(formID);
      setFormName(formName);
      setQuestions(questions);
    }

    setFetchingForm(false);
  };

  const startSpamming = () => {
    console.log("startSpamming called", spamCount);
    return;
    for (var i = 0; i < spamCount; i++) {
      submitResponse(formID, genrateAnswers(questions));
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
    </Container>
  );
};

export default App;
