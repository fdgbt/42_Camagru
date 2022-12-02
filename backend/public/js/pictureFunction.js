const like = (btn, auth, picId) => {
    if (auth) {
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
                }
            })
            .catch(err => console.log(err));
    }
    else {
        window.location.href = "/login";
    }
}

const comment = (auth, pic) => {
    if (auth) {
        window.location.href = "/gallery/" + pic;
    }
    else {
        window.location.href = "/login";
    }
}