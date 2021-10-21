import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './Draggables.style';
import Draggable from '../Draggable';
interface DraggablesProps {
	data: string[];
	title?: string;
}

const Draggables = (props: DraggablesProps) => {
	const {title = null} = props;

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
					index={1}
					setIndex={(index: number) => {}}
				/>
			</View>
			<Button title="확인" onPress={() => {}} />
		</View>
	);
};

export default Draggables;
