import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	fixedBox: {
		position: 'absolute',
		left: 5,
		right: 5,
		backgroundColor: '#f8f8f8',
		borderRadius: 15,
	},
	item: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
	},
});

export default styles;
