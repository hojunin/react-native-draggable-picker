import React, {useState, useRef} from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	NativeSyntheticEvent,
	NativeScrollEvent,
	TextStyle,
	ViewStyle,
} from 'react-native';
import styles from './Draggable.style';

interface DraggablePickerProps {
	data: number[];
	index: number;
	setIndex: (value: number) => void;
	suffix?: string;
	disabled?: boolean;
	numberOfRow?: 3 | 5;
	rowHeight?: number;
	activeFontColor?: string;
	disabledFontColor?: string;
	fontStyle?: TextStyle;
	activeTileStyle?: ViewStyle;
}

const DraggablePicker = (props: DraggablePickerProps) => {
	const {
		data,
		index,
		setIndex,
		suffix,
		disabled = false,
		numberOfRow = 3,
		rowHeight = 50,
		activeFontColor = 'black',
		disabledFontColor = '#aaa',
		fontStyle = {},
		activeTileStyle = {},
	} = props;
	const flatListRef = useRef<FlatList>(null);
	const [focusIndex, setFocusIndex] = useState(1);

	const onLayoutChanged = () => {
		flatListRef.current?.scrollToOffset({
			offset: rowHeight * index,
			animated: false,
		});
	};

	const scrollToIndex = (index: number) => {
		flatListRef.current?.scrollToOffset({
			offset: rowHeight * (index - 1),
		});
	};

	const touchDisabled = (index: number) => {
		return disabled || index === 0 || index === data.length + 1;
	};

	const isActive = (index: number) => {
		return index === focusIndex;
	};

	const renderItem = ({item, index}: {item?: number; index: number}) => {
		return (
			<TouchableOpacity
				disabled={touchDisabled(index)}
				onPress={() => {
					setIndex(index - 1);
					scrollToIndex(index);
				}}
				style={[styles.item, {height: rowHeight}]}>
				{item && (
					<Text
						style={[
							fontStyle,
							{
								color: disabled
									? disabledFontColor
									: isActive(index)
									? activeFontColor
									: disabledFontColor,
							},
						]}>
						{!!suffix ? `${item} ${suffix}` : item}
					</Text>
				)}
			</TouchableOpacity>
		);
	};
	const onScrollAndEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const targetIndex =
			Math.round(e.nativeEvent.contentOffset.y / rowHeight) + 1;
		setIndex(targetIndex - 1);
		setFocusIndex(targetIndex);
	};

	return (
		<View style={[styles.container, {height: rowHeight * numberOfRow}]}>
			<View
				style={[
					styles.fixedBox,
					activeTileStyle,
					{top: rowHeight, bottom: rowHeight},
				]}
			/>
			<FlatList
				ref={flatListRef}
				showsVerticalScrollIndicator={false}
				data={[undefined, ...data, undefined]}
				renderItem={renderItem}
				keyExtractor={(_, index) => index.toString()}
				snapToAlignment="center"
				scrollEnabled={!disabled}
				snapToStart={true}
				snapToInterval={rowHeight}
				bounces={false}
				onScroll={onScrollAndEnd}
				onScrollEndDrag={onScrollAndEnd}
				onContentSizeChange={onLayoutChanged}
				getItemLayout={(_, index) => ({
					length: rowHeight,
					offset: rowHeight * index,
					index,
				})}
			/>
		</View>
	);
};

export default DraggablePicker;
