(function(){
	angular
		.module('jordanEvents')
		.controller('registerUserController', registerUserController);

		function registerUserController(userService, makerService, $location, $rootScope){
			var model = this;

			function init(){
				userService
					.checkUserLogin()
					.then(function(result){
						if(result){
							model.loggedUser = result;
						}
					});

				makerService
					.checkMakerLogin()
					.then(function(result){
						if(result){
							model.loggedMaker = result;
						}
					});
			}
			init();	
			model.registerUser = registerUser;

			function registerUser(user, password2){
				if (!user){
					model.error = 'Please fill all the requested fields';
					return;
				}
				if (user.password === password2){
					model.error = null;
					// 1. check if user eamil already exist
					// var promiseFindUserByEmail = userService.findUserByEmail(user.email);
					// promiseFindUserByEmail.then(function(response){
					// 	// 2. if the user email not exists (return 0) then add the user to the users in the server
					// 	if(response.data === '0'){
					// 		var promiseAddNewUser = userService.addNewUser(user);
					// 		promiseAddNewUser.then(function(response){
					// 			var newUser = response.data;
					// 			console.log('new user added to users: '+ newUser);
					// 			$rootScope.loggedUser = newUser;
					// 			$location.url('/userProfile/'+newUser.userId);
					// 			return;
					// 		});
					// 	} else {
					// 		model.error = 'This email is already registered';
					// 	}
					// });


					// 1. check if user eamil already exist
					userService.findUserByEmail(user.email)
						.then(function(response){
						// 2. if the user email not exists (return 0) then add the user to the users in the server
							if(response.data === '0'){
								// return the added user object
								return userService
											.addNewUser(user)
											.then(function(response){
												console.log('here');
												$location.url('/userProfile');
												return response;
											});
							} else {
								model.error = 'This email is already registered';
								return;
							}
						})
						// the response will be the new added user.
						// .then(function(response){
						// 	console.log('reach here')
						// 	// var newUser = response.data;
						// 	// $rootScope.loggedUser = newUser;
						// 	$location.url('/userProfile');
						// 	return;
						// });



				// 	if (newUser === null){
				// 		model.error = 'This email is already registered'
				// 	} else {
				// 		$rootScope.loggedUser = newUser;
				// 		$location.url('/userProfile/'+newUser.userId)
				// 	}
				// } else {
				// 	model.error = 'Please double check that the two passwords are matched';
				}
			}
		}
})();