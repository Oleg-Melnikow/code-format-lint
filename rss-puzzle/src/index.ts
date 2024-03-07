import './style.scss';
import img from 'assets/logo-rsschool.svg';

const root: HTMLElement = document.createElement('div');
root.classList.add('root');
root.style.background = 'yellow';
root.style.backgroundImage = `url${img}`;

const image = document.createElement('img');
image.src = img;
image.alt = 'logo';

root.append(image);

document.body.append(root);
