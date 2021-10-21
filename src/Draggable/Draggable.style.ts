import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		height: 150,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	fixedBox: {
		position: 'absolute',
		top: 50,
		bottom: 50,
		left: 5,
		right: 5,
		backgroundColor: '#f8f8f8',
		borderRadius: 15,
	},
	item: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
	},
});

export default styles;
