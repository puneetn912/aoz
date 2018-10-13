<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<body ng-app="">
Click here to disable all the form fields:<input type="checkbox" ng-model="all"><br>
<br>

<input type="text" ng-model="vm.abc" ng-disabled="all">
<input type="radio" ng-disabled="all">
<select ng-disabled="all">
  <option>Female</option>
  <option>Male</option>  
</select>
<button ng-disabled="!vm.abc">Click</button>
</body>
</html>