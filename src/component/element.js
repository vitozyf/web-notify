class Element {
	constructor (el, className = ''){
		if (typeof el === 'string') {
			this.el = document.createElement(el);
			this.el.className = className;
		} else {
			this.el = el;
		}
	}

	setCss(opt = {}) {
		Object.keys(opt).forEach(key => {
			this.el.style[key] = opt[key]
		});
		return this;
	}
	setAttr(opt = {}) {
			Object.keys(opt).forEach(key => {
			this.el.setAttribute(key, opt[key])
		});
		return this;
	}
	show(){
		this.setCss({display: 'block'});
		return this;
	}
	hide(){
		this.setCss({display: 'none'});
		return this;
	}

	child(arg) {
    let ele;
    if (typeof arg === 'string') {
      ele = document.createTextNode(arg);
    } else if (arg instanceof Element) {
      ele = arg.el;
    } else {
      ele = document.createTextNode('');
    }
    this.el.appendChild(ele);
    return this;
  }

	
  children(...eles) {
    eles.forEach(ele => this.child(ele));
    return this;
  }

	setHtml(content) {
    if (content !== undefined) {
      this.el.innerHTML = content;
    }
    return this;
  }

	on(eventNames, handler) {
    const [fen, ...oen] = eventNames.split('.');
    let eventName = fen;
    if (
      eventName === 'mousewheel' &&
      /Firefox/i.test(window.navigator.userAgent)
    ) {
      eventName = 'DOMMouseScroll';
    }
    this.el.addEventListener(
      eventName,
      (evt) => {
        handler(evt);
        for (let i = 0; i < oen.length; i += 1) {
          const k = oen[i];
          if (k === 'left' && evt.button !== 0) {
            return;
          }
          if (k === 'right' && evt.button !== 2) {
            return;
          }
          if (k === 'stop') {
            evt.stopPropagation();
          }
        }
      },
      false
    );
    return this;
  }
}

const h = (el, className) => {
	return new Element(el, className)
}

export {
	Element,
	h
}