import { BalloonType } from '../enums/balloon-type.enum';
import randomString from '../utils/random-string.util';
import shuffleArray from '../utils/shuffle-array.util';
import createPopEffectElement from '../utils/create-pop-effect.util';
import { GenderType } from '../enums/Gender-type.enum';

export class Balloons {
	private popEffectContainer: HTMLElement;
	private container: HTMLElement;
	private balloons: Array<BalloonType> = [];
	private readonly NUMBER_OF_BALLOONS: number = 20;
	private NUMBER_OF_BOY_BALLOONS: number = 5;
	private NUMBER_OF_GIRL_BALLOONS: number = 5;
	private readonly BOY: string;
	private readonly GIRL: string;
	private readonly EMPTY: string;

	constructor(container: HTMLElement, winner: string) {
		this.container = container;

		this.BOY = randomString();
		this.GIRL = randomString();
		this.EMPTY = randomString();

		if (winner === GenderType.GIRL) {
			this.NUMBER_OF_BOY_BALLOONS--;
		} else if (winner === GenderType.BOY) {
			this.NUMBER_OF_GIRL_BALLOONS--;
		}

		this.init();
	}

	init() {
		this.setupBallons();
		this.cacheElements();
	}

	cacheElements() {
		this.popEffectContainer = createPopEffectElement();
	}

	popBalloon(balloon: HTMLElement) {
		balloon.appendChild(this.popEffectContainer);
	}

	getBalloonType(type: string) {
		if (type === this.GIRL) {
			return BalloonType.GIRL;
		} else if (type === this.BOY) {
			return BalloonType.BOY;
		} else {
			return BalloonType.EMPTY;
		}
	}

	renderBalloons() {
		this.balloons.forEach((balloon) => {
			const template = document.createElement('div');
			const templateString: string =
				document.querySelector('.balloon-template').innerHTML;
			const type =
				balloon === BalloonType.BOY
					? this.BOY
					: balloon === BalloonType.GIRL
					? this.GIRL
					: this.EMPTY;
			template.classList.add('helium');
			template.classList.add('confetti');
			template.dataset.type = type;
			template.innerHTML = templateString;

			this.container.appendChild(document.importNode(template, true));
		});
	}

	addEvents(handleClick: Function) {
		this.container.addEventListener('click', (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.classList.contains('balloon')) {
				if (target.classList.contains('popped')) {
					return;
				}
				handleClick(
					event,
					this.getBalloonType(target.parentElement.dataset.type)
				);
			}
		});
	}

	setupBallons() {
		for (let i = 0; i < this.NUMBER_OF_BALLOONS; i++) {
			if (this.NUMBER_OF_GIRL_BALLOONS) {
				this.NUMBER_OF_GIRL_BALLOONS--;
				this.balloons.push(BalloonType.GIRL);
			} else if (this.NUMBER_OF_BOY_BALLOONS) {
				this.NUMBER_OF_BOY_BALLOONS--;
				this.balloons.push(BalloonType.BOY);
			} else {
				this.balloons.push(BalloonType.EMPTY);
			}
		}
		this.balloons = shuffleArray(this.balloons);
	}
}
