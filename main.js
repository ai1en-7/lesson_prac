
const topics = [
    {
        name: "Арифметика",
        icon: "🔢",
        description: "Основные математические действия.",
        theory: "Арифметика — это раздел математики, который изучает числа и действия с ними.",
        rule: "Сложение (+), вычитание (-), умножение (×), деление (÷).",
        example: "12 + 8 = 20",
        questions: [
            { q: "15 + 27 = ?", a: "42" },
            { q: "50 - 18 = ?", a: "32" },
            { q: "7 × 8 = ?", a: "56" },
            { q: "81 ÷ 9 = ?", a: "9" },
            { q: "25 + 35 = ?", a: "60" }
        ]
    },
    {
        name: "Дроби",
        icon: "🍰",
        description: "Учись работать с дробными числами.",
        theory: "Дробь показывает часть целого числа. Она состоит из числителя и знаменателя.",
        rule: "Числитель находится сверху, знаменатель снизу.",
        example: "1/2 + 1/2 = 1",
        questions: [
            { q: "1/2 + 1/2 = ? (ответ числом)", a: "1" },
            { q: "1/4 + 1/4 = ? (дробь)", a: "1/2" },
            { q: "2/5 + 1/5 = ? (дробь)", a: "3/5" },
            { q: "1/2 от 20 = ?", a: "10" },
            { q: "3/4 от 100 = ?", a: "75" }
        ]
    },
    {
        name: "Проценты",
        icon: "📊",
        description: "Проценты, скидки и расчёты.",
        theory: "Процент — это одна сотая часть числа.",
        rule: "Чтобы найти процент от числа, умножь число на процент и раздели на 100.",
        example: "20% от 100 = 100 × 20 / 100 = 20",
        questions: [
            { q: "10% от 100 = ?", a: "10" },
            { q: "50% от 200 = ?", a: "100" },
            { q: "25% от 80 = ?", a: "20" },
            { q: "20% от 300 = ?", a: "60" },
            { q: "10% от 500 = ?", a: "50" }
        ]
    },
    {
        name: "Уравнения",
        icon: "✏️",
        description: "Находи неизвестные значения.",
        theory: "Уравнение — это равенство, содержащее неизвестное число.",
        rule: "Чтобы найти x, нужно перенести известные числа на другую сторону равенства.",
        example: "x + 5 = 12 → x = 12 - 5 → x = 7",
        questions: [
            { q: "x + 5 = 12. Найди x.", a: "7" },
            { q: "x - 8 = 10. Найди x.", a: "18" },
            { q: "2x = 16. Найди x.", a: "8" },
            { q: "x + 15 = 30. Найди x.", a: "15" },
            { q: "3x = 27. Найди x.", a: "9" }
        ]
    },
    {
        name: "Геометрия",
        icon: "📐",
        description: "Фигуры, площади и периметры.",
        theory: "Геометрия — раздел математики, изучающий фигуры, их размеры и свойства.",
        rule: "Периметр — сумма всех сторон. Площадь прямоугольника равна длине, умноженной на ширину.",
        example: "Прямоугольник 5 × 3: площадь = 15, периметр = 16.",
        questions: [
            { q: "Периметр квадрата со стороной 4?", a: "16" },
            { q: "Площадь квадрата со стороной 5?", a: "25" },
            { q: "Площадь прямоугольника 6 × 3?", a: "18" },
            { q: "Сколько сторон у треугольника?", a: "3" },
            { q: "Периметр прямоугольника 4 × 6?", a: "20" }
        ]
    }
];

let currentTopic = 0;
let currentQuestion = 0;
let score = Number(localStorage.getItem("mathScore")) || 0;
let completedTopics = JSON.parse(localStorage.getItem("completedTopics")) || [];
let answered = false;
let solvedQuestions = [];

const topicList = document.querySelector("#topic-list");
const scoreElement = document.querySelector("#score");
const totalScore = document.querySelector("#total-score");
const completedElement = document.querySelector("#completed");

function saveProgress() {
    localStorage.setItem("mathScore", score);
    localStorage.setItem("completedTopics", JSON.stringify(completedTopics));
}

function updateStats() {
    scoreElement.textContent = score;
    totalScore.textContent = score;
    completedElement.textContent = completedTopics.length;
}

function showTopics() {
    topicList.innerHTML = "";

    topics.forEach((topic, index) => {
        const card = document.createElement("div");
        card.className = "topic-card";

        card.innerHTML = `
            <div class="topic-icon">${topic.icon}</div>
            <h3>${topic.name}</h3>
            <p>${topic.description}</p>
            <span class="open">
                ${completedTopics.includes(index) ? "✓ Изучено" : "Изучить тему →"}
            </span>
        `;

        card.addEventListener("click", () => {
            openTopic(index);
        });

        topicList.appendChild(card);
    });
}

function openTopic(index) {
    currentTopic = index;

    const topic = topics[index];

    document.querySelector("#lesson-title").textContent = topic.name;

    document.querySelector("#lesson-description").textContent =
        topic.description;

    document.querySelector("#lesson-content").innerHTML = `
        <h3>${topic.icon} Теория</h3>
        <p>${topic.theory}</p>

        <h3>📌 Главное правило</h3>
        <p>${topic.rule}</p>

        <div class="example">
            <strong>Пример:</strong><br>
            ${topic.example}
        </div>
    `;

    currentQuestion = 0;
    solvedQuestions = [];
    loadQuestion();

    document.querySelector("#practice").scrollIntoView({
        behavior: "smooth"
    });
}

function loadQuestion() {
    const topic = topics[currentTopic];
    const question = topic.questions[currentQuestion];

    answered = false;

    document.querySelector("#question-topic").textContent = topic.name;

    document.querySelector("#question-number").textContent =
        `Задание ${currentQuestion + 1}`;

    document.querySelector("#question").textContent = question.q;

    document.querySelector("#answer").value = "";

    document.querySelector("#feedback").textContent = "";

    document.querySelector("#progress-count").textContent =
        solvedQuestions.length;

    document.querySelector("#progress-bar").style.width =
        `${solvedQuestions.length * 20}%`;
}

document.querySelector("#check-btn").addEventListener("click", () => {
    if (answered) return;

    const userAnswer = document.querySelector("#answer").value
        .trim()
        .replace(",", ".");

    const correctAnswer = topics[currentTopic]
        .questions[currentQuestion].a;

    const feedback = document.querySelector("#feedback");

    if (userAnswer === "") {
        feedback.textContent = "Введи ответ!";
        feedback.style.color = "#d68b45";
        return;
    }

    if (userAnswer === correctAnswer) {
        feedback.textContent = "✓ Правильно! Ты молодец. +10 баллов";
        feedback.style.color = "#269b70";

        score += 10;
        answered = true;

        if (!solvedQuestions.includes(currentQuestion)) {
            solvedQuestions.push(currentQuestion);
        }

        updateStats();
        saveProgress();

        document.querySelector("#progress-count").textContent =
            solvedQuestions.length;

        document.querySelector("#progress-bar").style.width =
            `${solvedQuestions.length * 20}%`;

        if (solvedQuestions.length === 5) {
            if (!completedTopics.includes(currentTopic)) {
                completedTopics.push(currentTopic);
                saveProgress();
                showTopics();
            }

            feedback.textContent =
                "🏆 Все 5 заданий решены! Тема завершена!";
        }

    } else {
        feedback.textContent = "✗ Неверно. Попробуй ещё раз!";
        feedback.style.color = "#e16c7a";
    }
});

document.querySelector("#next-btn").addEventListener("click", () => {
    if (currentQuestion < 4) {
        currentQuestion++;
        loadQuestion();
    } else {
        document.querySelector("#feedback").textContent =
            "Ты прошёл все задания этой темы! Выбери другую тему.";
    }
});

document.querySelector("#answer").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.querySelector("#check-btn").click();
    }
});

showTopics();
updateStats();
