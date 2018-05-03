(function(){
	angular
		.module('jordanEvents')
		.controller('allEventsController', allEventsController);

	function allEventsController(eventsService, userService, makerService){
		var model = this;
		
		function init(){
			eventsService.getAllEvents()
				.then(function(events){
					model.eventsList = events;		
				});

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
	}
})();