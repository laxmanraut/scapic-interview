var app = angular.module('emailApp', []);


app.controller('emailCtrl', function($scope, $http,$window) {
    $scope.email = "";
    $scope.emailMsg = ""

    $scope.answered;
    $scope.viewed;

    this.$onInit = function() {
        $http({
            method: 'GET',
            url: '/admin/answered'
        }).then(function(response){
            
            $scope.answered = response.data.score;
            $scope.viewed = response.data.viewed;

            console.log($scope.viewed);

        },function(response){
            
        });
    };

    $scope.sendMail = function(){
        var req = {
            method: 'POST',
            url: '/admin/sendmail',
            data: { email: $scope.email }
        }
        $http(req).then(function(response){
            console.log(response);
            if(response.data.status == 'EXISTS'){
                alert('Email already sent to this address');
                $scope.email ="";
            }
            else{
                alert('Email Sent Succesfully');
                $scope.email ="";
            }
        }, function(response){
            $scope.emailMsg = response.data;
        });

    }

    $scope.viewAnswers = function(id){
        var req = {
            method: 'POST',
            url: '/admin/view-answers/'+id,
            data: { email: $scope.email }
        }
        $http(req).then(function(response){
            $window.location.href = response;
        }, function(response){
            console.log(response);
        });
    
    }




/*     $scope.viewAnswers = function(id){
        var req = {
            method: 'POST',
            url: '/admin/sendmail',
            data: { email: $scope.email }
        }
        $http(req).then(function(response){
            console.log(response);
            if(response.data.id == 'EXISTS'){
                alert('Email already sent to this address');
                $scope.email ="";
            }
            else{
                alert('Email Sent Succesfully');
                $scope.email ="";
            }
        }, function(response){
            $scope.emailMsg = response.data;
        });
    } */

});