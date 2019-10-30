// @flow
import $ from 'jquery';
import Page from './Page.js';
import PageRenderer from './PageRenderer.js';
import ResultsPage from './ResultsPage.js';

export default class BusSearch extends Page {
	constructor(){
		super('Recherchez selon vos critères!');
	}
	
	
	
/* simple délcaration html des formulaire de recherche */

	render():string {
		return `
		<div class="field has-addons has-addons-centered">
		<div class="box">
			<form id="simpleSearchBusPage">
				<div class="control">
					<label class="label">Recherche rapide:</label>
				<br />
		
  				<div class="select is-primary">
					<select id="mode">
						<option value="0" >Le moins long</option>
						<option value="1" >Le moins cher</option>
					</select>
				</div>
				</div>
			
			<div class=" has-text-centered">
			<br />
				<button type="submit" class="button is-primary">Go!</button>
			</div>
			</form>
		</div>
		</div>
		
		<br />
		<hr class="navbar-divider"/>
		<br />

		<div class="field has-addons has-addons-centered">
		<div class="box">
			<form id="searchBusPage">
				<div class="control">
					<label class="label">Recherche affinée :</label>
			<br />
				<label class="label is-small">Votre budget voyage :</label>
				<input type="number" id="budget" class="input is-primary" required>
		
				<label class="label is-small"> Votre temps de voyage : </label>
				<input type="text" id="duree" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" placeholder="Exemple: 03:30"class="input is-primary" required>
		
				</div>

			<div class=" has-text-centered">
			<br />
				<button type="submit" class="button is-primary">En route!</button>
			</div>
			</form>
		</div>	
		</div>`;
	}

	
	mount():void {
		/* On écoute les evenements sur les boutons des deux formulaires */
		document.getElementById('simpleSearchBusPage').addEventListener('submit', this.submitRapide);
		document.getElementById('searchBusPage').addEventListener('submit', this.submit);

	}
	

	/* La methode de recherche rapide à été submit */
	submitRapide(event:Event):Boolean{
		event.preventDefault
		/** On récupère la selection au niveau de la recherche rapide 
		 * 
		 * Sachant que 0 = "Le plus rapide" et 1 "Le moins cher"
		*/
		let select:string = document.getElementById('mode').value;

		/* Construction d'une page résultat vide */
		const resultsPage:ResultsPage = new ResultsPage([]);
		switch(select){
			
			/*Cas "le plus rapide" on appel l'API */
			case '0': $.ajax({

				url : 'http://localhost:8080/speed',
				type : 'GET',
				dataType : 'json',
				async: false,
				success : function(json){
					/* Cas trouvé, on enrichis la page vide du resultat et on la rend dispo */
					resultsPage.data = json;
					PageRenderer.renderPage(resultsPage);
					}
				})	
				return true;
				
			/*Cas "le moins cher" on appelle l'API */
			case '1': $.ajax({

				url : 'http://localhost:8080/cheap',
				type : 'GET',
				dataType : 'json',
				async: false,
				success : function(json){
					/* Cas trouvé, on enrichis la page vide du resultat et on la rend dispo */
					resultsPage.data = json;
					PageRenderer.renderPage(resultsPage);
					}
				})		
				return true;
		}
	}



/* La recherche plus affinée à été submit */
	submit(event:Event):void {
		event.preventDefault();
		

		/* Construction d'une page résultat vide */
		const resultsPageAffine:ResultsPage = new ResultsPage([]);


		/* Note importante : les heures seront toujours convetis en minutes */
		/* Si la saisie est correcte on lance et qu'on est dans le cas ou les deux champs sont renseignés la recherche via l'api*/


		/* conversion en minutes... */
		let valueOfDuree:string = $("#duree").val().split(":");
		let toMinutes:number = (parseInt(valueOfDuree[0]) * 60) + parseInt(valueOfDuree[1]);


		/** Appel l'API afin de récupérer toutes les lignes de bus avec les crytères demandé **/
		$.ajax({

				url: `http://localhost:8080/search/${$("#budget").val()}/${toMinutes}`,
				type: 'GET',
				dataType: 'json',
				async: false,
				success: function(json){
					/* Cas trouvé, on enrichis la page vide du resultat et on la rend dispo */
					resultsPageAffine.data = json;
					PageRenderer.renderPage(resultsPageAffine);
				}
		})

	}

}