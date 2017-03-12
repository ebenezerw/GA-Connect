"use strict";

angular
  .module("gaConnect", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .factory("GaFactory", ["$resource", GaFactoryFuntion])
  .controller("GaIndexController", [GaIndexControllerFunction])
  .controller("GaShowController", ["$stateParams", GaShowControllerFunction])
  .controller("GaEditController", ["$stateParams", "$state", GaEditControllerFunction])
  .controller("GaNewController", ["$state", GaNewControllerFunction])

function RouterFunction($stateProvider) {
  $stateProvider
  .state("gaIndex", [
    url: "gaconnect",
    templateUrl: "js/ng-views/index.html",
    controller: "GaIndexController",
    controllerAs: "vm"
  ])
  .state("gaShow", [
    url: "gaconnect/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "GaShowController",
    controllerAs: "vm"
  ])
  .state("gaEdit", [
    url: "gaconnect/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "GaEditController",
    controllerAs: "vm"
  ])
  .state("gaNew", [
    url: "gaconnect/new",
    templateUrl: "js/ng-views/new.html",
    controller: "GaNewController",
    controllerAs: "vm"
  ])
}

function GaFactoryFuntion($resource) {
  // return json file link right here
  // return $resource(ADD FILE LINK HERE)
}

function GaIndexControllerFunction() {
  this.connected = GaFactory.query()
}

function GaShowControllerFunction($stateParams) {
  this.connected = GaFactory.get({id: $stateParams.id})
}

function GaEditControllerFunction($stateParams, $state) {
  this.connected = GaFactory.get({id: $stateParams.id})
  this.update = function() {
    this.connected.$update({id: $stateParams.id})
  }
  this.destroy = function() {
    this.connected.$delete({id: $stateParams.id})
  }
}

function GaNewControllerFunction($state) {
  this.connected = new GaFactory()
  this.create = function() {
    this.connected.$save()
  }
}
