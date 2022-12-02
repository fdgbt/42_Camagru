const setNewEffect = (type) => {

    let effectType;
    let effectValue;

    if (type === 1) {
        effectType = 1;
        effectValue = sticker.src
    } else if (type === 2) {
        effectType = 2;
        effectValue = filter.src
        extraEnabled = true;
    } else if (type === 3) {
        effectType = +specialInput.value;
        effectValue = +specialInput.value;
        extraEnabled = true;
    }

    const effect = {
        'type': effectType,
        'value': effectValue,
        'offsetX': 0,
        'offsetY': 0,
        'offsetW': 0,
        'camHeight': usrVideo.offsetHeight,
        'camWidth': usrVideo.offsetWidth,
    }

    return effect;
}

const updateEffect = () => {

    const actualEffect = bodyEffects[bodyEffects.length - 1];

    let offsetX = 0;
    let offsetY = 0;
    let offsetW = 0;

    if (actualEffect.type === 1) {
        offsetX = sticker.offsetLeft;
        offsetY = sticker.offsetTop;
        offsetW = sticker.offsetWidth;
    }

    const updatedEffect = {
        'type': actualEffect.type,
        'value': actualEffect.value,
        'offsetX': offsetX,
        'offsetY': offsetY,
        'offsetW': offsetW,
        'camHeight': usrVideo.offsetHeight,
        'camWidth': usrVideo.offsetWidth,
    }

    bodyEffects.pop();
    bodyEffects.push(updatedEffect);
}

const resetEffect = () => {

    sticker.src = "";
    sticker.style.top = 0;
    sticker.style.left = 0;
    sticker.style.width = '25%';
    filter.src = "";
    specialInput.value = "";
}

const resetAllEffects = () => {

    effectList.classList.remove('hidden');
    cancelEffect.classList.add('hidden');
    cancelActual.classList.add('hidden');
    moreEffectButton.classList.add('hidden');
    filter.classList.remove('h-full');
    stretch.classList.add('hidden');

    let stickerLength = bodyEffects.length;

    for (let i = 1; i < stickerLength; i++) {
        sticker = document.getElementById("canvasSticker" + i.toString());
        if (sticker) {
            canvasList.removeChild(sticker);
        }
    }

    sticker = document.getElementById("canvasSticker");
    resetEffect();
    extraEnabled = false;

    effects.getElementsByTagName('option')[0].selected = 'selected';
    extraEffects.getElementsByTagName('option')[0].selected = 'selected';
    specialEffects.getElementsByTagName('option')[0].selected = 'selected';
}

const setEffectSelect = (btn) => {

    if (usrVideo.srcObject) {
        disableCam.classList.add('hidden');
        shoot.classList.remove('hidden');
    }
    else {
        cancelUpload.classList.add('hidden');
        upload.classList.remove('hidden');
    }

    effectList.classList.add('hidden');
    extraEffectList.classList.add('hidden');
    cancelMore.classList.add('hidden');

    if (bodyEffects.length < 10) {
        moreEffectButton.classList.remove('hidden');
    }

    if (bodyEffects.length < 1) {

        sticker.addEventListener('mousedown', mouseDownHandler);
        sticker.addEventListener('touchstart', tactileDownHandler, {passive: true});
        sticker.classList.replace('default', 'cursor-grab');
        sticker.src = btn.value;
        sticker.classList.replace('z-10', 'z-20');

        cancelEffect.classList.remove('hidden');

    } else {
        const newMask = document.createElement("img");

        newMask.classList.add('absolute', 'z-20', 'w-1/4', 'bg-transparent', 'cursor-grab');
        newMask.draggable = false;
        newMask.id = "canvasSticker" + bodyEffects.length.toString();
        newMask.src = btn.value;
        newMask.style.top = 0;
        newMask.style.left = 0;
        newMask.style.width = '25%';
        newMask.addEventListener('mousedown', mouseDownHandler);
        newMask.addEventListener('touchstart', tactileDownHandler, {passive: true});

        canvasList.appendChild(newMask);
        sticker = newMask;

        cancelActual.classList.remove('hidden');
    }

    const newEffect = setNewEffect(1);

    bodyEffects.push(newEffect);
}

const cancelEffectButton = () => {

    if (usrVideo.srcObject) {
        disableCam.classList.remove('hidden');
        shoot.classList.add('hidden');
    }
    else {
        cancelUpload.classList.remove('hidden');
        upload.classList.add('hidden');
    }

    effectList.classList.remove('hidden');
    cancelEffect.classList.add('hidden');
    moreEffectButton.classList.add('hidden');
    stretch.classList.add('hidden');

    resetEffect();

    effects.getElementsByTagName('option')[0].selected = 'selected';
    bodyEffects.pop();
}
