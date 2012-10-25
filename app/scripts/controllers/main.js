'use strict';

debtApp.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Testacular'
    ];
    $scope.index = 0;

    $scope.debts = [
        {id: $scope.index++, name:'Line Of Credit', value:'4998', rate:'5.5'},
        {id: $scope.index++, name:'loan', value:'4999', rate:'6.3'}
    ];
    $scope.totalValueOfDebts = function () {
        var total = 0;
        angular.forEach($scope.debts, function (debt) {
            total += parseInt(debt.value);
        });
        return total;
    }
    $scope.addDebt = function () {
        var debtToAdd = {id: $scope.index++, name:$scope.debtName, value:$scope.debtValue, rate:$scope.debtRate};
        $scope.debts.push(debtToAdd);
        $scope.debtName = null;
        $scope.debtValue = null;
        $scope.debtRate = null;
    }
    $scope.removeDebt = function (index) {
        $scope.debts.splice(index,1);
        for(var i=0;i<$scope.debts.length;i++){
            $scope.debts[i].id = i;
        }
    }
        $scope.startAgain = function(){
            $scope.debts = [];
        }
    $scope.calculatePayments = function () {
        var numberOfMonths = 0;

        var carryOver = parseFloat(0);
        try {
            if (!isNaN($scope.payPerMonth)) {
                angular.forEach($scope.debts, function (debt) {
                    var remainingValue = parseFloat(debt.value) + parseFloat(carryOver);
                    while (remainingValue > 0) {
                        var valueBeforePayment = remainingValue;
                        var interestPayment = (debt.rate * 0.01 / 12) * remainingValue;
                        remainingValue = remainingValue + interestPayment - parseFloat($scope.payPerMonth);
                        numberOfMonths++;
                        if (remainingValue <= 0) {
                            carryOver = remainingValue;
                        }
                        if (valueBeforePayment < remainingValue) {
                            throw "You will never pay this debt off at this rate!";
                        }
                    }
                });
            }
            numberOfMonths = 'It will take you ' + numberOfMonths + ' months to pay off this debt.';
        } catch (error) {
            numberOfMonths = error;
        }
        return numberOfMonths;

    }
});
