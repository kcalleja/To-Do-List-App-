// Function to add a new task
function addTask() {
    // Get the input box and the list container elements
    const inputBox = document.getElementById('inputBox');
    const listContainer = document.getElementById('list-container');
    
    // Check if the input box is empty
    if (inputBox.value.trim() === "") {
        // Show alert if input box is empty
        alert("Please enter a task.");
    } else {
        // Create a new list item element
        const li = document.createElement('li');
        li.textContent = inputBox.value;
        
        // Create a span element for the delete button
        const span = document.createElement('span');
        span.textContent = "×";
        span.className = "close";
        li.appendChild(span);

        // Append the new task to the list
        listContainer.appendChild(li);
        
        // Clear the input box after adding the task
        inputBox.value = "";
        
        // Save the updated list to localStorage
        saveData();

        // Add event listener for marking tasks as complete
        li.addEventListener('click', function() {
            li.classList.toggle('checked');
            saveData();
        });

        // Add event listener for deleting tasks
        span.addEventListener('click', function(event) {
            event.stopPropagation();
            li.remove();
            saveData();
        });
    }
}

// Function to save the task list to localStorage
function saveData(){
    const listContainer = document.getElementById('list-container');
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load the task list from localStorage
function showTask(){
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML) {
        // Re-attach event listeners to tasks after loading
        document.querySelectorAll('ul#list-container li').forEach(function(li) {
            li.addEventListener('click', function() {
                li.classList.toggle('checked');
                saveData();
            });

            const span = li.querySelector('span');
            if (span) {
                span.addEventListener('click', function(event) {
                    event.stopPropagation();
                    li.remove();
                    saveData();
                });
            }
        });
    }
}

// Load tasks when the page loads
showTask();

// Add event listener for the Enter key on the input box
document.getElementById('inputBox').addEventListener('keypress', function(event) {
    // Check if the key pressed is the Enter key
    if (event.key === 'Enter') {
        addTask();
    }
});
