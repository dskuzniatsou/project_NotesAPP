
// хранение данных, бизнес-логика
const model = {
    notes: [],
    addNote(title,description) {
    const isFavorite = false
    const id = Math.random() 
    const color ='yellow'
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
    init() {
        this.renderNotes(model.notes)
        this.renderCountNotes()
        const colorsContainer = document.querySelector(".colors");

    colorsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("color")) {
            // Удаляем выделение у всех цветов
             document.querySelectorAll(".color").forEach(color => color.classList.remove("selected"));

            // Добавляем выделение кликнутому цвету
            event.target.classList.add("selected");

            const color = event.target.classList[1];}})
        
    
        const input = document.querySelector('#note-title') 
        const textarea = document.querySelector('#note-description')
        const button = document.querySelector('.add-note')
// Добавляем обработчик события на кнопку
button.addEventListener('click', function (event) {
    event.preventDefault() // Предотвращаем стандартное поведение формы
    const title = input.value
    const description = textarea.value
    
    controller.addNote(title,description) // Вызываем метод addNote контроллера

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

      
  // Получаем все изображения с классом 'inactive'
const image = document.querySelector('.inactive')

    image.addEventListener('click', (event) => {
      // Проверяем, если элемент имеет класс 'inactive'
      if (event.target.matches('.inactive')) {
        // Заменяем изображение на активное
        image.src = './assets/heart active.svg'; // Новое изображение
        image.alt = 'heart active'; // Новый alt для изображения
        image.classList.remove('inactive'); // Убираем класс 'inactive'
        image.classList.add('active');}// Добавляем класс 'active'
    //    else if (image.classList.contains('active')) {
    //     // Если изображение уже активное, возвращаем его обратно
    //     image.src = './assets/heart inactive.png'; // Вернуть исходное изображение
    //     image.alt = 'heart inactive'; // Вернуть исходный alt
    //     image.classList.remove('active'); // Убираем класс 'active'
    //     image.classList.add('inactive'); // Возвращаем класс 'inactive'
    //   }
    });
  ;
  
  
},

    renderNotes(notes){
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
    addNote(title,description){
        if ((title.trim()!=='')&&(description.trim()!=='')){
            model.addNote(title,description)
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