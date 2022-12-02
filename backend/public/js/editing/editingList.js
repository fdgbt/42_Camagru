const uploadingPictureList = () => {

    const group = document.createElement("div");

    group.classList.add('w-full', pictureList ? 'xl:w-gap-4' : null, 'relative', 'group', 'flex', 'justify-center');
    group.tabIndex = '0';
    group.id = "uploading";

    const img = document.createElement("img");

    img.classList.add('object-scale-down', 'rounded-xl', 'w-1/2');
    img.src = "/images/icons/loading.webp";
    img.alt = "Uploading...";

    group.append(img);

    if (!pictureList) {
        pictureList = document.createElement("div");
        pictureList.classList.add('flex', 'flex-row', 'flex-wrap', 'gap-4');
        rightPanel.append(pictureList);
    }

    pictureList.insertBefore(group, pictureList.firstChild);

    if (pictureList.childElementCount > 8) {
        pictureList.removeChild(pictureList.lastElementChild);
    }
}

const uploadedPictureList = () => {

    const uploading = document.getElementById('uploading');

        if (uploading)
            uploading.remove();
}

const addPictureList = (picture) => {

    if (noPicture) {
        noPicture.remove();
        noPicture = null;
    }

    if (!seePics) {
        seePics = document.createElement("div");
        seePics.classList.add('flex', 'justify-center', 'text-center', 'items-center', 'w-full', 'mt-4');

        const picsLink = document.createElement("a");
        picsLink.href = "/managing";
        picsLink.classList.add('work-sans', 'transition', 'duration-200', 'w-full', 'sm:w-auto', 'text-gray-700', 'hover:text-slate-100', 'dark:text-violet-500', 'border-violet-500', 'hover:bg-violet-400', 'dark:bg-transparent', 'dark:hover:bg-violet-400', 'dark:hover:text-slate-100', 'hover:shadow-2xl', 'active:shadow-2xl', 'active:translate-y-2', 'border-2', 'rounded-full', 'p-3');
        seePics.append(picsLink);

        const linkText = document.createElement("i");
        linkText.classList.add('fa-solid', 'fa-images', 'text-xl', 'xl:text-2xl', '2xl:text-4xl', 'text-center');
        linkText.append(document.createTextNode(" See all my photos"));
        picsLink.append(linkText);

        rightPanel.append(seePics);
    }

    const group = document.createElement("div");
    group.classList.add('w-full', 'xl:w-gap-4', 'relative', 'group');
    group.tabIndex = '0';

    const buttonBar = document.createElement("div");
    buttonBar.classList.add('bg-gradient-to-t', 'from-gray-700', 'dark:from-[#121212]', 'absolute', 'inset-x-0', 'bottom-0', 'group-hover:flex', 'group-active:flex', 'group-focus:flex', 'group-hover:shadow-2xl', 'group-active:shadow-2xl', 'group-focus:shadow-2xl', 'justify-around', 'rounded-xl', 'hidden');

    const link = document.createElement("a");
    link.href = "/gallery/" + picture.data._id.toString();

    const seePicButton = document.createElement("button");
    seePicButton.classList.add('py-4', 'px-5', 'rounded-full', 'transition', 'duration-200', 'hover:bg-slate-100', 'hover:bg-opacity-30', 'cursor-pointer');
    seePicButton.innerHTML = '&#128064;';

    const deletePicButton = document.createElement("button");
    deletePicButton.classList.add('p-4', 'rounded-full', 'transition', 'duration-200', 'hover:bg-slate-100', 'hover:bg-opacity-30', 'cursor-pointer');
    deletePicButton.onclick = () => deletePicture(deletePicButton, picture.data._id.toString());

    const trash = document.createElement("img");
    trash.src = "/images/icons/trash.svg";
    trash.alt = "trash";
    trash.height = '20';
    trash.width = '24';

    const img = document.createElement("img");
    img.classList.add('object-scale-down', 'rounded-xl');
    img.src = picture.data.imgUrl;
    img.alt = picture.data.title;

    group.append(buttonBar, img);
    buttonBar.append(link);
    link.append(seePicButton);
    buttonBar.append(deletePicButton);
    deletePicButton.append(trash);

    pictureList.insertBefore(group, pictureList.firstChild);

    if (pictureList.childElementCount > 8) {
        pictureList.removeChild(pictureList.lastElementChild);
    }
}

const deletePicture = (btn, pictureId) => {
    fetch('/picture/' + pictureId, {
        method: 'DELETE',
        headers: {
            'Csrf-Token': csrfToken,
        },
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            const pictureGroup = btn.closest('div').parentNode;
            const picList = pictureGroup.parentNode;

            pictureGroup.parentNode.removeChild(pictureGroup);

            if (!picList.childElementCount) {
                seePics.remove();
                seePics = null;

                pictureList.remove();
                pictureList = null;

                const text = document.createElement("h1");
                text.classList.add("work-sans");
                text.innerHTML = "You don't have any photo yet ...";

                noPicture = document.createElement('div');
                noPicture.classList.add('flex', 'justify-center', 'text-center', 'items-center', 'w-full', 'dark:text-slate-100');
                noPicture.append(text);
                rightPanel.append(noPicture);
            }
        })
        .catch(err => console.log(err));
}
