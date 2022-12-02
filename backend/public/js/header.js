const csrfToken = document.getElementById('csrf')['value'];
const mobileNav = document.getElementById('mobileNav');

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    })

const toggleMobileNav = () => {
    if (mobileNav.classList.contains('hidden')) {
        mobileNav.classList.replace('hidden', 'flex');
    } else {
        mobileNav.classList.replace('flex', 'hidden');
    }
}

const logout = () => {
    
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Csrf-Token': csrfToken,
        },
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        window.location.href = "/";
    })
    .catch(err => console.log(err));
}
