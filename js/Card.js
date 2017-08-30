// 3. IMPLEMENTACJA KLASY CARD

	function Card(id, name) {
		var self = this;
		this.id = id;
		this.name = name || 'No name given';
		this.$element = createCard(); //

		function createCard() {

		// tworzenie elementów, z których będzie składała się karta

			var card = $('<li class="card" id="'+ self.id +'"></li>');
			var $cardDescription = $('<p>').addClass('card-description').text(self.name);
			var $cardDelete = $('<button>').addClass('btn-delete btn-delete-task').html('<i class="fa fa-trash-o"></i>');


		// Podpinanie zdarzeń

			card.append($cardDelete);
			$cardDescription.text(self.name);
			card.append($cardDescription)

			return card;

		}//koniec funkcji createCard

  	}//koniec funkcji Card

  	Card.prototype = {
		removeCard: function() {
		    var self = this;
		    $.ajax({
		      url: baseUrl + '/card/' + self.id,
		      method: 'DELETE',
		      success: function(){
        		self.element.remove();
      		}
    });
}
	}
