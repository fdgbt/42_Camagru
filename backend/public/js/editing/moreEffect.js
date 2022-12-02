const setMoreEffectButton = () => {

    updateEffect();

    effects.getElementsByTagName('option')[0].selected = 'selected';
    extraEffects.getElementsByTagName('option')[0].selected = 'selected';
    specialEffects.getElementsByTagName('option')[0].selected = 'selected';

    shoot.classList.add('hidden');
    upload.classList.add('hidden');
    cancelEffect.classList.add('hidden');
    cancelActual.classList.add('hidden');
    moreEffectButton.classList.add('hidden');
    cancelMore.classList.remove('hidden');
    stretch.classList.add('hidden');

    if ((!extraEnabled && bodyEffects.length < 10) || (extraEnabled && bodyEffects.length < 11)) {
        effectList.classList.remove('hidden');
    }

    if (!extraEnabled) {
        extraEffectList.classList.remove('hidden');
    }

    sticker.removeEventListener('mousedown', mouseDownHandler);
    sticker.removeEventListener('touchstart', tactileDownHandler);
    sticker.classList.replace('cursor-grab', 'default');
    sticker.classList.replace('z-20', 'z-10');
}

const cancelMoreButton = () => {

    if (bodyEffects[bodyEffects.length - 1].type === 1) {

        sticker.addEventListener('mousedown', mouseDownHandler);
        sticker.addEventListener('touchstart', tactileDownHandler, {passive: true});
        sticker.classList.replace('default', 'cursor-grab');
        sticker.classList.replace('z-10', 'z-20');

    }

    if (usrVideo.srcObject) {
        shoot.classList.remove('hidden');
    }
    else {
        upload.classList.remove('hidden');
    }

    if (bodyEffects.length > 1) {
        cancelActual.classList.remove('hidden');
    } else {
        cancelEffect.classList.remove('hidden');
    }

    effectList.classList.add('hidden');
    extraEffectList.classList.add('hidden');
    cancelMore.classList.add('hidden');
    moreEffectButton.classList.remove('hidden');
}

const cancelActualButton = () => {

    if (bodyEffects[bodyEffects.length - 1].type === 1) {

        canvasList.removeChild(sticker);
        bodyEffects.pop();

        if (bodyEffects.length > 1 && bodyEffects[bodyEffects.length - 1].type === 1) {
            sticker = document.getElementById('canvasSticker' + (bodyEffects.length - 1).toString());
        } else if (bodyEffects.length > 2) {
            sticker = document.getElementById('canvasSticker' + (bodyEffects.length - 2).toString());
        } else {
            sticker = document.getElementById('canvasSticker');
        }

    } else if (bodyEffects[bodyEffects.length - 1].type === 2) {

        bodyEffects.pop();
        filter.classList.remove('h-full');
        filter.src = "";
        extraEnabled = false;

    } else if (bodyEffects[bodyEffects.length - 1].type > 2 && bodyEffects[bodyEffects.length - 1].type <= 10) {

        bodyEffects.pop();
        specialInput.value = "";
        extraEnabled = false;

    }

    if (bodyEffects.length === 1 || bodyEffects.length > 1 && bodyEffects[bodyEffects.length - 1].type === 1) {
        sticker.addEventListener('mousedown', mouseDownHandler);
        sticker.addEventListener('touchstart', tactileDownHandler, {passive: true});
        sticker.classList.replace('default', 'cursor-grab');
        sticker.classList.replace('z-10', 'z-20');
    }

    stretch.classList.add('hidden');
    moreEffectButton.classList.remove('hidden');

    if (bodyEffects.length <= 1) {
        cancelActual.classList.add('hidden');
        cancelEffect.classList.remove('hidden');
    }
}
