var app = angular.module('questApp', []);
app.controller('questCntrl', function($scope, $http,$window) {
    
    $scope.questions;

        var vm = this;
    
        vm.$onInit = function() {
            $http({
                method: 'GET',
                url: '/user/userlist'
            }).then(function(response){
                
                console.log(response.data);
                $scope.questions = response.data;

            },function(response){
                
            });
        };



        $scope.submitAnswers = function(form){

            if(form.$invalid){
                alert('All questions are mendatory');
            }
            else{
                
                var req = {
                    method: 'POST',
                    url: '/user/submitans',
                    data: $scope.questions
                }
                $http(req).then(function(response){
                    console.log(response);
                    $window.location.href = '/user/score';
                   
                }, function(response){
                    console.log(response);
                });




                /* for(let i=0;i<$scope.questions.length;i++){

                    console.log($scope.questions[i].answer);
                    console.log($scope.questions);
                    data.push()
                } */

                /* console.log(form); */
            }
        }



   


});