import './App.css';
import { Container } from 'react-bootstrap';
import Footer from './components/footer';
import Header from './components/header';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='my-3'>
        <Container>
          <Route path='/' component={Homescreen} exact />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={OrderScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
