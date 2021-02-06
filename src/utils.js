// Supported Types
// Short Answer Field = 0
// Paragraph Field = 1,
// Multiple Choice Field = 2
// Drop Down Field = 3
// Check Boxes Field = 4

// genrates random text for text based fields
const getRandomText = (length = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// fetches form and returns => formID, formName, questions
export const fetchAndProcessData = async (url) => {
  const proxyurl = "https://thingproxy.freeboard.io/fetch/";

  try {
    const res = await fetch(proxyurl + url);

    if (!res.ok) {
      throw Error("Failed to fetch the form");
    }

    const htmlStr = await res.text();
    const data = JSON.parse(
      htmlStr.split("var FB_PUBLIC_LOAD_DATA_ = ")[1].split(";")[0]
    );

    const formID = data[14].split("/")[1];
    const formName = data[3];
    const questions = data[1][1];

    return [formID, formName, questions];
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

// genrates answers
export const genrateAnswers = (questions) => {
  const answers = [];

  for (var i = 0; i < questions.length; i++) {
    // text based
    if (questions[i][3] === 0 || questions[i][3] === 1) {
      answers.push([questions[i][4][0][0], getRandomText()]);
    }
    // option based
    else if (
      questions[i][3] === 2 ||
      questions[i][3] === 3 ||
      questions[i][3] === 4
    ) {
      const optionsArray = questions[i][4][0][1];
      const option =
        optionsArray[Math.floor(Math.random() * optionsArray.length)];
      answers.push([questions[i][4][0][0], option[0]]);
    }
  }

  return answers;
};

// submit response to google form
export const submitResponse = async (formID, answers) => {
  var queryString = "/formResponse?usp=pp_url";

  for (var i = 0; i < answers.length; i++) {
    queryString += `&entry.${answers[i][0]}=${encodeURIComponent(
      answers[i][1]
    )}`;
  }

  queryString += "&submit=SUBMIT";

  var url = "https://docs.google.com/forms/d/e/" + formID + queryString;

  var opts = {
    method: "POST",
    mode: "no-cors",
    redirect: "follow",
    referrer: "no-referrer",
  };

  return await fetch(url, opts);
};
