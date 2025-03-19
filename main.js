const MOKK_NOTES =[
    {
        id: 1,
        title: "Купить продукты",
        description: "Купить хлеб, молоко, яйца и овощи",
        color: "yellow",
        isFavorite: false
    },
    {
        id: 2,
        title: "Позвонить врачу",
        description: "Записаться на приём в 15:00",
        color: "green",
        isFavorite: true
    },
    {
        id: 3,
        title: "Учить JavaScript",
        description: "Разобрать темы: замыкания, промисы, async/await",
        color: "blue",
        isFavorite: false
    }
]
const model = {
    notes: MOKK_NOTES,
    isShowOnlyFavorite: false, // Флаг для фильтрации

    addNote(title, description, color = 'yellow') {
        const newNote = {
            id: Math.random(),
            title,
            description,
            color,
            isFavorite: false, // По умолчанию не избранная
        };
        this.notes.unshift(newNote);
        this.updateNotesView();
    },

    deleteNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);

        this.updateNotesView();
    },

    toggleFavorite(noteId) {
        const note = this.notes.find(note => note.id === noteId);
        if (note) {
            note.isFavorite = !note.isFavorite; // Переключаем избранность
            this.updateNotesView();
        }
    },

    toggleShowOnlyFavorite() {
        this.isShowOnlyFavorite = !this.isShowOnlyFavorite;
        this.updateNotesView(); // Обновляем список заметок
    },

    updateNotesView() {
        const notesToRender = this.isShowOnlyFavorite ?
            this.notes.filter(note => note.isFavorite) // Показываем только избранные
            :
            this.notes;

        view.renderNotes(notesToRender);
        // Показываем или скрываем init-text
        const initText = document.querySelector('.init-text');
        if (this.notes.length === 0) {
            initText.style.display = 'block';
        } else {
            initText.style.display = 'none';
        }
    },
};

// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
    selectedColor: 'yellow',
    filterFavorites: false,
    init() {
        this.renderNotes(model.notes)
        this.renderCountNotes()


        const colorsContainer = document.querySelector(".colors");

        colorsContainer.addEventListener("click", event => {

            if (event.target.classList.contains("color")) {
                // Удаляем выделение у всех цветов
                document.querySelectorAll(".color").forEach(color => color.parentElement.classList.remove("selected"));

                // Добавляем выделение кликнутому цвету
                event.target.parentElement.classList.add("selected");


                this.selectedColor = event.target.classList[1];

                console.log("Выбранный цвет:", this.selectedColor);

            }
        })

        const input = document.querySelector('#note-title')
        const textarea = document.querySelector('#note-description')
        const button = document.querySelector('.add-note')
        // Добавляем обработчик события на кнопку
        button.addEventListener('click', event => {
            // event.preventDefault() // Предотвращаем стандартное поведение формы

            const title = input.value
            const description = textarea.value
            console.log("Перед добавлением заметки, цвет:", view.selectedColor)
            if (controller.addNote(title, description, view.selectedColor)) { // Вызываем метод addNote контроллера

                input.value = ''
                textarea.value = ''
            }
            const textContent = document.querySelector('.main-content')
            const list = document.querySelector('.notes-list')
            // if (list.classList.contains('.added-title').length!==0) {
            //     textContent.style.display = 'none'
            // }

            // Сброс цвета на жёлтый
            view.selectedColor = 'yellow';

            // Убираем "selected" у всех цветов
            document.querySelectorAll(".border").forEach(border =>
                border.classList.remove("selected")
            );

            // Добавляем "selected" жёлтому цвету
            // document.querySelector(".border._yellow").classList.add("selected");

        })

        const notesList = document.querySelector(".notes-list");

        notesList.addEventListener("click", (event) => {
            if (event.target.matches("img[alt='trash']")) {
                const noteElement = event.target.closest("li");
                const noteId = Number(noteElement.id);
                // const noteId = Number(event.target.dataset.id);
                controller.deleteNote(noteId);
            }
        })
        document.querySelector(".notes-list").addEventListener("click", (event) => {
            if (event.target.classList.contains("favorite-icon")) {
                const noteElement = event.target.closest("li");
                const noteId = Number(noteElement.id);
                // const noteId = Number(event.target.dataset.id);
                model.toggleFavorite(noteId);
            }
        });

        document.querySelector(".filter-notes img").addEventListener("click", (event) => {

            if (event.target.classList.contains("checkbox-inactive")) {
                event.target.src = "./assets/checkbox active.svg";
                event.target.alt = "checkbox-active"
                event.target.classList.remove("checkbox-inactive");
                event.target.classList.add("checkbox-active")
                this.filterFavorites = true;

            } else if (event.target.classList.contains("checkbox-active")) {
                event.target.src = "./assets/checkbox inactive.svg";
                event.target.alt = "checkbox-inactive";
                event.target.classList.remove("checkbox-active");
                event.target.classList.add("checkbox-inactive");
                this.filterFavorites = false;
            }
            model.toggleShowOnlyFavorite()
        })
    },

    renderNotes(notes) {
        const list = document.querySelector('.notes-list');
        list.innerHTML = ''; // Очищаем список перед рендерингом
        const initText = document.querySelector('.init-text');
        initText.style.display = notes.length === 0 ? 'block' : 'none';

        notes.forEach(note => {
            if (!model.notes.find(n => n.id === note.id)) return; // Исключаем удаленные заметки


            const noteElement = document.createElement('li');
            noteElement.id = note.id;
            noteElement.innerHTML = `
                <div class="added-title ${note.color}">
                    <div>${note.title}</div>
                    <div class="img-menu">
                        <img class="favorite-icon ${note.isFavorite ? 'active' : 'inactive'}" 
                            src="./assets/heart ${note.isFavorite ? 'active' : 'inactive'}.svg"
                            alt="heart ${note.isFavorite ? 'active' : 'inactive'}" > 
                        <img class="delete-note" src="./assets/trash.svg" alt="trash" >
                    </div>
                </div>
                <p class="added-description">${note.description}</p>
            `;
            list.appendChild(noteElement);
        });

        this.renderCountNotes();
        // Показываем или скрываем фильтр
        const filterNotes = document.querySelector('.filter-notes');
        if (model.notes.length > 0 || model.isShowOnlyFavorite) {
            filterNotes.style.display = "flex"; // Показываем, если есть заметки
        } else {
            filterNotes.style.display = "none"; // Скрываем, если заметок нет
        }
    },
    renderCountNotes() {
        const counter = document.getElementById('counter')
        // const list=document.querySelector('.notes-list')
        counter.textContent = document.querySelectorAll(".notes-list li").length
    },
    hideMessageAfterDelay(selector, delay = 3000) {
        const messageBox = document.querySelector(selector);
        if (messageBox) {
            messageBox.style.display = "flex"; // Показываем сообщение
            setTimeout(() => {
                messageBox.style.display = "none"; // Скрываем через указанное время
            }, delay);
        }
    }
}

// обработка действий пользователя, обновление модели
const controller = {
    addNote(title, description, color) {
        console.log("Выбранный цвет:", color)
        if ((title.trim() !== '') && (description.trim() !== '') && (title.length <= 50)) {
            model.addNote(title, description, color);
            // Показываем сообщение "Заметка добавлена"
            view.hideMessageAfterDelay('.messages-box.done'); // Сообщение об успешном добавлении
            return true;
        } else if (title.length > 50) {
            view.hideMessageAfterDelay('.messages-box.mistake.length'); // Ошибка длины заголовка
        } else {
            view.hideMessageAfterDelay('.messages-box.mistake.empty'); // Ошибка пустых полей
        }
        return false;
    },
    
    deleteNote(noteId) {
        model.deleteNote(noteId)
    },
}

function init() {
    view.init()
}

init()