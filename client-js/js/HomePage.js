// @flow
import BusThumbnail from './BusThumbnail.js';
import Page from './Page.js';

/* Page d'acceuil */
export default class HomePage extends Page {
	#data;
	constructor( data:Array<{prix:number, temps:number, ARRETS:string}> ){
		super( 'Nos bus' );
		this.data = data;
	}
	/* permet de changer les données a afficher selon le résulat de l'API */
	set data(value:Array<{prix:number, temps:number, arrets:string}>):void {
		this.#data = value;
		
	/* Créé une étiquette par ligne à partir des donées reçus  */
		this.children = this.#data.map( bus => new BusThumbnail(bus) )
	}

}