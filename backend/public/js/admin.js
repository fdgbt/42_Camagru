const email = document.getElementById('email');
const username = document.getElementById('username');
const enabled = document.getElementById('enabled');
const level = document.getElementById('level');
const role = document.getElementById('role');
const password = document.getElementById('password');

const error = document.getElementById('error');
const errorBottom = document.getElementById('errorBottom');

const addErrorMsg = (msg, el) => {

    const input = document.getElementById(el);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(msg);

    email.classList.replace("dark:border-red-700", "dark:border-slate-700");
    email.classList.remove("border-red-600");
    username.classList.replace("dark:border-red-700", "dark:border-slate-700");
    username.classList.remove("border-red-600");
    enabled.classList.replace("dark:border-red-700", "dark:border-slate-700");
    enabled.classList.remove("border-red-600");
    level.classList.replace("dark:border-red-700", "dark:border-slate-700");
    level.classList.remove("border-red-600");
    role.classList.replace("dark:border-red-700", "dark:border-slate-700");
    role.classList.remove("border-red-600");
    password.classList.replace("dark:border-red-700", "dark:border-slate-700");
    password.classList.remove("border-red-600");
    
    input.classList.replace("dark:border-slate-700", "dark:border-red-700");
    input.classList.add("border-red-600");
    input.focus();

    if (lastMsg) {
        error.removeChild(lastMsg);
        errorBottom.removeChild(errorBottom.firstChild);
    } 
    error.append(errMsg);
    error.classList.remove("hidden");
    errorBottom.append(errMsg.cloneNode());
    errorBottom.classList.remove("hidden");
}

const updateUser = (userId) => {

    const formData = new URLSearchParams();
    
    formData.append("email", email.value);
    formData.append("username", username.value);
    formData.append("enabled", enabled.value);
    formData.append("level", level.value);
    formData.append("role", role.value);
    formData.append("password", password.value);

    fetch('/admin/user/' + userId, {
        method: 'POST',
        headers: {
            'Csrf-Token': csrfToken,
        },
        body: formData
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = "/admin/users"
        } else {
            addErrorMsg(data.message, data.input);
        }
    })
    .catch(err => console.log(err));
}

const deleteUser = (userId) => {

    const formData = new URLSearchParams();
    
    formData.append("password", password.value);

    fetch('/admin/delete/' + userId, {
        method: 'DELETE',
        headers: {
            'Csrf-Token': csrfToken,
        },
        body: formData
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = "/admin/users"
        } else {
            addErrorMsg(data.message, data.input);
        }
    })
    .catch(err => console.log(err));
}
