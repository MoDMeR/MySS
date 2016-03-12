App.config(function($routeProvider) {
    $routeProvider
        .when('/home/', {
            templateUrl: '../tmpl/home.html',
            controller: 'homeController',
            title: 'Скоро'
        })
        .when('/shows/', {
            templateUrl: '../tmpl/shows.html',
            controller: 'showsController',
            title: 'Мои сериалы'
        })
        .when('/shows/:showId', {
            templateUrl: '../tmpl/showDetail.html',
            controller: 'showDetController'
        })
        .when('/news/', {
            templateUrl: '../tmpl/news.html',
            controller: 'newsController',
            title: 'Новости друзей'
        })
        .when('/about/', {
            templateUrl: '../tmpl/about.html',
            controller: 'aboutController',
            title: 'О приложении'
        })
        .when('/login/', {
            templateUrl: '../tmpl/login.html',
            controller: 'loginController',
            title: 'Логин'
        })
        .otherwise({
            redirectTo: '/home/'
        });
});

App.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.appName = 'MySS';
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title;
        }
        modal();
    });
}]);

function dropDown() {
    $('.dropdown-button').dropdown();
}

function showRezult() {
    $('#searchRezult').openModal();
}

function tooltip() {
    $('.tooltipped').tooltip({delay: 50});
}

function modal() {
    $('body').on('click','.modal-trigger',function(e){
        var modal = $(e.target).attr('href');
        $(modal).openModal();
        return false; 
    });
}

function hide() {
    $('.lean-overlay').remove();
}

function removeEpisode(target) {
    $(target).parents('tr').fadeOut(300).remove();
}

function ratingInit(rate) {
    $('#detRating').raty({
        number: 5,
        score: rate,
        readOnly: true
    });
}