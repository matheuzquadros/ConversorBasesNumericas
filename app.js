var app = angular.module('myConversorApp', []);
app.controller('myConversorController', ['$scope', function ($scope) {
  $scope.input = {
    value: '',
    type: '',
  };

  var hexaValues = new Map();
  hexaValues.set('A', 10);
  hexaValues.set('B', 11);
  hexaValues.set('C', 12);
  hexaValues.set('D', 13);
  hexaValues.set('E', 14);
  hexaValues.set('F', 15);

  hexaValues.set(10, 'A');
  hexaValues.set(11, 'B');
  hexaValues.set(12, 'C');
  hexaValues.set(13, 'D');
  hexaValues.set(14, 'E');
  hexaValues.set(15, 'F');


  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function getNumberValue(value) {
    if (!isNumeric(value)) {
      value = value.toUpperCase();
      return hexaValues.get(value);
    } else {
      return value;
    }
  }

  function parseDecimal(number, base) {
    var count, max, result, expoente;
    count = 0;
    result = 0,
      max = number.length - 1;
    expoente = max;
    while (count <= max) {
      result += parseInt(getNumberValue(number[count])) * Math.pow(base, expoente);
      expoente--;
      count++;
    }
    return result;
  }

  const Decimal = {
    toOctal(number) {
      var divisao = number / 8;
      var resto = (divisao - parseInt(divisao)) * 8;
      var result = '';
      if (divisao > 0) {
        if (resto < 9) {
          result = result + '' + resto;
        }
        result = this.toOctal(parseInt(divisao)) + result;
        return result;
      } else {
        return '';
      }
    },
    toHexadecimal(number) {
      var divisao = number / 16;
      var resto = (divisao - parseInt(divisao)) * 16;
      var result = '';
      if (divisao > 0) {
        if (resto < 16) {
          if (resto < 10) {
            result = result + '' + resto;
          } else {
            result = result + hexaValues.get(resto);
          }
        }
        result = this.toHexadecimal(parseInt(divisao)) + result;
        return result;
      } else {
        //return divisao + '' + resto;
        return '';
      }
    },
    toBinary(number) {
      let bit = '';
      number = number / 2;
      if (number > 0) {
        if (Number.isInteger(number)) {
          bit = '0';
        } else {
          bit = '1';
        }
        bit = this.toBinary(parseInt(number)) + bit;
        return bit;
      } else {
        return '';
      }
    }
  };

  const Binary = {
    toOctal(number) {
      let decimal = this.toDecimal(number);
      return Decimal.toOctal(decimal);
    },
    toHexadecimal(number) {
      let decimal = this.toDecimal(number);
      return Decimal.toHexadecimal(decimal);
    },
    toDecimal(number) {
      return parseDecimal(number, 2);
    }
  };

  const Hexadecimal = {
    toDecimal(number) {
      return parseDecimal(number, 16);
    },
    toOctal(number) {
      let decimal = this.toDecimal(number);
      return Decimal.toOctal(decimal);
    },
    toBinary(number) {
      let decimal = this.toDecimal(number);
      return Decimal.toBinary(decimal);
    }
  };

  const Octal = {
    toDecimal(number) {
      return parseDecimal(number, 8);
    },
    toHexadecimal(number) {
      let decimal = this.toDecimal(number);
      return Decimal.toHexadecimal(decimal);
    },
    toBinary(number) {
      let decimal = this.toDecimal(number);
      return Decimal.toBinary(decimal);
    }
  };


  $scope.typeToConvert = Decimal;
  $scope.inputType = 10;

  angular.element(document).ready(function () {
        angular.element('.selectpicker').val(10);
    });

  $scope.$watch('inputType', function (newValue, oldValue) {
    switch (newValue) {
      case "10":
        $scope.typeToConvert = Decimal;
        break;
      case "2":
        $scope.typeToConvert = Binary;
        break;
      case "8":
        $scope.typeToConvert = Octal;
        break;
      case "16":
        $scope.typeToConvert = Hexadecimal;
        break;
    }
    console.log($scope.typeToConvert);
  });

  $scope.teste = function(e){
    var input = e.key;
    if($scope.inputType == 2){
      if(input < 0 || input > 1){
        e.preventDefault();
      }
    }else if($scope.inputType == 8){
      if(input < 0 || input > 7){
        e.preventDefault();
      }
    }
  }

}]);