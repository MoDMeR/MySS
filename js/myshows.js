var App = angular.module('App', ['ngRoute','ngSanitize']);

App.service('apiService', function($http){
    this.requestData = function(page,method,callback) {
        page = page;
        var url = 'http://api.myshows.me/';
        $http({
            method: "GET",
            url: url + method,
            }).then(function succes(response) {
                    if (response.status == 401) {
                        Materialize.toast('Необходима авторизация.', 4000);
                        setTimeout(function() { 
                             window.location = '#/login/';
                        }, 2000);
                    } else if (response.status == 403) {
                        if(page == 'login') {
                            Materialize.toast('Пользователь с таким логином и паролем не найден!', 4000);
                        } else {
                            Materialize.toast('Ошибка доступа.', 4000);
                        }
                    } else if (response.status == 200) {
                        if(page == 'login') {
                            window.location = '#/home/';
                        } else {
                            var data = response;
                            var status = response.status;
                            callback ? callback(data) : '';
                        }
                    }
            }, function error(response) {
                if (response.status == 401) {
                    Materialize.toast('Необходима авторизация.', 4000);
                    setTimeout(function() { 
                         window.location = '#/login/';
                    }, 2000);
                } else if(response.status == 403){
                    if(page == 'login') {
                        Materialize.toast('Пользователь с таким логином и паролем не найден!', 4000);
                    } else {
                        Materialize.toast('Ошибка доступа.', 4000);
                    }
                } else {
                    Materialize.toast('Неизвестная ошибка!', 4000);
                }
            });
    };
});


App.service('unwatchedService', function($rootScope,apiService){    
    this.getUnwatchedShows = function(shows,unwatched) {
        var result = [];
        
        for(var i in unwatched) {
            var episode = unwatched[i];
            if (!shows[episode.showId].unwatchedEpisodesData) {
                shows[episode.showId].unwatchedEpisodesData = [];
            }
            shows[episode.showId].unwatchedEpisodesData.unshift(episode);				
        }

        for (var i in shows) {
            var show = shows[i];
            if (show.unwatchedEpisodesData && show.unwatchedEpisodesData.length > 0) {
                result.push(show);
            }
        }
        return result;
    }
});

App.service('getGenres', function($rootScope,apiService){
   this.genresName = function(id){
       var allGenres = [];
       var method = 'genres/';
       apiService.requestData(undefined,method,function(data){
           $rootScope.genres = allGenres.push(data.data);
           $rootScope.genresId = id;
       });
   } 
});









