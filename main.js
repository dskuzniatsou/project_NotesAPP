
// хранение данных, бизнес-логика
const model = {
    notes: [],
    addNote(title,description, color='yellow') {
    const isFavorite = false
    const id = Math.random() 
const newNotes = {id,title,description,color,isFavorite}
    this.notes.push(newNotes)
    view.renderNotes(model.notes)
    },
    deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId)
        
        view.renderNotes(model.notes)
      }
}
 
// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
      selectedColor: 'yellow',
    init() {
        this.renderNotes(model.notes)
        this.renderCountNotes()
        const colorsContainer = document.querySelector(".colors");

    colorsContainer.addEventListener("click",  event => {
        // const clickedColor = event.target.closest(".color"); // Проверяем, что клик был по цвету
        //     if (clickedColor) {
        //         // Убираем выделение у всех цветов
        //         document.querySelectorAll(".color").forEach(color => color.classList.remove("selected"));

        //         // Добавляем выделение к новому цвету
        //         clickedColor.classList.add("selected");

        //         // Получаем цвет из data-атрибута (или класса)
        //         this.selectedColor = clickedColor.classList.contains("yellow") ? "yellow" :
        //                              clickedColor.classList.contains("green") ? "green" :
        //                              clickedColor.classList.contains("blue") ? "blue" :
        //                              clickedColor.classList.contains("red") ? "red" :
        //                              clickedColor.classList.contains("purple") ? "purple" :
        //                              "yellow";
        if (event.target.classList.contains("color")) {
            // Удаляем выделение у всех цветов
             document.querySelectorAll(".color").forEach(color => color.classList.remove("selected"));

            // Добавляем выделение кликнутому цвету
            event.target.classList.add("selected");
          

            this.selectedColor = event.target.classList[1];
            
            console.log("Выбранный цвет:", this.selectedColor);
        }})

        const input = document.querySelector('#note-title') 
        const textarea = document.querySelector('#note-description')
        const button = document.querySelector('.add-note')
// Добавляем обработчик события на кнопку
button.addEventListener('click', event => {
    event.preventDefault() // Предотвращаем стандартное поведение формы
    
    const title = input.value
    const description = textarea.value
    console.log("Перед добавлением заметки, цвет:",view.selectedColor )
    controller.addNote(title,description,view.selectedColor) // Вызываем метод addNote контроллера

    input.value = ''
    textarea.value ='' 
    const textContent = document.querySelector('.main-content')
    const list=document.querySelector('.notes-list')
    if (list.classList.contains('.added-title').length!==0) {
        textContent.style.display = 'none'
    }
    // Очищаем поле ввода
  })
  
    const notesList = document.querySelector(".notes-list");
  
    notesList.addEventListener("click", (event) => {
      if (event.target.matches("img[alt='trash']")) {
        const listItem = event.target.closest("li");
        if (listItem) {
          listItem.remove();
          this.renderCountNotes()
      }}
    })
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".notes-list").addEventListener("click", (event) => {
            if (event.target.classList.contains("inactive")) {
                event.target.src = "./assets/heart active.svg";
                event.target.alt = "heart active";
                event.target.classList.remove("inactive");
                event.target.classList.add("active");
            } else if (event.target.classList.contains("active")) {
                event.target.src = "./assets/heart inactive.png";
                event.target.alt = "heart inactive";
                event.target.classList.remove("active");
                event.target.classList.add("inactive");
            }
        });
    })
      document.querySelector(".filter-notes").addEventListener("click", (event) => {
        if (event.target.classList.contains("checkbox-inactive")){
            event.target.src = "./assets/checkbox active.svg";
            event.target.alt = "checkbox-active"
            event.target.classList.remove("checkbox-inactive");
                event.target.classList.add("checkbox-active");
            } else if (event.target.classList.contains("checkbox-active")) {
                event.target.src = "./assets/checkbox inactive.svg";
                event.target.alt = "checkbox inactive";
                event.target.classList.remove("checkbox-active");
                event.target.classList.add("checkbox-inactive");
        }
})
    },

    renderNotes(notes) {
        const list=document.querySelector('.notes-list')
        
        let notesHTML=''
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i]
            notesHTML+=`<li id="${note.id}"><div class="added-title ${note.color}"><div>${note.title}</div><div class="img-menu"><img class="inactive" src="./assets/heart inactive.png" alt="heart inactive"><img class="delete-note" src="./assets/trash.svg" alt="trash"></div></div><p class="added-description">${note.description}</p></p></li>`
    }
    list.innerHTML=notesHTML 
    this.renderCountNotes()
},
        renderCountNotes(){
            const counter= document.getElementById('counter')
            // const list=document.querySelector('.notes-list')
            counter.textContent=document.querySelectorAll(".notes-list li").length
        }
 }
 // обработка действий пользователя, обновление модели
const controller = {
    addNote(title,description,color){
        console.log("Выбранный цвет:", color)
        if ((title.trim()!=='')&&(description.trim()!=='')){
            model.addNote(title,description, color)
        }
    },
    deleteNote(noteId){
        model.deleteNote(noteId)
    },
}
 

function init() {
    view.init()
  }
   
  init()