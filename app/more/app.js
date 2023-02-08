const data = {
	teacherList:[
		{id:'susantiElsa',name:'ElsaSusanti'},
		{id:'sinawatiHaka',name:'Hakasinawati'},
		{id:'elizaRatna',name:'RatnaEliza'},
		{id:'solinda',name:'Solinda'}	,
		{id:'eviMem',name:'Mem Evi'}
	],
	susantiElsa:{
		name:'Elsa Susanti',
		path:[
			{
				moveTo:{x:335,y:285},
				lineTo:{x:360-180,y:285}	
			},
			{
				moveTo:{x:360-180,y:295},
				lineTo:{x:360-180,y:295-220}	
			},
			{
				moveTo:{x:360-180,y:295-220},
				lineTo:{x:360-150,y:295-220}	
			},
			{
				moveTo:{x:180,y:540-20},
				lineTo:{x:360-180,y:295}	
			}
		],
		placeHolderPos:{x:322,y:62},
		arrowPos:{x:208,y:74}
	},
	elizaRatna:{
		name:'Ratna Eliza',
		path:[
			{
				moveTo:{x:335,y:285},
				lineTo:{x:360-180,y:285}	
			},
			{
				moveTo:{x:360-180,y:295},
				lineTo:{x:360-180,y:295-220}	
			},
			{
				moveTo:{x:360-180,y:295-220},
				lineTo:{x:360-150,y:295-220}	
			},
			{
				moveTo:{x:180,y:540-20},
				lineTo:{x:360-180,y:295}	
			}
		],
		placeHolderPos:{x:238,y:81},
		arrowPos:{x:208,y:74}
	},
	sinawatiHaka:{
		name:'HakaSinawati',
		path:[
			{
				moveTo:{x:335,y:285},
				lineTo:{x:360-180,y:285}	
			},
			{
				moveTo:{x:360-180,y:295},
				lineTo:{x:360-180,y:295-220}	
			},
			{
				moveTo:{x:360-180,y:295-220},
				lineTo:{x:360-150,y:295-220}	
			},
			{
				moveTo:{x:180,y:540-20},
				lineTo:{x:360-180,y:295}	
			}
		],
		placeHolderPos:{x:321,y:95},
		arrowPos:{x:208,y:74}
	},
	solinda:{
		name:'Solinda Mpd',
		path:[
			{
				moveTo:{x:335,y:285},
				lineTo:{x:360-180,y:285}	
			},
			{
				moveTo:{x:360-180,y:295},
				lineTo:{x:360-180,y:295-220}	
			},
			{
				moveTo:{x:360-180,y:295-220},
				lineTo:{x:360-150,y:295-220}	
			},
			{
				moveTo:{x:180,y:540-20},
				lineTo:{x:360-180,y:295}	
			}
		],
		placeHolderPos:{x:297,y:92},
		arrowPos:{x:208,y:74}
	},
	eviMem:{
		name:'Mem Evi',
		path:[
			{
				moveTo:{x:335,y:285},
				lineTo:{x:360-180,y:285}	
			},
			{
				moveTo:{x:360-180,y:295},
				lineTo:{x:360-180,y:295-220}	
			},
			{
				moveTo:{x:360-180,y:295-220},
				lineTo:{x:360-150,y:295-220}	
			},
			{
				moveTo:{x:180,y:540-20},
				lineTo:{x:360-180,y:295}	
			}
		],
		placeHolderPos:{x:260,y:81},
		arrowPos:{x:208,y:74}
	}
}

const templ = {
	findX(data){
		console.log(data);
		const divH = help.makeElement('div');
		divH.innerHTML = '<div><h1>Cari Guru</h1></div>';
		const divE = help.makeElement('div');
		divE.id = 'Listing';
		data.forEach(config=>{
			divE.innerHTML += `<div><span id=${config.id}>${config.name}</span></div>`;	
		})
		divH.appendChild(divE);
		divH.innerHTML += '<div><span id=close>close</span></div>';
		return divH;
	}	
}

const app = {
	settings:{},
	init(config){
		console.log(screen.innerWidth,screen.innerHeight);
		this.settings = help.objectAppendProps(this.settings,config.settings||{});
		this.canvas = help.get(document,'canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas = help.objectAppendProps(this.canvas,config.settings.canvas);
		this.buttons();
		if(config.onload)config.onload(this);
// 		addEventListener('mousedown',function(e){
// 			alert(`
// 				x:${app.settings.canvas.width/2+(e.screenX-screen.width/2)}, 
// 				y:${(app.settings.canvas.height/2+(e.screenY-screen.height/2))-80}
// 			`);	
// 		})
	},
	render(data){
		//rendering path
		this.ctx.strokeStyle = 'red';
		this.ctx.beginPath();
		this.ctx.lineWidth = 8;
		data.path.forEach(path=>{
			this.ctx.moveTo(path.moveTo.x,path.moveTo.y);
			this.ctx.lineTo(path.lineTo.x,path.lineTo.y);
			this.ctx.stroke();
		});
		const UarrowImg = new Image();
		UarrowImg.src = 'more/media/top-arrow.png';
		UarrowImg.onload = function(){
			app.ctx.drawImage(this,180-34/2,520-34/2,34,34);
		}
		const LarrowImg = new Image();
		LarrowImg.src = 'more/media/left-arrow.png';
		LarrowImg.onload = function(){
			app.ctx.drawImage(this,335-34/2,285-34/2,34,34);
		}
		const RarrowImg = new Image();
		RarrowImg.src = 'more/media/right-arrow.png';
		RarrowImg.onload = function(){
			app.ctx.drawImage(this,data.arrowPos.x-34/2,data.arrowPos.y-34/2,34,34);
		}
		const placeHolder = new Image();
		placeHolder.src = 'more/media/placeholder.png';
		placeHolder.onload = function(){
			app.ctx.drawImage(this,data.placeHolderPos.x-34/2,data.placeHolderPos.y-34/2,34,34);
			if(help.get(document,'.nameIndicator'))help.get(document,'.nameIndicator').remove();
			app.ctx.font = '12px sans-serif';
			app.ctx.fillStyle = 'red';
			app.ctx.fillText(data.name,data.placeHolderPos.x-34,data.placeHolderPos.y-25);
// 			const name = help.makeElement('span');
// 			name.innerText = data.name;
// 			name.className = 'nameIndicator';
// 			name.style.left = `${data.placeHolderPos.x-34+20}px`;
// 			name.style.top = `${data.placeHolderPos.y+50}px`;
// 			help.get(document,'main').appendChild(name);
		}
	},
	buttons(){
		const x = {
			findX(){
				const bound = help.makeBound('div');
				bound.onclick = null;
				const div = help.makeElement('div');
				div.className = 'boundcard';
				div.appendChild(templ.findX(data.teacherList));
				div.findall('span').forEach(span=>{
					span.onclick = function(){
						app.reset();
						if(this.id!='close')app.render(data[this.id]);
						else{
							if(help.get(document,'.nameIndicator'))help.get(document,'.nameIndicator').remove();
						}
						bound.remove();
					}
				})
				bound.appendChild(div);	
				help.get(document,'main').appendChild(bound);
			},
			donate(){
			
			}	
		}
		help.getall(document,'nav span').forEach(button=>{button.onclick = x[button.id]})
	},
	reset(){
		this.ctx.drawImage(this.map,0,0,this.settings.canvas.width,this.settings.canvas.height);
	}
};

app.init({
	settings:{
		canvas:{
			width:360,
			height:540,
		}
	},
	onload(obj){
		console.log(obj);
		//code here.
		
		const image = new Image();
		image.src = 'more/media/map.jpg';
		image.onload = function(){
			obj.ctx.drawImage(this,0,0,obj.canvas.width,obj.canvas.height);
			//obj.render(data.elizaRatna);
		}
		obj.map = image;
	}
});

