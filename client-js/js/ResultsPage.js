// @flow
import BusThumbnail from './BusThumbnail.js';
import Page from './Page.js';

/* Page de résulats après recherche même fonctionnement que HomePage.js */

export default class ResultsPage extends Page {
	#data;
	constructor( data:Array<{prix:number, temps:number, ARRETS:string}> ){
		super( 'Votre recherche' );
		this.data = data;
	}
	/* permet de changer les données a afficher selon le résulat de l'API */
	set data(value:Array<{prix:number, temps:number, arrets:string}>):void {
		this.#data = value;
		/* Créé une étiquette par ligne à partir des donées reçus  */
		this.children = this.#data.map( bus => new BusThumbnail(bus) )
	}

}