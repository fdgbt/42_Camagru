let pictureList = document.getElementById('pictureList');
let noPicture = document.getElementById('noPicture');

const updatePicList = (btn) => {
    const pictureGroup = btn.closest('div').parentNode;
    const picList = pictureGroup.parentNode;

    pictureGroup.parentNode.removeChild(pictureGroup);

    if (!picList.childElementCount)
    {
        const text = document.createElement("h1");
        text.classList.add("work-sans", "p-8");
        text.innerHTML = "You don't have any photo yet ...";

        const editLink = document.createElement("a");
        editLink.href = "/editing";
        editLink.classList.add('work-sans', 'transition', 'duration-200', 'w-full', 'sm:w-auto', 'text-gray-700', 'hover:text-slate-100', 'dark:text-blue-600', 'border-blue-600', 'hover:bg-blue-500', 'dark:bg-transparent', 'dark:hover:bg-blue-500', 'dark:hover:text-slate-100', 'hover:shadow-2xl', 'active:shadow-2xl', 'active:translate-y-2', 'border-2', 'rounded-full', 'p-3');

        const linkText = document.createElement("i");
        linkText.classList.add('fa-solid', 'fa-camera', 'text-xl', 'xl:text-2xl', '2xl:text-4xl', 'text-center');
        linkText.append(document.createTextNode(" Take a Picture"));
        editLink.append(linkText);

        noPicture = document.createElement('div');
        noPicture.classList.add('flex', 'flex-col', 'justify-center', 'text-center', 'items-center', 'w-full', 'sm:pl-4', 'dark:text-slate-100');
        noPicture.append(text);
        noPicture.append(editLink);

        pictureList.append(noPicture);
    }
};

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
            if (data.success)
                updatePicList(btn);
        })
        .catch(err => console.log(err));
}

const adminDeletePicture = (btn, pictureId) => {
    fetch('/admin/picture/' + pictureId, {
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
                updatePicList(btn);
        })
        .catch(err => console.log(err));
}