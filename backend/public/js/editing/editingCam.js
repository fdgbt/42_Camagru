const enableCamButton = () => {

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: { min: 1280, ideal: 1280, max: 1280 },
                    height: { min: 720, ideal: 720, max: 720 },
                    facingMode: 'user'
                }
            })
            .then(stream => {

                usrVideo.srcObject = stream;
                usrVideo.classList.remove('border');

                disableCam.classList.remove('hidden');
                effectList.classList.remove('hidden');

                enableCam.classList.add('hidden');
                uploadImage.classList.add('hidden');
                errorCam.innerHTML = '';
            })
            .catch(err => {
                enableCam.innerHTML = '<i class="fa-solid fa-video-slash text-xl lg:text-2xl xl:text-4xl"> NO Camera</i>';
                enableCam.classList.replace('cursor-progress', 'cursor-not-allowed');
                enableCam.classList.replace('text-gray-700', 'text-red-700');
                enableCam.classList.replace('border-green-600', 'border-red-600');
                enableCam.classList.replace('hover:bg-green-500', 'hover:bg-transparent');
                enableCam.classList.replace('dark:hover:bg-green-500', 'dark:hover:bg-transparent');
                enableCam.classList.replace('dark:text-green-600', 'dark:text-red-700');
                enableCam.classList.remove('active:translate-y-2', 'hover:text-slate-100', 'dark:hover:text-slate-100');
                errorCam.innerHTML = 'Camera Error - ' + err;
            })
    }
};

const disableCamButton = () => {

    usrVideo.pause();
    usrVideo.srcObject = null;

    usrVideo.classList.add('border');
    disableCam.classList.add('hidden');
    effectList.classList.add('hidden');
    shoot.classList.add('hidden');

    enableCam.classList.remove('hidden');
    uploadImage.classList.remove('hidden');
}

const shootButton = () => {

    canvas.setAttribute('width', usrVideo.videoWidth);
    canvas.setAttribute('height', usrVideo.videoHeight);
    canvas.getContext('2d').drawImage(usrVideo, 0, 0, usrVideo.videoWidth, usrVideo.videoHeight);

    const image_data_url = canvas.toDataURL('image/png');

    uploadingPictureList();
    updateEffect();

    shoot.classList.add('hidden');
    disableCam.classList.remove('hidden');

    resetAllEffects();

    const body = JSON.stringify({
        imgDataUrl: image_data_url,
        effects: bodyEffects
    });

    const controller = new AbortController();
    const timeOut = setTimeout(() => controller.abort(), 45000);

    fetch('/editing/cam', {
        signal: controller.signal,
        method: 'POST',
        headers: {
            'Csrf-Token': csrfToken,
            'content-type': 'application/octet-stream',
        },
        body: body,

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
        .catch(err => {
            uploadedPictureList();
            console.log(err)
        });

    bodyEffects.length = 0;
}
