// @flow
import Component from './Component.js';

/* Squelette d'une page */
export default class Page extends Component {
	#title:string;
	constructor( title:string, children:void|string|Array<string|Component> ){
		super('section', null, children);
		this.#title = title;
	}

	renderTitle():string {
		return `<div class="content is-vcentered has-text-centered"><h1 class="subtitle is-3">${this.#title}</h1></div><br />`;
	}
	mount():void {
	}
}
