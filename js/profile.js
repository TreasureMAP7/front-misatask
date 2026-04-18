const label = ["First Name", "Last Name", "Role", "Email", "Password"];
const key = ["firstName", "lastName", "role", "email", "password"];
let user = JSON.parse(localStorage.getItem("user"));
if (!user.login) {
  window.location.href = "../";
}

document.title = `${user.firstName} ${user.lastName} Profile`;
document.getElementById("profile-header").innerHTML = `
  <picture class="flex items-center justify-center bg-white rounded-full overflow-hidden shadow-lg w-48 h-48">
    <img src="/asset/avatar/john.png" alt="profile" class="w-32 h-32"/>
  </picture>
  <div class="flex flex-col gap-3">
    <h1 class="text-5xl font-semibold">${user.firstName} ${user.lastName}</h1>
    <h4 class="text-2xl font-medium">${user.role}</h4>
  </div>`;

let elProfile = "";
for (let i = 0; i < label.length; i++) {
  let type = "text";
  if (key[i] === "password") {
    type = "password";
  }

  elProfile += `
    <div class="flex flex-col gap-2">
      <label for="first">${label[i]}</label>
      <input type="${type}" value="${user[key[i]]}" class="disabled overflow-hidden rounded-sm bg-grey max-w-48 px-2 py-1" disabled>
    </div>`;
}
document.getElementById("profile-content").innerHTML = elProfile;

function logout(type) {
  const userUpdate = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    password: user.password,
    login: false,
  };
  localStorage.setItem("user", JSON.stringify(userUpdate));
  if (type) {
    localStorage.clear();
  }
  window.location.href = "../"
}
