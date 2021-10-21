import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import styles from './Draggables.style';
import Draggable from '../Draggable';

interface DraggablesProps {
	data: PREDICTION_META;
	getData: (data: PREDICTION_META) => void;
	closeModal: () => void;
}

const Draggables = (props: DraggablesProps) => {
	const {data, getData, closeModal} = props;
	const [years, setYears] = useState({});
	const [months, setMonths] = useState({});
	const [rounds, setRounds] = useState({});
	const [currentYear, setCurrentYear] = useState(-1);
	const [currentMonth, setCurrentMonth] = useState(-1);
	const [currentRound, setCurrentRound] = useState(-1);

	return (
		<View>
			<View style={styles.container}>
				<Text style={{fontWeight: 'bold', fontSize: 18}}>
					회차 변경
				</Text>
			</View>
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
