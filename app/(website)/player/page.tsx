'use client'

import { useState, useEffect, useRef } from "react";
import styles from './styles.module.css';
import { IconPlayerPlay, IconPlayerPause, IconRotateClockwise, IconListSearch } from '@tabler/icons-react';
import { Slider, ActionIcon, Divider, NumberInput, Select, createStyles, Box, Text, Group, rem, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	link: {
		...theme.fn.focusStyles(),
		display: 'block',
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		lineHeight: rem(38),
		fontSize: theme.fontSizes.sm,
		height: rem(38),
		borderTopRightRadius: theme.radius.sm,
		borderBottomRightRadius: theme.radius.sm,
		borderLeft: `${rem(2)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
			cursor: "pointer"
		},
	},

	linkActive: {
		fontWeight: 500,
		color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
	},

	links: {
		position: 'relative',
	},

	indicator: {
		transition: 'transform 150ms ease',
		border: `${rem(2)} solid ${
			theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
		}`,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		height: rem(10),
		width: rem(10),
		borderRadius: rem(10),
		position: 'absolute',
		left: `calc(-${rem(10)} / 2 + ${rem(1)})`,
	},
}));

export default function Page() {
	const text = [
		'+ La "Rapid Serial Visual Presentation" (RSVP), ou "Présentation ' +
		'visuelle en série rapide" en français, est une méthode pour présenter des informations, généralement des ' +
		'mots, très rapidement et dans un ordre séquentiel. Cette méthode est souvent utilisée dans la recherche en ' +
		'psychologie cognitive pour étudier la perception visuelle, l\'attention et la mémoire de travail. Le ' +
		'principe est assez simple. Imaginons que vous lisiez un texte. Au lieu d\'avoir tout le texte devant vous, ' +
		'chaque mot (ou chaque petit groupe de mots) est présenté séparément à un endroit fixe de l\'écran, ' +
		'généralement au centre, et ce, à une vitesse que vous pouvez souvent contrôler. Une fois qu\'un mot est ' +
		'présenté, il est rapidement remplacé par le suivant. Ainsi, vous n\'avez pas besoin de bouger les yeux pour ' +
		'lire, ce qui peut potentiellement augmenter votre vitesse de lecture et votre compréhension. C\'est une ' +
		'méthode qui a été utilisée dans divers domaines, de la recherche en psychologie à l\'amélioration de la ' +
		'vitesse de lecture. C\'est aussi la technologie derrière certaines applications de lecture rapide, comme ' +
		'Spritz. La RSVP a ses avantages et ses inconvénients. Par exemple, elle peut aider à augmenter la vitesse ' +
		'de lecture, mais elle peut aussi rendre difficile le retour en arrière pour relire quelque chose. De plus, ' +
		'certaines personnes peuvent trouver la méthode fatigante ou désorientante.',
		'+ La lecture rapide est une compétence qui peut être très utile pour absorber rapidement de grandes quantités ' +
		'd\'informations. Voici quelques techniques populaires de lecture rapide : ' +
		'Balayage : Cette méthode consiste à passer rapidement en revue le texte pour identifier les points clés ou ' +
		'les informations importantes. ' +
		'Saut : Cette technique implique de sauter consciemment certains mots ou phrases qui sont moins importantes ' +
		'pour la compréhension globale du texte. ' +
		'Chunking : Il s\'agit de regrouper des mots ensemble pour les lire en blocs plutôt que mot par mot. ' +
		'Minimiser la subvocalisation : La subvocalisation est la pratique consistant à "dire" les mots dans votre ' +
		'tête lorsque vous lisez. Cela peut ralentir considérablement votre vitesse de lecture. En apprenant à ' +
		'minimiser la subvocalisation, vous pouvez augmenter votre vitesse de lecture. ' +
		'Méta-guidage : Cette technique utilise un pointeur, comme votre doigt ou un stylo, pour guider vos yeux ' +
		'pendant que vous lisez.Lecture en diagonale : Cette technique consiste à lire en diagonale, ' +
		'en se concentrant sur les mots clés ' +
		'et les phrases, pour obtenir une compréhension globale du texte. RSVP (Rapid Serial Visual Presentation) : ' +
		'Cette méthode présente les mots un à un à un emplacement fixe, ' +
		'éliminant ainsi le besoin de mouvements oculaires. Cela peut augmenter considérablement la vitesse de ' +
		'lecture. En ce qui concerne la vitesse de lecture, elle varie énormément en fonction des personnes et de leur ' +
		'entraînement. Une vitesse de lecture moyenne pour un adulte est d\'environ 200 à 300 mots par minute. Avec ' +
		'la pratique et l\'utilisation de ces techniques de lecture rapide, certaines personnes peuvent atteindre ' +
		'des vitesses de 1000 mots par minute ou plus. Cependant, il est important de noter que la compréhension ' +
		'peut diminuer à mesure que la vitesse de lecture augmente. En ce qui concerne la méthode RSVP, il ' +
		'n\'existe pas de données concrètes sur le record du monde pour la vitesse de lecture la plus rapide. ' +
		'Cependant, on sait que cette méthode peut permettre d\'atteindre des ' +
		'vitesses de lecture de plus de 1000 mots par minute. La moyenne avec la RSVP dépend beaucoup de ' +
		'l\'entraînement individuel, mais après un entraînement conséquent, certains lecteurs peuvent atteindre une ' +
		'vitesse de 500 à 700 mots par minute tout en maintenant une compréhension raisonnable. Il est important de ' +
		'souligner que la lecture rapide n\'est pas seulement une question de vitesse, mais ' +
		'aussi de compréhension. Si vous lisez à une vitesse où vous ne comprenez pas l\'information, cela ne sera ' +
		'pas très utile. Par conséquent, la clé est de trouver un équilibre entre vitesse et compréhension.',
		'hehe hehe hehe hehe hehe hehe hehe hehe hehe hehe hehe',
		'wtf wtf wtf wtf wtf wtf wtf wtf wtf wtf wtf'
	];
	const [wordIndex, setWordIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [wordPerMinute, setWordPerMinute] = useState(200);
	const [fontSize, setFontSize] = useState(52);
	const [textColor, setTextColor] = useState('#000000');
	const [bgColor, setBgColor] = useState('#F5F5F5');
	const [fontFamily, setFontFamily] = useState('Arial');
	const [fontWeight, setFontWeight] = useState('normal');

	const { classes, cx } = useStyles();
	const [active, setActive] = useState(0);

	const chapters = [
		{
			label: 'Chapitre 1 - Introduction',
			order: 1,
		},
		{
			label: 'Chapitre 2 - Les autres méthodes de lecture rapide',
			order: 1,
		},
		{
			label: 'Hehe',
			order: 1,
		},
		{
			label: 'wtf',
			order: 1,
		}
	];

	const items = chapters.map((chapter, index) => (
		<Box
			onClick={(event) => {
				event.preventDefault();
				setActive(index);
				setWordIndex(0);
				setIsPlaying(false);
			}}
			key={chapter.label}
			className={cx(classes.link, { [classes.linkActive]: active === index })}
			sx={(theme) => ({ paddingLeft: `calc(${chapter.order} * ${theme.spacing.lg})` })}
		>
			{chapter.label}
		</Box>
	));

	const words = text[active].split(' ');
	const timer = useRef<NodeJS.Timeout | null>(null);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	const goToWord = (index: number) => {
		setWordIndex(index);
	};

	const setReadingSpeed = (wpm: number) => {
		setWordPerMinute(wpm);
	};

	useEffect(() => {
		if (isPlaying && wordIndex < words.length) {
			let currentWord = words[wordIndex];
			let delay = 60000/wordPerMinute;

			let lastChar = currentWord.charAt(currentWord.length - 1);
			if (
				lastChar === ','
			) {
				delay *= 1.6;
			} else if (
				lastChar === '.' ||
				lastChar === '!' ||
				lastChar === '?' ||
				lastChar === ':'
			) {
				delay *= 2.1;
			} else if (
				lastChar === '+'
			) {
				delay *= 6;
			}

			timer.current = setTimeout(() => {
				setWordIndex(wordIndex + 1);
			}, delay);
		}
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		}
	}, [wordIndex, isPlaying, wordPerMinute, words]);

	const textContainerStyle = {
		backgroundColor: bgColor,
	};

	const textStyle = {
		fontSize: `${fontSize}px`,
		color: textColor,
		fontFamily: fontFamily,
		fontWeight: fontWeight,
	}

	return (
		<>
		<main className={styles.main}>
			<div style={{marginTop: "50px"}}>
				<Group mb="md">
					<IconListSearch size="1.1rem" stroke={1.5} />
					<Text>Sommaire</Text>
				</Group>
				<div className={classes.links}>
					<div
						className={classes.indicator}
						style={{ transform: `translateY(${rem(active * 38 + 14)})` }}
					/>
					{items}
				</div>
			</div>
			<div style={textContainerStyle} className={styles.textContainer}>
				<div className={styles.header}>
					<Title order={2} size="h1">{ chapters[active].label }</Title>
				</div>
				<p style={textStyle}>{words[wordIndex]}</p>
				<div className={styles.navigation}>
					<div className={styles.navigationRange}>
						<Slider
							min={0}
							max={words.length - 1}
							value={wordIndex}
							onChange={(value) => goToWord(value)}
							label={null}
							styles={{
								trackContainer: {
									padding: "15px 0"
								}
							}}
						/>
					</div>
					<div className={styles.navigationOptions}>
						<ActionIcon
							color="dark"
							variant="transparent"
							onClick={() => {
								setIsPlaying(false);
								goToWord(0);
							}}
							sx={{marginRight: "5px"}}
						>
							<IconRotateClockwise size="12rem" />
						</ActionIcon>
						{ isPlaying ? (
							<ActionIcon color="dark" variant="transparent" onClick={togglePlay}>
								<IconPlayerPause size="12rem" />
							</ActionIcon>
						) : (
							<ActionIcon color="dark" variant="transparent" onClick={togglePlay}>
								<IconPlayerPlay size="4rem" />
							</ActionIcon>
						) }
						<Divider orientation="vertical" sx={{margin: "0 30px"}} />
						<Slider
							min={10}
							max={2000}
							value={wordPerMinute}
							onChange={(value) => setReadingSpeed(value)}
							label={null}
							w={200}
							sx={{marginRight: "10px"}}
						/>
						<p>{ wordPerMinute } mots/m</p>
						<Divider orientation="vertical" sx={{margin: "0 30px"}} />
						<input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
						<input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
						<NumberInput
							defaultValue={fontSize}
							onChange={(value) => {
								if (typeof value === 'number') {
									setFontSize(value);
								} else {
									setFontSize(0); // ou une autre valeur par défaut
								}
							}}
							placeholder="Taille du texte"
						/>
						<Select
							placeholder="Police d'écriture"
							value={fontFamily}
							onChange={(value) => {
								if (typeof value === 'string') {
									setFontFamily(value);
								} else {
									setFontFamily('Arial'); // ou une autre valeur par défaut
								}
							}}
							data={[
								'Arial',
								'Verdana',
								'Courier New',
                                'Times New Roman',
                                'Georgia',
							]}
						/>
						<Select
							placeholder="Épaisseur de la police"
							value={fontWeight}
							onChange={(value) => {
								if (typeof value === 'string') {
									setFontWeight(value);
								} else {
									setFontWeight('normal');
								}
							}}
							data={[
								{ label: 'Light', value: 'light' },
								{ label: 'Normal', value: 'normal' },
								{ label: 'Bold', value: 'bold' },
							]}
						/>
					</div>
				</div>
			</div>
		</main>
		</>
	);
}