const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-quiz-btn');
const nextBtn = document.getElementById('next-question-btn');
const resultEl = document.getElementById('quiz-result');
const scoreEl = document.getElementById('quiz-score');

// Indian states and capitals data
const quizData = [
    {
        question: "What is the capital of Maharashtra?",
        options: ["Mumbai", "Pune", "Nagpur", "Thane"],
        answer: "Mumbai"
    },
    {
        question: "What is the capital of Tamil Nadu?",
        options: ["Coimbatore", "Madurai", "Chennai", "Trichy"],
        answer: "Chennai"
    },
    {
        question: "What is the capital of Rajasthan?",
        options: ["Jodhpur", "Udaipur", "Jaipur", "Jaisalmer"],
        answer: "Jaipur"
    },
    {
        question: "What is the capital of West Bengal?",
        options: ["Howrah", "Kolkata", "Durgapur", "Siliguri"],
        answer: "Kolkata"
    },
    {
        question: "What is the capital of Gujarat?",
        options: ["Surat", "Ahmedabad", "Vadodara", "Gandhinagar"],
        answer: "Gandhinagar"
    },
    {
        question: "What is the capital of Karnataka?",
        options: ["Mysuru", "Bengaluru", "Hubballi", "Mangaluru"],
        answer: "Bengaluru"
    },
    {
        question: "What is the capital of Kerala?",
        options: ["Kochi", "Kozhikode", "Thiruvananthapuram", "Thrissur"],
        answer: "Thiruvananthapuram"
    },
    {
        question: "What is the capital of Uttar Pradesh?",
        options: ["Kanpur", "Lucknow", "Varanasi", "Agra"],
        answer: "Lucknow"
    },
    {
        question: "What is the capital of Punjab?",
        options: ["Ludhiana", "Amritsar", "Jalandhar", "Chandigarh"],
        answer: "Chandigarh"
    },
    {
        question: "What is the capital of Bihar?",
        options: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
        answer: "Patna"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

function loadQuestion() {
    // Clear previous question and result
    quizContainer.innerHTML = '';
    resultEl.textContent = '';
    resultEl.className = '';
    selectedOption = null;

    if (currentQuestionIndex >= quizData.length) {
        // End of quiz
        showQuizResults();
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];

    // Display question counter and progress bar
    const progressEl = document.createElement('div');
    progressEl.id = 'quiz-progress';
    progressEl.innerHTML = `
                <span>Question ${currentQuestionIndex + 1} of ${quizData.length}</span>
                <span>Score: ${score}</span>
            `;
    quizContainer.appendChild(progressEl);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    progressBar.appendChild(progress);
    quizContainer.appendChild(progressBar);

    // Display question
    const questionEl = document.createElement('p');
    questionEl.style.fontSize = '1.25rem';
    questionEl.style.fontWeight = '600';
    questionEl.style.marginBottom = '1.5rem';
    questionEl.style.marginTop = '1rem';
    questionEl.style.color = '#1e293b';
    questionEl.textContent = currentQuestion.question;
    quizContainer.appendChild(questionEl);

    // Display options
    const optionsContainer = document.createElement('div');
    currentQuestion.options.forEach(optionText => {
        const optionEl = document.createElement('div');
        optionEl.textContent = optionText;
        optionEl.className = 'quiz-option';

        optionEl.addEventListener('click', () => {
            // Clear previous selection
            document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));

            // Set new selection
            optionEl.classList.add('selected');
            selectedOption = optionEl;
        });

        optionsContainer.appendChild(optionEl);
    });
    quizContainer.appendChild(optionsContainer);

    // Show/hide buttons
    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
}

function showQuizResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage >= 90) {
        message = 'Outstanding! You know India like the back of your hand!';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Great job! You have excellent knowledge of Indian states and capitals!';
        emoji = '👍';
    } else if (percentage >= 50) {
        message = 'Good effort! You know quite a bit about India.';
        emoji = '🙂';
    } else {
        message = 'Keep learning! India has so much to explore.';
        emoji = '📚';
    }

    quizContainer.innerHTML = `
                <div class="text-center" style="padding: 1.5rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
                    <p style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Quiz Complete!</p>
                    <p style="font-size: 1.25rem; margin-bottom: 1.5rem;">Your final score is <strong>${score} out of ${quizData.length}</strong> (${percentage}%).</p>
                    <p style="font-size: 1.1rem; color: #4CAF50; font-weight: 500;">${message}</p>
                </div>
            `;

    // Add restart button
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Take Quiz Again';
    restartBtn.className = 'btn btn-green btn-restart';
    restartBtn.onclick = restartQuiz;
    quizContainer.appendChild(restartBtn);

    submitBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    scoreEl.textContent = '';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    submitBtn.classList.remove('hidden');
}

submitBtn.addEventListener('click', () => {
    if (!selectedOption) {
        resultEl.textContent = 'Please select an answer!';
        resultEl.className = 'text-red';
        return;
    }

    resultEl.classList.remove('text-red', 'text-green');
    const answer = quizData[currentQuestionIndex].answer;
    const options = document.querySelectorAll('.quiz-option');

    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === answer) {
            option.classList.add('correct');
        }
    });

    // Check if answer is correct
    if (selectedOption.textContent === answer) {
        score++;
        resultEl.textContent = 'Correct! Well done.';
        resultEl.className = 'text-green';
        selectedOption.classList.add('correct');
    } else {
        resultEl.textContent = `Incorrect! The correct answer is ${answer}.`;
        resultEl.className = 'text-red';
        selectedOption.classList.add('incorrect');
    }

    // Show next button
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

// --- Dad Jokes API Logic ---
const fetchJokeBtn = document.getElementById('fetch-joke-btn');
const jokeContainer = document.getElementById('joke-container');

async function fetchJoke() {
    // Show loading state
    fetchJokeBtn.classList.add('loading');
    jokeContainer.innerHTML = '<p>Loading a hilarious dad joke...</p>';

    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Display joke with nice formatting
        jokeContainer.innerHTML = `
                    <div style="text-align: center; width: 100%;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">😂</div>
                        <p style="font-weight: 600; margin-bottom: 0.5rem;">Dad Joke #${data.id}</p>
                        <p style="font-style: italic; color: #4CAF50;">"${data.joke}"</p>
                    </div>
                `;
    } catch (error) {
        console.error("Failed to fetch joke:", error);
        jokeContainer.innerHTML = `
                    <div style="text-align: center; width: 100%;">
                        <p style="color: #dc2626; font-weight: 600;">Could not fetch a joke. Please try again later.</p>
                        <p style="color: #6b7280; font-size: 0.875rem;">Error: ${error.message}</p>
                    </div>
                `;
    } finally {
        // Remove loading state
        fetchJokeBtn.classList.remove('loading');
    }
}

fetchJokeBtn.addEventListener('click', fetchJoke);

// --- Initial Load ---
window.onload = () => {
    loadQuestion();
};
