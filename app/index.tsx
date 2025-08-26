import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

const initTodolist = [
	{
		id: '1',
		title: 'Task 1',
		completed: false,
	},
	{
		id: '2',
		title: 'Task 2',
		completed: true,
	},
];

export default function HomeScreen() {
	const [task, setTask] = useState<string>('');
	const [tasks, setTasks] = useState(initTodolist);
	const colorScheme = useColorScheme();
	const themeColors = Colors[colorScheme ?? 'light'];
	const themeStyles = createStyles(themeColors);

	const addTask = (newTask: string) => {
		setTasks([...tasks, { id: tasks.length > 0 ? String(tasks.length + 1) : '1', title: newTask, completed: false }]);
		setTask('');
	};

	return (
		<SafeAreaView style={themeStyles.container}>
			<ScrollView>
				<ThemedView>
					<ThemedText>Todolist</ThemedText>
				</ThemedView>
				<ThemedView>
					<View>
						<TextInput placeholder="Add a task" value={task} placeholderTextColor={colorScheme === 'dark' ? themeColors.placeholderText : themeColors.placeholderText} style={themeStyles.textInput} onChangeText={setTask} />
					</View>
					<TouchableOpacity activeOpacity={0.7} style={themeStyles.buttonAddTask} onPress={() => addTask(task)}>
						<Text style={themeStyles.textAddTask}>Add</Text>
					</TouchableOpacity>
				</ThemedView>
				<ThemedView style={{ marginTop: 20 }}>
					{tasks.map((task) => {
						return <ThemedText key={task.id}>- {task.title}</ThemedText>;
					})}
				</ThemedView>
			</ScrollView>
		</SafeAreaView>
	);
}

type ThemeColorsType = {
	text: string;
	borderInput: string;
	placeholderText: string;
	bgButtonAddTask: string;
};

const createStyles = (themeColors: ThemeColorsType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingVertical: 20,
		},
		textInput: {
			color: themeColors.text,
			borderWidth: 1,
			borderColor: themeColors.borderInput,
			minWidth: 200,
			marginTop: 20,
			padding: 16,
			maxWidth: 240,
		},
		buttonAddTask: {
			marginTop: 14,
			backgroundColor: themeColors.bgButtonAddTask,
			padding: 8,
			maxWidth: 140,
			minWidth: 140,
			marginHorizontal: 'auto',
		},
		textAddTask: {
			color: themeColors.text,
			fontSize: 16,
			fontWeight: 'bold',
			textTransform: 'uppercase',
			textAlign: 'center',
		},
	});
