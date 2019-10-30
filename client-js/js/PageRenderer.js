// @flow
import Page from './Page';

/* rendu de la page */
export default class PageRenderer {

	static titleElement:?HTMLElement;
	static contentElement:?HTMLElement;

	static renderPage( page:Page ):void {
		if (this.titleElement){
			this.titleElement.innerHTML = page.renderTitle();
		}
		if (this.contentElement){
			this.contentElement.innerHTML = page.render();
		}
		page.mount();
	}
}
