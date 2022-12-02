const username = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementById('error');

const addErrorMsg = (message, element) => {

    const input = document.getElementById(element);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(message);

    username.classList.replace("dark:border-red-700", "dark:border-slate-700");
    username.classList.remove("border-red-600");
    password.classList.replace("dark:border-red-700", "dark:border-slate-700");
    password.classList.remove("border-red-600");

    input.classList.replace("dark:border-slate-700", "dark:border-red-700");
    input.classList.add("border-red-600");

    if (lastMsg)
        error.removeChild(lastMsg);
    error.append(errMsg);
    error.classList.remove("hidden");
}

const login = () => {
    const formData = new URLSearchParams();
    
    formData.append("username", username.value);
    formData.append("password", password.value);

    fetch('/login', {
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
        if (data.success)
            window.location.href = "/account";
        else
            addErrorMsg(data.message, data.input);
    })
    .catch(err => console.log(err));
}
