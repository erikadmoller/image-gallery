angular.module('basic.controllers', []) 
.controller('loadingCtrl', function($scope, $interval, $http) {

	$scope.img = '';
	$scope.imgCaption = '';

	$scope.sendData = function(img, imgCaption) {

		// Validating input

		var errorArray = [
		'Image URL cannot be empty',
		'Image URL must start with a http://',
		'Image Caption cannot be empty',
		];

		if($scope.img === '') {
			$scope.emptyImgError = errorArray[0];
			console.log($scope.emptyImgError);
		}
		else {
			console.log('There is an IMG URL');
		}
		if($scope.img.substring(0, 7) !== 'http://' && $scope.img.substring(0, 8) !== 'https://') {
			$scope.emptyImgError = errorArray[1];
		} 
		else {
			console.log('IMG includes http://');
		}
		if($scope.imgCaption === '') {
			$scope.emptyCapError = errorArray[2];
		}
		else {
			console.log('caption is not empty')
		}
	

		var foundImage = _.findWhere($scope.item, {imgURL: img})
		

// Sending to server

		if(foundImage === undefined) {
			$http.post(
				'https://tiny-pizza-server.herokuapp.com/collections/emoller-ang', {
					imgURL: img,
					caption: imgCaption
			})

			.success(function(response) {
					console.log(response);	
			})
			.error(function(err) {
				console.log('Error!');
				console.log(err);
			});
		}
		else {
			alert('That message already existed');
		}

	}

// Getting from server

	function getSubmit() {

		var promise = $http.get('https://tiny-pizza-server.herokuapp.com/collections/emoller-ang')
		.success(function(response) {

			$scope.item = [];
			for(var i=0; i<response.length; i++) {

				console.log(i);
				console.log(response[i]);
				console.log(response[i].imgURL);

					if(response[i].imgURL && response[i].caption) {
						$scope.item.push(response[i]);
						console.log($scope.item);
					}
			}

			console.log(response);
		})

		.error(function(err) {
			console.log(err);
		})

	}
getSubmit();

	$interval(getSubmit, 5000);

	$scope.menuCollapse = function() {
		$scope.wrapper = !$scope.wrapper;
	}

});

