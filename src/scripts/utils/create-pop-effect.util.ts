import randomNumber from './random-number.util';

export default function createPopEffectElement() {
	const bangEffectContainer: HTMLElement = document.createElement('div');
	for (let i = 0; i < 20; i++) {
		const span = document.createElement('span');
		span.classList.add('bang-effect__leaf');

		span.style.transform = `translate(${randomNumber(500) - 250}px, ${
			randomNumber(200) - 150
		}px) rotate(${randomNumber(360)}deg)`;

		bangEffectContainer.appendChild(span);
	}
	return bangEffectContainer;
}
