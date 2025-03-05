// movies-->notes
const MOKK = [
  {
  id: 1,
  title: 'Работа с формами',
  content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
  color: 'green',
  isFavorite: false,
},
// ...
]
const model = {
    notes: [],
    addNote(title, description) {
      const id = Math.random()
      const newNote = { id, title, description, color, isFavorite }
      this.notes.push(newNote)
      view.renderNotes(this.notes)
    },
    deleteNote(noteId){
      this.notes = this.notes.filter((note) => note.id !== noteId)
      view.renderNotes(this.notes)
    }
  }

  const view = {
    init() {
      this.renderNotes(model.notes)
  
      const form = document.querySelector('.form')
      const inputTitle = document.querySelector('#input-title')
      const inputDescription = document.querySelector('#note-description"')
  
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        const title = inputTitle.value
        const description = inputDescription.value
        controller.addNote(title, description)
  
        inputTitle.value = ''
        inputDescription.value = ''
      })
      const list = document.querySelector('.list')
  
      list.addEventListener('click', function (event) {
        // if (event.target.classList.contains('movie-title')) {
        //   const movieId = +event.target.parentElement.id
        //   controller.toggleTask(taskId)
        // }
  
        if (event.target.classList.contains('delete-button')) {
          const noteId = +event.target.parentElement.id
          controller.deleteMovie(noteId)
        }
      })
      // your code
    },
    renderNotes(notes) {
      const list = document.querySelector('.note-list')
      let notesHTML = ''
  
      for (const note of notes) {
        notesHTML += `
          <li id="${note.id}" class="note">
            <b class="note-title">${note.title}</b><button class="delete-button" type="button"> <img src="./assets/trash.svg"</button>
            <p class="note-description">${note.description}</p>
            
          </li>
        `
      }
  
      list.innerHTML = notesHTML
    },
    displayMessage(message, isError = false) {
      const messageBox = document.querySelector('.message-box')
      messageBox.textContent = message
      if (isError) {
        messageBox.classList.remove('success')
        messageBox.classList.add('error')
      } else {
        messageBox.classList.remove('error')
        messageBox.classList.add('success')
      }
    },
  }