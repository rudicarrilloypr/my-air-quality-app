import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import DetailsPage from './containers/DetailsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/details/:id" component={DetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
