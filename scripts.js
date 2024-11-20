// Gestión de estados
let courses = [];
let currentCourseId = null;

// Gestión de modos
const modal = document.getElementById('modal');
const taskModal = document.getElementById('taskModal');

const openModal = () => {
    modal.style.display = 'block';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.getElementById('className').value = '';
    document.getElementById('semester').value = '';
    document.getElementById('studentsCount').value = '';
};

const openTaskModal = (courseId) => {
    currentCourseId = courseId;
    taskModal.style.display = 'block';
};

const closeTaskModal = () => {
    taskModal.style.display = 'none';
    currentCourseId = null;
    document.getElementById('taskName').value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskDescription').value = '';
};

// Cerrar modales al hacer clic fuera de ellos
window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
    if (event.target === taskModal) {
        closeTaskModal();
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
        students: studentsCount,
        tasks: []
    };

    courses.push(newCourse);
    updateCoursesGrid();
    closeModal();
};

const addTask = () => {
    const taskName = document.getElementById('taskName').value.trim();
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskDescription = document.getElementById('taskDescription').value.trim();

    if (!taskName || !taskDueDate || !taskDescription) {
        alert('Por favor complete todos los campos de la tarea');
        return;
    }

    const course = courses.find(c => c.id === currentCourseId);
    if (course) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            dueDate: taskDueDate,
            description: taskDescription
        };

        course.tasks.push(newTask);
        updateCoursesGrid();
        closeTaskModal();
    }
};

const deleteCourse = (courseId) => {
    if (confirm('¿Está seguro de que desea eliminar esta clase?')) {
        courses = courses.filter(course => course.id !== courseId);
        updateCoursesGrid();
    }
};

const deleteTask = (courseId, taskId) => {
    if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            course.tasks = course.tasks.filter(task => task.id !== taskId);
            updateCoursesGrid();
        }
    }
};

const updateCoursesGrid = () => {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        let tasksHTML = '';
        if (course.tasks.length > 0) {
            tasksHTML = `
                <div class="course-tasks">
                    <h3>Tareas:</h3>
                    ${course.tasks.map(task => `
                        <div class="task-item">
                            <h4>${task.name}</h4>
                            <p>Fecha de entrega: ${task.dueDate}</p>
                            <p>${task.description}</p>
                            <button onclick="deleteTask(${course.id}, ${task.id})" class="delete-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        courseCard.innerHTML = `
            <div class="course-name">${course.name}</div>
            <div class="course-info">
                <p>Semestre: ${course.semester}</p>
                <p>Estudiantes: ${course.students}</p>
            </div>
            ${tasksHTML}
            <div class="course-actions">
                <button onclick="deleteCourse(${course.id})" class="delete-btn">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
                <button onclick="openStudentModal(${course.id})" class="add-student-btn">
                    <i class="fas fa-user-plus"></i> Agregar Estudiante
                </button>
                <button onclick="openTaskModal(${course.id})" class="add-task-btn">
                    <i class="fas fa-tasks"></i> Agregar Tarea
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

const logout = () => {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        window.location.href = 'login.html';
    }
};