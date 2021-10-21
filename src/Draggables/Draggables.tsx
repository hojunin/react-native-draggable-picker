import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import styles from './Draggables.style';
import Draggable from '../Draggable';
interface DraggablesProps {
	data: string[];
	title?: string;
}

const Draggables = (props: DraggablesProps) => {
	const {title = null} = props;
	const [years, setYears] = useState({});
	const [months, setMonths] = useState({});
	const [rounds, setRounds] = useState({});
	const [currentYear, setCurrentYear] = useState(-1);
	const [currentMonth, setCurrentMonth] = useState(-1);
	const [currentRound, setCurrentRound] = useState(-1);

	return (
		<View>
			{title && (
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
				</View>
			)}
			<View style={styles.rowContainer}>
				<Draggable
					data={[]}
					suffix={'년'}
					index={currentYear}
					setIndex={(index: number) => {}}
				/>
			</View>
			<Button title="확인" onPress={() => {}} />
		</View>
	);
};

export default Draggables;
