const tactileDownHandler = (e) => {

    if (!isMoving) {
        isMoving = true;

        mouseX = e.clientX;
        mouseY = e.clientY;

        document.addEventListener('touchmove', tactileMoveHandler, {passive: true});
        document.addEventListener('touchend', tactileUpHandler, {passive: true});

        sticker.classList.replace('cursor-grab', 'cursor-grabbing');
    }
    stretch.classList.remove('hidden');
    stretch.style.top = `${sticker.offsetTop + sticker.clientHeight - stretch.offsetHeight}px`;
    stretch.style.left = `${sticker.offsetLeft + sticker.clientWidth - stretch.offsetWidth}px`;
}

const tactileMoveHandler = (e) => {
    if (isMoving) {

        const dx = e.targetTouches[0].pageX - mouseX;
        const dy = e.targetTouches[0].pageY - mouseY;

        sticker.style.top = `${sticker.offsetTop + dy}px`;
        sticker.style.left = `${sticker.offsetLeft + dx}px`;

        stretch.style.top = `${sticker.offsetTop + sticker.clientHeight - stretch.offsetHeight}px`;
        stretch.style.left = `${sticker.offsetLeft + sticker.clientWidth - stretch.offsetWidth}px`;

        mouseX = e.targetTouches[0].pageX;
        mouseY = e.targetTouches[0].pageY;
    }
}

const tactileUpHandler = (e) => {
    if (isMoving) {

        document.removeEventListener('touchmove', tactileMoveHandler);
        document.removeEventListener('touchend', tactileUpHandler);
        sticker.classList.replace('cursor-grabbing', 'cursor-grab');
        isMoving = false;
    }
}

const tactileStretchDownHandler = (e) => {
    if (!isMoving) {
        isMoving = true;

        mouseX = e.targetTouches[0].pageX;
        mouseY = e.targetTouches[0].pageY;

        document.addEventListener('touchmove', tactileStretchMoveHandler, {passive: true});
        document.addEventListener('touchend', tactileStretchUpHandler, {passive: true});

        leftPanel.classList.add('cursor-nesw-resize');
        stretch.classList.replace('cursor-pointer', 'cursor-nesw-resize');
        sticker.classList.replace('cursor-grab', 'cursor-nesw-resize');
    }
}

const tactileStretchMoveHandler = (e) => {
    if (isMoving) {
        stretch.classList.add('hidden');

        const dx = e.targetTouches[0].pageX - mouseX;
        const dy = e.targetTouches[0].pageY - mouseY;

        sticker.style.width = `${sticker.offsetWidth - dy + dx}px`;

        mouseX = e.targetTouches[0].pageX;
        mouseY = e.targetTouches[0].pageY;
    }
}

const tactileStretchUpHandler = (e) => {
    if (isMoving) {

        stretch.classList.remove('hidden');
        stretch.style.top = `${sticker.offsetTop + sticker.clientHeight - stretch.offsetHeight}px`;
        stretch.style.left = `${sticker.offsetLeft + sticker.clientWidth - stretch.offsetWidth}px`;

        document.removeEventListener('touchmove', tactileStretchMoveHandler);
        document.removeEventListener('touchend', tactileStretchUpHandler);

        leftPanel.classList.remove('cursor-nesw-resize');
        stretch.classList.replace('cursor-nesw-resize', 'cursor-pointer');
        sticker.classList.replace('cursor-nesw-resize', 'cursor-grab');
        isMoving = false;
    }
}
