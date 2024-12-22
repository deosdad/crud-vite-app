import { showModal } from '../render-modal/render-modal';
import './render-add-button.css'
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderAddButton = (element) =>{

    const button = document.createElement('button');
    button.innerText = 'add';
    button.classList.add('fab-button');

    element.append(button);
 
    button.addEventListener('click', () => {
        showModal();
    });
}