import './App.css';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./components/Menu.jsx"
import LoginPage from "./components/LoginPage.jsx"
import HomePage from "./components/HomePage.jsx"
import FavoritesPage from "./components/FavoritesPage.jsx"
import SearchPage from "./components/SearchPage.jsx"



function App() {
  return (
  <Router>
  <Menu />
    <Routes>
      <Route path='/' exact element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/search' element={<SearchPage />}/>
      <Route path='/favorites' element={<FavoritesPage />}/>
      <Route path='*' element={<Navigate to="/login" />} />
    </Routes> 
  </Router>
  );
}

export default App;
