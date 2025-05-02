// init variables

const mainPage = document.querySelector('#main-page');
const addingPage = document.querySelector('#adding-page');
const openKanbanButton = document.querySelector('#open-kanban-button');
const addButton = document.querySelector('#add-button');
const saveButton = document.querySelector('#save-button');
const cancelButton = document.querySelector('#cancel-button');
const theme = document.querySelector('#theme');
const tabUrl = document.querySelector('#tab-url');
const description = document.querySelector('#description');
let tasks = [];


// init functions

function updateChromeStorage() {
    chrome.storage.local.get("myTasks", (result) => {
        if (result.myTasks) {
            chrome.storage.local.set({ myTasks: result.mytasks });
        } else {
            chrome.storage.local.set({ myTasks: tasks });
        }
    });
}

function getTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];

        tabUrl.textContent = currentTab.url;
    });
}

function addTask(newTask) {
    chrome.storage.local.get("myTasks", (result) => {
        const currentTasks = result.myTasks || [];

        currentTasks.push(newTask);
        chrome.storage.local.set({ myTasks: currentTasks });
    });
}


// execute code

updateChromeStorage();

openKanbanButton.addEventListener("click", () => {
    chrome.tabs.create({
        url: "kanban.html",
    });
});

addButton.addEventListener("click", () => {
    mainPage.style.display = "none";
    addingPage.style.display = "block";
    getTabUrl();
});

cancelButton.addEventListener("click", () => {
    mainPage.style.display = "block";
    addingPage.style.display = "none";
});

saveButton.addEventListener("click", () => {
    const newTask = {
        status: "à faire",
        url: tabUrl.textContent,
        theme: theme.value,
        description: description.value
    };

    addTask(newTask);
    window.close();
});