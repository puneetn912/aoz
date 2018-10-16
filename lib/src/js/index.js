import 'angular';
import 'angular-aria';
import 'angular-messages';
import 'angular-animate';
import 'angular-material';
import 'angular-resource';
import 'angular-route';
import 'moment';

import '../../../node_modules/angular-material/angular-material.css';
import '../../../node_modules/angular-route/angular-route.js';
import '../../../node_modules/angular-route/angular-route.min.js';
import './controller/user/userindex.js';

console.log('Vendors done loading.');

import '../css/icon&font.css'
import '../css/index.css';


import appModule from './app.module';
appModule();


import headController from './controller/user/head.controller';
headController();

import homeController from './controller/user/home.controller';
homeController();

import calenderController from './controller/user/calender.controller';
calenderController();


import cartController from './controller/user/cart.controller';
cartController();


import checkoutController from './controller/user/checkout.controller';
checkoutController();


import signupController from './controller/user/signup.controller';
signupController();


import userdetailsController from './controller/user/userdetails.controller';
userdetailsController();


import userdetailseditController from './controller/user/userdetailsedit.controller';
userdetailseditController();





import subscriptionController from './controller/user/subscription.controller';
subscriptionController();


import subscriptionviewController from './controller/user/subscriptionview.controller';
subscriptionviewController();


import subscriptioneditController from './controller/user/subscriptionedit.controller';
subscriptioneditController();



import transactionsController from './controller/user/transactions.controller';
transactionsController();


import pageController from './controller/page.controller';
pageController();

import authController from './controller/auth.controller';