const password = document.getElementById('password');
const token = document.getElementById('token');
const error = document.getElementById('error');

const addErrorMsg = (message, element) => {

    const input = document.getElementById(element);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(message);

    input.classList.replace("dark:border-slate-700", "dark:border-red-700");
    input.classList.add("border-red-600");

    if (lastMsg)
        error.removeChild(lastMsg);

    error.append(errMsg);
    error.classList.remove("hidden");
}

const newPwd = () => {
    const formData = new URLSearchParams();
    
    formData.append("token", token.value);
    formData.append("password", password.value);

    fetch('/login/reset', {
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
            window.location.href = "/account";
        } else {
            addErrorMsg(data.message, data.input);
        }
    })
    .catch(err => console.log(err));
}
