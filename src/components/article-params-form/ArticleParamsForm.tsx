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
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	// TODO useState(true) => useState(false)
	const [isOpen, setIsOpen] = useState(true);

	const aside = useRef<null | HTMLElement>(null);

	const openModal = () => {
		setIsOpen(!isOpen);
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
						selected={fontFamilyOptions[0]}
						title='шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title='размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={fontColors[0]}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={backgroundColors[0]}
						title='Цвет фона'></Select>
					<Select
						options={contentWidthArr}
						selected={contentWidthArr[0]}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
