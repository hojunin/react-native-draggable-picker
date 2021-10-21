import React, {useState, useRef} from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import styles from './Draggable.style';

interface DraggablePickerProps {
	data: number[];
	suffix: string;
	index: number;
	setIndex: (value: number) => void;
	disabled?: boolean;
}

const DraggablePicker = (props: DraggablePickerProps) => {
	const {data, suffix, index, setIndex, disabled} = props;
	const ref = useRef<FlatList>(null);
	const [focusIndex, setFocusIndex] = useState(1);

	const onLayoutChanged = () => {
		ref.current?.scrollToOffset({
			offset: 50 * index,
			animated: false,
		});
	};

	const renderItem = ({item, index}: {item?: number; index: number}) => {
		return (
			<TouchableOpacity
				disabled={disabled || index === 0 || index === data.length + 1}
				onPress={() => {
					setIndex(index - 1);
					ref.current?.scrollToOffset({offset: 50 * (index - 1)});
				}}
				style={styles.item}>
				{item && (
					<Text
						style={{
							color: disabled
								? '#aaa'
								: index === focusIndex
								? '#0038ff'
								: '#aaa',
						}}>
						{!!suffix ? `${item} ${suffix}` : item}
					</Text>
				)}
			</TouchableOpacity>
		);
	};
	const onScrollAndEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const targetIndex = Math.round(e.nativeEvent.contentOffset.y / 50) + 1;
		setIndex(targetIndex - 1);
		setFocusIndex(targetIndex);
	};

	return (
		<View style={styles.container}>
			<View style={styles.fixedBox} />
			<FlatList
				ref={ref}
				showsVerticalScrollIndicator={false}
				data={[undefined, ...data, undefined]}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				snapToAlignment="center"
				scrollEnabled={!disabled}
				snapToStart={true}
				snapToInterval={50}
				bounces={false}
				onScroll={onScrollAndEnd}
				onScrollEndDrag={onScrollAndEnd}
				onContentSizeChange={onLayoutChanged}
				getItemLayout={(_, index) => ({
					length: 50,
					offset: 50 * index,
					index,
				})}
			/>
		</View>
	);
};

export default DraggablePicker;
