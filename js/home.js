let filterVal = 0;
let today = new Date();

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
    header = "Good Morning"
  } else if (hours < 18 && hours >= 10) {
    header = "Good Afternoon"
  } else {
    header = "Good Evening"
  }
  document.getElementById("greeting").innerHTML = header;
}

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
        let overdue =  today.getTime() < taskDate.getTime() && !task.done;

        if (task.done) {
          completed++;
        } else if (overdue) {
          totalDue++;
        } else {
          ongoing++;
        }

        if (
          (status === "on" && (task.done || overdue)) ||
          (status === "over" && (task.done || !overdue)) ||
          (status === "done" && !task.done)
        ) {
          return;
        }

        elTask += `
            <ul class="flex flex-col gap-1.5">
            <h6 class="font-semibold text-xs">${overdue ? "Overdue" : (task.done ? "Done" : "Ongoing")}</h6>
              <div class="flex gap-3 items-center">
                <input type="checkbox" ${task.done ? "checked" : ""} class="w-5 h-5" disabled>
                <p class="font-medium text-lg ${overdue && !task.done ? "text-red" : ""} ${task.done ? "line-through decoration-2" : ""}">${task.name}</p>
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
