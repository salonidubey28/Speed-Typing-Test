const timerElement = document.getElementById('timer');
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const resultElement = document.getElementById('result');
const accuracyElement = document.getElementById('accuracy');
const errorsElement = document.getElementById('errors');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

let timerId;
let startTime;
let errors = 0;
let typedChars = 0;

function startTimer() {
  startTime = Date.now();
  timerId = setInterval(() => {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `Time: ${currentTime}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

function fetchRandomQuote() {
  quoteDisplayElement.textContent = 'Fetching quote...';
  resultElement.textContent = '';
  quoteInputElement.value = '';

  fetch('https://apis.ccbp.in/random-quote')
    .then(response => response.json())
    .then(data => {
      quoteDisplayElement.textContent = data.content;
    })
    .catch(error => console.error('Error fetching quote:', error));
}

function handleSubmit() {
  const typedQuote = quoteInputElement.value.trim();
  const displayedQuote = quoteDisplayElement.textContent.trim();

  if (typedQuote === displayedQuote) {
    stopTimer();
    const accuracy = ((typedChars - errors) / typedChars) * 100;
    resultElement.textContent = 'Success! You typed the quote correctly.';
    accuracyElement.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
  } else {
    errors++;
    errorsElement.textContent = `Errors: ${errors}`;
    resultElement.textContent = 'Incorrect typing. Keep trying!';
  }
}

function handleReset() {
  clearInterval(timerId);
  timerElement.textContent = 'Time: 0s';
  errors = 0;
  typedChars = 0;
  accuracyElement.textContent = '';
  errorsElement.textContent = '';
  fetchRandomQuote();
}

submitBtn.addEventListener('click', handleSubmit);
resetBtn.addEventListener('click', handleReset);

quoteInputElement.addEventListener('focus', () => {
  if (!timerId) {
    startTimer();
  }
});

fetchRandomQuote();
