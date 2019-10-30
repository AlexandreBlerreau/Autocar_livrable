// @flow
import $ from 'jquery';
import HomePage from './HomePage.js';
import PageRenderer from './PageRenderer.js';
import BusSearch from './BusSearch.js';


PageRenderer.titleElement = document.querySelector('.pageTitle');
PageRenderer.contentElement = document.querySelector('.busContainer');

/** génération d'une page vide **/
const homePage:HomePage = new HomePage([]);
PageRenderer.renderPage( homePage ); 


/**  Rendu de la page de recherche **/
const busSearch:BusSearch = new BusSearch();
function renderBusSearch():void{
	PageRenderer.renderPage( busSearch );
}

/**  Detection d'evenement sur le bouton affiner les recherches et affichage de la page **/
const busSearchLink:?HTMLElement = document.getElementById('recherche');
if (busSearchLink) {
	busSearchLink.addEventListener('click', (event:Event)=>{
		event.preventDefault();
		renderBusSearch();
	})
}


/**  Detection d'evenement sur le bouton list des bus et affichage de la page **/
const busListLink:?HTMLElement = document.getElementById('bus');
if (busListLink) {
	busListLink.addEventListener('click', (event:Event)=>{
		event.preventDefault();
		PageRenderer.renderPage(homePage);
	})
}



/** Déclanche l'arrangement de la page principale à partir des données récupérées par l'appel a l'API **/
function displayData(data:any):void{
	if(data){
		homePage.data = data;
	}
	PageRenderer.renderPage(homePage);
}


/** Appel l'API afin de récupérer toutes les lignes de bus avec temps,prix,arrets **/
$.ajax({
       url : 'http://localhost:8080/all',
       type : 'GET',
       dataType : 'json', 
       success : function(json){
       	displayData(json);
       }
           
    });
       



