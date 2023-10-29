import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../Store';
import { FirebaseTodoRepository } from '../data/FirestoreTodoRepository';
import { TodoModel } from '../domain/TodoModel';
import { selectLoading, selectTodos, todoActions } from '../service/TodoSlice';
import { watchTodoEvent } from '../service/TodoSagas';

const HomePage: FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [todoText, setTodoText] = useState('');
  const firestoreTodoRepo = useRef(FirebaseTodoRepository.Instance);

  const isLoading = useAppSelector(selectLoading);
  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    const unsub = watchTodoEvent((todos) => {
      dispatch(todoActions.setTodos({ todos }));
    });

    return unsub;
  }, []);

  const addTodo = () => {
    const todoToAdd = {
      title: todoText,
      isDone: false,
      createAt: new Date().toString(),
    } as TodoModel;
    dispatch(todoActions.addTodo({ todo: todoToAdd }));
    setTodoText('');
  };

  const renderTodo = ({ item }: ListRenderItemInfo<TodoModel>) => {
    const deleteTodo = () => {
      dispatch(todoActions.deleteTodo({ id: item.id }));
    };

    const toggleTodoDoneStatus = () => {
      dispatch(
        todoActions.updateTodo({
          id: item.id,
          todo: {
            isDone: !item.isDone,
          },
        })
      );
    };

    return (
      <View style={styles.todoCtn}>
        <TouchableOpacity
          style={styles.todoLeftGroup}
          onPress={toggleTodoDoneStatus}
        >
          {item.isDone ? (
            <MaterialIcons name="check-box" size={24} color="green" />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color="black"
            />
          )}
          <Text style={styles.todoTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="delete-forever"
          size={24}
          color="red"
          onPress={deleteTodo}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {isLoading && <ActivityIndicator size="small" color={'black'} />}
      <FlatList
        style={styles.todoList}
        data={todos}
        renderItem={renderTodo}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.addTodoGroup}>
        <TextInput
          style={styles.textInput}
          onChangeText={setTodoText}
          value={todoText}
          placeholder="things to do"
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todoText === ''} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  addTodoGroup: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 8,
  },
  todoList: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  todoCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  todoLeftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  todoTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  separator: {
    height: 8,
  },
});
