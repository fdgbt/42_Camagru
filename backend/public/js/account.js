const switchModeButton = document.getElementById('switchModeButton');
const resetModeButton = document.getElementById('resetModeButton');

window.onload = () => {
    getActualMode();
}

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", event => {
        if (event.matches) {
            switchButtonDark();
        } else {
            switchButtonLight();
        }
    })

const switchButtonLight = () => {
    switchModeButton.classList.replace('border-amber-500', 'border-indigo-500');
    switchModeButton.classList.replace('hover:bg-amber-400', 'hover:bg-indigo-400');
    switchModeButton.innerHTML = '<i class="fa-solid fa-moon text-xl xl:text-2xl 2xl:text-4xl text-center"> Set the Dark Mode</i>';
}

const switchButtonDark = () => {
    switchModeButton.classList.replace('border-indigo-500', 'border-amber-500');
    switchModeButton.classList.replace('hover:bg-indigo-400', 'hover:bg-amber-400');
    switchModeButton.innerHTML = '<i class="fa-solid fa-sun text-xl xl:text-2xl 2xl:text-4xl text-center"> Set the Light Mode</i>';
}

const getActualMode = () => {
    if ((!('theme' in localStorage) && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage.theme === 'dark') {
        switchModeButton.classList.add('border-amber-500', 'hover:bg-amber-400');
        switchModeButton.innerHTML = '<i class="fa-solid fa-sun text-xl xl:text-2xl 2xl:text-4xl text-center"> Set the Light Mode</i>';
    }
    else {
        switchModeButton.classList.add('border-indigo-500', 'hover:bg-indigo-400');
        switchModeButton.innerHTML = '<i class="fa-solid fa-moon text-xl xl:text-2xl 2xl:text-4xl text-center"> Set the Dark Mode</i>';
    }
    if (localStorage.theme === 'dark' || localStorage.theme === 'light') {
        resetModeButton.classList.remove('hidden');
    }
}

const switchMode = () => {
    switchModeButton.classList.replace('transition-none', 'transition');
    switchModeButton.classList.replace('duration-0', 'duration-200');
    if ((!('theme' in localStorage) && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage.theme === 'dark') {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
        switchButtonLight();
    }
    else {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
        switchButtonDark();
    }
    resetModeButton.classList.remove('hidden');
}

const resetMode = () => {
    localStorage.removeItem('theme');
    resetModeButton.classList.add('hidden');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        switchButtonDark();
    }
    else {
        document.documentElement.classList.remove('dark');
        switchButtonLight();
    }
}
