const likeNumber = document.getElementById('likeNumber');
const commentNumber = document.getElementById('commentNumber');
const commentList = document.getElementById('commentList');
const commentMsg = document.getElementById('commentMsg');
let   noComment = document.getElementById('noComment');
const error = document.getElementById('error');

const addErrorMsg = (msg, el) => {

    const input = document.getElementById(el);
    const lastMsg = error.firstChild;
    const errMsg = document.createTextNode(msg);

    input.classList.replace("dark:border-slate-700", "dark:border-red-700");
    input.classList.add("border-red-600");

    if (lastMsg)
        error.removeChild(lastMsg);
    error.append(errMsg);
    error.classList.remove("hidden");
}

const like = (btn, picId) => {

    fetch('/like/' + picId, {
        method: 'PUT',
        headers: {
            'Csrf-Token': csrfToken,
            'Content-Type': 'application/json',
        },
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            if (data.success) {
                if (btn.classList.contains('bg-green-400')) {
                    btn.classList.remove('bg-green-400', 'bg-opacity-50', 'hover:bg-green-400');
                    btn.classList.add('hover:bg-slate-100', 'hover:bg-opacity-30');
                } else {
                    btn.classList.remove('hover:bg-slate-100', 'hover:bg-opacity-30');
                    btn.classList.add('bg-green-400', 'bg-opacity-50', 'hover:bg-green-400');
                }
    
                if (data.likes > 1)
                    likeNumber.textContent = data.likes + ' Likes';
                else
                    likeNumber.textContent = data.likes + ' Like';
            }
        })
        .catch(err => console.log(err));
}

const comment = () => {
    commentMsg.focus();
}

const updateCommentListNew = (picId, data) => {
    commentMsg.value = '';

    if (noComment) {
        noComment.remove();
    }

    const initDiv = document.createElement("div");
    const comDiv = document.createElement("div");
    const ownerName = document.createElement("a");
    const comContent = document.createElement("p");
    const deleteCom = document.createElement("button");

    comDiv.classList.add('group', 'flex', 'gap-2', 'justify-center');
    ownerName.classList.add('cursor-pointer', 'text-gray-700', 'hover:text-black', 'dark:hover:text-slate-100');
    comContent.classList.add('dark:text-slate-100');
    deleteCom.classList.add('group-hover:flex', 'group-active:flex', 'group-focus:flex', 'items-center', 'hidden');

    comDiv.tabIndex = '0';
    ownerName.href = "/gallery/user/" + data.comment.username;
    ownerName.append(document.createTextNode(data.comment.username));
    comContent.append(document.createTextNode(data.comment.text));
    deleteCom.onclick = () => deleteComment(deleteCom, picId, data.comment._id.toString());
    deleteCom.innerHTML = '&#10060';

    comDiv.append(comContent, deleteCom);
    initDiv.append(ownerName, comDiv);
    commentList.appendChild(initDiv)

    if (data.comments.length > 1)
        commentNumber.textContent = data.comments.length + ' Comments';
    else
        commentNumber.textContent = data.comments.length + ' Comment';
}

const submitComment = (picId) => {

    if (commentMsg.value) {

        const formData = new URLSearchParams();

        formData.append("commentMsg", commentMsg.value.toString());

        fetch('/comment/' + picId, {
            method: 'PUT',
            headers: {
                'Csrf-Token': csrfToken,
            },
            body: formData
        })
            .then(result => {
                return result.json();
            })
            .then(data => {
                if (data.success) {
                    updateCommentListNew(picId, data);
                    error.classList.add('hidden');
                    commentMsg.classList.replace("dark:border-red-700", "dark:border-slate-700");
                    commentMsg.classList.remove("border-red-600");
                }
                else {
                    addErrorMsg(data.message, data.input);
                }
            })
            .catch(err => console.log(err));
    }
}

const updateCommentListDel = (btn, data) => {
    const commentGroup = btn.closest('div').parentNode;

    commentGroup.parentNode.removeChild(commentGroup);

    if (!commentList.childElementCount) {
        const noComText = document.createElement("p");
        noComText.classList.add('dark:text-slate-100');
        noComText.innerHTML = "There is no comment yet ...";
        noComText.id = "noComment";
        commentList.append(noComText);
        noComment = noComText;
    }

    if (data.comments.length > 1)
        commentNumber.textContent = data.comments.length + ' Comments';
    else
        commentNumber.textContent = data.comments.length + ' Comment';
}

const deleteComment = (btn, picId, comId) => {
    const formData = new URLSearchParams();

    formData.append("comId", comId);

    fetch('/comment/' + picId, {
        method: 'DELETE',
        headers: {
            'Csrf-Token': csrfToken,
        },
        body: formData
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            if (data.success)
                updateCommentListDel(btn, data);
        })
        .catch(err => console.log(err));
}

const adminDeleteComment = (btn, picId, comId) => {
    const formData = new URLSearchParams();
    
    formData.append("comId", comId);

    fetch('/admin/comment/' + picId, {
        method: 'DELETE',
        headers: {
            'Csrf-Token': csrfToken,
        },
        body: formData
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            updateCommentListDel(btn, data);
        })
        .catch(err => console.log(err));
}