function BrowserTool(browser){
	this.browser = browser;
	this.is_ie = false;
	this.initFun = function(){
		var userAgent = navigator.userAgent;
		if(userAgent.indexOf("MSIE") != -1){
			this.browser = "IE";
			if(userAgent.indexOf("MSIE 6.0") != -1){
				this.browser = "IE 6.0";
			}else if(userAgent.indexOf("MSIE 7.0") != -1){
				this.browser = "IE 7.0";
			}else if(userAgent.indexOf("MSIE 8.0") != -1){
				this.browser = "IE 8.0";
			}else if(userAgent.indexOf("MSIE 9.0") != -1){
				this.browser = "IE 9.0";
			}else if(userAgent.indexOf("MSIE 10.0") != -1){
				this.browser = "IE 10.0";
			}else if(userAgent.indexOf("MSIE 11.0") != -1){
				this.browser = "IE 11.0";
			}else if(userAgent.indexOf("MSIE 12.0") != -1){
				this.browser = "IE 12.0";
			} 
			if(userAgent.indexOf("Maxthon") != -1){
				this.browser = "遨游";
			}else if(userAgent.indexOf("QQBrowse") != -1 || userAgent.indexOf("TencentTraveler") != -1){
				this.browser = "QQ";
			}else if(userAgent.indexOf("GreenBrowse") != -1){
				this.browser = "绿色";
			}else if(userAgent.indexOf("360SE") != -1 || userAgent.indexOf("360EE") != -1){
				this.browser = "360";
			}else if(userAgent.indexOf("The world") != -1){
				this.browser = "世界之窗";
			}else if(userAgent.indexOf("SaaYaa") != -1){
				this.browser = "闪游";
			}else if(userAgent.indexOf("MetaSr") != -1){
				this.browser = "搜狗";
			}else if(userAgent.indexOf("LBBROWSER") != -1){
				this.browser = "猎豹";
			}
		}else if(userAgent.indexOf("Firefox") != -1){
			this.browser = "Firefox";
			if(userAgent.indexOf("CometBrowser") != -1){
				this.browser = "彗星";
			}
		}else if(userAgent.indexOf("Safari") != -1){
			if(userAgent.indexOf("Version") != -1){
				this.browser = "Safari";
			}else if(userAgent.indexOf("360EE") != -1){
				this.browser = "360";
			}else if(userAgent.indexOf("Maxthon") != -1){
				this.browser = "遨游";
			}else if(userAgent.indexOf("CoolNovoChromePlus") != -1){
				this.browser = "枫叶";
			}else if(userAgent.indexOf("baidubrowser") != -1){
				this.browser = "百度";
			}else if(userAgent.indexOf("TaomeeBrowser") != -1){
				this.browser = "淘米小黄帽";
			}else if(userAgent.indexOf("Chrome") != -1){
				this.browser = "Chrome";
			}
		}else if(userAgent.indexOf("Opera") != -1){
			this.browser = "Opera";
		}else{
			this.browser = "其他";
		}
	};
	this.is_IEBrowser=function(){
		var userAgent = navigator.userAgent;
		if(userAgent.indexOf("MSIE") != -1){
			if(userAgent.indexOf("MSIE 6.0") != -1){
				this.is_ie = true;
			}else if(userAgent.indexOf("MSIE 7.0") != -1){
				this.is_ie = true;
			}else if(userAgent.indexOf("MSIE 8.0") != -1){
				this.is_ie = true;
			}else if(userAgent.indexOf("MSIE 9.0") != -1){
				this.is_ie = true;
			}
			if(userAgent.indexOf("Maxthon") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("QQBrowse") != -1 || userAgent.indexOf("TencentTraveler") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("GreenBrowse") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("360SE") != -1 || userAgent.indexOf("360EE") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("The world") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("SaaYaa") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("MetaSr") != -1){
				this.is_ie = false;
			}else if(userAgent.indexOf("LBBROWSER") != -1){
				this.is_ie = false;
			}
		}else{
			this.is_ie = false;
		}
	};
	this.initFun();
};

