const apiURL = 'https://jsonplaceholder.typicode.com/todos';
const container = document.getElementById('todo-container');
const pagination = document.getElementById('pagination');

let currentPage = 1;
const limit = 10; // items per page
const totalPages = 20; // since there are 200 todos in the API

// Fetch and display todos
async function fetchTodos(page) {
  container.innerHTML = '<p>Loading...</p>';
  try {
    const response = await fetch(`${apiURL}?_page=${page}&_limit=${limit}`);
    const todos = await response.json();

    container.innerHTML = ''; // Clear container
    todos.forEach(todo => {
      const div = document.createElement('div');
      div.className = 'todo';
      div.innerHTML = `<strong>${todo.title}</strong> - ${todo.completed ? '✅' : '❌'}`;
      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = '<p>Error loading todos.</p>';
    console.error('Error:', error);
  }
}

// Generate pagination buttons
function renderPagination() {
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.disabled = i === currentPage;
    btn.addEventListener('click', () => {
      currentPage = i;
      fetchTodos(currentPage);
      renderPagination();
    });
    pagination.appendChild(btn);
  }
}

// Initial load
fetchTodos(currentPage);
renderPagination();
