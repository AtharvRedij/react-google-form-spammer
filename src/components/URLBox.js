import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

const EX_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc_h1Sikcje0eXRNoPp0e41EKBBCXKRVzby0k5EWXaWjzPOhg/viewform";

const URLBox = ({ setGoogleFormURL, fetchingForm, fetchForm }) => {
  return (
    <div>
      <label className="mx-auto my-3" htmlFor="google-form-url">
        <h3>Enter Google Form URL</h3>
      </label>

      <InputGroup className="mx-auto">
        <FormControl
          placeholder={`For example ${EX_URL}`}
          aria-label={`For example ${EX_URL}`}
          aria-describedby="basic-addon2"
          id="google-form-url"
          onChange={(e) => setGoogleFormURL(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            disabled={fetchingForm}
            onClick={() => fetchForm()}
          >
            <Spinner
              as="span"
              animation={fetchingForm ? "border" : "false"}
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {` `}
            {fetchingForm ? "Anaylzing" : "Fetch"}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default URLBox;
