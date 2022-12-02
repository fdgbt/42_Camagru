const email = document.getElementById('email');
const confirmation = document.getElementById('confirmation');
const mailForm = document.getElementById('mailForm');
const error = document.getElementById('error');
const confirmStatus = document.getElementById('confirmStatus');

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

const resetPwd = () => {
    const formData = new URLSearchParams();
    
    formData.append("email", email.value);

    fetch('/login/lost', {
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
            mailForm.classList.add('hidden');
            confirmation.classList.remove('hidden');
        } else {
            addErrorMsg(data.message, data.input);
        }
        
    })
    .catch(err => console.log(err));
}

const reSendConfirm = (success, message) => {

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

const reSendPwdEmail = () => {
    const formData = new URLSearchParams();
    
    formData.append("email", email.value);

    fetch('/login/mail', {
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
        reSendConfirm(data.success, data.message);
    })
    .catch(err => console.log(err));
}
