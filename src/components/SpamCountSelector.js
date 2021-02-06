import React from "react";
import Button from "react-bootstrap/Button";

const SpamCountSelector = ({ spamCount, setSpamCount, startSpamming }) => {
  return (
    <div>
      <label className="mx-auto my-3" htmlFor="spam-count">
        <h3>Select Number of Spam Entries to Add</h3>
      </label>

      <div className="d-flex align-items-center">
        <Button
          variant="primary"
          disabled={spamCount <= 1}
          onClick={() => {
            if (spamCount > 1) {
              setSpamCount(spamCount - 1);
            }
          }}
        >
          -
        </Button>
        <input
          className="mx-3"
          style={{ textAlign: "center" }}
          type="number"
          min="1"
          max="100"
          value={spamCount}
          onChange={(e) => {
            var count = Number(e.target.value);
            if (count < 1 || count > 100) {
              setSpamCount(10);
            } else {
              setSpamCount(count);
            }
          }}
        />
        <Button
          variant="primary"
          disabled={spamCount >= 100}
          onClick={() => {
            if (spamCount < 100) {
              setSpamCount(spamCount + 1);
            }
          }}
        >
          +
        </Button>

        <Button className="ml-5" onClick={startSpamming}>
          Start Spamming
        </Button>
      </div>
    </div>
  );
};

export default SpamCountSelector;
