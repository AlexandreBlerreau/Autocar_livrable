// @flow

export default class Component {
	/* Cette class permet de générer des balise html avec tag, atributs, valeur */
	tagName:string;
	children:void|string|Array<string|Component>;
	attribute:?{name:string,value:string};

	constructor( tagName:string = 'div', attribute:?{name:string,value:string}= null, children:void|string|Array<string|Component> = '' ){
		this.tagName = tagName;
		this.attribute = attribute;
		this.children = children;
	}

	/* génère le HTML d'une balise*/
	render():string{
		let html:string = `<${this.tagName} ${this.renderAttribute()}`;
		if ( this.children ){
			html += `>
				${this.renderChildren()}
			</${this.tagName}>`
		}
		else {
			html += ` />`;
		}
		return html;
	}

	renderAttribute():string {
		if ( this.attribute ){
			return `${this.attribute.name}="${this.attribute.value}"`
		}
		return '';
	}

	/* génère l'enfant de la balise  */
	renderChildren():string {
		if (this.children instanceof Array) {
			let html:string = '';
			this.children.forEach( child => {
				/* si il y a une balise imbriquée */
				if(child instanceof Component){
					html+= child.render();
				} else {
				html += child
				}
			});
			return html;
		}
		return this.children || '';
	}
}
