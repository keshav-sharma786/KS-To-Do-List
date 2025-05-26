const body = document.querySelector("body");
const save = document.querySelector(".save");
const clear = document.querySelector(".clear");
const title = document.querySelector(".title");
const description = document.querySelector(".description");
// const alert = document.querySelector("#liveAlertPlaceholder");
const table = document.querySelector(".table");
const tableBody = document.querySelector("tbody");
const changeTheme = document.querySelector(".change-theme");

// const allTasksArray = JSON.parse(localStorage.getItem('allTasks') || '[]');
const allTasksArray = JSON.parse(localStorage.getItem("allTasksArray") || "[]");
// setting the local storage on page reload as well

// console.log(allTasksArray);

let count = 1;
const renderTasksFromStorage = () => {
  allTasksArray.forEach((task) => {
    const newRow = document.createElement("tr");

    const th = document.createElement("th");
    const c1 = document.createElement("td");
    const c2 = document.createElement("td");
    const c3 = document.createElement("td");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Do you want to delete ?")) {
        const index = allTasksArray.findIndex((t) => t.NO === task.NO);
        if (index !== -1) {
          allTasksArray.splice(index, 1);
          localStorage.setItem("allTasksArray", JSON.stringify(allTasksArray));
        }
        newRow.remove();
        count--;
      }
    });

    c3.appendChild(deleteBtn);
    th.innerText = task.NO;
    th.setAttribute("scope", "row");
    c1.innerText = task.Title;
    c2.innerText = task.Description;

    newRow.appendChild(th);
    newRow.appendChild(c1);
    newRow.appendChild(c2);
    newRow.appendChild(c3);

    tableBody.appendChild(newRow);
  });

  // update count to be after the last task
  count = allTasksArray.length + 1;
};

// Call the function when page loads
renderTasksFromStorage();

// console.dir(table);

changeTheme.addEventListener("click", (e) => {
  body.classList.toggle("background");
});

// creating a function to add a task
const addTasks = () => {
  // creating an array for pushing the objects into the array basically array of objects

  console.log(allTasksArray);
  // creating allTasks object for storing the data into local storage
  const allTasks = {
    NO: `${count}.`,
    Title: title.value,
    Description: description.value,
  };
  // pushing the object into the array
  allTasksArray.push(allTasks);
  // console.log(allTasksArray);
  // saving the data to local storage
  // converting the array into string
  const arrString = JSON.stringify(allTasksArray);
  localStorage.setItem("allTasksArray", arrString);
  // console.log(allTasks);
  const newRow = document.createElement("tr");
  // creating the th element
  const th = document.createElement("th");
  // creating the columns
  const c1 = document.createElement("td");
  const c2 = document.createElement("td");
  const c3 = document.createElement("td");
  // creating the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    // confirm("Do you want to delete ?");
    if (confirm("Do you want to delete ?")) {
      const indexOfObjectToBeRemoved = allTasksArray.findIndex(
        (task) => task.NO === newRow.children[0].innerText
      );
      if (indexOfObjectToBeRemoved !== -1) {
        allTasksArray.splice(indexOfObjectToBeRemoved, 1);
        localStorage.setItem("allTasksArray", JSON.stringify(allTasksArray));
      }

      newRow.remove();
      count = allTasksArray.length + 1;
    }
  });

  c3.appendChild(deleteBtn);
  th.innerText = `${count}.`;
  th.setAttribute("scope", "row");
  c1.innerText = `${title.value}`;
  c2.innerText = `${description.value}`;
  // appending the th and columns to the row
  newRow.appendChild(th);
  newRow.appendChild(c1);
  newRow.appendChild(c2);
  newRow.appendChild(c3);
  // append newRow to table
  tableBody.appendChild(newRow);
  table.appendChild(tableBody);

  count++;
  title.value = "";
  description.value = "";
};

save.addEventListener("click", (e) => {
  if (title.value && description.value) {
    // function call
    addTasks();
  } else {
    alert("Please fill out all the fields");
  }
});

const clearAllTasks = () => {
  if (confirm("Do you want to delete ?")) {
    const childrenOfTableBody = tableBody.children;
    // converting htmlCollection to array
    const childrenOfTableBodyArray = Array.from(childrenOfTableBody);
    childrenOfTableBodyArray.forEach((element) => element.remove());
    localStorage.clear();
    // along with local storage i want my array to also be clear
    allTasksArray.length = 0;
    count = 1;
  }
};

// attaching an event listener to the clear button
clear.addEventListener("click", (e) => {
  clearAllTasks();
});
