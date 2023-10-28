import {
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { TodoModel } from '../domain/TodoModel';
import { Ionicons } from '@expo/vector-icons';
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
        console.log('UPDATED');
        const todos: TodoModel[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id } as TodoModel);
        });
        setTodos(todos);
      },
    });

    return unsub;
  }, []);

  const addTodo = (title: string) => {
    addDoc(todoCollectionRef, {
      title,
      isDone: false,
    });
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
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            <MaterialIcons
              name="radio-button-unchecked"
              size={24}
              color="black"
            />
          )}
          <Text style={styles.todoTitle}>{item.title}</Text>
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
    <View style={styles.container}>
      <FlatList
        style={styles.todoList}
        data={todos}
        renderItem={renderTodo}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.addTodoGroup}>
        <TextInput
          style={styles.input}
          onChangeText={setTodoText}
          value={todoText}
          placeholder="things to do"
        />
        <Button
          onPress={() => addTodo(todoText)}
          title="Add Todo"
          disabled={todoText === ''}
        />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  addTodoGroup: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 8,
  },
  todoList: {
    marginBottom: 24,
  },
  todoCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  todoLeftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoTitle: {
    marginLeft: 8,
  },
  separator: {
    height: 8,
  },
});
