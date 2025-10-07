import { useRef, useState } from 'react';
import cn from 'classnames';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator/Separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	currentArticleState,
	OptionType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackground, setSelectedBackground] = useState<OptionType>(
		backgroundColors[0]
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);

	const aside = useRef<null | HTMLElement>(null);

	const openModal = () => {
		setIsOpen(!isOpen);
	};

	const handleReset = () => {
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackground(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);

		document.documentElement.style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		document.documentElement.style.setProperty(
			'--font-size',
			defaultArticleState.fontSizeOption.value
		);
		document.documentElement.style.setProperty(
			'--font-color',
			defaultArticleState.fontColor.value
		);
		document.documentElement.style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
		document.documentElement.style.setProperty(
			'--bg-color',
			defaultArticleState.backgroundColor.value
		);
	};

	const handleApply = () => {
		currentArticleState.fontFamilyOption = selectedFontFamily;
		currentArticleState.fontSizeOption = selectedFontSize;
		currentArticleState.fontColor = selectedFontColor;
		currentArticleState.backgroundColor = selectedBackground;
		currentArticleState.contentWidth = selectedContentWidth;

		document.documentElement.style.setProperty(
			'--font-family',
			currentArticleState.fontFamilyOption.value
		);
		document.documentElement.style.setProperty(
			'--font-size',
			currentArticleState.fontSizeOption.value
		);
		document.documentElement.style.setProperty(
			'--font-color',
			currentArticleState.fontColor.value
		);
		document.documentElement.style.setProperty(
			'--container-width',
			currentArticleState.contentWidth.value
		);
		document.documentElement.style.setProperty(
			'--bg-color',
			currentArticleState.backgroundColor.value
		);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openModal} />
			<aside
				ref={aside}
				className={cn(styles.container, isOpen ? styles.container_open : null)}>
				<form className={styles.form}>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={(option: OptionType) => {
							setSelectedFontFamily(option);
						}}
						title='шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={(option: OptionType) => {
							setSelectedFontSize(option);
						}}
						title='размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						onChange={(option: OptionType) => {
							setSelectedFontColor(option);
						}}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={selectedBackground}
						onChange={(option: OptionType) => {
							setSelectedBackground(option);
						}}
						title='Цвет фона'></Select>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={(option: OptionType) => {
							setSelectedContentWidth(option);
						}}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
