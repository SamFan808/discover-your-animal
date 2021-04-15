// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("dom loaded!");

  console.log("js script working");
  console.log("-----------------");
  totalScore = [];
  const submitQ1 = document.getElementById("submit");
  $('.resultscore1 input[type="radio"]').click(function () {
    const answervalue1 = $(this).val();
    submitQ1.addEventListener("click", () => {
      console.log(answervalue1);
      totalScore.push(answervalue1);
    });
  });
  $('.resultscore2 input[type="radio"]').click(function () {
    const answervalue2 = $(this).val();
    submitQ1.addEventListener("click", () => {
      console.log(answervalue2);
      totalScore.push(answervalue2);
    });
  });
  $('.resultscore3 input[type="radio"]').click(function () {
    const answervalue3 = $(this).val();
    const playerName = document.getElementById("username").value;
    console.log(playerName);
    submitQ1.addEventListener("click", () => {
      console.log(answervalue3);
      totalScore.push(answervalue3);
      console.log(totalScore);
      console.log(playerName);
      const sum = (numOne, numTwo, numThree) => numOne + numTwo + numThree;
      const addCallBacks = (functionOne) =>
        functionOne(
          parseInt(totalScore[0]),
          parseInt(totalScore[1]),
          parseInt(totalScore[2])
        );
      let combinedScore = addCallBacks(sum);
      console.log(combinedScore);
      console.log("-------------separation for fetchpost---------------");
      let dataPost = {
        name: playerName,
        a_1: totalScore[0],
        a_2: totalScore[1],
        a_3: totalScore[2],
        score: combinedScore,
      };
      console.log(combinedScore);
      console.log(dataPost);
      fetch(`/api/questions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      })
        .then(() => {})
        .catch((err) => console.error(err));
      console.log("post made");
    });
  });
});
