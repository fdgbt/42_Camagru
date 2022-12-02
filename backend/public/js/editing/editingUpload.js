const uploadPhotoButton = () => {

    enableCam.classList.add('hidden');
    uploadImage.classList.add('hidden');
    uploadLocal.classList.remove('hidden');
    uploadWeb.classList.remove('hidden');
}

const cancelFileButton = () => {

    uploadLocal.classList.add('hidden');
    uploadWeb.classList.add('hidden');
    enableCam.classList.remove('hidden');
    uploadImage.classList.remove('hidden');
}

const fileButtonClick = () => {

    linkInput.value = "";
    if (!uploadInput.value.length) {
        cancelFileButton();
    }
}

const fileButtonChange = () => {

    if (uploadInput.value.length > 0) {
        usrVideo.classList.remove('border');
        uploadLocal.classList.add('hidden');
        uploadWeb.classList.add('hidden');
        enableCam.classList.add('hidden');
        uploadImage.classList.add('hidden');
        effectList.classList.remove('hidden');
        cancelUpload.classList.remove('hidden');

        usrVideo.poster = URL.createObjectURL(uploadInput.files[0]);
    }
}

const webButton = () => {

    uploadLocal.classList.add('hidden');
    uploadWeb.classList.add('hidden');
    uploadLink.classList.remove('hidden');

    uploadInput.value = "";
}

const linkButton = () => {

    const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)?/gi;
    let regex = new RegExp(urlExpression);

    if (linkInput.value.match(regex)) {

        if (linkInput.value.match(/\.(jpeg|jpg|png)$/)) {

            const img = new Image();
            img.onerror = img.onabort = () => {
                alert("The link does not lead to a valid image.");
            };

            img.onload = () => {
                usrVideo.poster = linkInput.value;
                usrVideo.classList.remove('border');
                uploadLink.classList.add('hidden');
                effectList.classList.remove('hidden');
                cancelUpload.classList.remove('hidden');
            };

            img.src = linkInput.value;
        } else {
            alert("Only the following formats are accepted: jpeg, jpg, png.");
        }
    } else {
        alert("Enter a valid URL.");
    }
}

const cancelLinkButton = () => {

    uploadLink.classList.add('hidden');
    enableCam.classList.remove('hidden');
    uploadImage.classList.remove('hidden');
}

const cancelUploadButton = () => {

    usrVideo.poster = "/images/errors/nosignal.png";
    uploadInput.value = "";
    linkInput.value = "";
    specialInput.value = "";
    resetEffect();
    effects.getElementsByTagName('option')[0].selected = 'selected';
    effectList.classList.add('hidden');
    cancelUpload.classList.add('hidden');
    enableCam.classList.remove('hidden');
    uploadImage.classList.remove('hidden');
    usrVideo.classList.add('border');
}

const uploadButton = () => {

    uploadingPictureList();
    updateEffect();

    upload.classList.add('hidden');
    cancelUpload.classList.remove('hidden');

    resetAllEffects();

    const controller = new AbortController();
    const timeOut = setTimeout(() => controller.abort(), 45000);

    if (uploadInput.value) {

        const formData = new FormData(uploadLocal);

        const formEffect = JSON.stringify({
            effects: bodyEffects
        });

        formData.append(`formEffect`, formEffect);

        fetch('/editing/file', {
            signal: controller.signal,
            method: 'POST',
            headers: {
                'Csrf-Token': csrfToken,
            },
            body: formData
        })
            .then(result => {
                clearTimeout(timeOut);
                return result.json();
            })
            .then(data => {
                uploadedPictureList();
                if (data.success === true) {
                    addPictureList(data);
                }
            })
            .catch(err => console.log(err));

    } else {

        const formData = new URLSearchParams();

        const formEffect = JSON.stringify({
            effects: bodyEffects
        });

        formData.append("linkInput", linkInput.value);
        formData.append(`formEffect`, formEffect);

        fetch('/editing/link', {
            signal: controller.signal,
            method: 'POST',
            headers: {
                'Csrf-Token': csrfToken,
                'content-type': "application/x-www-form-urlencoded"
            },
            body: formData
        })
            .then(result => {
                clearTimeout(timeOut);
                return result.json();
            })
            .then(data => {
                uploadedPictureList();
                if (data.success === true) {
                    addPictureList(data);
                }
            })
            .catch(err => console.log(err));
    }
    bodyEffects.length = 0;
}
