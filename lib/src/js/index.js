// import 'angular';
// import 'angular-material';
// import 'angular-animate';
// import 'angular-aria';
// import 'angular-messages';
// import 'angular-resource';
// import 'angular-cookies';
// import 'angular-route';

import '../../../node_modules/angular/angular.min.js';
import '../../../node_modules/angular-material/angular-material.min.js';
import '../../../node_modules/angular-animate/angular-animate.min.js';
import '../../../node_modules/angular-aria/angular-aria.min.js';
import '../../../node_modules/angular-messages/angular-messages.min.js';
import '../../../node_modules/angular-resource/angular-resource.min.js';
import '../../../node_modules/angular-cookies/angular-cookies.min.js';
import '../../../node_modules/angular-route/angular-route.min.js';

import '../../../node_modules/angular-material/angular-material.min.css';
import './controller/user/userindex.js';

console.log('Vendors done loading.');

import '../css/icon&font.css'
import '../css/index.css';

import appModule from './app.module';
appModule();

import menuController from './controller/user/menu.controller';
menuController();

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

import thankyouController from './controller/user/thankyou.controller';
thankyouController();

import verifyController from './controller/user/verify.controller';
verifyController();

import userdetailsController from './controller/user/userdetails.controller';
userdetailsController();

import profileController from './controller/user/profile.controller';
profileController();

import subscriptionController from './controller/user/subscription.controller';
subscriptionController();

import subscriptionviewController from './controller/user/subscriptionview.controller';
subscriptionviewController();

import apartmentController from './controller/user/apartment.controller';
apartmentController();

import historyController from './controller/user/history.controller';
historyController();

import pageController from './controller/page.controller';
pageController();

import authController from './controller/auth.controller';