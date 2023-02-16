const templ = {
	findX(data){
		const divH = help.makeElement('div');
		divH.innerHTML = `<div>
			<h3>Cari Guru</h3>
			<input id=inputX placeholder='Masukan Nama Guru'>
		</div>`;
		const divE = help.makeElement('div');
		divE.id = 'Listing';
		divH.appendChild(divE);
		divH.innerHTML += '<div><span id=close>close</span></div>';
		divH.find('input').onchange = function(){
			help.get(document,'#Listing').innerHTML = '';
			data.forEach(config=>{
				if(config.name.toLowerCase().search(this.value.toLowerCase())!=-1){
					const div = help.makeElement('div');
					div.innerHTML = `<span id=${config.id}>${config.name}</span>`;
					div.find('span').onclick = function(){
						app.reset();
						app.render(app.data[this.id]);
						help.get(document,'.bound').remove();
					}
					help.get(document,'#Listing').appendChild(div);
				}
			});
		}
		return divH;
	},
	navHTML(){
		const span = help.makeElement('span');
		span.appendChild(app.assets.moremenuicon);
		return span;
	},
	navBuild(){
		const div = help.makeElement('div');
		div.id = 'nav';
		div.appendChild(this.navHTML());
		help.get(document,'main').appendChild(div);
		
	}	
}

const app = {
	settings:{},
	getMore:false,
	maps:[],
	assets:{},
	load(config){
		let i = 0;
		const process = function(global){
			const image = new Image();
			image.src = config.files[i].src;
			image.onload = ()=>{
				if(config.files[i].onload)config.files[i].onload(image);
				global.assets[config.files[i].id] = image;
				if(i<config.files.length-1){i++;process(global);}
				else{
					if(config.onend)config.onend();
				}
			}
		}
		process(this);
	},
	init(config){
		this.settings = help.objectAppendProps(this.settings,config.settings||{});
		this.canvas = help.get(document,'canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas = help.objectAppendProps(this.canvas,config.settings.canvas);
		//this.buttons();
		if(config.onload)config.onload(this);
		//togle for adding more data.
 		addEventListener('mousedown',(e)=>{
			if(this.getMore)this.moreData(e)})
	},
	render(data){
		// //rendering path
		// console.log(data);
		// this.ctx.strokeStyle = 'red';
		// this.ctx.beginPath();
		// this.ctx.lineWidth = 8;
		// this.data.paths[data.pathName].forEach(path=>{
		// 	this.ctx.moveTo(path.moveTo.x,path.moveTo.y);
		// 	this.ctx.lineTo(path.lineTo.x,path.lineTo.y);
		//  	this.ctx.stroke();
		//  });
		
		// this.ctx.drawImage(this.assets.topArrow,180-34/2,520-34/2,34,34);
		
		// this.ctx.drawImage(this.assets.leftArrow,335-34/2,285-34/2,34,34);
		
		// this.ctx.drawImage(this.assets.rightArrow,data.arrowPos.x-34/2,data.arrowPos.y-34/2,34,34);
		
		this.ctx.drawImage(this.assets.placeholder,data.placeHolderPos.x-34,data.placeHolderPos.y-34,34,34);
		this.ctx.font = '14px sans-serif';
		this.ctx.fillStyle = 'red';
		this.ctx.fillText(data.name,data.placeHolderPos.x-34,data.placeHolderPos.y-25);
		//moving the scroll bar, to the position of placeholder. so we can view it.
		document.body.scrollTo(data.placeHolderPos.x-100,data.placeHolderPos.y-100);
	},
	buttons(){
		const x = {
			findX(){
				const bound = help.makeBound('div');
				bound.onclick = null;
				const div = help.makeElement('div');
				div.className = 'boundcard';
				div.appendChild(templ.findX(dataOut.teacherList));
				bound.appendChild(div);	
				help.get(document,'main').appendChild(bound);
			},
			donate(){
			
			}	
		}
		help.get(document,'#nav').onclick = x.findX;
	},
	reset(){
		this.canvas.width = this.assets.map1.width;
		this.canvas.height = this.assets.map1.height;
		this.ctx.drawImage(this.assets.map1,0,0,this.assets.map1.width,this.assets.map1.height);
	},
	moreData(e){
		//e gonna be some simple data from Mouseevent.
		console.log(e);
		const data = {
			id:prompt('Give me the id','Manuk'),
			name:prompt('Give me the name','Manuk gedang'),
			dataId:prompt('DataId','Manuk Kecil'),
			pathName:prompt('PathName','b1'),
			placeHolderPos:{x:e.layerX-e.srcElement.offsetWidth*0.5,y:e.layerY-e.srcElement.offsetTop*0.5}
		}
		//mergin new data.
		dataOut.teacherList.push({id:data.id,name:data.name});
		dataOut[data.id] = {
			name:data.name,
			pathName:data.pathName,
			placeHolderPos:data.placeHolderPos
		}
		//this.getMore = false;
	},
};

app.init({
	settings:{
		canvas:{
			width:664,
			height:1327
		}
	},
	onload(obj){
		//called first time.
		//i wanna load all of the assets.
		obj.load({
			files:[
				{id:'map1',src:'/media?fn=map.jpg',onload(file){obj.map = file}},
				//{id:'map1',src:'/media?fn=map2.jpg'},
				{id:'topArrow',src:'/media?fn=top-arrow.png'},
				{id:'leftArrow',src:'/media?fn=left-arrow.png'},
				{id:'rightArrow',src:'/media?fn=right-arrow.png'},
				{id:'placeholder',src:'/media?fn=placeholder.png'},
				{id:'moremenuicon',src:'/media?fn=moremenu.png'}
			],
			onend(){
				obj.canvas.width = obj.assets.map1.width;
				obj.canvas.height = obj.assets.map1.height;
				obj.ctx.drawImage(obj.assets.map1,0,0,obj.assets.map1.width,obj.assets.map1.height);
				obj.data = dataOut;
				//building navigation div.
				templ.navBuild();
				obj.buttons();
			}
		})
	}
});

