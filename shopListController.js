var app = angular.module('shoppinglistApp', []);

app.controller('shopListController', ['$scope', "dataSource", 
	function($scope, dataSource){
		$scope.list = [];

		$scope.itemName = "";
		$scope.amountOf = "";

		$scope.addItem = function() {
			var item = {"productName":$scope.itemName, "productAmount":$scope.amountOf};
			$scope.list.push(item);
			dataSource.addItem(item);

			dataSource.getAllItems().then(function(res){
				console.log(res);
			});
			$scope.itemName = "";
			$scope.amountOf = "";
		}

		$scope.removeItem = function(item){
   			$scope.list.splice(item, 1);
   			dataSource.removeItem(item);
   		};


}]);

app.factory("dataSource", function($http){
	return {
		getAllItems: function(item){
			return $http({
				method: "GET",
				url: "http://localhost:3000/allItems",
				data: item
			})
		},
		addItem: function(item){
			return $http({
				method: "POST",
				url: "http://localhost:3000/addItem",
				data: item
			})
		},
		removeItem: function(item){
			return $http({
				method: "POST",
				url: "http://localhost:3000/removeItem",
				data: item
			})
		}
	};
});
