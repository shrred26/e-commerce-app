import './App.css';
import { Container } from 'react-bootstrap';
import Footer from './components/footer';
import Header from './components/header';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='my-3'>
        <Container>
          <Route path='/' component={Homescreen} exact />
          <Route path='/product/:id' component={ProductDetails} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
