import { BalloonType } from '../src/scripts/enums/balloon-type.enum';
import { Balloons } from '../src/scripts/models/balloons.model';

describe('Ballons model', () => {
	let balloons: Balloons;
	const template = document.createElement('div');
	template.id = 'bodymovin';
	template.classList.add('living-room');
	document.body.insertAdjacentHTML(
		'beforebegin',
		`<template class="balloon-template">
			<button class="balloon" type="button">
				<span class="visually-hidden">Ballon</span>
				<div class="knot">
					<div class="string"></div>
				</div>
			</button>
		</template>`
	);

	afterEach(() => {
		document.body.innerHTML = '';
		balloons = null;
	});

	describe('Ballons model is initialised with GIRL', () => {
		beforeEach(() => {
			document.body.append(template);
			balloons = new Balloons(template, 'GIRL');
		});

		test('Then balloons contain 4 BOY balloons', () => {
			expect(
				balloons.balloons.filter((balloon) => balloon === BalloonType.BOY)
					.length
			).toBe(4);
		});

		test('And balloons contain 5 GIRL balloons', () => {
			expect(
				balloons.balloons.filter((balloon) => balloon === BalloonType.GIRL)
					.length
			).toBe(5);
		});

		test('And balloons contain 11 EMPTY balloons', () => {
			expect(
				balloons.balloons.filter((balloon) => balloon === BalloonType.EMPTY)
					.length
			).toBe(11);
		});

		test('And BOY, GIRL, EMPTY types are encrypted', () => {
			expect(balloons.BOY.length).toBe(5);
			expect(balloons.GIRL.length).toBe(5);
			expect(balloons.EMPTY.length).toBe(5);
		});

		describe('When renderBalloons is called', () => {
			beforeEach(() => {
				balloons.renderBalloons();
			});

			test('Then html contains all balloons', () => {
				expect(document.body.querySelectorAll('.balloon').length).toBe(20);
			});

			describe('When balloon is popped', () => {
				let balloon: HTMLElement;
				beforeEach(() => {
					balloon = document.body.querySelectorAll(
						'.balloon'
					)[0] as HTMLElement;
					balloons.popBalloon(balloon);
				});

				test('Then html contains all balloons', () => {
					expect(balloon.querySelectorAll('.bang-effect__leaf').length).toBe(
						20
					);
				});
			});
		});
	});

	describe('Ballons model is initialised with BOY', () => {
		beforeEach(() => {
			document.body.append(template);
			balloons = new Balloons(template, 'BOY');
		});

		test('Then balloons contain 5 BOY balloons', () => {
			expect(
				balloons.balloons.filter((balloon) => balloon === BalloonType.BOY)
					.length
			).toBe(5);
		});

		test('And balloons contain 4 GIRL balloons', () => {
			expect(
				balloons.balloons.filter((balloon) => balloon === BalloonType.GIRL)
					.length
			).toBe(4);
		});

		test('And balloons contain 11 EMPTY balloons', () => {
			expect(
				balloons.balloons.filter((balloon) => balloon === BalloonType.EMPTY)
					.length
			).toBe(11);
		});
	});
});
