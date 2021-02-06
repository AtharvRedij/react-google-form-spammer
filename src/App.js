import React, { useState, useEffect } from "react";
import URLBox from "./components/URLBox";
import { fetchAndProcessData, submitResponse } from "./utils";
import Container from "react-bootstrap/Container";
import ErrorBox from "./components/ErrorBox";
import FormInfoBox from "./components/FormInfoBox";

const App = () => {
  const [googleFormURL, setGoogleFormURL] = useState("");
  const [fetchingForm, setFetchingForm] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [formID, setFormID] = useState("");
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);

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

  return (
    <Container>
      <URLBox
        setGoogleFormURL={setGoogleFormURL}
        fetchingForm={fetchingForm}
        fetchForm={fetchForm}
      />

      {errorMessage && <ErrorBox message={errorMessage} />}
      {formID && <FormInfoBox formName={formName} questions={questions} />}
    </Container>
  );
};

export default App;
