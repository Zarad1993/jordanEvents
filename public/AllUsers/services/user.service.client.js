(function() {
	angular
		.module('jordanEvents')
		.service('userService', userService);

	function userService($http) {

		this.findUserById = findUserById;
		this.findUserByEmail = findUserByEmail;
		this.login = login;
		this.createUser = createUser;
		this.checkUserLogin = checkUserLogin;
		this.logout = logout;
		this.isMaker = isMaker;
		this.isAdmin = isAdmin;
		this.addEventToUserEventsList = addEventToUserEventsList;
		this.removeRegisteredEvent = removeRegisteredEvent;
		this.getAllUsers = getAllUsers;
		this.forgetPassword = forgetPassword;
		this.resetPassword = resetPassword;
		this.updateProfile = updateProfile;
		this.makePayment = makePayment;


		function init() {}
		init();

		function makePayment(payment){
			var url = '/api/maker/makePayment'
			return $http.post(url, payment)
			// console.log(payment);
		}

		function updateProfile(updatedProfile){
			var url = '/api/user/updateProfile'
			return $http.put(url, updatedProfile);
		}

		function forgetPassword(email){
			var url = '/api/forgetPassword/'+email;
			return $http.post(url);
		}

		function resetPassword(token, password){
			var url = '/api/resetPassword/'+token;
			return $http.post(url, {password: password});
		}


		function getAllUsers(){
			return $http.get('/api/user/getAllUsers');
		}

		function addEventToUserEventsList(event){
			var url = '/api/addEventToUser';
				return $http.post(url, event);
		}

		function removeRegisteredEvent(userId, eventId){
				var url = '/api/removeEventFromUser/'+eventId;
				return $http.delete(url);
			}

		function logout(){
			return $http
					.post('/api/logout')
					.then(function(response){
						return response.data;
					});
		}



		function findUserById(userId) {
			var url = '/api/user/findUserById/' + userId;
			return $http.get(url)
				.then(function(response) {
					var userProfile = response.data;
					return userProfile;
				});
		}

		function findUserByEmail(email) {
			var url = '/api/user/findUserByEmail/'+email;
			return $http.get(url)
				.then(function(response) {
					var result = response.data;
					if(result.email){
						return ('email already exist');
					} else{
						return result;
					}
				});
		}

		function login(username, password) {
			var url = '/api/user/login';
			return $http.post(url, {username: username, password: password})
				.then(function(response) {
					if(response.data === null){
						return '0';
					}
						return response.data;
				},
				function(err){
					return err;
				});
		}

		
	

		function createUser(user){
			return $http.post('/api/user/', user)
				.then(function(response){
					return(response.data);
				});
		}




		function checkUserLogin(){
			var url = '/api/checkUserLogin';
			return $http
					.get(url)
					.then(function(result){
						return result.data;
					});
		}

		function isMaker(){
			return $http
					.get('/api/isMaker')
					.then(function(result){
						return result.data;
					});
		}

		function isAdmin(){
			return $http
					.get('/api/admin/isAdmin')
					.then(function(result){
						return result.data;
					});
		}

	}
})();