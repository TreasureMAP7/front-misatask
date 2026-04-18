// Password Toggle
document.querySelectorAll(".password-toggle").forEach((button) => {
  let toggle = false;
  const show = button.querySelector(".password-show");
  const hide = button.querySelector(".password-hide");
  const input = button.previousElementSibling;
  hide.classList.add("hidden");
  button.addEventListener("click", () => {
    toggle = !toggle;
    if (toggle) {
      show.classList.add("hidden");
      hide.classList.remove("hidden");
      input.type = "text";
    } else {
      show.classList.remove("hidden");
      hide.classList.add("hidden");
      input.type = "password";
    }
  });
});

// Fake auth
function auth(type = "signup") {
  let filled = true;
  const input = document.querySelectorAll("input");
  input.forEach((el) => {
    if (!el.value) {
      filled = false;
    }
  });

  if (filled) {
    if (type == "signup") {
      if (!(input[3].value == input[4].value)) {
        alert("Password doesn't match");
      } else {
        const user = {
          firstName: input[0].value,
          lastName: input[1].value,
          role: "Student",
          email: input[2].value,
          password: input[3].value,
          login: true,
        };
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/view/home.html";
      }
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (
        user &&
        user.email == input[0].value &&
        user.password == input[1].value
      ) {
        const userLogin = {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
          password: user.password,
          login: true,
        };
        localStorage.setItem("user", JSON.stringify(userLogin));
        window.location.href = "/view/home.html";
      } else {
        alert("Email or password not found");
      }
    }
  } else {
    alert("Please fill all the required forms");
  }
}
