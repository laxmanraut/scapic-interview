var app = angular.module('questApp', []);
app.controller('questCntrl', function($scope, $http,$window) {
    
    $scope.questions;

        this.$onInit = function() {
            $http({
                method: 'GET',
                url: '/user/userlist'
            }).then(function(response){
                $scope.questions = response.data;
            },function(response){
                alert('Failed to load the questions!! Please try again later');
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
                    $window.location.href = '/user/score';
                   
                }, function(response){
                    alert('Error Submiting answers!! Please try again later.')
                });

            }
        }



   


});