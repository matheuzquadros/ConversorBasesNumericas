var app = angular.module('myConversorApp', []);
app.controller('myConversorController',['$scope', function ($scope) {
  $scope.input = {
    value : '',
    type: '',
  };


  $scope.parseBinary = function(number) {
    var bit = '';
    number = number / 2; console.log(number)
    if (number > 0) {
      if (Number.isInteger(number)) {
        bit = '0';
      } else {
        bit = '1';
      }
      bit = $scope.parseBinary(parseInt(number)) + bit;
      return bit;
    } else {
      return '';
    }
  }
}]);