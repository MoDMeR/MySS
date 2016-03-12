(function() {    
    App.controller('loginController', ['$scope','apiService', function loginController($scope,apiService) {
        $scope.type = 'password';
        $scope.icon = 'fa-eye-slash';
        $scope.newType = function() {
            if ($scope.type=='password'){
                $scope.type = 'text';
                $scope.icon = 'fa-eye';    
            } else{
                $scope.type = 'password';
                $scope.icon = 'fa-eye-slash';
            }
        };

        $scope.login = function(item) {
            var page = item.currentTarget.attributes['data-page'].value;
            if ($scope.user.password === undefined || $scope.user.login === undefined) {
                Materialize.toast('Пользователь с таким логином и паролем не найден!', 4000);
            } else {
                var password = md5($scope.user.password);
                var clear_password = $scope.user.password;
                var method = 'profile/login?login=' + $scope.user.login + '&password=' + password;
                localStorage.setItem("login", $scope.user.login);
                localStorage.setItem("password", password);
                localStorage.setItem("clear_password", password);
                apiService.requestData(page,method,undefined);
            }
        };
    }]);
    
    App.controller('navbarController', ['$scope','apiService', function($scope,apiService){
        var login = localStorage.getItem("login");
        var method = 'profile/' + login; 
        $scope.name = login ? login : 'Name';
        apiService.requestData(undefined,method,function(data){
            $scope.name = data.data.login;
            $scope.avatar = data.data.avatar;
            dropDown();
        });
    }]);
    
    App.controller('searchController', ['$scope','apiService', function($scope,apiService){
        $scope.width = '0';
        $scope.showSearch = function(){
            if($scope.width == '0') {
                $scope.width = '200px';
            } else {
                $scope.width = '0';
            }
        };
        $scope.search = function(event){
            if(event.keyCode == 13) {
                $scope.query = event.srcElement.value;
                var method = 'shows/search/?q='+$scope.query;
                apiService.requestData(undefined,method,function(data){
                    $scope.rezult = data.data;
                    showRezult();
                    $scope.width = '0';
                });
            }
        };
    }]);
    
    App.controller('homeController', ['$scope','apiService','unwatchedService', function homeController($scope,apiService,unwatchedService) {
        $scope.$on('$routeChangeSuccess', function () {
            var method_shows = 'profile/shows/';
            var method_next = 'profile/episodes/next/ ';
            var page = 'mainList';
            apiService.requestData(page,method_shows,function(data){
                $scope.shows = data.data;
            });
            apiService.requestData(page,method_next,function(data){
                $scope.next = data.data;
                var shows = $scope.shows;
                var unwatched = $scope.next;
                $scope.serials = unwatchedService.getUnwatchedShows(shows,unwatched);
                setTimeout(function(){
                    tooltip();
                },1000);
            });
            $scope.check = function(item) {
                var id = item.currentTarget.attributes['data-id'].value;
                var method = 'profile/episodes/check/' + id;
                var target = item.target;
                apiService.requestData(undefined,method,function(data){
                   removeEpisode(target); 
                });
            }
        });
    }]);
    
    App.controller('showsController', ['$scope','apiService', function homeController($scope,apiService) {
        $scope.$on('$routeChangeSuccess', function () {
            var method = 'profile/shows/'
            var page = 'favList';
            apiService.requestData(page,method,function(data){
                $scope.serials = data.data;
            });
        });
    }]);
    
    App.controller('showDetController', [
        '$scope',
        'apiService',
        '$routeParams',
        '$rootScope',
        'getGenres',
        function homeController($scope,apiService,$routeParams,$rootScope,getGenres) {
            
            $scope.$on('$routeChangeSuccess', function () {
                $scope.id = $routeParams.showId;
                var method = 'shows/' + $scope.id;
                var page = 'detail';
                apiService.requestData(page,method,function(data){
                    $scope.show = data.data;
                    $rootScope.title = data.data.ruTitle;
                    ratingInit(data.data.rating);
                    hide();
                });
            });
            
    }]);
    
    App.controller('aboutController', ['$scope', function homeController($scope) {
        $scope.$on('$routeChangeSuccess', function () {
            
        });
    }]);
    
    App.controller('newsController', ['$scope','apiService', function homeController($scope,apiService) {
        $scope.$on('$routeChangeSuccess', function () {
            var method = 'profile/news/'
            var page = 'newsList';
            apiService.requestData(page,method,function(data){
                $scope.news = data.data;
            });
        });
    }]);
})();