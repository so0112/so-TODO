import { Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, TodoPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
