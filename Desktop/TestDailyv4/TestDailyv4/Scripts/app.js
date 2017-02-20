


var app = angular.module("MyAppAngular", ['ngAnimate', 'ui.bootstrap']);


app.controller("nuevaTareaController",  function($scope, $modal){


   $scope.tareas = [];

  $scope.nuevoItem = {
  };


  $scope.itemsNew = [
                  {taskId: 1, name: "task 1", assignedTo: "charce", assignedToDisplayName:"Christian Arce", status:"New"},
                  {taskId: 2, name: "task 2", assignedTo: "charce", assignedToDisplayName:"Christian Arce", status:"New"},
                  {taskId: 3, name: "task 3", assignedTo: "charce", assignedToDisplayName:"Christian Arce", status:"New"},
                ];

  $scope.itemsInProgress = [
                  {taskId: 4, name: "task 4", assignedTo: "charce", assignedToDisplayName:"Christian Arce", status:"In Progress"},
                  {taskId: 5, name: "task 5", assignedTo: "charce", assignedToDisplayName:"Lucas", status:"In Progress"},
                  {taskId: 7, name: "task 7", assignedTo: "charce", assignedToDisplayName:"Lucas", status:"In Progress"}
                ];

  $scope.itemsToDo = [
                  {taskId: 11, name: "task 11", assignedTo: "charce", assignedToDisplayName:"Christian Arce", status:"To Do"},
                  {taskId: 12, name: "task 12", assignedTo: "charce", assignedToDisplayName:"Lucas", status:"To Do"},
                  {taskId: 13, name: "task 13", assignedTo: "charce", assignedToDisplayName:"Lucas", status:"To Do"}
                ];


  $scope.itemsDone = [
                  {taskId: 6, name: "task 6", assignedTo: "charce", assignedToDisplayName:"Ariel", status:"Done"}
                ];

   $scope.itemsFinalizados = [];



// Borrar item de un Array.
  var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}



// Elimitar ITEM DE itemsDone
  $scope.remove = function(item){

    $scope.itemsFinalizados.push(item);
    removeByAttr($scope.itemsDone, 'taskId', item.taskId);


  }

// Mover item 
$scope.moveArrow = function(item, arrow){

   var status = item.status.toLowerCase();

  if(arrow == "right"){
    if(status == "new")
    {
      item.status = "To Do";
      $scope.itemsToDo.push(item);
      removeByAttr($scope.itemsNew, 'taskId', item.taskId);
    }
    else if(status =="to do")
    { 
       item.status = "In Progress";
      $scope.itemsInProgress.push(item);
         removeByAttr($scope.itemsToDo, 'taskId', item.taskId);
    }
    else if(status == "in progress")
    {
        item.status = "Done";
        $scope.itemsDone.push(item);
         removeByAttr($scope.itemsInProgress, 'taskId', item.taskId);

    }
    else
    {
      console.log("ERROR: El estado de la tarea no existe en el board.");
    }
  }else if(arrow == "left"){

    if(status =="to do")
    { 
       item.status = "New";
      $scope.itemsNew.push(item);
         removeByAttr($scope.itemsToDo, 'taskId', item.taskId);
    }
    else if(status == "in progress")
    {
        item.status = "To Do";
        $scope.itemsToDo.push(item);
         removeByAttr($scope.itemsInProgress, 'taskId', item.taskId);

    }
    else if(status == "done")
    {
      item.status = "In Progress";
      $scope.itemsInProgress.push(item);
      removeByAttr($scope.itemsDone, 'taskId', item.taskId);
    }
    else
    {
      console.log("ERROR: El estado de la tarea no existe en el board.");
    }

  }

  }

   
  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        currenteItem: function () {
          return null;
        }
      }
    });

modalInstance.result.then(
      function (task) {
        if(task.status == "New"){
          $scope.itemsNew.push(task);

        }else if(task.status == "To Do"){
          $scope.itemsToDo.push(task);
        }else if(task.status  == "In Progress"){

          $scope.itemsInProgress.push(task);
        }else if(task.status  == "Done"){

          $scope.itemsDone.push(task);
        }

    }, function () {
          console.log("Errirrrr");
   
});

 };

      $scope.update = function (currentItem) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg', 
      resolve: {
        currenteItem: function () {
          return currentItem;
        }
      }
    });

     modalInstance.result.then(
      function (task, currentItem) {
       task;
       var index = -1;
      var found = false;
                $scope.itemsNew.some(
                    function (obj, ind) {
                        if (obj.taskId == task.taskId) {
                            index = ind;
                            found = true;
                            return true;
                        }
                    });

                if (index > -1) {

                    if($scope.itemsNew[index].status != currentItem.status) {
                    $scope.itemsNew[index].assignedToDisplayName = task.assignedToDisplayName;
                    $scope.itemsNew[index].assignedTo = task.assignedTo;
                    $scope.itemsNew[index].status = task.status;
                    $scope.itemsNew[index].name = task.name;
                      

                    }
                    

                }


    }, function () {
          console.log("Errirrrr");
          });

 };

 });

app.controller('ModalInstanceCtrl', function($scope, $compile, $modalInstance, currenteItem)  {



$scope.datos = {};

// Cargar valor a datos si es updated
if(currenteItem)
{
  $scope.datos.assignedToDisplayName =  currenteItem.assignedToDisplayName;
  $scope.datos.assignedTo = currenteItem.assignedTo;
  $scope.datos.name = currenteItem.name;
  $scope.datos.status = currenteItem.status;
  $scope.datos.taskId = currenteItem.taskId;
}

  $scope.ok = function () {




           $modalInstance.close($scope.datos);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})




