
import {h} from '@component/element';
import {cssPrefix} from '@src/config';
import MsHeader from '@component/msheader'
import '@component/iconfont';
import './index.scss';

const defaultOptions = {
	width: 320,
	height: 188,
	offset: 20,
	delay: 5000,
	placement: 'bottom-right', // bottom-right bottom-left top-right top-left
	direction: 'toTop', // toTop toLeft toBottom toRight
	timingFunction: 'ease', // linear ease ease-in ease-in-out ease-out step-start step-end
	message: '还有 #{delay}S 关闭'
}

const HeaderHeight = 40;

function closeNotify() {
	return this.hide()
}

class Notify {

	constructor(selector, options = {}){
		if (!selector) {
			throw new Error('selector is a required parameter')
		}
		this.showCss = {};
		this.hideCss = {};

		let contentEl;

		if(typeof selector === 'string') {
			contentEl = h(document.querySelector(selector))
		} else {
			contentEl = h(selector)
		}
		this.data = Object.assign({}, defaultOptions, options)
		const {width, height, placement, direction, timingFunction} = this.data;
		this.rootel = h('div', `${cssPrefix} ${placement} ${direction}`);
		const initCss = {
			width: `${width}px`,
			height: `${height}px`,
			'transition-timing-function': timingFunction
		}

		this.init()

		
		this.rootel.setCss(Object.assign({}, initCss, this.hideCss)).children(this.header = new MsHeader(this.data), contentEl)
		this.header.icon.iconClickHandler = () => {
			closeNotify.call(this)
		};
		document.body.appendChild(this.rootel.el);
	}

	init(){
		const {width, height, placement, direction, offset} = this.data;
		if (placement === 'bottom-right') {
			if (direction === 'toTop') {
				this.showCss.bottom = `${0 + offset}px`;
				this.hideCss.bottom = `-${height + offset + HeaderHeight}px`;
				this.hideCss.right = `${0 + offset}px`;
			}
			if (direction === 'toLeft') {
				this.showCss.right = `${0 + offset}px`;
				this.hideCss.right = `-${width + offset}px`;
				this.hideCss.bottom = `${0 + offset}px`;
			}
		}

		if (placement === 'bottom-left') {
			if (direction === 'toTop') {
				this.showCss.bottom = `${0 + offset}px`;
				this.hideCss.bottom = `-${height + offset + HeaderHeight}px`;
				this.hideCss.left = `${0 + offset}px`;
			}
			if (direction === 'toRight') {
				this.showCss.left = `${0 + offset}px`;
				this.hideCss.left = `-${width + offset}px`;
				this.hideCss.bottom = `${0 + offset}px`;
			}
		}

		if (placement === 'top-right') {
			if (direction === 'toBottom') {
				this.showCss.top = `${0 + offset + HeaderHeight}px`;
				this.hideCss.top = `-${height + offset + HeaderHeight}px`;
				this.hideCss.right = `${0 + offset}px`;
			}
			if (direction === 'toLeft') {
				this.showCss.right = `${0 + offset}px`;
				this.hideCss.right = `-${width + offset}px`;
				this.hideCss.top = `${0 + offset + HeaderHeight}px`;
			}
		}

		if (placement === 'top-left') {
			if (direction === 'toBottom') {
				this.showCss.top = `${0 + offset + HeaderHeight}px`;
				this.hideCss.top = `-${height + offset + HeaderHeight}px`;
				this.hideCss.left = `${0 + offset}px`;
			}
			if (direction === 'toRight') {
				this.showCss.left = `${0 + offset}px`;
				this.hideCss.left = `-${width + offset}px`;
				this.hideCss.top = `${0 + offset + HeaderHeight}px`;
			}
		}
	}

	show(){
		const {delay} = this.data;

		this.header.setTitle(delay/1000)
		
		this.rootel.setCss(this.showCss)
		clearInterval(this.TimeId)
		if (delay) {
			let timeDelay = delay / 1000;
			this.TimeId = setInterval(() => {
				timeDelay = timeDelay - 1;
				this.header.setTitle(timeDelay)
				if (timeDelay <= 0) {
					this.hide()
					clearInterval(this.TimeId)
					
					const tid = setTimeout(() => {
						this.header.setTitle(delay / 1000);
						clearTimeout(tid)
					}, 1000)
				}
			}, 1000);
		}
	}

	hide(){
		this.rootel.setCss(this.hideCss)
	}
}

const notify = (selector, options = {}) =>new Notify(selector, options);
if (window) {
  window.ms_notify = notify;
}

export default Notify;
export { notify };