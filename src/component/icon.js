import {cssPrefix} from '@src/config';
import {h} from '@component/element';

export default class Icon {
	constructor(className = '', title = ''){
		this.el = h('i', `${cssPrefix}-icon iconfont ${className}`)
		this.el.setHtml(`
		<svg class="icon" aria-hidden="true">
			<use xlink:href="#${className}"></use>
		</svg>`).setAttr({
			title
		}).on('click', () => {
			this.iconClickHandler()
		})
	}

	iconClickHandler(){}
}