import React from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import AppRoute from './components/AppRoute';

function App() {
  const user = localStorage.getItem('role');
  console.log(user);

  return (
    <Container fluid="true">
      <AppRoute />
    </Container>
  );
}

export default App;
