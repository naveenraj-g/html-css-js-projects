// DOM ELEMENTS
const addProjectBtn = document.querySelector(".add-project-btn");
const projectTitleDispEle = document.querySelector(".project-title-listed");
const projectDynamicRenderContentEle = document.querySelector(".project-render-dynamic-container");
const dialogModal = document.querySelector(".dialog-modal");

//////////////////////////////////////////////////////////////

// Render HTML Elements
const noProjectHTML = `
    <div class="no-project">
        <figure class="no-project-img">
        <img
            src="./assets/no-projects.png"
            alt="pad with paper and pen"
        />
        </figure>
        <h2 class="heading-secondary">No Project Selected</h2>
        <p class="no-project-desc">
        Select a project or get started with a new one
        </p>
        <button class="create-project-btn btn">Create new project</button>
    </div>
`;

const addProjectHTML = `
    <div class="add-project">
        <div class="add-cancel-btn">
        <button class="btn-cancel btn">Cancel</button>
        <button class="btn-add btn">Save</button>
        </div>
        <form class="add-project-form">
        <div class="form-field">
            <label for="title" class="add-project-label">title</label>
            <input type="text" class="add-project-input" id="title" />
        </div>

        <div class="form-field">
            <label for="description" class="add-project-label"
            >description</label
            >
            <textarea
            id="description"
            class="add-project-input"
            cols="30"
            rows="3"
            ></textarea>
        </div>

        <div class="form-field">
            <label for="date" class="add-project-label">due date</label>
            <input type="date" class="add-project-input" id="date" />
        </div>
        </form>
    </div>
`;

let addedProjectHTML = `
    <div class="added-project">
        <div class="added-project-title">
        <h1 class="added-project-heading">{Added Project Title}</h1>
        <button class="btn-delete btn">Delete</button>
        </div>
        <p class="project-due-date">Jan 25, 2024</p>
        <p class="project-description">just a test project</p>
        <hr />
        <h2 class="project-tasks-title">Tasks</h2>
        <form class="task-add-form">
        <input type="text" class="add-task-input" id="add-task" />
        <label for="add-task">Add Task</label>
        </form>
        <div class="task-list">
        <p class="no-task-added">
            This project does not have any tasks yet.
        </p>
        </div>
    </div>
`;

let noTaskHTML = `
    <p class="no-task-added">
        This project does not have any tasks yet.
    </p>
`;

let taskHTML = `
    <div class="tasks">
        <div class="task">
            <p class="task-name">sadadad</p>
            <button class="task-clr-btn btn">Clear</button>
        </div>
    </div>
`;

//////////////////////////////////////////////////////////////

// Project Code
let contentHTML;

let projectData = {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
}

function renderCondition() {
    if (projectData.selectedProjectId === undefined) {
        contentHTML = noProjectHTML;
    }
    if (projectData.selectedProjectId === null) {
        contentHTML = addProjectHTML;
    }
    if (projectData.selectedProjectId) {
        contentHTML = addedProjectHTML;
    }
}
renderCondition();


function dynamicRender(html) {
    projectDynamicRenderContentEle.innerHTML = "";
    projectDynamicRenderContentEle.insertAdjacentHTML("afterbegin", html);
}
dynamicRender(contentHTML);

function saveCancelAddProjectHandler() {
    const saveAddProjectBtn = document.querySelector(".btn-add");
    const cancelAddProjectBtn = document.querySelector(".btn-cancel");

    cancelAddProjectBtn.addEventListener("click", cancelAddProject);

    saveAddProjectBtn.addEventListener("click", saveAddProject);
}

function addProjectHandler() {
    const data = {
        ...projectData,
        selectedProjectId: null,
    }

    projectData = data;

    renderCondition();
    dynamicRender(contentHTML);
    saveCancelAddProjectHandler();
}

function cancelAddProject() {
    const data = {
        ...projectData,
        selectedProjectId: undefined,
    }

    projectData = data;

    renderCondition();
    dynamicRender(contentHTML);
    createProjectHandler();
}

function saveAddProject() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    if (title === "" || description === "" || date === "") {
        dialogModal.showModal();
        return;
    }

    const formattedDate = new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const projectId = Math.random();

    const newProjectData = {
        title,
        description,
        formattedDate,
        id: projectId,
    };

    projectData = {
        ...projectData,
        selectedProjectId: undefined,
        projects: [...projectData.projects, newProjectData],
    };

    renderCondition();
    dynamicRender(contentHTML);
    createProjectHandler();
    renderProjectTitleList();
    renderAddedProject();
}

function renderProjectTitleList() {
    let projectTitleList = "";

    projectData.projects.forEach(project => {
        const li = `<li data-id="${project.id}" class="project-title">${project.title}</li>`;
        projectTitleList += li;
    });

    projectTitleDispEle.innerHTML = "";
    projectTitleDispEle.insertAdjacentHTML("afterbegin", projectTitleList);
}

function dynamicRenderAddedProduct(selectedProduct) {
    addedProjectHTML = `
    <div class="added-project">
        <div class="added-project-title">
            <h1 class="added-project-heading">${selectedProduct.title}</h1>
            <button class="btn-delete btn">Delete</button>
        </div>
        <p class="project-due-date">${selectedProduct.formattedDate}</p>
        <p class="project-description">${selectedProduct.description}</p>
        <hr />
        <h2 class="project-tasks-title">Tasks</h2>
        <div class="task-add-form">
            <input type="text" class="add-task-input" id="add-task" />
            <button for="add-task" class="add-task-btn btn">Add Task</button>
        </div>
        <div class="task-list">
            ${projectData.tasks.length > 0 ? taskHTML : noTaskHTML}
        </div>
    </div>
    `;

    renderCondition();
    dynamicRender(contentHTML);

    document.querySelector(".btn-delete").addEventListener("click", deleteAddedProjectHandler);

    document.querySelector(".add-task-btn").addEventListener("click", addTaskHandler);
}

let selectedProduct;

function renderAddProjectHandler(e) {
    const projectId = e.target.dataset.id;
    const data = {
        ...projectData,
        selectedProjectId: +projectId,
    }
    projectData = data;

    selectedProduct = projectData.projects.find(project => {
        return project.id === projectData.selectedProjectId;
    });

    dynamicRenderAddedProduct(selectedProduct);

    // document.querySelector(".btn-delete").addEventListener("click", deleteAddedProjectHandler);

    // document.querySelector(".add-task-btn").addEventListener("click", addTaskHandler);

}

function renderAddedProject() {
    const projectTitle = document.querySelectorAll(".project-title");
    projectTitle.forEach(ele => {
        ele.addEventListener("click", renderAddProjectHandler);
    });
}

function deleteAddedProjectHandler() {
    const filteredProjects = projectData.projects.filter(pro => {
        return pro.id !== projectData.selectedProjectId;
    });
    const data = {
        ...projectData,
        projects: filteredProjects,
        selectedProjectId: undefined,
    }
    projectData = data;

    renderProjectTitleList();
    renderAddedProject();
    renderCondition();
    dynamicRender(contentHTML);
    createProjectHandler();
}

function addTaskHandler() {
    // const form = document.querySelector(".task-add-form");
    // form.addEventListener("submit", (e) => e.preventDefault());

    let taskInput = document.querySelector(".add-task-input");
    const randomTaskId = Math.random();

    const task = {
        taskId: randomTaskId,
        currentProjectId: projectData.selectedProjectId,
        taskName: taskInput.value,
    };

    const data = {
        ...projectData,
        tasks: [...projectData.tasks, task],
    }

    projectData = data;
    taskInput.value = "";

    // const selectedProjectTask = projectData.tasks.filter(task => {
    //     return task.currentProjectId === projectData.selectedProjectId;
    // });

    // selectedProjectTask.forEach(task => {
    //     taskHTML += `
    //     <div class="tasks">
    //         <div class="task">
    //             <p class="task-name">${task.taskName}</p>
    //             <button class="task-clr-btn btn" data-task-id="${task.taskId}">Clear</button>
    //         </div>
    //     </div>
    // `;
    // });

    // dynamicRenderAddedProduct(selectedProduct);
    dynamicRenderProjectTasks();
}

function dynamicRenderProjectTasks() {
    taskHTML = "";
    const selectedProjectTask = projectData.tasks.filter(task => {
        return task.currentProjectId === projectData.selectedProjectId;
    });

    selectedProjectTask.forEach(task => {
        taskHTML += `
        <div class="tasks">
            <div class="task">
                <p class="task-name">${task.taskName}</p>
                <button class="task-clr-btn btn" data-task-id="${task.taskId}">Clear</button>
            </div>
        </div>
    `;
    });

    dynamicRenderAddedProduct(selectedProduct);
    selectedProjectTaskRemove();
}

function selectedProjectTaskRemove() {
    const currentProjectTaskClrBtns = document.querySelectorAll(".task-clr-btn");

    currentProjectTaskClrBtns.forEach(clrBtn => {
        clrBtn.addEventListener("click", (e) => {
            const clickedBtnTaskId = +e.target.dataset.taskId;

            const filteredTaskList = projectData.tasks.filter(task => {
                return task.taskId !== clickedBtnTaskId;
            });

            console.log(filteredTaskList);

            const data = {
                ...projectData,
                tasks: filteredTaskList,
            }

            projectData = data;
            dynamicRenderProjectTasks();
        });
    });
}

//////////////////////////////////////////////////////////////

function createProjectHandler() {
    const createProjectBtn = document.querySelector(".create-project-btn");

    addProjectBtn.addEventListener("click", addProjectHandler);
    createProjectBtn.addEventListener("click", addProjectHandler);
}

createProjectHandler();