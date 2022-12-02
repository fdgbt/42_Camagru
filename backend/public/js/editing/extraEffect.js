const setExtraSelect = (btn) => {

    if (usrVideo.srcObject) {
        shoot.classList.remove('hidden');
    } else {
        upload.classList.remove('hidden');
    }

    effectList.classList.add('hidden');
    extraEffectList.classList.add('hidden');
    cancelEffect.classList.add('hidden');
    cancelMore.classList.add('hidden');
    cancelActual.classList.remove('hidden');

    if (bodyEffects.length < 10) {
        moreEffectButton.classList.remove('hidden');
    }

    filter.classList.add('h-full');
    filter.src = btn.value;

    const newEffect = setNewEffect(2);

    bodyEffects.push(newEffect);
}

const setSpecialButton = () => {

    effectList.classList.add('hidden');
    extraEffectList.classList.add('hidden');
    specialEffectList.classList.remove('hidden');

    cancelMore.classList.add('hidden');
    cancelSpecial.classList.remove('hidden');
}

const cancelSpecialButton = () => {

    effectList.classList.remove('hidden');
    extraEffectList.classList.remove('hidden');
    specialEffectList.classList.add('hidden');

    cancelMore.classList.remove('hidden');
    cancelSpecial.classList.add('hidden');
}

const setSpecialSelect = (btn) => {

    if (usrVideo.srcObject) {
        shoot.classList.remove('hidden');
    }
    else {
        upload.classList.remove('hidden');
    }

    specialEffectList.classList.add('hidden');
    cancelSpecial.classList.add('hidden');

    if (bodyEffects.length < 10) {
        moreEffectButton.classList.remove('hidden');
    }

    cancelActual.classList.remove('hidden');

    specialInput.value = btn.value;

    const newEffect = setNewEffect(3);

    bodyEffects.push(newEffect);
}

