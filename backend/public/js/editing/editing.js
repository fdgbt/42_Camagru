const usrVideo = document.getElementById('userVideo');

const canvasList = document.getElementById('canvasList');
const canvas = document.getElementById('canvasVideo');
const filter = document.getElementById('canvasFilter');
let   sticker = document.getElementById('canvasSticker');
const stretch = document.getElementById('stretchSticker');

const effects = document.getElementById('effects');
const extraEffects = document.getElementById('extraEffects');
const specialEffects = document.getElementById('jimpEffects');

const effectList = document.getElementById('effectList');
const extraEffectList = document.getElementById('extraEffectList');
const specialEffectList = document.getElementById('jimpEffectList');

const moreEffectButton = document.getElementById('moreEffect');
const specialInput = document.getElementById('specialInput');

const cancelEffect = document.getElementById('cancelEffect');
const cancelSpecial = document.getElementById('cancelSpecial');
const cancelActual = document.getElementById('cancelActual');
const cancelMore = document.getElementById('cancelMore');

const enableCam = document.getElementById('enableVideo');
const disableCam = document.getElementById('disableVideo');
const errorCam = document.getElementById('errorCam');

const shoot = document.getElementById('takePhoto');
const upload = document.getElementById('upload');

const uploadImage = document.getElementById('uploadImage');
const cancelUpload = document.getElementById('cancelUpload');

const uploadLocal = document.getElementById('uploadLocal');
const uploadWeb = document.getElementById('uploadWeb');
const uploadLink = document.getElementById('uploadLink');

const uploadInput = document.getElementById('uploadInput');
const linkInput = document.getElementById('linkInput');

const rightPanel = document.getElementById('rightPanel');
const leftPanel = document.getElementById('leftPanel');

let seePics = document.getElementById('seePics');
let pictureList = document.getElementById('pictureList');
let noPicture = document.getElementById('noPicture');

const bodyEffects = [];
let   extraEnabled = false;

window.onload = () => {
    stretch.addEventListener('mousedown', stretchDownHandler);
    stretch.addEventListener('touchstart', tactileStretchDownHandler, {passive: true});

    effects.getElementsByTagName('option')[0].selected = 'selected';
    extraEffects.getElementsByTagName('option')[0].selected = 'selected';
    specialEffects.getElementsByTagName('option')[0].selected = 'selected';
    uploadInput.value = "";
    linkInput.value = "";
}

window.onbeforeunload = () => {
    if (usrVideo.srcObject) {
        usrVideo.pause();
        usrVideo.srcObject = null;
    }
};