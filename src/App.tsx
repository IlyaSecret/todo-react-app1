import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.min.css'
import Button from 'antd/lib/button';
import { TodoList } from './components/todolist/TodoList';
import './networking'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AddTodoButton } from 'components/todolist/AddTodoButton';
import Space from 'antd/lib/space';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Space 
        direction='vertical'
        style={{ padding: 20, width: '100%' }}>
        <AddTodoButton />
        <TodoList />
      </Space>
    </QueryClientProvider>
  );
}

export default App;
