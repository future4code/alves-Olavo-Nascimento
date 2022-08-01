import { Router } from './routes/Router'
import GlobalStyle from './styles/global'

export const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
}

export default App;
