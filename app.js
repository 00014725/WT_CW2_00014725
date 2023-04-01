const express = require('express')
const port = process.env.port || 3000
const { JSDOM } = require('jsdom');
// --------------------------------------------------
const form = document.querySelector(".form-create")
const name = document.querySelector("#name")
const surname = document.querySelector("#surname")
const dateOfBirth = document.querySelector("#dob")
const university = document.querySelector("#university")
const course = document.querySelector("#course")
const listGroup = document.querySelector(".list-group")
const modal = document.querySelector('.modal')
const closeModalBtn = document.getElementById("close-modal");

//Edit Form 
const editForm =document.querySelector('.form-edit')
const nameEdit = document.querySelector("#edit-name")
const surnameEdit = document.querySelector("#edit-surname")
const dateOfBirthEdit = document.querySelector("#edit-dob")
const universityEdit = document.querySelector("#edit-university")
const courseEdit = document.querySelector("#edit-course")

// Warning Messages
const warningName = document.querySelector(".warn-name")
const warningSurname = document.querySelector(".warn-surname")
const warningDob = document.querySelector(".warn-dob")
const warningUniversity = document.querySelector(".warn-university")
const warningCourse  = document. querySelector(".warn-course")
const warnEditName = document.querySelector(".warn-edit-name")
const warnEditSurname = document.querySelector(".warn-edit-surname")
const warnEditDob = document.querySelector(".warn-edit-dib")
const warnEdituniversity = document.querySelector(".warn-edit-university")
const warnEditCourse = document.querySelector(".warn-edit-course")


let students = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

// if(students.length) {
//     showStudents()
// }

function setStudents() {
    localStorage.setItem('student', JSON.stringify(students))
}

// Warn Message Function
function showMessage(where, message) {
  where.textContent = message

  setTimeout(()=>{
    where.textContent = ''
  }, 2500)
}

function getTime() {
    const now = new Date()

    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1): now.getMonth()
    const year = now.getFullYear()

    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()

    return `${hour}:${minutes}, ${date}.${month}.${year}`
}

//Show Students 
function showStudents() {
    const students = JSON.parse(localStorage.getItem("student"))
    listGroup.innerHTML = ''

    students.forEach((item, i) => {
        listGroup.innerHTML += ` 
        <li class="student-li">
        ${item.name}  ${item.surname} 
            <div class="li-icons">
                <span class="time">${item.timeRegistered}</span>
                <img onclick ="(editSu(${i}))" class="edit" src="./icons-folder/edit.png" width="27px" height="27px">
                <img onclick = "(deleteStudent(${i}))" class="delete" src="./icons-folder/delete.png" width="27px" height="27px">
            </div>
        </li>`
    });
}


//Submit FORM
form.addEventListener('submit', (e) => {
  e.preventDefault();
    
  const nameInput = name.value.trim()
  const surnameInput = surname.value.trim()
  const inputUniver = university.value.trim()
  const inputCourse = course.value.trim()
  const dob = dateOfBirth.value
  
   
  form.reset() 

  if(nameInput.length && surnameInput.length) {
    students.push({
        name: nameInput,
        surname: surnameInput,
        birthDate: dob,
        university: inputUniver,
        course: inputCourse,
        timeRegistered: getTime()
    })
    setStudents()
    showStudents()
  } else {
    if (!nameInput.length) {
      showMessage(warningName, "Please enter a name...")
    }
    if (!surnameInput.length) {
      showMessage(warningSurname, "Please enter a surname...")
    }
    if (!inputUniver.length) {
        showMessage(warningUniversity, "Enter current university..")
      }
    if (!inputCourse.length) {
        showMessage(warningCourse, "University Course...")
    }
    if(!dob.length) {
        showMessage(warningDob, "Provide your date of birth...")
    }
  }
})

//Delete 
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
      const deletedSu = students.filter((item, i) => {
        return i !== id;
      });
      students = deletedSu;
      setStudents();
      showStudents();
    }
}
//Edit 
editForm.addEventListener('submit', (e) => {
    e.preventDefault()

        const EditName = nameEdit.value.trim()
        const EditSurname = surnameEdit.value.trim()
        const EditUniver = universityEdit.value.trim()
        const EditCourse = courseEdit.value.trim()
        const EditDob = dateOfBirthEdit.value


    if(EditName.length && EditSurname.length) {
        students.splice(editItemId, 1, {
            name: EditName,
            surname: EditSurname,
            birthDate: EditDob,
            university: EditUniver,
            course: EditCourse,
            timeRegistered: getTime()
        })
        setStudents()
        showStudents()
        showModal()
      } else {
        if (!EditName.length) {
          showMessage(warnEditName, "Please enter a name...")
        }
        if (!EditSurname.length) {
          showMessage(warnEditSurname, "Please enter a surname...")
        }
        if (!EditUniver.length) {
            showMessage(warnEdituniversity, "Enter current university..")
          }
        if (!EditCourse.length) {
            showMessage(warnEditCourse, "University Course...")
        }
        if(!EditDob.length) {
            showMessage(warnEditDob, "Provide your date of birth...")
        }
      }
})


function editSu(id) {
    editItemId = id
    showModal()
    students = JSON.parse(localStorage.getItem("student"));
}

function showModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
}

function hideModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
}


closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.classList.add("hide");
});


function searchStudents() {
    const searchValue = document.querySelector('.search-input').value.trim().toLowerCase();
    const students = JSON.parse(localStorage.getItem("student"));
  
    // Filter the students by name
    const filteredStudents = students.filter((student) => {
      return student.name.toLowerCase().includes(searchValue);
    });
  
    // Clear the list group
    listGroup.innerHTML = '';
  
    // Display the found results in the list group
    filteredStudents.forEach((item, i) => {
      listGroup.innerHTML += ` 
      <li class="student-li">
      ${item.name}  ${item.surname} 
          <div class="li-icons">
              <span class="time">${item.timeRegistered}</span>
              <img onclick ="(editSu(${i}))" class="edit" src="./icons-folder/edit.png" width="27px" height="27px">
              <img onclick = "(deleteStudent(${i}))" class="delete" src="./icons-folder/delete.png" width="27px" height="27px">
          </div>
      </li>`
    });
  }
  
// Add event listener to search button
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', searchStudents);

showStudents()

    