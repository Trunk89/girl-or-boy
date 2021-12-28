import { Game } from '../src/scripts/models/game.model';
import { Balloons } from '../src/scripts/models/balloons.model';
import { Coyote } from '../src/scripts/models/coyote.model';
import fireConfetti from '../src/scripts/utils/fire-confetti.util';
import { BalloonType } from '../src/scripts/enums/balloon-type.enum';

jest.mock('../src/scripts/models/balloons.model');
jest.mock('../src/scripts/models/coyote.model');
jest.mock('../src/scripts/utils/fire-confetti.util');

describe('Game model', () => {
	let gameModel: Game;
	const template = document.createElement('div');
	template.id = 'bodymovin';
	template.classList.add('living-room');

	document.body.insertAdjacentHTML(
		'beforebegin',
		`<main>
			<template class="balloon-template">
				<button class="balloon" type="button">
					<span class="visually-hidden">Ballon</span>
					<div class="knot">
						<div class="string"></div>
					</div>
				</button>
			</template>
		</main>`
	);

	afterEach(() => {
		document.body.innerHTML = '';
		gameModel = null;
		jest.useRealTimers();
	});

	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(Game, 'getRandomInterval').mockImplementation(() => 0);
		jest.useFakeTimers();
	});

	describe('Game model is initialised with GIRL', () => {
		beforeEach(() => {
			document.body.append(template);
			gameModel = new Game(template, "Baby's name", 'GIRL');
		});

		test('Then Coyote has been created', () => {
			jest.advanceTimersByTime(1000);
			expect(Coyote).toHaveBeenCalledTimes(1);
		});

		test('And Balloons has been created', () => {
			expect(Balloons).toHaveBeenCalledTimes(1);
		});

		describe('When blowConfetti is called with GIRL', () => {
			beforeEach(() => {
				gameModel.blowConfetti(BalloonType.GIRL);
			});

			test('Then blowConfetti is called with pink color', () => {
				expect(fireConfetti).toHaveBeenCalledWith(
					'#ff69b4',
					undefined,
					undefined,
					undefined
				);
			});
		});

		describe('When blowConfetti is called with BOY', () => {
			beforeEach(() => {
				gameModel.blowConfetti(BalloonType.BOY);
			});

			test('Then blowConfetti is called with blue color', () => {
				expect(fireConfetti).toHaveBeenCalledWith(
					'#7ec8e3',
					undefined,
					undefined,
					undefined
				);
			});
		});
	});

	describe('Game model is initialised with BOY', () => {
		beforeEach(() => {
			document.body.append(template);
			gameModel = new Game(template, "Baby's name", 'BOY');
		});

		test('Then ', () => {});

		test('And ', () => {});
	});
});
