import pop from '../../audio/pop-sound.mp3';
import falling from '../../audio/falling.mp3';
import fall from '../../audio/fall.mp3';

export class Coyote {
	private container: HTMLElement;
	private coyote: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
		this.injectCoyote();
		this.cacheElements();

		setTimeout(() => {
			this.init();
		}, 300);
	}

	injectCoyote() {
		this.container.firstElementChild.insertAdjacentHTML(
			'beforebegin',
			'<div class="coyote coyote--worried-right" style="left: -254px"></div>'
		);
		this.container.firstElementChild.insertAdjacentHTML(
			'beforebegin',
			'<div class="coyote-falling"></div>'
		);
	}

	cacheElements() {
		this.coyote = document.querySelector('.coyote');
	}

	addEvents() {
		this.coyote.addEventListener('click', this.handleClick.bind(this));
	}

	init() {
		this.startCoyoteAnimation();
		this.addEvents();

		this.startMoving();
	}

	handleClick() {
		this.coyote.classList.remove('coyote--worried-right');
		this.coyote.classList.remove('coyote--worried-left');
		this.coyote.classList.add('coyote--resigned');
		new Audio(pop).play();

		setTimeout(() => {
			this.coyote.classList.remove('coyote--resigned');
			this.coyote.classList.add('coyote--falling');
			new Audio(falling).play();

			setTimeout(() => {
				const fallingContainer = document.querySelector('.coyote-falling');
				fallingContainer.classList.add('coyote-falling--initiate');

				setTimeout(() => {
					new Audio(fall).play();
				}, 2500);

				setTimeout(() => {
					this.coyote.remove();
					fallingContainer.remove();
				}, 3000);
			}, 1000);
		}, 1000);
	}

	startMoving() {
		this.coyote.style.left = window.innerWidth - 270 + 'px';
	}

	startCoyoteAnimation() {
		setInterval(() => {
			const list = this.coyote.classList;
			if (
				!list.contains('coyote--falling') &&
				!list.contains('coyote--resigned')
			) {
				if (list.contains('coyote--worried-right')) {
					list.toggle('coyote--worried-right');
					list.add('coyote--worried-left');
				} else if (list.contains('coyote--worried-left')) {
					list.toggle('coyote--worried-left');
					list.add('coyote--worried-right');
				}
			}
		}, 3000);
	}
}
