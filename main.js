import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Загрузка задач из Firestore
async function loadTasks() {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = "Загрузка...";

  try {
    const snapshot = await getDocs(collection(db, 'tasks'));
    tasksContainer.innerHTML = "";

    snapshot.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += `
        <div class="task">
          ${task.text}
          <button onclick="removeTask('${doc.id}')">❌</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Ошибка при загрузке задач:", error);
    tasksContainer.innerHTML = "Ошибка при загрузке задач.";
  }
}

// Добавление задачи в Firestore
async function addTask() {
  const newTaskInput = document.getElementById('new-task');
  const newTask = newTaskInput.value.trim();

  if (newTask) {
    try {
      await addDoc(collection(db, 'tasks'), { text: newTask });
      newTaskInput.value = '';
      loadTasks();
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  } else {
    console.error("Поле ввода пустое.");
  }
}

// Удаление задачи из Firestore
async function removeTask(taskId) {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    loadTasks();
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
}

// Привязываем функцию к кнопке
document.getElementById('add-button').addEventListener('click', addTask);

// Загружаем задачи при открытии страницы
loadTasks();
