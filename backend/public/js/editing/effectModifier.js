let isMoving = false;
let mouseX = 0;
let mouseY = 0;

const mouseDownHandler = (e) => {
    if (!isMoving) {
        isMoving = true;

        mouseX = e.clientX;
        mouseY = e.clientY;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        sticker.classList.replace('cursor-grab', 'cursor-grabbing');
    }
    stretch.classList.remove('hidden');
    stretch.style.top = `${sticker.offsetTop + sticker.clientHeight - stretch.offsetHeight}px`;
    stretch.style.left = `${sticker.offsetLeft + sticker.clientWidth - stretch.offsetWidth}px`;
}

const mouseMoveHandler = (e) => {
    if (isMoving) {

        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;

        sticker.style.top = `${sticker.offsetTop + dy}px`;
        sticker.style.left = `${sticker.offsetLeft + dx}px`;

        stretch.style.top = `${sticker.offsetTop + sticker.clientHeight - stretch.offsetHeight}px`;
        stretch.style.left = `${sticker.offsetLeft + sticker.clientWidth - stretch.offsetWidth}px`;

        mouseX = e.clientX;
        mouseY = e.clientY;
    }
}

const mouseUpHandler = (e) => {
    if (isMoving) {

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        sticker.classList.replace('cursor-grabbing', 'cursor-grab');
        isMoving = false;
    }
}

const stretchDownHandler = (e) => {
    if (!isMoving) {
        isMoving = true;

        mouseX = e.clientX;
        mouseY = e.clientY;

        document.addEventListener('mousemove', stretchMoveHandler);
        document.addEventListener('mouseup', stretchUpHandler);

        leftPanel.classList.add('cursor-nesw-resize');
        stretch.classList.replace('cursor-pointer', 'cursor-nesw-resize');
        sticker.classList.replace('cursor-grab', 'cursor-nesw-resize');
    }
}

const stretchMoveHandler = (e) => {
    if (isMoving) {
        stretch.classList.add('hidden');

        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;

        sticker.style.width = `${sticker.offsetWidth - dy + dx}px`;

        mouseX = e.clientX;
        mouseY = e.clientY;
    }
}

const stretchUpHandler = (e) => {
    if (isMoving) {

        stretch.classList.remove('hidden');
        stretch.style.top = `${sticker.offsetTop + sticker.clientHeight - stretch.offsetHeight}px`;
        stretch.style.left = `${sticker.offsetLeft + sticker.clientWidth - stretch.offsetWidth}px`;

        document.removeEventListener('mousemove', stretchMoveHandler);
        document.removeEventListener('mouseup', stretchUpHandler);

        leftPanel.classList.remove('cursor-nesw-resize');
        stretch.classList.replace('cursor-nesw-resize', 'cursor-pointer');
        sticker.classList.replace('cursor-nesw-resize', 'cursor-grab');
        isMoving = false;
    }
}
