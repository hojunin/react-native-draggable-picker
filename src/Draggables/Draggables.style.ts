import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	title: {fontWeight: 'bold', fontSize: 18},
});
export default styles;
