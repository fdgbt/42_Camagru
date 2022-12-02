const title = document.getElementById('title');
const desc = document.getElementById('description');
const visibility = document.getElementById('visibility');

const addErrorMsg = (message, element) => {

    const input = document.getElementById(element);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(message);

    title.classList.replace("dark:border-red-700", "dark:border-slate-700");
    title.classList.remove("border-red-600");
    desc.classList.replace("dark:border-red-700", "dark:border-slate-700");
    desc.classList.remove("border-red-600");
    visibility.classList.replace("dark:border-red-700", "dark:border-slate-700");
    visibility.classList.remove("border-red-600");

    input.classList.replace("dark:border-slate-700", "dark:border-red-700");
    input.classList.add("border-red-600");

    if (lastMsg)
        error.removeChild(lastMsg);
    error.append(errMsg);
    error.classList.remove("hidden");
}

const setPicSettings = (admin, pictureId) => {
    const formData = new URLSearchParams();

    formData.append("title", title.value.toString());
    formData.append("description", desc.value.toString());
    formData.append("visibility", visibility.value);

    fetch(admin + '/managing/' + pictureId, {
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
                window.location.href = admin + '/gallery/' + pictureId;
            else
                addErrorMsg(data.message, data.input);
        })
        .catch(err => console.log(err));
}

const deletePicture = (admin, pictureId) => {

    fetch(admin + '/picture/' + pictureId, {
        method: 'DELETE',
        headers: {
            'Csrf-Token': csrfToken,
        },
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            if (data.success)
                window.location.href = admin + '/managing';
            else
                addErrorMsg(data.message, data.input);
        })
        .catch(err => console.log(err));
}
