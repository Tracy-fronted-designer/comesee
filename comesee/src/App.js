import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/navbar';
import Footer from './components/footer';

import HomePage from './components/home/homePage';
import ListPage from './components/home/listPage';
import InfoPage from './components/home/infoPage';
import SupportCenter from './components/supportCenter/SupportCenter';
import BookingSeat from './components/booking/BookingSeat';
import Payment from './components/payment/Payment';
import Discount from './components/payment/Discount';
import TicketType from './components/payment/TicketType';
import Confirm from './components/payment/Confirm';
import PaymentCompleted from './components/payment/PaymentCompleted';
import Collectionpage from './components/member/collectionpage';
import Fee from './components/member/fee';
import Member from './components/member/member';
import Socialhome from './components/socialpage/socialhome';
import Social from './components/socialpage/Tab';
import ForgotPasswordPage from "./components/Frank/ForgotPasswordPage"
import Login from './components/Frank/login'
import Register from './components/Frank/register';
import ChangePassword from './components/Frank/ChangePassword'
import UserMessage from './components/member/UserMessage'

import { TicketProvider } from './TicketProvider';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/List" component={ListPage} />
            <Route path="/Info" component={InfoPage} />
            <Route path="/SupportCenter/:page" component={SupportCenter} />
            <Route path="/PaymentCompleted" component={PaymentCompleted} />
            <Route path="/Collectionpage" component={Collectionpage} />
            <Route path="/Fee" component={Fee} />
            <Route path="/Member" component={Member} />
            <Route path="/Socialhome" component={Socialhome} />
            <Route path="/Social" component={Social} />
            <Route path="/ForgotPassword" component={ForgotPasswordPage} />
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            {/* {/* <Route path="/ChangePassword" component={ChangePassword} /> */}
            <Route path="/UserMessage" component={UserMessage} /> */}
          <TicketProvider>
            <Route path="/BookingSeat" component={BookingSeat} />
            <Route path="/TicketType" component={TicketType} />
            <Route path="/discount" component={Discount} />
            <Route path="/Confirm" component={Confirm} />
            <Route path="/payment" component={Payment} />
          </TicketProvider>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;