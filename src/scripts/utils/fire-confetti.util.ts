import { confetti } from 'tsparticles-preset-confetti';

export default function fireConfetti(
	color: string,
	posX?: number,
	posY?: number,
	count?: number
) {
	confetti('tsparticles', {
		position: {
			x: posX || 50,
			y: posY || 50,
		},
		angle: 90,
		count: count || 150,
		spread: 90,
		startVelocity: 45,
		decay: 0.9,
		gravity: 1,
		drift: 0,
		ticks: 200,
		colors: [color],
		shapes: ['square', 'circle'],
		scalar: 1,
		zIndex: 100,
		disableForReducedMotion: true,
	});
}
