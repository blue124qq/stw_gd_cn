//copyright by jason [AT] news.southcn.com

//属性 兼容性检测
//下标为IE属性名, 值为FireFox的属性名
var compatibility_ff = {'className':'class'}

var compatibility_ie = {'class':'className'}

var UUA = window.navigator.userAgent.toLowerCase();
var isIE = UUA.indexOf('msie') != -1;
var isFF = UUA.indexOf('firefox') != -1;
var isOpera = UUA.indexOf('opera') != -1;

var isIE8 = UUA.indexOf('msie 8') > -1
var isIE6 = !isOpera && !isIE8 && UUA.indexOf('msie 6') > -1
var isIE67 = isIE6 || UUA.indexOf('msie 7') > -1;

//取内容(innerText)
function getContent(object) {
	if(isIE){
		return object.innerText;
	} else{
		return object.textContent;
	}
}

//设内容
function setContent(object, content) {
	if(isIE){
		object.innerText = content;
	} else{
		object.textContent = content;
	}
}


//设定对象的属性值
function setObjectAttribute(object, attribute, value){	
	/* 这里若是ie6,7 则用className, ie8+,ff,chrome则用clss */
	attribute = isIE67? 'className' : 'class';
	return object.setAttribute(attribute, value);
}

//取对象的属性值
function getObjectAttribute(object, attribute){
	
	if (!isIE) {
		if (compatibility_ff[attribute]) {
			attribute = compatibility_ff[attribute];
		}
	}else {
		if (compatibility_ie[attribute]) {
			attribute = compatibility_ie[attribute];
		}
	}
	
	return object.getAttribute(attribute);
}

/**
 * _AddFuncToEvent
 *
 * @param string event  事件(onclick, onchange, onxxx等, DOM标准大小写)
 * @param Object element    要被增加func的对象
 * @param Function newFunc  增加的函数
 */
function _AddFuncToEvent(eventName, element, newFunc){
    /**
    //NOTE id011150027522: 取消 FF不兼容(not compatible)!!! ;( 类里没有定义的属性或没值(但定义了),FF总会返回undefined, 按ECMA应该是有定义的是null, 没定义才是undefined
    if(element.eventName === undefined){
        throw Error(element.tagName+"不支持"+eventName+"事件");
        return false;
    }
    */
    /* NOTE id011150023522: 不能用element.eventName 只能用element[eventName] */
	/* NOTE id211150027571: 改成这样用才不会死循环 */
    if(element["_add"+eventName+"orginalHadInit"] != true){
		element["orginal_event"] = element[eventName];
		element["_add"+eventName+"orginalHadInit"] = true;
	}
    
    /** 放入对象中 **/
    //初始化函数队列
    if(element["_add"+eventName+"FuncList"] == null){
        element["_add"+eventName+"FuncList"] = new Array();
    }
    
    element["_add"+eventName+"FuncList"].push(newFunc);
    
    element[eventName] = function() {
        //执行函数队列中的函数
        var result = void(0);
        for(var i=0; i<element["_add"+eventName+"FuncList"].length;i++){
            result = element["_add"+eventName+"FuncList"][i].call(element);
        }
        
		
        if(typeof element["orginal_event"] == "function"){
            return element["orginal_event"]();
        }
		
        
        return result;
    }
    
}

//条数更改
function numFormatter(object, tag, num) {
	var tags = object.getElementsByTagName(tag);
	
	var tagsLength = tags.length;
	
	//删去过多对象
	if (num < tagsLength) {
	    for (var i=0; i<tagsLength-num; i++) {
	        object.removeChild(tags[tags.length-1]);
	    }
	}
}

//文字字数更改
function textFormatter(object, tag, textLength, postfix){
	var tags = object.getElementsByTagName(tag);
	
	for(var i=0; i<tags.length; i++){

		var text = getContent(tags[i]);

		if (text.length > textLength){
			if (!getObjectAttribute(tags[i], 'title')) setObjectAttribute(tags[i], 'title', text);
			text = text.substr(0, textLength)+postfix;
			setContent(tags[i], text);
		}
	}
}

//取GET参数
function getUrlParam(url, param){
	var re = new RegExp("(\\\?|&)" + param + "=([^&]+)(&|$)", "i");
	var m = url.match(re);
	if (m)
		return m[2];
	else
		return '';
}



function ShowHideBoard(button, bu_show, bu_hide, board_array, board_show, board_hide, event, autoRun) {
	this.button = button;	//Array String
	this.bu_show = bu_show;	//string
	this.bu_hide = bu_hide;	//string
	this.board_array = board_array;//Array String
	this.board_show = board_show;//string
	this.board_hide = board_hide;//string
	this.event = (event?event:'onclick');

	//onClick不一定就是onclick的事件
	this.onClick = function (bu_object, b_show_id){
		for (var i=0; i<this.button.length; i++) {
		    setObjectAttribute(document.getElementById(this.button[i]), 'className', this.bu_hide)
		}
		setObjectAttribute(bu_object, 'className', this.bu_show)

		for (var i=0; i<this.board_array.length; i++) {
		    setObjectAttribute(document.getElementById(this.board_array[i]), 'className', this.board_hide);
		}
		setObjectAttribute(document.getElementById(b_show_id), 'className', this.board_show)

	};
	
	//bind事件处理
	//要用 board_array MUST 对应 button的位置
	this.attachElement = function (){
		
		var thisObject = this;
		//为了能被正确调用, 设一个对象, 以button的id为属性
		var bo_id_array =  new Object();

		for (var i=0; i<this.button.length; i++) {
			bo_id_array[this.button[i]] = this.board_array[i];
			_AddFuncToEvent(this.event, document.getElementById(this.button[i]), function(){thisObject.onClick(this, bo_id_array[this.id]);});
		}
	}
}

function ShowHideBoardDelay(button, bu_show, bu_hide, board_array, board_show, board_hide, event, delay){
	if(event !== 'onmouseover' && !delay) return false;
    this.button = button;	//Array String
	this.bu_show = bu_show;	//string
	this.bu_hide = bu_hide;	//string
	this.board_array = board_array;//Array String
	this.board_show = board_show;//string
	this.board_hide = board_hide;//string
    this.timer = null;
	this.now = 0;

	for(var i=0; i<this.button.length; i++){
        var that = this;
		document.getElementById(this.button[i]).value = i;
		document.getElementById(this.button[i]).onmouseover = function(){
            if(that.timer){window.clearTimeout(that.timer)};
			var value = this.value;
			that.timer = window.setTimeout(function(){
				that.now = value;
				that.change();
			}, delay);
		}

		document.getElementById(this.button[i]).onmouseout = function(){
            if(that.timer) window.clearTimeout(that.timer);
		}
	}

	this.change = function(){
        for (var i=0; i<this.button.length; i++) {
		    setObjectAttribute(document.getElementById(this.button[i]), 'className', this.bu_hide);
		}
		setObjectAttribute(document.getElementById(this.button[this.now]), 'className', this.bu_show);
	    

		for (var i=0; i<this.board_array.length; i++) {
		    setObjectAttribute(document.getElementById(this.board_array[i]), 'className', this.board_hide);
		}
		setObjectAttribute(document.getElementById(this.board_array[this.now]), 'className', this.board_show);

		

	}
}

function ObjectsEventCommand(/*Array*/objects, event) {
	this.index = 0;
	this.objects = objects;
	this.event = event;
}

ObjectsEventCommand.prototype.play = function (){
	
	document.getElementById(this.objects[this.index])[this.event]();
	
	this.index++;
	if (this.index >= this.objects.length)
	{
		this.index = 0;
	}
}



function SetIntervalEvent(/*Array*/objects, event, timeout) {
	this.index = 0;
	this.objects = objects;

	this.play = function (){
		var thisObject = this;
		
		document.getElementById(thisObject.objects[thisObject.index])[event]();
		thisObject.index++;
		if (thisObject.index >= thisObject.objects.length)
		{
			thisObject.index = 0;
		}
	}

	return setInterval(this.play, timeout);
}

//加EVENT去对象组
function addEventToObjects (objects, event, func){
	for(var i=0; i<objects.length; i++){
		_AddFuncToEvent(event, document.getElementById(objects[i]), func); 
	}
}


/**
 * 漂浮容器
 * @param {String} html 
 * @param {Object} opt {top:10,height:300,width:100,isLeft:null,autoFix:null};
 */
function news_floatDiv(html,opt){
	var w=window,ivhs='news_floatDivTimers',divs='news_floatDivs';
	w[ivhs] instanceof Array?'':w[ivhs]=[];
	w[divs] instanceof Array?'':w[divs]=[];

    var doc=document,
	docElem=doc.documentElement,
    body=doc.body,
    div=doc.createElement('div'),
    cdiv=doc.createElement('div'),
	top=(opt.top||10),
    dstyle=div.style,
    cstyle=cdiv.style,
	// template=function(html){
		// return html+'<div style="text-align:center;font-size:12px;cursor:pointer;background-color:#ccc;line-height:14px;padding-top:1px;letter-spacing:1em;text-indent:1em;">\u5173\u95ed<\/div>'
	// },
	currentY=0,
	insert=function(){w[divs].push(div);body.insertBefore(div,body.firstChild);},
	imgs,cache=new Image;

	dstyle.top=top+'px';
	dstyle.height=(opt.height||300)+20+'px';
	dstyle.width=(opt.width||100)+'px';
	dstyle.zIndex=1000;
	dstyle.overflow='hidden';
	dstyle[opt.isLeft?'left':'right']='1px';
	dstyle.position='absolute';
	div.innerHTML=html;
	
	cstyle.textAlign='center';
	cstyle.fontSize='12px';
	cstyle.cursor='pointer';
	cstyle.backgroundColor='#ccc';
	cstyle.lineHeight='14px';
	cstyle.paddingTop='1px';
	cstyle.letterSpacing='1em';
	cstyle.textIndent='1em';
	cdiv.innerHTML='\u5173\u95ed';
	cdiv.onclick=function(){
		for(var i=w[divs].length;i>0;i--){
			w[divs].shift().style.display='none';
			if(w[ivhs])w.clearInterval(w[ivhs].shift());
		}
	};
	div.appendChild(cdiv);
	
	imgs=div.getElementsByTagName('img');
	if(imgs.length) {
		cache.onload=insert;
		cache.src=imgs[0].src;
	}else{insert();}
	
	if(opt.autoFix==1){
		if(isIE6){
			var ivh=w.setInterval(function(){
				dstyle.top=docElem.scrollTop+top;
			},500);
			w[ivhs].push(ivh);
		}else{
			dstyle.position='fixed';
		}
	}
}

/**
 * 垂直伸缩容器
 * @param {String} html
 * @param {Object} opt {width:976,height:100,showS:6,aniDuration:1,freqH:0}
 */
function news_vfoldDiv(html,opt, dom){
    var doc=document,
    body=doc.body,
    ck='cookie',
    div=doc.createElement('div'),
    dstyle=div.style,
	width=(opt.width||976),
	height=(opt.height||100),
	aniDuration=opt.aniDuration||1,
	timeout=(aniDuration+(opt.showS||6))*1000,
	aniInterval=Math.ceil(aniDuration*1000/height),
	framesPerTime=Math.ceil(height/(aniDuration*10)),
	cookieId='news_vfoldDiv'+(opt.aid?opt.aid:'')+'=1',
	expire=new Date(),
	freqH=opt.freqH||0,
	setCookie,ivh,cache=new Image,mode='unfold',img;

	if(freqH) {
		expire.setTime(expire.getTime()+freqH*3.6e6);
		setCookie=cookieId+'; expires='+expire.toGMTString();
		if(freqH<=0)doc[ck]=setCookie;
		if (doc[ck].indexOf(cookieId)!=-1)return;
		doc[ck]=setCookie;
	}
	
	dstyle.width=width+'px';
	dstyle.height='0px';
	dstyle.margin='0 auto';
	dstyle.lineHeight=0;
	dstyle.fontSize=0;
	dstyle.overflow='hidden';
	div.innerHTML=html;
	img=div.getElementsByTagName('img')[0];
	img.width=width;
	img.height=height;
	cache.onload=function(){
		
		try{
		if(dom) {
			body.insertBefore(div,document.getElementById(dom));	//20110131新春广告
		}else {
			body.insertBefore(div,body.firstChild);
		}
		}catch(e){ body.insertBefore(div,body.firstChild); }

		var cH=parseInt(div.offsetHeight);
		ivh=setInterval(function(){
			if(mode=='unfold'){
				if(cH<height){
					cH+=framesPerTime;
				}
			}else if(mode=='fold'&&cH>0){
				cH-=framesPerTime;
			}else{
				clearInterval(ivh);
			}
			dstyle.height=cH+'px';
		},aniInterval);
		setTimeout(function(){mode='fold';},timeout);
	};
	cache.src=img.src;
}
