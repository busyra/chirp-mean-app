
var app = angular.module('chirpApp',[]);

app.controller('mainController', function($scope){
    console.log("connected");

    $scope.posts = [];
    $scope.newPost ={ create_by: '', text: '', create_at: ''};

    $scope.post = function(){
        $scope.newPost.created_at = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {created_by: '', text:'', created_at:''};
    };
});
