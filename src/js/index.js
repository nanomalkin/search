class ArticleSearch {
    constructor() {
        this.articles = [];
        this.searchInput = document.getElementById("searchInput");
        this.resultsContainer = document.getElementById("results");
        this.randomPlaceholders = ["Бла-бла-бол ищи свищи", "Как крыса в клетке", "Что это за несчастный старик?", "У него есть деньги?", "А найди-ка мне курицу", "Согласен?", "Ты полон гордыни", "РАССЕЧЕНИЕ", "мЫ ТЕБЯ ОСТАНОВИМ!", "GhbdF", "Прости нас! Ты известный человек!", "Добрых снов ♥"];
        this.btn = document.querySelector(".btn");

        this.loadJSON();
        this.setupEventListeners();
    }

    async loadJSON() {
        try {
            let response = await fetch('src/js/file.json');
            let data = await response.json();
            for (let i = 0; i < data[0].result.state.length; i++) {
                this.articles[i] = data[0].result.state[i];
            }
        } catch (error) {
            console.error('Ошибка загрузки файла .json:', error);
        }
    }

    setupEventListeners() {
        this.btn.addEventListener("click", () => this.search());
        this.searchInput.placeholder = this.getRandomPlaceholder();
    }

    search() {
        document.querySelector(".container").style.margin = "0 auto";
        var searchInput = this.searchInput.value.toLowerCase().split(' ');
        var results = [];
        document.querySelector(".btn").src = "src/ok_1.png";
        this.articles.forEach(function (article) {
            var articleText = article.name.toLowerCase();
            var similarity = 0;
            console.log(article);
            searchInput.forEach(function (word) {
                if (articleText.includes(word)) {
                    similarity += word.length;
                }
            });

            if (similarity > 0) {
                results.push({ article, similarity });
            }
        });

        results.sort(function (a, b) {
            return b.similarity - a.similarity;
        });

        this.displayResults(results.map(function (item) { return item.article; }));
    }

    displayResults(results) {
        this.resultsContainer.innerHTML = "";

        if (results.length === 0) {
            this.resultsContainer.innerHTML = "Ничего такого и в помине нет!.";
            document.querySelector(".stater").style.display = "block";
        } else {
            document.querySelector(".stater").style.display = "none";
            var ul = document.createElement("ul");
            results.forEach(function (result) {
                var li = document.createElement("li");
                li.textContent = result.name;
                ul.appendChild(li);
            });
            this.resultsContainer.appendChild(ul);
        }
    }

    getRandomPlaceholder() {
        return this.randomPlaceholders[Math.floor(Math.random() * this.randomPlaceholders.length)];
    }
}

// Инициализация класса
const articleSearchApp = new ArticleSearch();
