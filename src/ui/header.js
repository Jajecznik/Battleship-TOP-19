// Return the header component
const headerComponent = () => {
    const headerElement = createHeaderElement();
    const headerTitle = createHeaderTitle();

    headerElement.appendChild(headerTitle);

    return headerElement;
};

// Create the header container
const createHeaderElement = () => {
    const headerElement = document.createElement('div');
    headerElement.classList.add(
        'w-full',
        'h-auto',
        'py-4',
        'px-6',
        'flex',
        'justify-center',
        'items-center',
        'bg-orange-300',
        'rounded-b-lg'
    );

    return headerElement;
};

// Create the title element
const createHeaderTitle = () => {
    const headerTitle = document.createElement('p');
    headerTitle.classList.add(
        'text-4xl',
        'font-extrabold',
        'text-gray-800',
        'tracking-wide',
        'uppercase'
    );
    headerTitle.innerText = "battleship";

    return headerTitle;
};

export { headerComponent };
