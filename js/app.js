"use strict";
angular
    .module("gaConnect", [
        "ui.router",
        "ngResource"
    ])
    .config([
        "$stateProvider",
        RouterFunction
    ])
    .factory("GaFactory", [
        "$resource",
        GaFactoryFuntion
    ])
    .controller("GaIndexController", [
        "GaFactory",
        GaIndexControllerFunction
    ])
    .controller("GaShowController", [
      "GaFactory",
        "$stateParams",
        GaShowControllerFunction
    ])
    .controller("GaEditController", [
      "GaFactory",
        "$stateParams",
        GaEditControllerFunction
    ])
    .controller("GaNewController", [
      "GaFactory",
        "$state",
        GaNewControllerFunction
    ]);

function RouterFunction($stateProvider) {
    $stateProvider
        .state("gaIndex", {
            url: "/gaconnect",
            templateUrl: "js/ng-views/index.html",
            controller: "GaIndexController",
            controllerAs: "vm"
        })
        .state("gaShow", {
            url: "gaconnect/:id",
            templateUrl: "js/ng-views/show.html",
            controller: "GaShowController",
            controllerAs: "vm"
        })
        .state("gaEdit", {
            url: "/gaconnect/:id/edit",
            templateUrl: "js/ng-views/edit.html",
            controller: "GaEditController",
            controllerAs: "vm"
        })
        .state("gaNew", {
            url: "gaconnect/new",
            templateUrl: "js/ng-views/new.html",
            controller: "GaNewController",
            controllerAs: "vm"
        })
}

function GaFactoryFuntion($resource) {
    // return json file link right here
    // return $resource( "https://gist.githubusercontent.com/rodneycurl/df6c512078a645a764a13856aa1c155a/raw/58524dd4e5f25e100f5db4463f97a722b1b090c1/ga-connect-seed-data.json", {}, {
    //   update: {method: "PUT"}
    // })
    return $resource("http://localhost:3000/students/:id");
}

function GaIndexControllerFunction(GaFactory) {
    this.students = GaFactory.query()
    // .query() expects to return an array
    // .get() expects to return an object
}

function GaShowControllerFunction(GaFactory, $stateParams) {
    // create an edit link within the show controller

    this.student = GaFactory.get({
        id: $stateParams.id
    });
}

function GaNewControllerFunction(GaFactory, $state) {
    // just need to update properly
    this.student = new GaFactory();
    this.create = function() {
        this.student.$save(function(student) {
            $state.go("gaShow", {
                id: student.id
            })
        })
    }
}


function GaEditControllerFunction(GaFactory, $stateParams, $state) {
    this.student = GaFactory.get({id: $stateParams.id})
    this.update = function(){
        this.student.$update({id: $stateParams.id}, function(student) {
            $state.go("gaShow", {id: student.id})

        })
    }

    this.destroy = function() {
        this.student.$delete({
            id: $stateParams.id
        })
    }
}
