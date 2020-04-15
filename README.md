## notify

### introduction 

```javascript
// according to your deployment
<link href="dist/assets/notify/notify.css" rel="stylesheet" type="text/css" />
<script src="dist/assets/notify/notify.js"></script>
```

### use

```javascript
	ms_notify(selector, options)
```

the `selector` parameter is a HTMLElement or string passed into the querySelector.
The default configuration for the options parameter is shown below.

```javascript
// demo
<div id="demo">
	message
</div>
<script>
		window.onload = () => {
			var notify = window.ms_notify('#demo' , {
				delay: 5000
			})
			notify.show();
		}
</script>
```

### default options

```javascript
{
	width: 320,
	height: 188,
	offset: 20,
	delay: 5000, // ms
	placement: 'bottom-right', // bottom-right bottom-left top-right top-left
	direction: 'toTop', // toTop toLeft toBottom toRight
	timingFunction: 'ease', // linear ease ease-in ease-in-out ease-out step-start step-end
	message: '还有 #{delay}S 关闭' // tip text
}
```

- totice the correspondence

| placement | direction | 
| ---------| ----------|
| bottom-right | toTop, toLeft |
| bottom-left | toTop, toRight |
| top-right | toLeft, toBottom |
| top-left | toRight, toBottom |

### api 

- show
- hide