import pop from '../../audio/pop-sound.mp3';
import modalAnimation from '../utils/modal-animation.util';
import { Coyote } from './coyote.model';
import { BalloonType } from '../enums/balloon-type.enum';
import { Balloons } from './balloons.model';
import fireConfetti from '../utils/fire-confetti.util';

export class Game {
	balloons: Balloons;
	BABY_NAME: string;
	modalWinner: HTMLElement;
	modalWinnerName: HTMLElement;

	constructor(container: HTMLElement, name: string, type: string) {
		this.cacheElements();

		this.blowConfetti = this.blowConfetti.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.balloons = new Balloons(container, type);
		this.BABY_NAME = name;

		this.init();
	}

	init() {
		this.balloons.renderBalloons();
		this.balloons.addEvents(this.handleClick);
		this.addCoyote();
	}

	static getRandomInterval() {
		return Math.floor(Math.random() * (15000 - 5000 + 1) + 5000);
	}

	addCoyote() {
		const randomInterval = Game.getRandomInterval();
		setTimeout(() => {
			new Coyote(document.querySelector('main'));
		}, randomInterval);
	}

	handleClick(event: MouseEvent, type: BalloonType) {
		event.preventDefault();
		const balloonNode: HTMLElement = event.target as HTMLElement;

		balloonNode.classList.add('popped');

		this.balloons.popBalloon(balloonNode);

		this.updateScores(type);
		this.blowConfetti(type);
		new Audio(pop).play();
		this.checkWinner();

		setTimeout(() => {
			balloonNode.remove();
		}, 2000);
	}

	cacheElements() {
		this.createModal();
		this.modalWinner = document.querySelector('.modal__winner');
		this.modalWinnerName = document.querySelector('.modal__winner-name');
	}

	createModal() {
		const modalNode = document.createElement('div');
		modalNode.classList.add('modal');
		modalNode.classList.add('hidden');
		modalNode.innerHTML = `
		<div class="modal__content">
    	<h1>It's a <span class="modal__winner"></span></h1>
    	<p>Welcome into our family <span class="modal__winner-name"></span>!</p>
    </div>`;
		document.querySelector('main').append(modalNode);
	}

	blowConfetti(
		type: BalloonType,
		posX?: number,
		posY?: number,
		count?: number
	) {
		let color: string = '';
		if (type === BalloonType.EMPTY) {
			return;
		}
		if (type === BalloonType.BOY) {
			color = '#7ec8e3';
		} else if (type === BalloonType.GIRL) {
			color = '#ff69b4';
		}

		fireConfetti(color, posX, posY, count);
	}

	updateScores(type: BalloonType) {
		if (type === BalloonType.BOY) {
			const scoreBalloon = document.querySelector(
				'.scoreboard__boy-points .scoreboard__balloon--unscored'
			);
			scoreBalloon.classList.remove('scoreboard__balloon--unscored');
			scoreBalloon.classList.add('scoreboard__balloon--scored');
		} else if (type === BalloonType.GIRL) {
			const scoreBalloon = document.querySelector(
				'.scoreboard__girl-points .scoreboard__balloon--unscored'
			);
			scoreBalloon.classList.remove('scoreboard__balloon--unscored');
			scoreBalloon.classList.add('scoreboard__balloon--scored');
		}
	}

	announceWinner(type: BalloonType) {
		this.modalWinner.style.fontSize = '72px';
		this.modalWinner.style.color =
			type === BalloonType.BOY ? '#7ec8e3' : '#ff69b4';
		this.modalWinner.innerHTML = type;

		this.modalWinnerName.innerHTML = this.BABY_NAME;

		modalAnimation();

		setTimeout(() => {
			this.blowConfetti(type, 25, 25, 500);
		}, 1000);

		setTimeout(() => {
			this.blowConfetti(type, 75, 25, 500);
		}, 2500);

		setTimeout(() => {
			this.blowConfetti(type, 25, 75, 500);
		}, 4000);

		setTimeout(() => {
			this.blowConfetti(type, 75, 75, 500);
		}, 5500);
	}

	checkWinner() {
		const scoreBoyBalloon = document.querySelector(
			'.scoreboard__boy-points .scoreboard__balloon--unscored'
		);
		const scoreGirlBalloon = document.querySelector(
			'.scoreboard__girl-points .scoreboard__balloon--unscored'
		);

		if (!scoreBoyBalloon) {
			this.announceWinner(BalloonType.BOY);
		} else if (!scoreGirlBalloon) {
			this.announceWinner(BalloonType.GIRL);
		}
	}
}
