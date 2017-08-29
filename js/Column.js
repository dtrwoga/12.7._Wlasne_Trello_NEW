// 2. IMPLEMENTACJA KLASY COLUMN

	function Column(id, name) {
    	var self = this; // useful for nested functions
		this.id = id;
    	this.name = name || 'No name given';    
	    this.$element = createColumn();

    	function createColumn() {
    	
    	// tworzenie elementów, z których będzie składała się kolumna
		
			var column = $('<div class="column" id="'+ self.id +'"></div>');//tworzymy $element.$column, który będzie divem z klasą 'column'
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);//tworzymy tytuł kolumny, który znajduje się we właściwości name (Dostaniemy się do niej przez zmienną self)
			var $columnCardList = $('<ul>').addClass('column-card-list');//lista na kartki
			var $columnDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-trash-o"></i>');//przycisk usuwania listy
			var $columnAddCard = $('<p>').addClass('add-card').text('Add a card');//przycisk dodawania nowej karty

		// Podpinanie zdarzeń

			//Kasowanie kolumny po kliknięciu w przycisk
			$columnDelete.click(function() {
    		    self.removeColumn();
			});
			//Add a note after clicking on the button:
			columnAddCard.click(function(event) {
		var cardName = prompt("Enter the name of the card");
		event.preventDefault();
		$.ajax({
		    url: baseUrl + '/card',
		    method: 'POST',
		    data: {
		    name: cardName,
		    bootcamp_kanban_column_id: self.id
		    },
	    	success: function(response) {
		        var card = new Card(response.id, cardName);
		        self.createCard(card);
	    	}
		});
		});

			

		//Konstruowanie kolumny

			$column.append($columnTitle)
			        .append($columnDelete)
			        .append($columnAddCard)
			        .append($columnCardList);
			
		// Return of created column
			
			return $column;//UWAGA! Element kolumny należy zwrócić! (return $column). 
			//Bez tego nie mielibyśmy odniesienia do stworzonego elementu tam, gdzie wywołujemy funkcję.

		}//koniec funkcji createColumn

  	}//koniec funkcji Column

  	//METODY DLA KLASY COLUMN

  	Column.prototype = {
  		addCard: function(card) {
	    	this.$element.children('ul').append(card.$element);
    	},
    	deleteColumn: function() {
    		var self = this;
   			$.ajax({
			    url: baseUrl + '/column/' + self.id,
			    method: 'DELETE',
		      	success: function(response){
		        	self.element.remove();
      			}
    	});
 	}
	};

	