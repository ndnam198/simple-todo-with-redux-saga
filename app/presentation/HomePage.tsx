import {
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
import React, { FC, useEffect, useState } from 'react';
import { TodoModel } from '../domain/TodoModel';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

const HomePage: FC = ({ navigation }: any) => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([] as TodoModel[]);
  const todoCollectionRef = collection(FIREBASE_DB, 'todos');

  useEffect(() => {
    const todoCollectionRef = collection(FIREBASE_DB, 'todos');
    const unsub = onSnapshot(todoCollectionRef, {
      next: (snapshot) => {
        const todos: TodoModel[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id } as TodoModel);
        });
        setTodos(todos);
      },
    });

    return unsub;
  }, []);

  const addTodo = () => {
    addDoc(todoCollectionRef, {
      title: todoText,
      isDone: false,
      createAt: new Date().toString(),
    } as TodoModel);
    setTodoText('');
  };

  const renderTodo = ({ item }: ListRenderItemInfo<TodoModel>) => {
    const deleteTodo = () => {
      const ref = doc(FIREBASE_DB, `todos/${item.id}`);
      deleteDoc(ref);
    };

    const toggleTodoDoneStatus = () => {
      const ref = doc(FIREBASE_DB, `todos/${item.id}`);
      updateDoc(ref, { isDone: !item.isDone });
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
