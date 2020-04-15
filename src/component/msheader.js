import {h, Element} from './element';
import {cssPrefix} from '@src/config'
import Icon from '@component/icon';

export default class MsHeader extends Element {
	constructor(data){
		super('div', `${cssPrefix}-header`)
		this.data = data;
		this.icon = new Icon('iconsearchclose', '关闭');
		this.title =  h('div',  `${cssPrefix}-title`);
		const {delay} = this.data;
		this.children(this.title, this.icon.el);
	}

	setTitle(delay){
		const {message} = this.data;
		this.title.setHtml(message.replace(/\#\{delay\}/, delay));
	}
}