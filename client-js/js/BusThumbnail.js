// @flow
import Component from './Component.js';

/* code d'une étiquette, généré à partir des données de l'api, selection des balise générés par Component.js */
export default class BusThumbnail extends Component {
	constructor(bus:{prix:number, temps:number, ARRETS:string}){
		super('section', {name:'class', value:'hero is-info'}, [
			new Component('div', {name:'class', value:'hero-body'}, [
				new Component('h1', {name:'class', value:'title'}, `${bus.prix}€`), //** balise pour le prix imbriquée dans section et div **/
				new Component('h2', {name:'class', value:'subtitle'}, `Temps de trajet : ${Math.floor(bus.temps /60)}h${bus.temps % 60}`), //** balise pour le temps imbriquée dans section et div **/
				new Component('h3', {name:'class', value: "subtitle is-2"},`${bus.ARRETS}`) //** balise pour les arrets imbriquée dans section et div **/
				
			
						
					]) /** </div> **/
				]); /** </section> **/
	}
}
