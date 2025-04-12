const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        {
          text: "Hyper Text Markup Language",
          correct: true,
        },
        {
          text: "High Text Machine Language",
          correct: false,
        },
        {
          text: "Hyper Text Machine Learning",
          correct: false,
        },
        {
          text: "Hyper Text Marking Language",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the `alt` attribute in an `<img>` tag?",
      answers: [
        {
          text: "To specify the URL of the image",
          correct: false,
        },
        {
          text: "To provide alternative text for the image",
          correct: true,
        },
        {
          text: "To align the image",
          correct: false,
        },
        {
          text: "To style the image with CSS",
          correct: false,
        },
      ],
    },
    {
      question: "Which CSS property is used to change the text color?",
      answers: [
        {
          text: "color",
          correct: true,
        },
        {
          text: "font-color",
          correct: false,
        },
        {
          text: "text-color",
          correct: false,
        },
        {
          text: "background-color",
          correct: false,
        },
      ],
    },
    {
      question: "Which is the correct JavaScript syntax to write 'Hello World'?",
      answers: [
        {
          text: "print('Hello World');",
          correct: false,
        },
        {
          text: "document.write('Hello World');",
          correct: true,
        },
        {
          text: "echo('Hello World');",
          correct: false,
        },
        {
          text: "console.print('Hello World');",
          correct: false,
        },
      ],
    },
    {
      question:
        "Which of the following is a valid way to add comments in JavaScript?",
      answers: [
        {
          text: "// This is a comment",
          correct: true,
        },
        {
          text: "/* This is a comment */",
          correct: true,
        },
        {
          text: "# This is a comment",
          correct: false,
        },
        {
          text: "!-- This is a comment --",
          correct: false,
        },
      ],
    },
    {
      question: "Which CSS property controls the layout of elements?",
      answers: [
        {
          text: "display",
          correct: true,
        },
        {
          text: "position",
          correct: false,
        },
        {
          text: "float",
          correct: false,
        },
        {
          text: "visibility",
          correct: false,
        },
      ],
    },
    {
      question: "How do you declare a JavaScript variable?",
      answers: [
        {
          text: "let myVariable;",
          correct: true,
        },
        {
          text: "var = myVariable;",
          correct: false,
        },
        {
          text: "variable myVariable;",
          correct: false,
        },
        {
          text: "myVariable: var;",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the <head> tag in HTML?",
      answers: [
        {
          text: "To contain meta information about the document",
          correct: true,
        },
        {
          text: "To display the title of the page",
          correct: false,
        },
        {
          text: "To include the main content of the page",
          correct: false,
        },
        {
          text: "To declare the doctype",
          correct: false,
        },
      ],
    },
    {
      question: "Which JavaScript method is used to find an HTML element by ID?",
      answers: [
        {
          text: "document.getElementById",
          correct: true,
        },
        {
          text: "document.getElementsById",
          correct: false,
        },
        {
          text: "document.querySelector",
          correct: false,
        },
        {
          text: "document.getElement",
          correct: false,
        },
      ],
    },
    {
      question:
        "Which CSS property is used to create space inside an element, between the content and the border?",
      answers: [
        {
          text: "padding",
          correct: true,
        },
        {
          text: "margin",
          correct: false,
        },
        {
          text: "border-spacing",
          correct: false,
        },
        {
          text: "spacing",
          correct: false,
        },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButton = document.getElementById("answer-button");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  
  let timerElement = document.getElementById("timer");
  let timeLeft = 10; // Set the time limit for each question
  let timerInterval; // To store the interval ID
  
  function startTimer() {
    timeLeft = 10; // Reset the time for each question
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.innerHTML = `Time Left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval); // Stop the timer
        handleTimeout(); // Handle when time runs out
      }
    }, 1000); // Update every second
  }
  
  function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
  }
  
  function handleTimeout() {
    // Disable all buttons and show the correct answer
    Array.from(answerButton.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block"; // Show the Next button
  }
  
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timerElement.style.display = "block"; // Show the timer
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  
  function showQuestion() {
    resetSate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", (e) => {
        stopTimer(); // Stop the timer when an answer is selected
        selectAnswer(e);
      });
    });
  
    startTimer(); // Start the timer for the current question
  }
  function resetSate() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
      answerButton.removeChild(answerButton.firstChild);
    }
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
  
    Array.from(answerButton.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetSate();
    timerElement.style.display = "none"; // Hide the timer when the quiz ends
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();