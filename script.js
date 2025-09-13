document.addEventListener('DOMContentLoaded', () => {
    const quizQuestions = [
                {
                    question: "What is the capital of France?",
                    options: ["Berlin", "Madrid", "Paris", "Rome"],
                    correctAnswer: "Paris"
                },
                {
                    question: "Which planet is known as the Red Planet?",
                    options: ["Earth", "Mars", "Jupiter", "Venus"],
                    correctAnswer: "Mars"
                },
                {
                    question: "Who wrote 'To Kill a Mockingbird'?",
                    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
                    correctAnswer: "Harper Lee"
                },
                {
                    question: "What is the largest ocean on Earth?",
                    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                    correctAnswer: "Pacific Ocean"
                },
                {
                    question: "What is the chemical symbol for gold?",
                    options: ["Au", "Ag", "Fe", "Pb"],
                    correctAnswer: "Au"
                }
            ];

            const quizForm = document.getElementById('quiz-form');
            const submitBtn = document.getElementById('submit-btn');
            const resultBox = document.getElementById('result-box');
            const resultScore = document.getElementById('result-score');
            const resultDetails = document.getElementById('result-details');

            // Function to render the quiz questions
            function renderQuestions() {
                quizQuestions.forEach((q, index) => {
                    const questionCard = document.createElement('div');
                    questionCard.className = 'question-card';
                    questionCard.innerHTML = `
                        <p class="question-text">${index + 1}. ${q.question}</p>
                        <ul class="options-list">
                            ${q.options.map(option => `
                                <li class="option-item">
                                    <label class="option-label">
                                        <input type="radio" name="question-${index}" value="${option}" class="option-input">
                                        <span class="option-text">${option}</span>
                                    </label>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                    quizForm.appendChild(questionCard);
                });
            }

            // Handle form submission
            submitBtn.addEventListener('click', () => {
                let score = 0;
                resultDetails.innerHTML = ''; // Clear previous results

                quizQuestions.forEach((q, index) => {
                    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';

                    if (selectedOption) {
                        const userAnswer = selectedOption.value;
                        const isCorrect = userAnswer === q.correctAnswer;
                        resultItem.textContent = `Question ${index + 1}: Your answer was "${userAnswer}". The correct answer is "${q.correctAnswer}".`;

                        if (isCorrect) {
                            score++;
                            resultItem.classList.add('correct');
                        } else {
                            resultItem.classList.add('incorrect');
                        }
                    } else {
                        // Handle case where no option is selected
                        resultItem.textContent = `Question ${index + 1}: You did not answer this question. The correct answer is "${q.correctAnswer}".`;
                        resultItem.classList.add('incorrect');
                    }
                    resultDetails.appendChild(resultItem);
                });

                resultScore.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
                resultBox.style.display = 'block';
            });

            // Initial render
            renderQuestions();
        });