const form = document.getElementById('form');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const finish = document.getElementById('finish');
const error = document.getElementById('error');

const addErrorMsg = (msg, el) => {

    const input = document.getElementById(el);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(msg);

    email.classList.replace("dark:border-red-700", "dark:border-slate-700");
    email.classList.remove("border-red-600");
    subject.classList.replace("dark:border-red-700", "dark:border-slate-700");
    subject.classList.remove("border-red-600");
    message.classList.replace("dark:border-red-700", "dark:border-slate-700");
    message.classList.remove("border-red-600");

    input.classList.replace("dark:border-slate-700", "dark:border-red-700");
    input.classList.add("border-red-600");

    if (lastMsg)
        error.removeChild(lastMsg);
    error.append(errMsg);
    error.classList.remove("hidden");
}

const sendMessage = () => {

    const formData = new URLSearchParams();

    formData.append("email", email.value);
    formData.append("subject", subject.value);
    formData.append("message", message.value);

    fetch('/contact', {
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
                error.classList.add("hidden");
                form.classList.add('hidden');
                finish.classList.replace('hidden', 'flex');
            } else {
                addErrorMsg(data.message, data.input);
            }
        })
        .catch(err => console.log(err));
}
