(function () {
    'use strict';

app.controller('ModalInstanceCtrl',['$scope', '$compile' , '$modalInstance', function($scope, $compile, $modalInstance, item)  {




$scope.datos = {};

if (item)
{
  $scope.datos.assignedToDisplayName = "sarasa";
  $scope.datos.assignedTo = "adiaz";
  $scope.datos.name = "editTask"
}

  $scope.ok = function (user) {

        $scope.nuevoItem = angular.copy(user);

           $modalInstance.close($scope.nuevoItem);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);});

