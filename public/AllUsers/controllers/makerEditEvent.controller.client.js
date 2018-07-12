(function () {
	angular
		.module('jordanEvents')
		.controller('makerEditEventController', makerEditEventController);

	function makerEditEventController(eventsService, $location, loggedMaker, userService){
		var model = this;

		function init(){
			model.updateEventMain = true;
			model.loggedMaker = loggedMaker;
			eventsService
				.findEventsByMakerId(loggedMaker._id)
				.then(function(events){
					model.eventsList = events;
				});
			model.selectedEvent = null;

			// userService
			// 		.checkUserLogin()
			// 		.then(function(result){
			// 			if(result){
			// 				model.loggedUser = result;
			// 			}
			// 		});
		}
		init();

		model.updateEvent = updateEvent;
		model.selectEvent = selectEvent;
		model.logout = logout;
		model.updateMainEventDetails = updateMainEventDetails;


		function updateMainEventDetails(updatedEvent, daysOfWeek){

			// create dates based on start-end dates and the days of the weeks
			var start = new Date(updatedEvent.startingDate);
			var end = new Date(updatedEvent.expiryDate);
			var days = [];
			var eventDays = [];
			for(var i in daysOfWeek){
				if(daysOfWeek[i] === true){	
					switch (i) {
					    case "Sun":
					        days.push(0);
					        break;
						case "Mon":
					        days.push(1);
					        break;
						case "Tue":
					        days.push(2);
					        break;
						case "Wed":
					        days.push(3);
					        break;
						case "Thu":
					        days.push(4);
					        break;
				        case "Fri":
				     	    days.push(5);
				     	    break;
						case "Sat":
					        days.push(6);
					        break;
					}
				}
			}
			
			// Store the selected days per week
			updatedEvent.daysPerWeek = days;

			// Create the event days for the period of the event.
			for (start; end >= start; start.setDate(start.getDate()+1)){
				inner:
				for(var j in days){
					if(start.getDay() === days[j]){
						eventDays.push(start.toDateString());
						break inner;
					}	
				}
			}

			
			// When update: check if the days per week is changed
			for(var e in model.selectedEvent.eventDays){
				if(model.selectedEvent.eventDays[e] !== eventDays[e]){
					// If the days chaned then store the new days per week
					updatedEvent.eventDays = eventDays;
					
					// temporary store the old details for each day in array
					var detailsArray = [];
					for(var n in updatedEvent.programDailyDetails){
						detailsArray.push(updatedEvent.programDailyDetails[n]);
					}

					// remove the old details for old days
					for(var h in updatedEvent.programDailyDetails){
						delete updatedEvent.programDailyDetails[h];
					}
					
					// store the daily details in the new dates
					for(var d in updatedEvent.eventDays){
						updatedEvent.programDailyDetails[updatedEvent.eventDays[d]] = detailsArray[d];
					}

					console.log(updatedEvent);
					break;
				}
			}

			
			// switch to the next form 
			model.updateEventMain = false;
			model.updateEventProgramDetails = true;
		}


		function updateEvent(updatedEvent){
			console.log(updatedEvent);
			// var eventId = model.selectedEvent._id;
			// eventsService.updateEvent(newEvent, eventId)
			// 	.then(function(updatedEvent){
			// 		var url = "/makerProfile";
			// 		$location.url(url);
			// 	});
		}

		function selectEvent(eventId){
			eventsService.findEventByEventId(eventId)
				.then(function(event){
					// model.foundEvent = event;
					event.startingDate = new Date(event.startingDate);
					event.expiryDate = new Date(event.expiryDate);
					model.selectedEvent = event;
				});
			// return model.foundEvent;
		}

		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}

	}
})();