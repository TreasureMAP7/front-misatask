let filterVal = 0;
let today = new Date();
let user = JSON.parse(localStorage.getItem("user"))
if (!user.login) {
  window.location.href = "../"
};

document.querySelectorAll(".filter-task").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-task").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  });
});

const updateTime = () => {
  let header = "";
  let hours = today.getHours();
  if (hours < 10 && hours >= 5) {
    header = `Good Morning ${user.firstName || "Anonymous"}`;
  } else if (hours < 18 && hours >= 10) {
    header = `Good Afternoon ${user.firstName || "Anonymous"}`;
  } else {
    header = `Good Evening ${user.firstName || "Anonymous"}`;
  }
  document.getElementById("greeting").innerHTML = header;
};

const filter = (status) => {
  fetch("/json/task.json")
    .then((response) => response.json())
    .then((data) => {
      let ongoing = 0;
      let totalDue = 0;
      let completed = 0;
      let elTask = "";

      data.forEach((task) => {
        let taskDate = new Date(task.detail.deadline);
        let taskCompleted = false;
        let overdue = today.getTime() > taskDate.getTime() && !taskCompleted;
        let diff = new Date(
          Math.abs(today.getTime() - taskDate.getTime()),
        ).getDate();
        if (taskCompleted) {
          completed++;
        } else if (overdue) {
          totalDue++;
        } else {
          ongoing++;
        }

        if (
          (status === "on" && (taskCompleted || overdue)) ||
          (status === "over" && (taskCompleted || !overdue)) ||
          (status === "done" && !taskCompleted)
        ) {
          return;
        }

        elTask += `
            <ul class="flex flex-col gap-1.5">
              <h6 class="font-semibold text-xs">${overdue ? `Overdue by ${diff} days` : taskCompleted ? `Done` : `Due in ${diff} days`}</h6>
              <div class="flex gap-3 items-center">
                <input type="checkbox" ${taskCompleted ? "checked" : ""} class="w-5 h-5">
                <p class="font-medium text-lg ${overdue && !taskCompleted ? "text-red" : ""} ${taskCompleted ? "line-through decoration-2" : ""}">${task.name}</p>
              </div>
              <hr class="opacity-50">
            </ul>
            `;
      });
      document.getElementById("load-task").innerHTML = elTask;
      document.getElementById("ongoing").innerHTML = ongoing;
      document.getElementById("overdue").innerHTML = totalDue;
      document.getElementById("done").innerHTML = completed;
    });
};
