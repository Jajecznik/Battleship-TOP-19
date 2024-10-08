import './style.css';
import { headerComponent } from './ui/header';
import { newGamePreparing } from './ui/new-game-preparing';

// Main UI container
const contentElement = document.getElementById('content');
contentElement.classList.add(
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'items-center',
    'justify-start',
    'bg-gray-100',
    'overflow-auto',
    'container',
    'mx-auto'
);

// Append the header component
contentElement.appendChild(headerComponent());

// Start the new game preparation
newGamePreparing();
