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
		"+ La Rapid Serial Visual Presentation (RSVP) est une méthode de présentation d'information où les " +
		"éléments sont affichés séquentiellement à un rythme rapide, généralement au même emplacement spatial. " +
		"Cette technique est largement utilisée pour améliorer l'efficacité de la lecture rapide et pour la " +
		"recherche en psychologie cognitive. La RSVP tire ses origines des travaux de recherche en psychologie de " +
		"la perception des années 1960 et 1970, lorsqu'il a été démontré que les individus pouvaient identifier un " +
		"objet parmi d'autres présentés rapidement et dans une seule position spatiale. Cette découverte a mené au " +
		"développement de systèmes de présentation visuelle rapide utilisés dans de nombreux domaines allant de " +
		"l'éducation à la technologie. Au cours de ce chapitre, nous explorerons le concept de RSVP, son importance " +
		"et le contexte historique de son développement.",

		"+ Le fonctionnement de la RSVP repose sur le concept de \"fenêtre d'attention\", une période pendant " +
		"laquelle le cerveau est capable de traiter des informations visuelles sans distraction. Pendant une séance " +
		"de RSVP, les mots ou les images sont présentés un à un à un rythme rapide, généralement au même endroit " +
		"sur l'écran. Le temps d'exposition de chaque élément varie généralement entre 100 et 500 millisecondes. Ce " +
		"rythme soutenu permet d'optimiser l'efficacité de la lecture ou de la perception visuelle, en réduisant " +
		"les mouvements oculaires inutiles et en concentrant l'attention de l'observateur. La plupart des systèmes " +
		"de RSVP permettent également à l'utilisateur de contrôler la vitesse de présentation, offrant une " +
		"flexibilité pour s'adapter à différentes capacités de lecture et de perception.",

		"+ La RSVP a trouvé des applications dans de nombreux domaines. Tout d'abord, elle est largement utilisée " +
		"dans les techniques de lecture rapide. En affichant les mots un à un à un emplacement fixe, la RSVP réduit " +
		"les mouvements oculaires saccadiques, augmentant ainsi la vitesse de lecture tout en conservant une bonne " +
		"compréhension. En outre, la RSVP est un outil précieux pour la recherche en psychologie cognitive. Elle " +
		"permet aux chercheurs d'étudier l'attention, la perception, et la mémoire visuelle en contrôlant " +
		"précisément ce que les participants voient et quand ils le voient. Enfin, la RSVP est utilisée dans les " +
		"interfaces homme-machine, en particulier dans les systèmes où l'espace d'affichage est limité, comme les " +
		"lunettes de réalité augmentée ou les écrans de téléphones portables. Par exemple, une application de " +
		"lecture rapide pour smartphone pourrait utiliser la RSVP pour afficher un livre entier sur un petit écran, " +
		"un mot à la fois.",

		"+ Au fil des ans, de nombreuses études ont été menées sur la RSVP, cherchant à comprendre et à améliorer " +
		"cette technique. Les recherches ont démontré que, bien que la RSVP puisse augmenter considérablement la " +
		"vitesse de lecture, elle peut également entraîner une diminution de la compréhension, en particulier à des " +
		"vitesses très élevées. De plus, certains utilisateurs de la RSVP peuvent ressentir une fatigue oculaire ou " +
		"du stress cognitif en raison de la rapidité et de l'intensité de la présentation. Cependant, des travaux " +
		"récents ont cherché à atténuer ces problèmes, par exemple en introduisant des pauses stratégiques ou en " +
		"ajustant la vitesse de présentation en fonction de la complexité du contenu.",

		"+ La RSVP est une parmi de nombreuses techniques de présentation d'informations et de lecture rapide. Elle " +
		"se distingue par sa capacité à présenter rapidement des informations dans un espace limité, mais elle a " +
		"ses propres avantages et inconvénients en comparaison avec d'autres méthodes. Par exemple, par rapport à la " +
		"lecture traditionnelle, la RSVP peut augmenter la vitesse de lecture, mais peut diminuer la compréhension " +
		"et la rétention de l'information. Par rapport à d'autres méthodes de lecture rapide, la RSVP est unique en " +
		"ce qu'elle limite les mouvements oculaires, ce qui peut réduire la fatigue, mais peut aussi limiter la " +
		"capacité du lecteur à revenir en arrière ou à réviser l'information présentée. En fin de compte, le choix " +
		"de la méthode dépend des besoins spécifiques de l'utilisateur, et il peut être utile d'explorer différentes " +
		"techniques pour trouver celle qui convient le mieux.",

		"+ Les développements récents et futurs de la RSVP sont prometteurs. Les chercheurs continuent d'explorer de " +
		"nouvelles façons d'optimiser cette technique, en tenant compte de la vitesse de présentation, de la taille " +
		"du texte, des couleurs et d'autres facteurs. Par ailleurs, avec l'avènement de nouvelles technologies " +
		"telles que la réalité augmentée et virtuelle, la RSVP trouve de nouvelles applications, par exemple dans " +
		"les systèmes d'information de tête haute pour les pilotes ou dans les applications de lecture sur les " +
		"appareils mobiles. Les nouvelles recherches se concentrent également sur la personnalisation de la RSVP en " +
		"fonction des capacités individuelles, ce qui permettrait une expérience plus confortable et efficace pour " +
		"chaque utilisateur.",

		"+ En conclusion, la Rapid Serial Visual Presentation est une technique puissante pour présenter des " +
		"informations visuelles rapidement et efficacement. Malgré certaines limitations, telles que la possibilité " +
		"de fatigue oculaire ou de diminution de la compréhension à des vitesses très élevées, la RSVP a une gamme " +
		"d'applications impressionnante, de la lecture rapide à la recherche en psychologie cognitive en passant par " +
		"les interfaces homme-machine. Alors que nous continuons à explorer et à affiner cette technique, il est " +
		"certain que la RSVP restera un outil précieux dans notre arsenal pour traiter l'information visuelle. " +
		"L'avenir de la RSVP est prometteur, avec de nouvelles recherches et technologies qui ouvrent des " +
		"possibilités passionnantes pour son utilisation et son développement."
	];
	const [wordIndex, setWordIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [wordPerMinute, setWordPerMinute] = useState(600);
	const [fontSize, setFontSize] = useState(52);
	const [textColor, setTextColor] = useState('#000000');
	const [bgColor, setBgColor] = useState('#FAFAFA');
	const [fontFamily, setFontFamily] = useState('Arial');
	const [fontWeight, setFontWeight] = useState('normal');

	const { classes, cx } = useStyles();
	const [active, setActive] = useState(0);

	const chapters = [
		{
			label: 'Chapitre 1 - Introduction à la Rapid Serial Visual Presentation',
			order: 1,
		},
		{
			label: 'Chapitre 2 - Principes de fonctionnement de la RSVP',
			order: 1,
		},
		{
			label: 'Chapitre 3 - Applications de la RSVP',
			order: 1,
		},
		{
			label: 'Chapitre 4 - Recherches et études sur la RSVP',
			order: 1,
		},
		{
			label: 'Chapitre 5 - Comparaison de la RSVP à d\'autres méthodes',
			order: 1,
		},
		{
			label: 'Chapitre 6 - Perspectives et avenir de la RSVP',
			order: 1,
		},
		{
			label: 'Chapitre 7 - Conclusion',
			order: 1,
		},
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