import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getAllMetaData} from '../../../../api/predictionApi';
import {PREDICTION_META} from '../../../../types/prediction';
import {Button, Icon} from '../../../molecules';
import SliderPicker from '../../../molecules/SliderPicker';
import styles from './NaviModal.style';
import _ from 'lodash';

interface NaviModalProps {
	data: PREDICTION_META;
	getData: (data: PREDICTION_META) => void;
	closeModal: () => void;
}

const NaviModal = (props: NaviModalProps) => {
	const {data, getData, closeModal} = props;
	const [years, setYears] = useState({});
	const [months, setMonths] = useState({});
	const [rounds, setRounds] = useState({});
	const [currentYear, setCurrentYear] = useState(-1);
	const [currentMonth, setCurrentMonth] = useState(-1);
	const [currentRound, setCurrentRound] = useState(-1);

	const returnKeys = (object: object) => {
		return Object.keys(object);
	};

	const getAllData = async () => {
		const res = await getAllMetaData();
		if (res.status === 200) {
			initialize(res.data);
		}
		return [];
	};

	const initialize = (meta: PREDICTION_META[]) => {
		const {year, month, round} = data;
		const byYear = _.groupBy(meta, datum => datum.year);
		setYears(byYear);
		const yearIndex = returnKeys(byYear).findIndex(
			_year => _year === String(year),
		);

		// Month
		const byMonth = _.groupBy(byYear[year], datum => datum.month);
		setMonths(byMonth);
		const monthIndex = returnKeys(byMonth).findIndex(
			_month => _month === String(month),
		);

		// Round
		const byRound = _.groupBy(byMonth[month], datum => datum.round);
		setRounds(byRound);
		const roundIndex = returnKeys(byRound).findIndex(
			_round => _round === String(round),
		);
		setCurrentYear(yearIndex);
		setCurrentMonth(monthIndex);
		setCurrentRound(roundIndex);
		console.log('TEST');
	};

	useEffect(() => {
		getAllData();
	}, []);

	const setTargetMonths = (index: number) => {
		setCurrentYear(index);
		const targetYearData = years[returnKeys(years)[index]];
		const byMonth = _.groupBy(targetYearData, datum => datum.month);
		setMonths(byMonth);
	};

	const setTargetRounds = (index: number) => {
		setCurrentMonth(index);
		const targetMonthsData = months[returnKeys(months)[index]];
		const byRound = _.groupBy(targetMonthsData, datum => datum.round);
		setRounds(byRound);
	};

	const onPressConfirm = () => {
		getData({
			year: Number(returnKeys(years)[currentYear]),
			month: Number(returnKeys(months)[currentMonth]),
			round: Number(returnKeys(rounds)[currentRound]),
		});
		closeModal();
	};
	return (
		<View>
			<View style={styles.container}>
				<Text style={{fontWeight: 'bold', fontSize: 18}}>
					회차 변경
				</Text>
				<Icon name="close" size={12} onPress={closeModal} />
			</View>
			<View style={styles.rowContainer}>
				<SliderPicker
					data={returnKeys(years)}
					suffix={'년'}
					index={currentYear}
					setIndex={(index: number) => setTargetMonths(index)}
				/>
				<SliderPicker
					data={returnKeys(months) || ['연도 선택']}
					suffix={'월'}
					index={currentMonth}
					setIndex={(index: number) => setTargetRounds(index)}
					disabled={currentMonth < 0}
				/>
				<SliderPicker
					data={returnKeys(rounds)}
					suffix={'회차'}
					index={currentRound}
					setIndex={setCurrentRound}
					disabled={currentRound < 0}
				/>
			</View>
			<Button
				title="확인"
				titleStyle={{color: 'white'}}
				containerStyles={{
					marginHorizontal: 20,
					paddingVertical: 10,
					marginTop: 10,
				}}
				onPress={onPressConfirm}
			/>
		</View>
	);
};

export default NaviModal;
