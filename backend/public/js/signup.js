const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementById('error');

const addErrorMsg = (message, element) => {

    const input = document.getElementById(element);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(message);

    email.classList.replace("dark:border-red-700", "dark:border-slate-700");
    email.classList.remove("border-red-600");
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

const signup = () => {
    const formData = new URLSearchParams();
    
    formData.append("email", email.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    fetch('/signup', {
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

const reSendConfirm = (success, message) => {

    const confirmStatus = document.getElementById('confirmStatus');

    const lastStatus = confirmStatus.firstChild;
    const msgStatus = document.createTextNode(message);

    if (success)
        confirmStatus.classList.replace("text-red-600", "text-green-600")
    else
        confirmStatus.classList.replace("text-green-600", "text-red-600")

    if (lastStatus)
        confirmStatus.removeChild(lastStatus);

    confirmStatus.append(msgStatus);
    confirmStatus.classList.remove("hidden");
}

const reSendActivationEmail = () => {
    fetch('/signup/mail', {
        method: 'POST',
        headers: {
            'Csrf-Token': csrfToken,
        },
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            reSendConfirm(data.success, data.message);
        })
        .catch(err => console.log(err));
}
