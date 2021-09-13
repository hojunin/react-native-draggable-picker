import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Draggable from './src/Draggable';

const App = () => {
	const [index, setIndex] = useState(0);
	return (
		<View style={styles.container}>
			<Draggable
				data={[
					1, 23, 4, 5, 1, 23, 4, 5, 1, 23, 4, 5, 1, 23, 4, 5, 1, 23,
					4, 5, 1, 23, 4, 5,
				]}
				index={index}
				setIndex={setIndex}
				suffix="년"
			/>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
