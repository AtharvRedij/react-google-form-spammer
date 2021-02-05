// 40100

// Short Answer Field = 0
// Paragraph Field = 1,
// Multiple Choice Field = 2
// Check Boxes Field = 4
// Drop Down Field = 3
// File Upload Field = 13

export const fetchAndProcessData = async () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var url =
    "https://docs.google.com/forms/d/e/1FAIpQLSc_h1Sikcje0eXRNoPp0e41EKBBCXKRVzby0k5EWXaWjzPOhg/viewform?usp=sf_link";

  console.log("HERE");

  try {
    const res = await fetch(proxyurl + url);
    const htmlStr = await res.text();
    const data = JSON.parse(
      htmlStr.split("var FB_PUBLIC_LOAD_DATA_ = ")[1].split(";")[0]
    );
    console.log(data);

    const formID = data[14].split("/")[1];
    const formName = data[3];
    const questions = data[1][1];

    const answers = [];

    for (var i = 0; i < questions.length; i++) {
      if (questions[i][3] === 0 || questions[i][3] === 1) {
        answers.push([questions[i][4][0][0], getRandomText()]);
      } else if (
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

    return [formID, formName, answers];
  } catch (err) {
    console.log(err);
  }
};

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

export const submitResponse = (formID, answers) => {
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
    mode: "no-cors", // apparently Google will only submit a form if "mode" is "no-cors"
    redirect: "follow",
    referrer: "no-referrer",
  };

  return fetch(url, opts);
};

// export const submitResponse = (formID, answers) => {
//   const data = {};

//   for (var i = 0; i < answers.length; i++) {
//     data[`&entry.${answers[i][0]}`] = encodeURIComponent(answers[i][1]);
//   }

//   var url = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

//   console.log("FINAL URL", url);

//   var opts = {
//     method: "POST",
//     mode: "no-cors", // apparently Google will only submit a form if "mode" is "no-cors"
//     redirect: "follow",
//     referrer: "no-referrer",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   return fetch(url, opts);
// };