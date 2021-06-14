import './App.css';
import Navigation from './components/Navigation'
import LullifyRouter from './components/LullifyRouter'

const App = () => {
  return (
    <div className="App">
      Our fantastic lullify app
      <Navigation />
      <LullifyRouter />
    </div>
  );
}

export default App;