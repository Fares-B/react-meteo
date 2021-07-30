export const toggleBodyClasses = (isDarkMode: boolean): void => {
    if (isDarkMode) {
        // here's a good place to add a dark-mode css classes to our <body> and remove light mode
        document.body.classList.add('bg-dark', 'text-light');
        document.body.classList.remove('bg-light', 'text-dark');
    } else {
        // remove the dark mode classes, add light mode
        document.body.classList.add('bg-light', 'text-dark');
        document.body.classList.remove('bg-dark', 'text-light');
    }
}


