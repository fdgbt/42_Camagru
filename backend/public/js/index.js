const container = document.getElementById('container');
const picList = document.getElementById('picList');

const loadMoreDiv = document.getElementById('loadMoreDiv');
const loadMoreButton = document.getElementById('loadMoreButton');
const loadingAnim = document.getElementById('loadingAnim');

const addPicsList = (pics, auth, user) => {

    pics.reverse();

    for (let picture of pics) {
        const group = document.createElement("div");
        group.classList.add('basis-full', 'md:basis-[32.5%]', 'grow', 'flex', 'justify-center', 'relative', 'group');
        group.tabIndex = '0';

        const containerBar = document.createElement("div");
        containerBar.classList.add('w-fit', 'hover:shadow-2xl', 'active:shadow-2xl', 'focus:shadow-2xl');

        const buttonBar = document.createElement("div");
        buttonBar.classList.add('bg-gradient-to-r', 'from-gray-700', 'dark:from-[#121212]', 'absolute', 'inset-y-0', 'left-auto', 'group-hover:flex', 'group-active:flex', 'group-focus:flex', 'flex-col', 'justify-around', 'rounded-xl', 'hidden');

        const likeButton = document.createElement("button");
        if (user && picture.likes.find( (like) => { return (like.toString() === user.toString()) } )) {
            likeButton.classList.add('p-4', 'rounded-full', 'transition', 'duration-200', 'bg-green-400', 'bg-opacity-50', 'hover:bg-green-400', 'cursor-pointer');
        } else {
            likeButton.classList.add('p-4', 'rounded-full', 'transition', 'duration-200', 'hover:bg-slate-100', 'hover:bg-opacity-30', 'cursor-pointer');
        }
        likeButton.innerHTML = '&#10084;&#65039;';
        likeButton.onclick = () => like(likeButton, auth, picture._id.toString());

        const commentButton = document.createElement("button");
        commentButton.classList.add('p-4', 'rounded-full', 'transition', 'duration-200', 'hover:bg-slate-100', 'hover:bg-opacity-30', 'cursor-pointer');
        commentButton.innerHTML = '&#128172;';
        commentButton.onclick = () => comment(auth, picture._id.toString());

        const img = document.createElement("img");
        img.classList.add('object-scale-down', 'rounded-xl');
        img.src = picture.imgUrl;
        img.alt = picture.title;

        group.append(containerBar);
        containerBar.append(buttonBar, img);
        buttonBar.append(likeButton, commentButton);

        picList.insertBefore(group, picList.firstChild);
    }
}

const loadMorePics = async () => {
    loadMoreButton.classList.add('hidden');
    loadingAnim.classList.remove('hidden');

    page++;

    setTimeout(async () => {
        fetch('/gallery/page/' + page, {
            method: 'PATCH',
            headers: {
                'Csrf-Token': csrfToken,
            },
        })
            .then(result => {
                return result.json();
            })
            .then(data => {
                addPicsList(data.pictures, data.auth, data.user);
                if (data.pictures.length > 0) {
                    loadMoreButton.classList.remove('hidden');
                }
                loadingAnim.classList.add('hidden');
            })
            .catch((err) => {
                page--;
                console.log(err);
            });
    }, 500);
}

if (!loadMoreDiv.classList.contains('hidden')) {
    container.onscroll = async () => {
        if (container.scrollHeight === container.scrollTop + container.clientHeight) {
            loadMorePics();
        }
    };
}

let page = 1;
