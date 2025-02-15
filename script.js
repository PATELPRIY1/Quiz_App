const questions = [
    {
      question: "What is the capital of France?",
      answer: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "Which country is the world's largest producer of coffee?",
      answer: [
        { text: "Brazil", correct: true },
        { text: "India", correct: false },
        { text: "China", correct: false },
        { text: "United States", correct: false },
      ],
    },
    {
      question: "What is the world's oldest known city?",
      answer: [
        { text: "Jericho", correct: true },
        { text: "Rome", correct: false },
        { text: "Machu Picchu", correct: false },
        { text: "Taj Mahal", correct: false },
      ],
    },
    {
      question: "Who wrote the classic novel 'To Kill a Mockingbird'?",
      answer: [
        { text: "Harper Lee", correct: true },
        { text: "Charles Dickens", correct: false },
        { text: "F. Scott Fitzgerald", correct: false },
        { text: "George Orwell", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentIndex];
    questionElement.innerHTML = `Question ${currentIndex + 1}: ${currentQuestion.question}`;
    
    currentQuestion.answer.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      button.dataset.correct = answer.correct;
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = ""; // Clear previous answers
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
  
    Array.from(answerButtonsElement.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true; // Disable all buttons after selection
    });
  
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  