//aqui voy hacer el de invitar usuarios
function openAddUserModal() {
    document.getElementById("addUserModal").style.display = "block";
}

function closeAddUserModal() {
    document.getElementById("addUserModal").style.display = "none";
}

function addUser() {
    // Get the user's email from the input field
    const userEmail = document.getElementById("userEmail").value;

    // Add the user to your system (replace this with your actual logic)
    // ...

    // Close the modal
    closeAddUserModal();
}




// Gestión de estados
let courses = [];

// Gestión de modos
const modal = document.getElementById('modal');

const openModal = () => {
    modal.style.display = 'block';
};

const closeModal = () => {
    modal.style.display = 'none';
    // Borrar campos de formulario
    document.getElementById('className').value = '';
    document.getElementById('semester').value = '';
    document.getElementById('studentsCount').value = '';
};

// Cerrar modos al hacer clic fuera de ellos
window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

// Gestión de cursos
const addClass = () => {
    const className = document.getElementById('className').value.trim();
    const semester = document.getElementById('semester').value.trim();
    const studentsCount = document.getElementById('studentsCount').value.trim();

    if (!className || !semester || !studentsCount) {
        alert('Por favor complete todos los campos');
        return;
    }

    const newCourse = {
        id: Date.now(),
        name: className,
        semester: semester,
        students: studentsCount
    };

    courses.push(newCourse);
    updateCoursesGrid();
    closeModal();
};

const deleteCourse = (courseId) => {
    if (confirm('¿Está seguro de que desea eliminar esta clase?')) {
        courses = courses.filter(course => course.id !== courseId);
        updateCoursesGrid();
    }
};

const updateCoursesGrid = () => {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-name">${course.name}</div>
            <div class="course-info">
                <p>Semestre: ${course.semester}</p>
                <p>Estudiantes: ${course.students}</p>
            </div>
            <div class="course-actions">
                <button onclick="deleteCourse(${course.id})" class="delete-btn">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
                <button onclick="openStudentModal(${course.id})" class="add-student-btn">
                    <i class="fas fa-user-plus"></i> Agregar Estudiante
                </button>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
};

const openStudentModal = (courseId) => {
    const studentModal = document.createElement('div');
    studentModal.className = 'modal';
    studentModal.id = `studentModal-${courseId}`;
    studentModal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeStudentModal(${courseId})">&times;</span>
            <h2>Agregar Estudiante al Curso</h2>
            <p>Curso ID: ${courseId}</p>
            <input type="email" id="studentEmail-${courseId}" placeholder="Correo Electrónico">
            <button onclick="addStudent(${courseId})">Agregar Estudiante</button>
        </div>
    `;
    document.body.appendChild(studentModal);
    studentModal.style.display = 'block';
};

const closeStudentModal = (courseId) => {
    const studentModal = document.getElementById(`studentModal-${courseId}`);
    if (studentModal) {
        studentModal.style.display = 'none';
        studentModal.remove();
    }
};

const addStudent = (courseId) => {
    const emailInput = document.getElementById(`studentEmail-${courseId}`);
    const studentEmail = emailInput.value;

    if (studentEmail) {
        alert(`Estudiante con correo "${studentEmail}" agregado al curso ID ${courseId}.`);
        closeStudentModal(courseId);
    } else {
        alert('Por favor, ingrese un correo electrónico válido.');
    }
};




// Funcionalidad de cierre de sesión, enviandolo al login 
const logout = () => {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        window.location.href = 'login.html';
    }
};