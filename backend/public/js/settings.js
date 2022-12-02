const deleteButton = document.getElementById('deleteButton');
const confirmButton = document.getElementById('confirmButton');

const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const comsMail = document.getElementById('comsMail');
const likesMail = document.getElementById('likesMail');
const levelsMail = document.getElementById('levelsMail');
const visibility = document.getElementById('visibility');
const currentPassword = document.getElementById('currentPassword');

const error = document.getElementById('error');
const errorBottom = document.getElementById('errorBottom');

const showConfirmButton = () => {
    deleteButton.classList.add('hidden');
    confirmButton.classList.replace('hidden', 'flex');
}

const showDeleteButton = () => {
    deleteButton.classList.remove('hidden');
    confirmButton.classList.replace('flex','hidden');
}

const addErrorMsg = (msg, el) => {

    const input = document.getElementById(el);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(msg);

    email.classList.replace("dark:border-red-700", "dark:border-slate-700");
    email.classList.remove("border-red-600");
    username.classList.replace("dark:border-red-700", "dark:border-slate-700");
    username.classList.remove("border-red-600");
    password.classList.replace("dark:border-red-700", "dark:border-slate-700");
    password.classList.remove("border-red-600");
    comsMail.classList.replace("dark:border-red-700", "dark:border-slate-700");
    comsMail.classList.remove("border-red-600");
    likesMail.classList.replace("dark:border-red-700", "dark:border-slate-700");
    likesMail.classList.remove("border-red-600");
    levelsMail.classList.replace("dark:border-red-700", "dark:border-slate-700");
    levelsMail.classList.remove("border-red-600");
    visibility.classList.replace("dark:border-red-700", "dark:border-slate-700");
    visibility.classList.remove("border-red-600");
    currentPassword.classList.replace("dark:border-red-700", "dark:border-slate-700");
    currentPassword.classList.remove("border-red-600");

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

const setSettings = () => {

    const formData = new URLSearchParams();
    
    formData.append("email", email.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("comsMail", comsMail.value);
    formData.append("likesMail", likesMail.value);
    formData.append("levelsMail", levelsMail.value);
    formData.append("visibility", visibility.value);
    formData.append("currentPassword", currentPassword.value);

    fetch('/settings', {
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
            window.location.href = "/account"
        } else {
            addErrorMsg(data.message, data.input);
        }
            
    })
    .catch(err => console.log(err));
}

const deleteUser = () => {

    const formData = new URLSearchParams();
    
    formData.append("currentPassword", currentPassword.value);

    fetch('/delete/user', {
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
            window.location.href = "/"
        } else {
            addErrorMsg(data.message, data.input);
        }
    })
    .catch(err => console.log(err));
}
