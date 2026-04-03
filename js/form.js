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