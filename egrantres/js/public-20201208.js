//qhh add 20200106 js中校验密码的正则表达式：密码应为8~20个字符，必须包含数字、大写字母、小写字母、下划线中的三种
var pwd_regex_js=/((^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[\dA-Za-z(?=.*_)(?=.*\W)]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*_)[\d_A-Z(?=.*(a-z))(?=.*\W)]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*_)[\d_a-z(?=.*(A-Z))(?=.*\W)]{8,20}$)|(^(?=.*[A-Z])(?=.*[a-z])(?=.*_)[A-Za-z_(?=.*\d)(?=.*\W)]{8,20}$))/;
//必须包含字母数据特殊字符
﻿﻿//var pwd_regex_js=/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&_\-*])[\da-zA-Z~!@#$%^&_\-*]{8,20}$/ 
var downloadPath=ctx+"/file/ajax-filedownload?fileCode=";
var searchTagHeight=0;
function replaceAllStr(strSource,replaceStr,replaceWith){
	return strSource.split(replaceStr).join(replaceWith);
}

String.prototype.trimAll = function() {// 去除内容空格
    return this.replace(/\s+/g, ''); 
};

// 清除两边的空格
String.prototype.trim = function() { 
  return this.replace(/(^\s*)|(\s*$)/g, ''); 
}; 

String.prototype.endWith=function(s){
  if(s==null||s==""||this.length==0||s.length>this.length)
     return false;
  if(this.substring(this.length-s.length)==s)
     return true;
  else
     return false;
  return true;
 }

 String.prototype.startWith=function(s){
  if(s==null||s==""||this.length==0||s.length>this.length)
   return false;
  if(this.substr(0,s.length)==s)
     return true;
  else
     return false;
  return true;
 }


/** 为textarea增加maxlength属性* */
$(function(){ 
	$("textarea[maxlength]").keyup(function(){ 
		var area=$(this); 
		var max=parseInt(area.attr("maxlength"),10); // 获取maxlength的值
		if(max>0){ 
			if(area.val().length>max){ // textarea的文本长度大于maxlength
				area.val(area.val().substr(0,max)); // 截断textarea的文本重新赋值
			} 
		} 
	});
	$("textarea[maxlength]").blur(function(){ 
		var area=$(this); 
		var max=parseInt(area.attr("maxlength"),10); // 获取maxlength的值
		if(max>0){ 
			if(area.val().length>max){ // textarea的文本长度大于maxlength
				area.val(area.val().substr(0,max)); // 截断textarea的文本重新赋值
			} 
		} 
	}); 
});

/** 为textarea增加maxlength属性* */

/** 上传下载公用接口* */

function ajaxFileUpload(type,tblId) {
	irisAjaxFileUpload(type,tblId);
}


/** 上传下载公用接口* */
	
/** 表格操作* */
/**
 * 增加行或者打开新页面
 * 
 * @param tableId
 *            表格id
 * @param radioname
 *            checkboxId
 * @param startRowIndex
 *            起始行
 * @param url
 *            跳转url,不传则为不跳转直接增加行
 */
function addNewRow(tableId,url,title)
{
	if(url!=null&&url!=""){
		showThickBox(url,title);
		
	}// 跳转页面
	else
		addNewRowDeal($("#"+tableId));
}

/**
 * 打开页面编辑内容
 * 
 * @param tableId
 *            表格id
 * @param radioname
 *            checkboxId
 * @param startRowIndex
 *            起始行
 * @param url
 *            跳转url,不传则为不跳转直接增加行
 */
function editRow(tableId,url,title)
{
	if(!$("#"+tableId+" :radio:checked").length>0){
		scmWarn('请选择一行!');
		return false;
	}
	if(url!=null&&url!=""){
		showThickBox(url,title);	
	}
}

/**
 * 杰出青年打开页面编辑内容
 * 
 * @param tableId
 *            表格id
 * @param radioname
 *            checkboxId
 * @param startRowIndex
 *            起始行
 * @param url
 *            跳转url,不传则为不跳转直接增加行
 */
function editRowJcqn(tableId,url,title)
{
	$("#"+tableId+" :radio").attr("checked","checked");
	if(url!=null&&url!=""){
		showThickBox(url,title);	
	}
}

/**
 * 增加一行
 * 
 * @param tableId表格Id
 * @param radioId
 * @param nNewRowPosition
 * @param startRowIndex
 */
function addNewRowDeal(table)
{
	var maxLinNum=table.find("tr").length-2;;// 获得行数，减去表头和隐藏行
	var lineNum=""+(maxLinNum+1);
	var intLineNum =maxLinNum+1;
	var addHtml=table.find("tr")[1].innerHTML;// 获得隐藏行的html,查找第二行
	addHtml=addHtml.replace(/\[index\]/g,lineNum);
	lineNum = (parseInt(lineNum, 10)-1).toString();// 2011.12.13
													// 行下标比行号小1(隐藏行下标[0]，第一行下标[00])
	if (lineNum.length==1)// 如果是个位数，前面补0
		lineNum="0"+lineNum;
	addHtml=addHtml.replace(/\[O\]/g,lineNum);// 替换html中行号 modify by sgs
												// <cpt:tree 中id会冲突 特殊字符Ｏ
	addHtml=addHtml.replace(/\[0\]/g,"["+lineNum+"]");// 替换html中行号
	addHtml=addHtml.replace(/\[1\]/g,"["+intLineNum+"]");// 替换html中行号
	// addHtml=addHtml.replace(/\|\|/g, "@@@@@@");//先将内容中的||替换为个数字符，以免破坏js结构
	addHtml=addHtml.replace(/\|\|/g, "@@@@@@").replace(/\|/g,"/").replace(/@@@@@@/g, "||");// 替换html中节点/的代替符"|"
																							// add
																							// by
																							// qhh
																							// 20170226
																							// 此处需要优化，当加载自定义主键时，如果js脚本中存在||表或者关系时，会同样被替换掉
																							// 就会出错,解决方法：现将||替换为特殊内容@@@@@@，然后在替换回来
	// addHtml=addHtml.replace(/@@@@@@/g, "||");//将预先替换的内容还原
	table.append("<tr>"+addHtml+"</tr>");// 将html增加到最后
	/*
	 * table.find("tr:last").find(":text,textarea,select").not(":hidden").each(function(){
	 * var objClass=$(this).attr("class"); if(objClass==null){
	 * objClass="required"; } else if(objClass.indexOf("nvalidate")>=0){
	 *  } else if(objClass!=null&&objClass.indexOf("required")==-1){
	 * objClass=objClass+" required"; }
	 * $(this).attr("class",objClass);//给所有行的列加上必填检查 });
	 */
	// reDealRow(tbl);
}


/**
 * 删除一行
 */
function deleteSelectedRow(tableId, message, nummin, warnMsg, selName) {
	if (!selName) {
		selName = "";
	}
	var tr = $("#" + tableId + " :radio[name*='" + selName + "']:checked").parents("tr").first();
	if (nummin == null) {
		nummin = 0;
	}
	var length = tr.length;
	var index = (length == 0 ? 0 : tr.get(0).rowIndex);
	if (length == 0) {
		scmWarn(irisNotes.delWarn2);
		return false;
	} else if (index - 1 <= nummin) {
		scmWarn(warnMsg || irisNotes.delWarn1);
		return false;
	} /*
		 * else if (!confirm(messageTip.deleteTip + message + "？")) { return
		 * false; } tr.remove(); refreshRowINdex(tableId); return true;
		 */
	
	confirm("", messageTip.deleteTip + message + "？", function(isEnter){
		if (isEnter) {
			// add by qhh 20171127 删除文件时，先将对应文件file_code标记为删除，再有定时任务扫描数据，删除文件
        	if(tr!=null){
        		var file_code_del_=tr.find("input[name$='file_code']").val();
        		if(file_code_del_!=null && file_code_del_!='' && typeof(file_code_del_)!='undefined'){
        			$.ajax({
    	    			url: ctx + '/file/ajax-del-file',
    	    			data:{"file_code_del":file_code_del_},
    	    			type : "post",// 提交方式 post,get
    	    			success : function(data) {
    	    			},
    	    			error : function() {
    	    			}
    	    		});
        		}
        	}
			tr.remove();
			refreshRowINdex(tableId);
			return true;
		} else {
			return false;
		}
		
	}, "info");
}

/**
 * 删除一行 主单位或主负责人不固定在第一行情况下
 * 
 * @param radioId
 */
function deleteSelectedRow2(tableId,message,nummin,warnMsg,selName){
	if(!selName)selName="";
	var tr=$("#"+tableId+" :radio[name*='"+selName+"']:checked").parents("tr");
	var submit_org = tr.find("input[name$='submit_org'],input[name$='submit_psn']").val();
	if(nummin==null)
		nummin=0;
	var length=tr.length;
	if(tr.length==0)
		tr=$("#"+tableId+" tr").filter(":last");
	else if(tr.length>1)
		tr=tr.first();

	if(submit_org=='1'){
		scmWarn(warnMsg);
		return false;
	}
	/*
	 * if(tr.get(0).rowIndex-1==nummin){ scmWarn(irisNotes.delWarn1); return
	 * false; }
	 */
	if(length==0){
		scmWarn(irisNotes.delWarn2);
		return false;
	}
	
	
	
	/*
	 * if(!confirm(messageTip.deleteTip+message+"？")) return false; tr.remove();
	 * refreshRowINdex(tableId); return true;
	 */
	
	
	/* syf 20171121 */
	 confirm(null,messageTip.deleteTip+message+"？",function(isConfirm){
	        if(isConfirm){
	        	// add by qhh 20171127
				// 删除文件时，先将对应文件file_code标记为删除，再有定时任务扫描数据，删除文件
	        	if(tr!=null){
	        		var file_code_del_=tr.find("input[name$='file_code']").val();
	        		if(file_code_del_!=null && file_code_del_!='' && typeof(file_code_del_)!='undefined'){
	        			$.ajax({
	    	    			url: ctx + '/file/ajax-del-file',
	    	    			data:{"file_code_del":file_code_del_},
	    	    			type : "post",// 提交方式 post,get
	    	    			success : function(data) {
	    	    			},
	    	    			error : function() {
	    	    			}
	    	    		});
	        		}
	        	}
	        	tr.remove();
	       	  refreshRowINdex(tableId);
	       	  updateOtherThing(tableId);
	  return true;
	        }else{
	        	return false;
	        }
	        
	      },null);

}

function updateOtherThing(tableId){
	
}

/**
 * 上移行
 * 
 * @param tblId
 * @param selName
 *            radio按钮的name名
 * @param secondRowIndex
 *            显示的第二行的rowIndex，设置此值表示第二行不能上移
 *            (如果要设置，一般设为3；为了兼容“不需控制”第一行可上下移动的代码，不对此参数定义默认值)
 * @returns {Boolean}
 */
function movePrev(tblId,selName,secondRowIndex) {
	if (!selName) {
		selName = "";
	}
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.prevWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2){
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked").parents("tr").first();// 取得被选中的行
	var trPrev = trChecked.prev();// 取得上一行
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index <= 2) {// 如果是第一行
		scmWarn(irisNotes.tabelMoveWarn1);
		return false;
	} else if ("undefined" !== typeof secondRowIndex && secondRowIndex == index) {
		scmWarn("选中的行不能上移");
		return false;
	}
	trPrev.before(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", 'true');
	refreshRowINdex(tblId);
}
/**
 * 平台类合同承担单位上移
 * @param tblId
 * @param selName
 * @param secondRowIndex
 * @returns {Boolean}
 */
function pltCtrMovePrev(tblId,selName,secondRowIndex) {
	if (!selName) {
		selName = "";
	}
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.prevWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2){
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked").parents("tr").first();// 取得被选中的行
	var trPrev = trChecked.prev();// 取得上一行
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index <= 2) {// 如果是第一行
		scmWarn(irisNotes.tabelMoveWarn1);
		return false;
	} else if ("undefined" !== typeof secondRowIndex && secondRowIndex == index) {
		scmWarn("主承担单位的位置必须是第一位");
		return false;
	}
	trPrev.before(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", 'true');
	refreshRowINdex(tblId);
}
/**
 * 附件上移行 针对有从单位读取过来的附件
 * 
 * @param tblId
 * @orgName 排除的从单位读取过来附件的个数
 * @param 第一行排除从单位读取过来的附件记录行数
 * @returns {Boolean}
 */
function movePrevByOrgInfo(tblId,selName,orgNum) {
	if (!selName)
		selName = "";
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.prevWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2)
		return false;
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked")
			.parents("tr").first();// 取得被选中的行
	var trPrev = trChecked.prev();// 取得上一行
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index <= 2+parseInt(orgNum)) {// 如果是第一行
		var msg = irisNotes.tabelMoveWarn1;
		if(parseInt(orgNum)>0){
			msg +="，不允许移动单位读取过来的附件位置！";
		}
		scmWarn(msg);
		return false;
	}
	// trChecked.remove();
	trPrev.before(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", 'true');
	refreshRowINdex(tblId);
}

/**
 * 下移行
 * 
 * @param tblId
 * @param selName
 *            radio按钮的name名
 * @param firstRowIndex
 *            显示的第一行的rowIndex，设置此值表示第一行不能下移
 *            (如果要设置，一般设为2；为了兼容“不需控制”第一行可上下移动的代码，不对此参数定义默认值)
 * @returns {Boolean}
 */
function moveNext(tblId,selName,firstRowIndex) {
	if (!selName) {
		selName = "";
	}
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.nextWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2) {
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked").parents("tr").first();// 取得被选中的行
	var trNext = trChecked.next();
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index == $("#" + tblId + " tr").length - 1) {// 如果表格只有一行
		scmWarn(irisNotes.tabelMoveWarn2);
		return false;
	} else if ("undefined" !== typeof firstRowIndex && firstRowIndex == index) {
		scmWarn("选中的行不能下移");
		return false;
	}
	trNext.after(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", "true");
	refreshRowINdex(tblId);
}
/**
 * 平台类合同单位下移
 * @param tblId
 * @param selName
 * @param firstRowIndex
 * @returns {Boolean}
 */
function pltCtrMoveNext(tblId,selName,firstRowIndex) {
	if (!selName) {
		selName = "";
	}
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.nextWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2) {
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked").parents("tr").first();// 取得被选中的行
	var trNext = trChecked.next();
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index == $("#" + tblId + " tr").length - 1) {// 如果表格只有一行
		scmWarn(irisNotes.tabelMoveWarn2);
		return false;
	} else if ("undefined" !== typeof firstRowIndex && firstRowIndex == index) {
		scmWarn("主承担单位的位置必须是第一位");
		return false;
	}
	trNext.after(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", "true");
	refreshRowINdex(tblId);
}


function moveNextKxjsj(tblId,selName,firstRowIndex,lastDownNum) {
	// 科学技术奖中，负责人只能下移到第三行
	if (!selName) {
		selName = "";
	}
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.nextWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2) {
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked").parents("tr").first();// 取得被选中的行
	var trNext = trChecked.next();
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index == $("#" + tblId + " tr").length - 1) {// 如果表格只有一行
		scmWarn(irisNotes.tabelMoveWarn2);
		return false;
	} else {
		var isSbr=trChecked.find("input[name$='flag']").val();
		if(isSbr!=''){
			if(index>lastDownNum){
				scmWarn("选中的行不能下移");
				return false;
			}
		}else{
			if ("undefined" !== typeof firstRowIndex && firstRowIndex == index) {
				scmWarn("选中的行不能下移");
				return false;
			}
		}
	}
	trNext.after(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", "true");
	refreshRowINdex(tblId);
}

function movePrevKxjsj(tblId,selName,secondRowIndex,lastDownNum) {
	// 科学技术奖负责人不能下移到第三行以外
	if (!selName) {
		selName = "";
	}
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.prevWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2){
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked").parents("tr").first();// 取得被选中的行
	var trPrev = trChecked.prev();// 取得上一行
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index <= 2) {// 如果是第一行
		scmWarn(irisNotes.tabelMoveWarn1);
		return false;
	} else {
		
		// 看所在行的上一行是不是负责人行
		var isPreTrSbrTr=$("#" + tblId + " tr:eq("+(index-1)+")");
		var isPreTrSbr=isPreTrSbrTr.find("input[name$='flag']").val();
		var isPreTrRowNum=isPreTrSbrTr.index();

		if(isPreTrRowNum==lastDownNum && isPreTrSbr!=''){
			scmWarn("选中的行不能上移");
			return false;
		}
		
	}
	trPrev.before(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", 'true');
	refreshRowINdex(tblId);
}

/**
 * 验证是否是承担单位 2014.9.23 。lwx
 * 
 * @param tblId
 * @returns {Boolean}
 * 
 * function checkIsOrg(tblId){ var flag =$("#" + tblId + "
 * :checked").parent().find("[id='submitFlag']").val(); if(flag =="1"){ return
 * true; }else{ return false; } }
 */
/**
 * 平台类及科技计划类项目负责人上移行
 * 
 * @param tblId
 * @returns {Boolean}
 */
function ptlMovePrev(tblId,selName) {
	if(checkIsFzr(tblId,selName)){
		scmWarn(irisNotes.fzrMoveWarn);
		return false;
	}
	
	if (!selName)
		selName = "";
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.prevWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2)
		return false;
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked")
			.parents("tr").first();// 取得被选中的行
	var trPrev = trChecked.prev();// 取得上一行
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index <= 3) {// 如果是第一行
		scmWarn(irisNotes.fzrMoveWarn);
		return false;
	}
	// trChecked.remove();
	trPrev.before(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", 'true');
	refreshRowINdex(tblId);
}

/**
 * 平台类及科技计划类项目负责人下移行
 * 
 * @param tblId
 * @returns {Boolean}
 */
function ptlMoveNext(tblId,selName) {
	if(checkIsFzr(tblId,selName)){
		scmWarn(irisNotes.fzrMoveWarn);
		return false;
	}
	
	if (!selName)
		selName = "";
	if ($("#" + tblId + " :radio[name*='" + selName + "']:checked").length == 0) {
		scmWarn(irisNotes.nextWarn);
		return false;
	}
	if ($("#" + tblId + " tr").length <= 2) {
		return false;
	}
	var trChecked = $("#" + tblId + " :radio[name*='" + selName + "']:checked")
			.parents("tr").first();// 取得被选中的行
	var trNext = trChecked.next();
	var index = trChecked.get(0).rowIndex;// 获得行号
	if (index == $("#" + tblId + " tr").length - 1) {// 如果是第一行
		scmWarn(irisNotes.tabelMoveWarn2);
		return false;
	}
	// trChecked.remove();
	trNext.after(trChecked);
	trChecked.find(":radio[name*='" + selName + "']").attr("checked", "true");
	refreshRowINdex(tblId);
}

/**
 * 平台类及科技计划类验证是否是项目负责人
 * 
 * @param tblId
 * @param selName
 * @returns {Boolean}
 */
function checkIsFzr(tblId,selName){
	var flag =$("#" + tblId + " :checked").parent().find("[id='submitFlag']").val();
	if(flag =="1"){
		return true;
	}else{
		return false;
	}
}


/**
 * 重新计算行号
 * 
 * @param tblId
 */
function refreshRowINdex(tblId){
	 // 重新计算行号

	
	  $("#"+tblId+" tr").each(function(){
		  
		   var seq=$(this).get(0).rowIndex;// 获得行数
		   var rowid = seq-1;
		   if(seq>1){// 如果有行 显示时display行不计入类，故只减1
			   
			   seq=seq-1;
			   var seq_no=$(this).find("[name$='seq_no']").last();
			   if(seq_no.is("span"))
				   seq_no.html(seq);
			   else
				   seq_no.val(seq);
			   
			   seq=""+(seq-1);
			   if(seq.length==1)
				   seq="0"+seq;
			  // 替换相应的name参数的seq
			  $(this).find("input,span,textarea,select,img,a").each(function(){
					var attrs = [ "name", "id", "class", "onclick" ];
					for ( var i in attrs) {
						var a = attrs[i];
						var v = $(this).attr(a);
						if (v != null && v != "") {
							v = v.replace(/\[\d*\]/g, "[" + seq + "]");
							$(this).attr(a, v);
						}
					}
	
					var label = $(this).attr("label");
					if (label != null && label != "") {
						label = label.replace(/第\d*行/g, "第" + rowid + "行").replace(/第\d*条/g, "第" + rowid + "条");
						$(this).attr("label", label);
					}
			   });
		   }
		 }
	  );

}

/**
 * 限制Table行数
 * 
 * @param tableId表格id
 * @param max最大行数
 * @returns {Boolean}
 */
function checkTabLimit(tableId,max,message)
{
	var maxLinNum=$("#"+tableId+" tr").length-2;
	
		if(maxLinNum>=max)
		{
			scmWarn(message);
			return false;
		}
	return true;
}

/**
 * 在添加的新行上初始化date控件
 */
function showDateTag(tableId){
	$("#"+tableId+" tr:last-child").find("input[name$='date'][type!='hidden']").each(function(){
		$(this).attr("style","width:135px;");
		var v_html="<a id=\"start_date_a_\" class=\"inputDateButton_init\" title=\"选择日期\" onclick=\"javascript:registerDateCtrl2('"+$(this).attr("id")+"','yyyy-mm-dd')\">选择日期</a>";
		$(v_html).insertAfter($(this));
		// $(this).datepick({showOnFocus: false, showTrigger: "<img
		// style=\"padding-left:3px;cursor:pointer;vertical-align:middle;\"
		// src=\""+res+"/images/ico_date.gif\" />"});
	});
	
}

/**
 * 初始化所有的date控件
 */
function showAllDateTag(tableId){
	$("#"+tableId).find("input[name$='date'][type!='hidden']").not("[id$='[0]']").each(function(){
		$(this).attr("style","width:135px;");
		var v_html="<a id=\"start_date_a_\" class=\"inputDateButton_init\" title=\"选择日期\" onclick=\"javascript:registerDateCtrl2('"+$(this).attr("id")+"','yyyy-mm-dd')\">选择日期</a>";
		$(v_html).insertAfter($(this));
	});
	
}

/** 表格操作* */



/** XML收集* */
/**
 * 
 */

/**
 * 处理特殊字符
 * 
 * @param strData
 * @returns
 */
function xmlscc(strData)
{

    strData=strData.replace(/&/g, "&amp;");
    strData=strData.replace(/>/g, "&gt;");
    strData=strData.replace(/</g, "&lt;");
    strData=strData.replace(/"/g, "&quot;");
    strData=strData.replace(/'/g, "&#39;");
    strData=strData.replace(/\r\n/g, "&#13;");
	return strData;
}
/** XML收集* */

/**
 * 获得标签的值
 */
function getTagValue(oTag)
{
	try
	{
		if(oTag.is("span"))
		{
			
			return irisTrim(oTag.text());
		}
		else if(oTag.is("input"))
		{
			return irisTrim(oTag.val());
		}
		else
		{
			return oTag.val();
		}
	}
	catch(ex)
	{
		return "";
	}
}

/**
 * 判断对象是否是radio
 * 
 * @param obj
 * @returns {Boolean}
 */

function isTagChkRadio(obj)
{
	if(!obj.type) return false;
			
	if(obj.type.toUpperCase()!="RADIO") return false;
			
	return true;
}



/**
 * 判断对象是否是span
 * 
 * @param obj
 * @returns {Boolean}
 */
function isTagSpan(obj)
{
	if(!obj.tagName) return false;
	
	if(obj.tagName.toUpperCase()!="SPAN") return false;
	
	return true;
}
/**
 * 判断对象是否是select框
 * 
 * @param obj
 * @returns {Boolean}
 */
function isTagSelect(obj)
{
	if(!obj.tagName) return false;
	
	if(obj.tagName.toUpperCase()!="SELECT") return false;
	
	return true;
}



/**
 * 弹出框方案
 * 
 * @param obj
 *            点击对象
 * @param width
 *            弹出框宽度
 * @param hight
 *            弹出框高度
 * @param title
 *            弹出框标题
 * @param html
 *            弹出框内容
 */
function showBox(obj,width,height,title,html){
	if(!width || width == ''){
		width = '500px';
	}
	if(!height || height == ''){
		height = '100px';
	}
	
	var reg = /\d+/g;
	// 根据分辨率重新计算宽高，基数为宽980，高620 解决宽屏下显示问题
	var screenWidth=window.innerWidth;// FIXME 宽度如何取值，待定
	width=Math.floor((screenWidth*(width.match(reg)))/980)+"px";
	var screenHeight=window.innerHeight;
	height=Math.floor((screenHeight*(height.match(reg)))/620)+"px";

	var note = "<div id='myMap' style='width:"+width+";height:"+height+";overflow-y:auto;color:#cc0000'>"+html+"</div>";
	var wBox = obj.wBox({
		wBoxURL: "wbox/",
		title : title,
		html : note,
		callBack: null,
        noTitle: false,
		show:true,
		timeout:0,
		target:null,
		requestType:null,// iframe,ajax,img
		drag:true
	});
	$("#myMap").mCustomScrollbar({
		keyboard:{
			enable:true,
			scrollType:"stepless",
			scrollAmount:"auto"
		},
		callbacks: {
		　　　　whileScrolling: function(){      　// 只要滚动条滚动，这个函数就会执行
		　　　　}
	  }
	});
	// wBox.showBox();
}




function showThickBox(url,title){
	$("#childDiv").attr("title",title);
	$("#childDiv").attr("alt",url);
	$("#childDiv").click();
}


/**
 * 切换Tab方法
 * 
 * @param divId
 */
function changeTab(divId) {
	$("li[id^='tab']").each(function(i) {
		if ($(this).attr("id") == divId) {
			$(this).addClass("down");
		} else {
			$(this).removeClass("down");
		}
	});

	$("div,table").filter("[id^='fragment-']").each(function(i) {
		if ($(this).attr("id") == ("fragment-" + divId)) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	
	// scrollFunction_change_tab();
}

function changeTab(divId,gridIdNum) {
	$("li[id^='tab']").each(function(i) {
		if ($(this).attr("id") == divId) {
			$(this).addClass("down");
		} else {
			$(this).removeClass("down");
		}
	});

	$("div,table").filter("[id^='fragment-']").each(function(i) {
		if ($(this).attr("id") == ("fragment-" + divId)) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	if(gridIdNum==1){
		buildGrid1();	
	}else if(gridIdNum==2){
		buildGrid2();
		$("#searchBt2").click();
	}
	
	// scrollFunction_change_tab();
}

/**
 * 各类公用控件和radio框储存值到隐藏域中(除了tree和智能下拉框外)
 */
function initControlValue(objId) {
	var name = "";
	var obj = $(document.getElementById(objId));
	if (obj.is("select")) {
		name = obj.attr("name");
		var selectItem = obj.find("option:selected");
		obj.parent().children("input[name$='" + name + "_name']").val(selectItem.text());
		obj.parent().children("input[name$='" + name + "_value'][type='hidden']").val(selectItem.val());
		obj.parent().children("input[name$='" + name + "_code'][type='hidden']").val(selectItem.val());
	} else if (obj.is(":radio")) {
		name = obj.attr("name");
		if (obj.is(":checked")) {// 如果被选中
			obj.parents("table").find("input[name$='" + name + "_value'][type='hidden']").val(obj.val());
		} else {

			obj.parents("table").find("input[name$='" + name + "_value'][type='hidden']").val("");
		}
	} else if (obj.is(":checkbox")) {
		name = obj.attr("name");
		if (obj.is(":checked"))// 如果被选中
			obj.parent().find("input[name$='" + name + "_value'][type='hidden']").val(obj.val());
		else
			obj.parent().find("input[name$='" + name + "_value'][type='hidden']").val("");
	} else {
		name = obj.attr("id");
		obj.parents("td").find("input[name$='" + name + "_name'][type='hidden']").val(obj.val());
		obj.parents("td").find("input[name$='" + name + "_code'][type='hidden']").val($(document.getElementById(objId + "_hideId")).val());
	}
}


/**
 * 单独的树设置隐藏域值
 */
function initTreeValue(treeId,treeNode,params){
	var showName=buildName(treeNode, params);
	if(showName==null || showName=='' ||showName=='undefined'){
		showName=treeNode.name;
	}
	$("#"+treeId).parents("td").find("[name$='"+treeId+"_code'],[id$='"+treeId+"_code']").val(treeNode.id);
	$("#"+treeId).parents("td").find("[name$='"+treeId+"_value'],[id$='"+treeId+"_value']").val(treeNode.id);
	$("#"+treeId).parents("td").find("[name$='"+treeId+"_name'],[id$='"+treeId+"_name']").val(showName);
}

/**
 * 申请代码树设置隐藏域值
 */
function initSubjectTreeValue(treeId, treeNode) {
	/*
	 * if (!(treeNode && treeNode.id.length>1)) {
	 * scmWarn($("#"+treeId).attr("label")+messageTip.researchAreaInvalidDisciplineCode);
	 * if(treeNode.level==null){ $("#"+treeId).val("");
	 * $("#"+treeId).parents("td").find("[name$='"+treeId+"_code'],[id$='"+treeId+"_code']").val("");
	 * $("#"+treeId).parents("td").find("[name$='"+treeId+"_name'],[id$='"+treeId+"_name']").val(""); }
	 * return false; }
	 */
	$("#"+treeId).parents("td").find("[name$='"+treeId+"_value'],[id$='"+treeId+"_value']").val(treeNode.id);
	$("#"+treeId).parents("td").find("[name$='"+treeId+"_code'],[id$='"+treeId+"_code']").val(treeNode.id);
	$("#"+treeId).parents("td").find("[name$='"+treeId+"_name'],[id$='"+treeId+"_name']").val(treeNode.name.substring(treeNode.name.indexOf(".")+1));
}

/**
 * 申请代码树设置隐藏域值（多选）
 */
function initTreeValue_dx(treeId, treeNode) {
	var str = treeNode.name;
	var obj = treeNode.parentNode;
	var tree_name = $("#"+treeId).val();
	var tree_value = $("#"+treeId+"_hideId").val();
	$("#" + treeId).parents("td")
			.find(
					"[name$='" + treeId + "_code'],[id$='" + treeId
							+ "_code']").val(tree_value	);
	$("#" + treeId).parents("td").find(
			"[name$='" + treeId + "_value'],[id$='" + treeId
					+ "_value']").val(tree_value);
	$("#" + treeId).parents("td")
			.find(
					"[name$='" + treeId + "_name'],[id$='" + treeId
							+ "_name']").val(tree_name);
	$("#" + treeId).val(tree_name);	
}

function initOnlyChooseLeaf(params, treeNode) {
	scmWarn(messageTip.onlyChooseLeaf);
	return false;
}


/**
 * 单独的智能过滤初始化值
 */
function initAutocomplateValue(objId,data){
	$("#"+objId).parents("td").find("input[name$='"+objId+"_code'][type='hidden']").val(data.id);
}


/**
 * iris去除空格
 * 
 * @param strToDeal
 * @returns
 */
function irisTrim(strToDeal)
{
	var strTemp=strToDeal.toString();
	return strTemp.replace(/(^(\s|　)*)|((\s|　)*$)/g, "");
}


// 角色切换JS控制代码
function fx(el,attr,to){
	el=typeof el=='string'?document.getElementById(el):el;
	if(to>0)el.style.display='block';
	var w=el['offset'+attr.replace(/^(.)/,new Function('return arguments[1].toUpperCase()'))];
	var Int=Math[to-w>0?'ceil':'floor'];
	clearInterval(el.timer);
	el.timer=setInterval(function(){
		w+=Int((to-w)*0.1);
		el.style[attr]=w+'px';
		if(w==to){	 
			if(to==0)el.style.display='none';
			clearInterval(el.timer);
		};	
	},10);
};
window.onload = function (){
	try{
	var a=document.getElementById("t1");
	var d1=document.getElementById("div1");
	/*
	 * d1.onmouseover=a.onmouseover=function (){fx('div1','height',90);};
	 * d1.onmouseout=a.onmouseout=function (){fx('div1','height',0);};
	 */
	}catch(e){}
};
// 加载快捷菜单
function loadShortcut(){
	$(".shortcutTotal").each(function(i){
		var id=$(this).attr("id");
		var menuId=id.split("_")[0];
		var isExistSql=id.split("_")[1];
		// 有sql才需要执行统计
		if(isExistSql=='1'){
			$.ajax( {
				url : ctx+'/shortcut/total',
				type : 'post',
				dataType:'json',
				data : {'menuId':menuId},
				success : function(data) {
					if(data.result!=null&&data.result!=0){
						$("#"+id).prepend('<div class="pop" ><span>'+data.result+'</span></div>');	
					}
				}
			});
		}
	});
};
// 首页加载bu数量和列表
function loadMainBu(flag,roleId){
	$.ajax( {
		url : ctx+'/bu/ajaxload-main-bu',
		type : 'post',
		dataType:'json',
		data : {'buTipsWinFlag':flag,"exclude_butype_inmain_":exclude_butype_inmain_},
		success : function(data) {
			
			$("#buTotal").html(data.total);
			var title="";
			var main_workremind = "";
			if(data.total!=0){
				var qztc = "";	// 强制弹出提醒用来组装字符串
				var jj=0;
				var buFboHtml=$("<div id='Pop_Remind'><ul class='bufbo_ul'></ul></div>");
				var buFboCount=0;
				var curBuHtml_="";
				var h_count_=0;
				for(var i=0;i<data.titles.length;i++){
					curBuHtml_="<li buTinfo='bu_content_"+data.titles[i].buCode+"_buTinfo'>"+data.titles[i].title+"</li>";
					title+=curBuHtml_;
					//不完善bu，禁止操作系统的bu优先
					var bu_del_str="";
					if(data.titles[i].buForBidOperateSysFlag!='1'){
						if(data.titles[i].buDelFlag=='0' && isSimulationlogin_=='false'){
							bu_del_str="<span class='bu_s_tips bu_del' onclick='buDel(\""+data.titles[i].buCode+"\")'></span>"
						}
					}else{
						h_count_++;
						$(buFboHtml).append("<li>"+h_count_+"、"+data.titles[i].title+"</li>");
						buFboCount++;
					}
					if (data.titles[i].type==1) {
						jj++;
						qztc += "<li class='bu_tr' buTinfo='bu_content_"+data.titles[i].buCode+"_buTinfo'> "+data.titles[i].title+bu_del_str+"</li>";
					}
					
					main_workremind += '<tr class="bu_tr" buTinfo="bu_content_'+data.titles[i].buCode+'_buTinfo"><td align="center"><span class="bu_span_index">' + (i+1) +'</span></td><td>' + data.titles[i].title + bu_del_str+'</td></tr>'
					
				}
				if (qztc.length > 0) {
					$("#bu_inlineDlg").html(qztc);
					tb_show('提醒', '#TB_inline?height=50%&width=400&inlineId=show_bu&zIndex=1000000', false,false,"showBu");
					if(buFboCount>0 && isSimulationlogin_=='false'){
						$("#TB_closeWindowButtonshowBu").unbind("click").bind("click",function(){
							confirm("受以下工作限制，继续操作您将退出系统",buFboHtml,function (isConfirm,buWinSelfObj_){
								if(isConfirm){
									logoutEgrantweb();// 退出
								}else{
								}
							},{type:"info",width:"545",height:"300"});
						});
					}
				}
				$("#buList").html(title);
				$("#loading_div_bu_").remove();
				$("#dv_layer_workremind").find("#table01").html(main_workremind);
				$(".bu_s_tips").attr("title","不再显示此类工作提醒");

				$(".bu_tr").mouseover(function(){
					$(this).find(".bu_del").show();
				}).mouseout(function(){
					$(this).find(".bu_del").hide();
				});
			}else{
				$(".TipsInfo").hide();
				$("#buList").html("<li>"+publicVar.noBuSchedule+"</li>");
				$("#loading_div_bu_").remove();
				$("#dv_layer_workremind").find("#table01").html("<tr><td colspan='2' style='border:0px;'>暂无工作提醒</td></tr>");
			}
			if(isSimulationlogin_=='false'){
				$("#dv_layer_workremind").prev().prepend("<span class=\"bu_reback\" onclick=\"buReback()\"></span>");
				$(".bu_reback").attr("title","恢复隐藏的工作提醒");	
			}
			
		}
		
	});
	
	
};


// 刷新bu
function reflushBu(){
	$.ajax( {
		url : ctx+'/bu/refresh-bu-list',
		async:false,
		type : 'post',
		dataType:'json',
		data : null,
		success : function(data) {
			$("#buTotal").html(data.total);
			var title="";
			if(data.total!=0){
				for(var i=0;i<data.titles.length;i++){
					title+="<li>"+data.titles[i].title+"</li>";
				}
				$("#buList").html(title);
			}else{
				$("#buList").html("<li>"+publicVar.noBuSchedule+"</li>");
			}
		}
	});
}

// 显示bu
function showBu(){
	$.ajax( {
		url : ctx+'/bu/show-bu-win',
		type : 'post',
		dataType:'json',
		data : null,
		success : function(data) {
			$(".TipsInfo").show();
		}
	});
	
};
function closeBu(){
	$.ajax( {
		url : ctx+'/bu/hide-bu-win',
		type : 'post',
		dataType:'json',
		data : null,
		success : function(data) {
			$(".TipsInfo").hide();
		}
	});
	
}


/**
 * 时间显示函数
 * 
 * @param objD
 * @returns
 */
function showLocale(date)
{
	var yy = date.getYear();// 获得年度
	if(yy<1900) yy = yy+1900;

	var MM = date.getMonth()+1;// 获得月份
	if(MM<10) MM = '0' + MM;
	
	var dd = date.getDate();// 获得日期
	if(dd<10) dd = '0' + dd;
	
	var hh = date.getHours();// 时
	if(hh<10) hh = '0' + hh;
	
	var mm = date.getMinutes();// 分
	if(mm<10) mm = '0' + mm;
	
	var ss = date.getSeconds();// 秒
	if(ss<10) ss = '0' + ss;

	var str =yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
	return(str);
}

/**
 * 时间显示函数
 * 
 * @param objD
 * @returns
 */
function showDate(date)
{
	var yy = date.getYear();// 获得年度
	if(yy<1900) yy = yy+1900;

	var MM = date.getMonth()+1;// 获得月份
	if(MM<10) MM = '0' + MM;
	
	var dd = date.getDate();// 获得日期
	if(dd<10) dd = '0' + dd;
	
	

	var str =yy + "-" + MM + "-" + dd ;
	return(str);
}

/**
 * 数字显示函数，用于无法使用输入控制控件的数字 整数部分最大长度,小数部分最大长度,小数部分显示出的长度,子对象，是否允许输入负数
 */
function formatNumber(number,maxIntLength,maxDecimalLength,displayDecimal,allowNegative) {
	if(number.indexOf(".")>=0){// 如果是输入值中带有小数点则检查小数部分长度是否达到了最低显示的长度，如果没有则补0
		var integral="";
		var decimal="";
		if (number.indexOf(".")==0&&number.length>1){
			integral="0";
			decimal=number.substring(1,number.length);
		}else if (number.indexOf(".")>0){
			
			integral=number.substring(0,number.indexOf("."));
			decimal=number.substring(number.indexOf(".")+1,number.length);
		}
		if (decimal.length<displayDecimal){
			var count=decimal.length;// 小数点后的位数
			for (var i=0;i<displayDecimal-count;i++){
				decimal=decimal+"0";
			}
		}else {
			decimal=decimal.substring(0, displayDecimal);
		}
		number=integral+"."+decimal;
	}else if (number!=""&&displayDecimal>0){// 输入的是整数则补上小数部分，全部为0
		number=number+".";
		for (var i=0;i<displayDecimal;i++){
			number=number+"0";
		}
	}else{
		number=number.substring(0, maxIntLength);
	}
	return number;
};

function getCookieVal(offset)
// 获得Cookie解码后的值
{
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}

// ---------------------------
function setCookie(name, value)
// 设定Cookie值
{
var expdate = new Date();
var argv = setCookie.arguments;
var argc = setCookie.arguments.length;
var expires = (argc > 2) ? argv[2] : null;
var path = (argc > 3) ? argv[3] : null;
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ));
document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
+((secure == true) ? "; secure" : "");
}

// ---------------------------------
function delCookie(name)
// 删除Cookie
{
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = getCookie (name);
document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}

// ------------------------------------
function getCookie(name)
// 获得Cookie的原始值
{
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen)
{
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return getCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}

// js中占位符替换
String.prototype.format=function()
{
  if(arguments.length==0) return this;
  for(var s=this, i=0; i<arguments.length; i++)
    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
  return s;
};

function viewPubsNjjw(psnCode,id){
	tb_show("查看非基金委项目",ctx+'/expmanage/view-other-project?prjcodestr='+id+'&psncodestr='+psnCode+'&TB_iframe=true&height=460&width=900');
}
function view_project(prjCode,ytdw){
	tb_show("查看基金委项目",ctx+'/expmanage/view-exprj-project?prjcodestr='+prjCode+'&ytdw='+ytdw+'&TB_iframe=true&height=460&width=900');
}

// 转义字符
function changeString(selectid) {
	selectid = selectid.replace(/\[/g, "\\[");
	selectid = selectid.replace(/\]/g, "\\]");
	return selectid;
}
// 反转
function changeString1(selectid) {
	selectid = selectid.replace(/\\\[/g, "[");
	selectid = selectid.replace(/\\\]/g, "]");
	return selectid;
}

// 查看评议人详细信息
function expview(psnCode,psnName) {
	var title = "查看个人信息";
	if(psnName !=""){
		title = title + "(" + psnName +")";
	}
	tb_show(title,ctx+ "/expmanage/view-expinfo?psncodestr="
			+ psnCode + "&TB_iframe=true&height=440&width=870", false);
}

// 查看专家详细信息
function myExpview(psnCode) {
	var title = "查看个人信息";
	tb_show(title,ctx+ "/expmanage/enter-updexp-view?psn_code="
			+ psnCode + "&flag=view&TB_iframe=true&height=440&width=870", false);
}

/**
 * 下拉框、单选框、复选框初始化和赋值控制，所有选中的复选框的值用,分割
 * 
 * @param parentId
 *            控制初始化的范围，可以为空
 */
function initControl(parentId){
	var initObjs = null;
	if(parentId==null || parentId=="" || typeof(parentId)=='undefined')
		initObjs = $("select,:radio,:checkbox");
	else
		initObjs = $("#"+parentId).find("select,:radio,:checkbox");
	
	initObjs.each(function(){
		var obj=$(this);
		var name=obj.attr("name");
		var valueObj = obj.parents("tr").first().find("input[name$='"+name+"_value']");// 保存选中的值
		var nameObj = obj.parents("tr").first().find("input[name$='"+name+"_name']");// 保存下拉框选中的文本或单选框、复选框的label属性
		if(valueObj.length==0){
			// modify by qhh 20170224 为了防止出现
			// name属性值命名不规范导致找到多个以name_value结尾的对象，从而导致修改其他不需要对象值的现象，目前只取查找当前对象的兄弟以及子对象；
			if(!obj.is("select") && !obj.is(":radio")){// 自定义多选框 查找默认隐藏域
				valueObj = obj.parents("div").first().parent().find("input[name$='"+name+"_value']");
			}else{
				valueObj = obj.parent().children("input[name$='"+name+"_value']");// 保存选中的值
			}
		}
		if(nameObj.length==0){
			// modify by qhh 20170224 为了防止出现
			// name属性值命名不规范导致找到多个以name_value结尾的对象，从而导致修改其他不需要对象值的现象，目前只取查找当前对象的兄弟以及子对象；
			if(!obj.is("select") && !obj.is(":radio")){// 自定义多选框 查找默认隐藏域
				nameObj = obj.parents("div").first().parent().find("input[name$='"+name+"_name']");
			}else{
				nameObj = obj.parent().children("input[name$='"+name+"_name']");// 保存下拉框选中的文本或单选框、复选框的label属性
			}
		}
		var value = valueObj.val();
		var label = "";
		
		if(name==null || name=="" || valueObj.length==0)
			return true;
		
		if(obj.is("select")){// 下拉框
			obj.val(value);
			
			obj.change(function(){
				valueObj.val($(this).val());
				nameObj.val($(this).find("option:selected").text());
			});
		} else if(obj.is(":radio")){// 单选框
			if(value==obj.val())
				obj.attr("checked",true);
			
			obj.click(function(){
				if($(this).is(":checked")){
					valueObj.val($(this).val());
					
					if($(this).attr("label")!=null)
						label = $(this).attr("label");
					nameObj.val(label);
				}
			});
		} else{	// 复选框
			if(("，"+value+"，").indexOf("，"+obj.val()+"，")>=0){
				obj.prop("checked",true);
				$(obj).parent().find("label[class^='checkbox']").addClass("cur");
			}
			if((","+value+",").indexOf(","+obj.val()+",")>=0){
				obj.prop("checked",true);
				$(obj).parent().find("label[class^='checkbox']").addClass("cur");
			}
			obj.click(function(){
				var valueStr="";
				var nameStr="";
				initObjs.filter(":checkbox[name='"+name+"']:checked").each(function(){
					valueStr+="，"+$(this).val();
					
					if($(this).attr("label")!=null)
						label = $(this).attr("label");
					nameStr+="，"+label;
				});
				if(valueStr.length>0)
					valueStr=valueStr.substring(1);
				if(nameStr.length>0)
					nameStr=nameStr.substring(1);
				valueObj.val(valueStr);
				nameObj.val(nameStr);
				
				var disabled=obj.prop("disabled");
				if(!disabled){
					if(obj.attr('checked')){
			    	$(this).siblings("label[class*='checkbox-mn']").addClass('cur');
			    }
			    else{
			    	$(this).siblings("label[class*='checkbox-mn']").removeClass('cur');
			    }
				}
				
			});
		}
	});
}
/**
 * 金额转化为大写.
 * 
 * @param num
 * @returns
 */
var amount2RMB = function (num) {  
	  var strOutput = "";  
	  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';  
	  num += "00";  
	  var intPos = num.indexOf('.');  
	  if (intPos >= 0)  
	    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
	  strUnit = strUnit.substr(strUnit.length - num.length);  
	  for (var i=0; i < num.length; i++)  
	    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
	    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");  
	}; 

/**
 * title属性设置
 * 
 * @param title需要显示的目标对象
 * @param title内容
 */
function setTitle(titleTargetObj, title){
	if (null != titleTargetObj && undefined != titleTargetObj)
		titleTargetObj.attr("title", title);
}

/**
 * 高亮表格行的效果
 * 
 * @param tableId
 */
function highlightTr(tableId){
	$("#"+tableId+" tr:gt(0):even").css("background", "#fff");
	$("#"+tableId+" tr:gt(0):odd").css("background", "#f9f9f9");
	$("#"+tableId+" tr:gt(0)").hover(
			function() {
				$(this).css("background", "#F0F0F0");
			},
			function() {
				$(this).css("background", $(this)[0].rowIndex % 2 == 0 ? "#f9f9f9" : "#fff");
		});
}


// JQuery防止退格键网页后退
$(document).keydown(function (e) {
    var doPrevent;
    if (e.keyCode == 8) {
        var d = e.srcElement || e.target;
        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else
            doPrevent = true;
    }
    else
        doPrevent = false;

    if (doPrevent)
        e.preventDefault();
}); 
setTimeout("repositionFile()",3000);
function repositionFile(){
	$("input[name='filedata']").css("margin-left","0px");
}
function toogleTextShow(cbId,textId,initFlag){
	   var cb = $("#"+textId).parent().find(":checkbox,:radio");
	   if(cb.is(":checked")){
		   $("#"+textId).show();
		   $("#"+textId).addClass("required");
	   }else{
		   $("#"+textId).hide();
		   $("#"+textId).val('');
		   $("#"+textId).removeClass("required");
	   }
}


function showOrHideCur(obj){
	var labelClass = $(obj).parent().find("label").attr("class");
	if(labelClass.indexOf("cur") < 0){
		$(obj).parent().find("label").addClass("cur");
	}else{
		$(obj).parent().find("label").removeClass("cur");
	}
}





function URLencode(sStr){  
   return encodeURIComponent(sStr).replace(/\+/g, '%2B');  
}


function requestToStms(url){
	if(url.indexOf("?") > 0){
		url += "&pidsession="+pidsession;
	}else{
		url += "?pidsession="+pidsession;
	}
	location.href = "/egrantweb/stmsMain?targetUrl="+encodeURIComponent(url);
}

function collectQuerySelectedItems(requiredConditionHid, irisGrid){
	var querySelsItemName = [];
	// 收集页面检索条件中选了哪些项
	var queryTableObj = $("#" + requiredConditionHid + " *[id='_dyn_panel']");
	$("[id^='_dyn_criteria'][id$='_field']", queryTableObj).each(
		function() {
			querySelsItemName.push($(this).val());
		});
	querySelsItemName = "&searchItems=" + encodeURIComponent(querySelsItemName);// 可使用decodeURIComponent对字符进行解码
	return querySelsItemName;
}

// add by qhh 收集页面所选查询组件，去除某些特定的选项，针对于评审功能下的查询组件（去除年度，活动）
function collectQuerySelectedItems2(requiredConditionHid, irisGrid,excluedItems){
	var querySelsItemName = [];
	var querySelsItemName2 = [];
	// 收集页面检索条件中选了哪些项
	var excludesArray=excluedItems.split(",");
	var queryTableObj = $("#" + requiredConditionHid + " *[id='_dyn_panel']");
	$("[id^='_dyn_criteria'][id$='_field']", queryTableObj).each(
		function() {
			querySelsItemName.push($(this).val());
	});
    
	if(excluedItems!=null && excluedItems!=''){
		var flag=false;
		for(var i=0;i<querySelsItemName.length;i++){
			flag=false;
			for(var j=0;j<excludesArray.length;j++){
				if(querySelsItemName[i]==excludesArray[j]){
					flag=true;
					break;
				}
			}
			if(!flag){
				querySelsItemName2.push(querySelsItemName[i]);
			}
		}
	}
	querySelsItemName = "&searchItems=" + encodeURIComponent(querySelsItemName2);// 可使用decodeURIComponent对字符进行解码
	return querySelsItemName;
}


function collectQueryParams(requiredConditionHid, irisGrid) {
	var querySels = [];
	var queryTableObj = $("#" + requiredConditionHid + " *[id='_dyn_panel']");
	$("[id^='_dyn_criteria'][id$='_field']", queryTableObj).each(
		function() {
			querySels.push($(this).attr('id'));
		});
	
	var queryKVStr = '';
	for ( var i = 0; i < querySels.length; i++) {
		var selId = querySels[i];
		var queryId = $("#"+requiredConditionHid).find('#' + selId).val();
		var destContral = $("#"+requiredConditionHid).find('#' + queryId, $('#' + selId).parent().next());
		var queryValue = destContral.val();
		var queryCellValue = $.trim(queryValue);
		if (!!queryCellValue) {
			if (destContral.is("select")) {
				// var queryText = destContral.find("option:selected").text();
				queryKVStr += '[tear]' + queryId + ':' + queryValue;
				// queryKVStr += '[tear]' + queryId + '_name' + ':' + queryText;
			} else {
				queryKVStr += '[tear]' + queryId + ':' + queryCellValue;
			}
		}
	}
	// var sdata = {};
	// sdata['searchString'] = queryKVStr == '' ? '' : queryKVStr.substring(6);
	// return sdata;
	queryKVStr = queryKVStr == '' ? '' : queryKVStr.substring(6);
	if(queryKVStr != '') {
		if(irisGrid) {
			var rows = irisGrid.getRowNum();
			var page = irisGrid.getPage();
			if(!page) {
				page = '1';
			}
			queryKVStr = queryKVStr + '[tear]page:' + page + '[tear]rows:' + rows; 
		}
		queryKVStr = "&searchString=" + encodeURIComponent(queryKVStr);
	}
	return queryKVStr;
}

function dojoLayoutTabExchange(obj)
{
		var index = 0;
		var j=0;
		for(var i=0;i<obj.parentNode.childNodes.length;i++)
		{
			if(obj.parentNode.childNodes[i].tagName == "DIV")
			{
				obj.parentNode.childNodes[i].className = "dojoTabDiy";
				document.getElementById("dojoTab" + j).style.display = "none";
				if(obj.parentNode.childNodes[i] == obj)  index = j;
				j = j + 1;
			}
		}
		 
		obj.className = "dojoTabDiy current";
		document.getElementById("dojoTab" + index).style.display = "";
		try
		{
			top.resizeFrame();
		}
		catch(ex){}
}

// obj：表格行新增一行的添加按钮
// tableid:容纳添加行的表格id
// 参考date.ftl
function initIrisdatepick(obj,tableid){
	var img = '<img align="absmiddle" style="padding-left:3px; cursor:pointer;vertical-align:middle;" src="'+res+'/images/ico_date.gif" />';
	$(document.getElementById(tableid)).find("tr:visible").find(".irisdatepick:not(.hasDatepick)").datepick({showOnFocus: false, showTrigger: img});
}


function qqTalkAlert(){
	$.ajax( {
		url : ctx+'/show-qq-talk',
		type : 'post',
		dataType: 'JSON',// here
		success : function(data) {
			var qqTalkLink = data.qqTalkLink;
			var div = document.createElement("div"); // we want a DIV element
														// instead
			div.setAttribute("class","qq_contact_b");
		    var oScript= document.createElement("script");
		    oScript.type = "text/javascript";
		    oScript.src=qqTalkLink;
		    $.getScript(qqTalkLink);
		    $.ajaxSetup({
		    	cache: true
		    });
		    // document.getElementById("qq_talk_child").appendChild(oScript);
		    showQQTalk();
			
		}
	});
	return null;
}
function showQQTalk(){
	$("#qq_talk").css("display","");
}
function qqTalkBox() {
	var openUrl = res+'/html/qq-contact.html';// 弹出窗口的url
	// 400*250
	var iWidth=350; // 弹出窗口的宽度;
	var iHeight=200; // 弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; // 获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; // 获得窗口的水平位置;
	window.open(openUrl,"","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft+"toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'"); 
}

function oneLoadScript() {
	var scriptsArray = new Array();
    
    $.cachedScript = function (url, options) {
	    // 循环script标记数组
	    for (var s in scriptsArray) {
		    if (scriptsArray[s]==url) {
			    return { // 则返回一个对象字面量，其中的done之所以叫做done是为了与下面$.ajax中的done相对应
				    done: function (method) {
				    if (typeof method == 'function'){ // 如果传入参数为一个方法
					    method();
				    }
			    }
			    };
		    }
	    } 
	    options = $.extend(options || {}, {
	    	dataType: "script",
	    	url: url,
	    	cache:true // 其实现在这缓存加与不加没多大区别
	    });
	    scriptsArray.push(url); // 将url地址放入script标记数组中
	    return $.ajax(options);
	};
    $.getScript(qqTalkLink).done(function () {
    	showQQTalk();
    });
}
function GetHttpRequest()
{
    if ( window.XMLHttpRequest ) // Gecko
        return new XMLHttpRequest() ;
    else if ( window.ActiveXObject ) // IE
        return new ActiveXObject("MsXml2.XmlHttp") ;
} 
function AjaxPage(sId, url){
    var oXmlHttp = GetHttpRequest() ;
    oXmlHttp.open('GET', url, true);
    oXmlHttp.send(null);
}

function gotoTalk() {
	location.href = "tencent://message/?Menu=yes&amp;amp;uin=800099528&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988AF5A86FE0FCADD6039F98237F94330CD64A740678D9F1BEB5F7F0FBCBAD5704C20A1D8F2317CBFD56238204C34D31A79EE87C53E8EFBD9D99725CC9D13C134E61FDD2D3B78A4DEF542EAFAF3C44A5E745CA1F43435E2FDB3AD5A97826A5026CABFF6FE45DE3C987F96C948F038552144&amp;amp;SigU=30E5D5233A443AB2CDA2514EA22F00D4A65C12753BE07D8B2607F6B89B5442E14816E3B9DE9EB781A2E761A701F8D1907124DB9E7CEFEE75B7B9A89651D30B45594BA730A738FD05";
	$("#qq_talk").css("display","none");
	return false;
}

function backMain() {
	$("#qq_talk").css("display","none");
	return false;
}

// add by qhh 20170122 上传附件限制提示信息
function showFileUploadValidateInfos(tableId,type,validateJson,pageSize){
	var str12=getValidateJDsc(tableId,type,validateJson,pageSize);
	var tips_width=200;
	if(tableId=='file_upload_excel_zip_rjbm'){
		tips_width=320;		
	}
	/*
	 * $("#" + tableId).find(":file").hover(function(){
	 * JT_easy_content_show_byObj("?;&width="+tips_width+";",$(this),"上传文件限制详情",str12);
	 * },function(){$('#JT').remove();$("div[id^='JT_arrow_']").remove();});
	 */
	
	$("#" + tableId).find("#file_upload_button_new_").hover(function(){
		JT_easy_content_show_byObj("?;&width="+tips_width+";",$(this),"上传文件限制详情",str12);
	},function(){$('#JT').remove();$("div[id^='JT_arrow_']").remove();});
}

function getValidateJDsc(tableId,type,validateJson,pageSize){
	var returnVal="";
	// debugger;
	if(type!=null && type!=''){
		   var typeArray=type.split(",");
		   returnVal="文件类型及大小：";
		   var eachVli=new Array();
		   var validateArray= new Array();
		   var fileType="";
		   var fileSize="";
		   var validateStr="";
		   if(validateJson!=null && validateJson!=''){
				validateStr=validateJson.split("{").join('');
				validateStr=validateStr.split("}").join('');
				validateStr=validateStr.split("'").join('');
				if(validateStr!=''){
				  validateArray=validateStr.split(",");
				}
			}
		   
		   for (var int = 0; int < typeArray.length; int++) {
			   fileType=typeArray[int];
			   fileSize="";
			   for(var j = 0; j < validateArray.length; j++){
				   eachVli=validateArray[j].split(":");
				   if(eachVli[0].toLowerCase()==fileType.toLowerCase()){
					   fileSize=(eachVli[1]/1024).toFixed(2);
				   }
			   }
			   returnVal+=fileType;
			   if(fileSize!=''){
				   returnVal+="("+fileSize+"M)、"
			   }else{
				   returnVal+="、";
			   }
		   }
		   
		   returnVal=returnVal.substring(0,returnVal.length-1);
		   if(pageSize!=''&&pageSize!=null){
			   returnVal+="<br/>上传文件最大页数："+pageSize;
		   }
		   
	}
	
	if(tableId=='file_upload_excel_zip_rjbm'){
		// 二级项目申报录入表 增加额外提示信息
		returnVal+="<br/><div style='font-weight: bold;color: #be2833;padding-bottom: 5px;padding-top: 5px;'>温馨提示：</div>1、此操作用于生成“二级项目申报录入表”压缩文件，具体是操作为：<br/>（1）点击本页面“存为excel”按钮，生成一份excel文件；<br/>（2）点击“上传”按钮，上传刚刚生成的excel文件；";
		
	}
	return returnVal;
}

// add by qhh 20170623 判断浏览器版本
function getExplorer() {
	 var explorer = window.navigator.userAgent ;
	 // ie
	 if (explorer.indexOf("MSIE") >= 0) {
	     return "IE";
	 }
	 // firefox
	 else if (explorer.indexOf("Firefox") >= 0) {
	     return "Firefox";
	 }
	 // Chrome
	 else if(explorer.indexOf("Chrome") >= 0){
	     return "Chrome";
	 }
	 // Opera
	 else if(explorer.indexOf("Opera") >= 0){
	     return "Opera";
	 }
	 // Safari
	 else if(explorer.indexOf("Safari") >= 0){
	     return "Safari";
	 }
}

function pagesetup_null(){
	 var hkey_root,hkey_path,hkey_key;
	 hkey_root="HKEY_CURRENT_USER";
	 hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
	 try{
	     var RegWsh = new ActiveXObject("WScript.Shell");
	     hkey_key="header";
	     RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
	     hkey_key="footer";
	     RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
	 }catch(e){}
}

function specialPrint(){
	var totalPage="";
	$("span[class='totalPage_count_']").each(function(){
		totalPage=$(this).text();
	});
	if(totalPage=="" || totalPage=='undefined' || totalPage<=1){
		printAuto();
	}else{
		commPrintHtmlStr_="";
		reportForm_toPage_print_(1);
	}
}

function printAuto(){
	if(getExplorer() == "IE"){
        pagesetup_null();
    }
   	window.print();
}

// add by qhh 20170623 快逸分页打印功能函数
function PrintPages(keCodeName)     
{      
		if(typeof(document.reportForm_turnPageForm.autoPrintFlag_)!='undefined'){
			document.reportForm_turnPageForm.autoPrintFlag_.value="false";
	    }
	    var url=ctx+"/review/evassign/auto-print?keCodeName="+keCodeName;
	    var newWindow = window.open(url, "autoPrint");
	    return newWindow;
}

// add by qhh 20170623 快逸分页打印功能函数
function reportForm_toPage_print_(pageNo){
    if( pageNo < 1 || pageNo > reportForm_getTotalPage() ) { return; }
    var d = new Date();
    var t_i_m_e = d.getTime();
    var actionUrl=document.URL;
    if(document.URL.indexOf("?") > 0 ){
    	actionUrl=actionUrl+"&t_i_m_e="+t_i_m_e;
    }else{
    	actionUrl=actionUrl+"?t_i_m_e="+t_i_m_e;
    }
    if(typeof(document.reportForm_turnPageForm.autoPrintFlag_)=='undefined'){
    	actionUrl+="&autoPrintFlag_=true";
    }else{
    	document.reportForm_turnPageForm.autoPrintFlag_.value="true";
    }
    document.reportForm_turnPageForm.action=actionUrl;
    document.reportForm_turnPageForm.reportForm_currPage.value = pageNo;
    document.reportForm_turnPageForm.submit();
}

// add by qhh 20170623 快逸分页打印功能函数
// 参数说明：autoPrintFlag_ 表示点击了快逸报表界面打印按钮；keCodeName 用于表示该次打印的唯一标识；最好不要与其他界面打印同名
function auto_print_cur_page_(autoPrintFlag_,keCodeName){
	if(autoPrintFlag_=='true'){
		var totalPage="";
		$("span[class='totalPage_count_']").each(function(){
			totalPage=$(this).text();
		});
		var reportForm_currPage=document.reportForm_turnPageForm.reportForm_currPage.value;// 当前页数

		scmSuccess("正在收集打印所需数据，请勿关闭此页面，第"+reportForm_currPage+"页，共"+totalPage+"页，请稍后...",'250px',2000);
		
		$("#reportForm").css("page-break-after","always");// 强制分页
		var printHtmlStr=$("#reportForm").prop("outerHTML");// 需打印的html内容
		// printHtmlStr=replaceAllStr(printHtmlStr,"\"","\\\"");//要打印的html源码
		var printCssStr = $("#reportForm_style").next().html();// 对应css样式
		// 当前界面样式
		var cssArray=new Array();
		// 打印内容下的js方法；需去除
		var jsArray=new Array();
		
		var t_flag=true;
		$("#reportForm >tbody").find('*').each(function(){
		   	if($(this).prop("class")!='undefined' && $(this).prop("class")!=''){
		   		var tempFlag=true;
		   		for (var int = 0; int < cssArray.length; int++) {
					if(cssArray[int]==$(this).prop("class")){
						tempFlag=false;
					}
				}
		   		if(tempFlag){
		   			cssArray.push($(this).prop("class"));
		   		}
		   	}
		   	if($(this).attr("onmouseover")!=null && $(this).attr("onmouseover")!='' && t_flag){
		   		t_flag=false;
		   		jsArray.push($(this).attr("onmouseover").toString());
		   	}
		});
		
		if($("#reportForm").attr("onmouseout")!=null && $("#reportForm").attr("onmouseout")!=''){
			jsArray.push($("#reportForm").attr("onmouseout").toString());
		}
		
		var cssArrayStr=cssArray.toString();
		var jsArrayStr=jsArray.toString();
		
	 	var url = ctx+"/ajax/autoPrintInfoCollect";
		$.ajax({
			url : url,
			dataType : 'text',
			type : 'post',
			async: false,
			data : {
				"cssArrayStr":cssArrayStr,"jsArrayStr":jsArrayStr,"printHtmlStr":printHtmlStr,"printCssStr":printCssStr,"keCodeName":keCodeName,"reportForm_currPage":reportForm_currPage
			},
			beforeSend : function(XMLHttpRequest){
			},
			complete :  function(XMLHttpRequest){
			},
			success : function(data){
				if(data=='error'){
					scmError("操作失败!", null, 2000);
				}
			},
			error : function (data){
				prcWin.closeWin();// 关闭遮罩层
				scmError("操作失败!", null, 2000);
			}
		});
		if(parseInt(reportForm_currPage)<parseInt(totalPage)){
			reportForm_currPage++;
			reportForm_toPage_print_(reportForm_currPage);
		}else{
			prcWin.closeWin();// 关闭遮罩层
			PrintPages(keCodeName);
		}
	} 
}

// add by qhh 快逸报表公用跳页函数
function reportForm_toPage(pageNo){
    if( pageNo < 1 || pageNo > reportForm_getTotalPage() ) { return; }
    var d = new Date();
    var t_i_m_e = d.getTime();
    var url = (document.URL.indexOf("?") == -1 ? document.URL : document.URL.substring(0, document.URL.indexOf("?")));
    document.reportForm_turnPageForm.action= url +"?t_i_m_e="+t_i_m_e;
    document.reportForm_turnPageForm.reportForm_currPage.value = pageNo;
  	// add by qhh 20170623 重写界面跳页函数中打印标示，false标示不是打印功能
    if(typeof(document.reportForm_turnPageForm.autoPrintFlag_)!='undefined'){
		document.reportForm_turnPageForm.autoPrintFlag_.value="false";
    }
    document.reportForm_turnPageForm.submit();
}

function clearCriteriaInfo(){
	var criterSetObj=$("div[id='_dyn_panel']");
	if(criterSetObj!=null){
		var functionkey=$(criterSetObj).attr("functionkey");
		// 查找当前页面选项
		var tempStr="";
		var tempId="";
		var objTempName="";
		var isDisabled="";
		var obj=null;
		$(criterSetObj).find("div[id^='_dyn_criteria']").each(function(){
			tempId=$(this).attr("id");
			// 从第10个字符开始找，是否包含_c
			if(tempId.indexOf("_c",10)<0){
				debugger;
				try {
					objTempName=$(this).find("select").val();
					tempStr=window["_dyn_"+objTempName][0].tagType;// 标签类型
					// 按照类型，清空对应检索条件所选值
					if(tempStr.indexOf("tree")>-1){
						$(this).next().find("input[id^='"+objTempName+"']").val("");
					}else{
						obj=$(this).next().find("[id='"+objTempName+"']");
						if(!obj.prop("disabled")){
							obj.val("");
						}
					}
				} catch (e) {
				}
			}
		});
		
	}
	//STMS-24072 特殊样式查询条件清空
	
	/*$("#grant_code_at").val("");
	$("#grant_code_at1").val("");
	$("#awardAmtProject_rate_gt").val("");
	$("#app_money_gt").val("");
	$("#awardAmtProject_rate_lt").val("");
	$("#app_money_lt").val("");
	$("#contratc_price_gt").val("");
	$("#ctr_money_gt").val("");
	$("#contratc_price_lt").val("");
	$("#ctr_money_lt").val("");
	$("#delay_days_gt").val("");
	$("#delay_days_num").val("");*/
	
	
	$("input[id^='grant_code_at']").val("");
	$("input[id^='awardAmtProject_rate']").val("");
	$("input[id^='app_money']").val("");
	$("select[id^='contratc_price']").val("");
	$("input[id^='ctr_money']").val("");
	$("#delay_days_gt").val("");
	$("#delay_days_num").val("");
	$("select[id^='review_rate']").val("");
	$("select[id^='avoid_rate']").val("");
	$("input[id^='app_avoid']").val("");
}

$(function(){
	$('.checkbox-mn').click(function(){
		var checkboxes=$(this).siblings("input[type='checkbox']");
		var disabled=checkboxes.prop("disabled");
		if(!disabled){
			if(checkboxes.attr('checked')){
	    	$(this).removeClass('cur');
	    }
	    else{
				$(this).addClass('cur');
	    }
		}
    });
	
	$(".btn_inspect").each(function(){
		$(this).val($(this).attr("title"));
	});
	
	// qhh add 20181119 解决弹出框样式问题 浏览器窗口变化是，自动计算弹出框的大小（按px） --
	// 优化后的方法，以前按%时，再不同分辨率下弹出框样式不统一（有细微变化），故改为按px
	$(window).resize(function() {
		try {
			 resizeTbShowWidthAndHeight();
		} catch (e) {
		}
	});
	
});



// 查询是否能pdf下载
function getPdfBefore(keyCode,type){
	var flag = false;
	$.ajax({
		   url:ctx+"/prpapprove/getPdfbefore",
		   data:{
			   "keyCode":keyCode,
			   "type":type
		   },
		   async:false,
			type : "post",
			success : function(data) {
				if(data.pdfView=="success"){
					flag = true;
				}else{
					alert(data.msg);
				}
			},
			error : function() {
				msg = "error";
			}
	   });
	return flag;
}

// 查询 网办pdf是否已经对接完成
function getNetworkPdfBefore(keyCode){
	var resule = false;
	$.ajax({
		   url:ctx+"/prpapprove/getNetworkPdfBefore",
		   data:{
			   "keyCode":keyCode
		   },
		   async:false,
		   type : "post",
		   success : function(data) {
				if(data.flag=="1"){
					resule = true;
				}else if(data.flag=="0"){
					resule = false;
					scmWarn("pdf文件未对接完成，请稍后重试！",'450px',2000); 
				}else if(data.flag=="2"){
					resule = false;
					scmWarn("无法获取pdf文件，请联系技术支持！",'450px',2000); 
				}else if(data.flag=="3"){
					resule = false;
					scmWarn("pdf文件对接失败，请联系技术支持！",'450px',2000); 
				}else{
					scmWarn('pdf文件下载出错！');
				}
			},
			error : function() {
				msg = "error";
			}
	   });
	return resule;
}

// 插入pdf下载记录
function getPdfAfter(keyCode,type){
	$.ajax({
		   url:ctx+"/prpapprove/getPdfAfter",
		   data:{
			   "keyCode":keyCode,
			   "type":type
		   },
		   // async:false,
			type : "post",
			success : function(data) {
				
			},
			error : function() {
				
			}
	   });
}


// 申报书切换标签页时调用的方法，否则只有第一页会正常绑定滚动条
function scrollFunction_change_tab(){
	var classDiv="<div class='textarea-example text_examples'><div class='content'><div class='formClass'><div class='textarea-wrapper'>";
	var textarea_clone_div="<div class='textarea-clone'></div>";
	$("textarea").not(".ckeditor").each(function(index,obj){// 不考虑富文本编辑器
		if($(obj).is(":hidden")){
			return;
		}
		
		var name=$(obj).attr("name");
		
		// 如果没有定义名字，那就什么都不做
		if(!name){
			// 没有定义name，是查看页面，无需处理
		} else {
			if(name.indexOf("|")>-1 && name.indexOf("[0]")>-1){
				// 如果是表格隐藏行中的文本框，就加上一个class进行区分
				$(obj).removeClass("textarea-hidden").addClass("textarea-hidden");
			} else {
				// 正常文本框
				var height=$(obj).height();
				var rows=$(obj).attr("rows");
				
				if(height==0 && !rows){// 既没有写高度也没有写rows属性，代表是查看页面，此时什么也不做
					// 暂时什么也不做
				} else {
					if($(obj).closest(".textarea-wrapper").length>0){// 防止重复添加
						return;
					}
					// 对正常文本框添加父级元素和兄弟元素
					$(obj).wrap(classDiv);
					$(obj).after(textarea_clone_div);
				}
			}
		}
	});
	
	setTimeout(function(){
		scrollFunction();
	},200);
	
}

function scrollFunction(){
	$.fn.getCursorPosition=function(){
		var el=$(this).get(0),pos=0;
		if("selectionStart" in el){
			pos=el.selectionStart;
		}else if("selection" in document){
			el.focus();
			var sel=document.selection.createRange(),selLength=document.selection.createRange().text.length;
			sel.moveStart("character",-el.value.length);
			pos=sel.text.length-selLength;
		}
		return pos;
	}
	
	$(".textarea-wrapper").each(function(index,obj){
		var textarea=$(obj).find("textarea"),textareaWrapper=$(obj),textareaClone=$(obj).find(".textarea-clone");
	
		// 进入页面后绑定新样式滚动条
		var $tthis=$(textarea),textareaContent=textarea.val(),clength=textareaContent.length,cursorPosition=textarea.getCursorPosition();
		textareaContent="<span>"+textareaContent.substr(0,cursorPosition)+"</span>"+textareaContent.substr(cursorPosition,textareaContent.length);
		textareaContent=textareaContent.replace(/\n/g,"<br />");
		textareaClone.html(textareaContent+"<br />");
		$tthis.css("height",textareaClone.height());
		
		var textareaCloneSpan=textareaClone.children("span"),textareaCloneSpanOffset=0,
			viewLimitBottom=(parseInt(textareaClone.css("min-height")))-textareaCloneSpanOffset,viewLimitTop=textareaCloneSpanOffset,
			viewRatio=Math.round(textareaCloneSpan.height()+textareaWrapper.find(".mCSB_container").position().top);
		if(viewRatio>viewLimitBottom || viewRatio<viewLimitTop){
			if((textareaCloneSpan.height()-textareaCloneSpanOffset)>0){
				textareaWrapper.mCustomScrollbar("scrollTo",textareaCloneSpan.height()-textareaCloneSpanOffset-textareaLineHeight);
			}else{
				textareaWrapper.mCustomScrollbar("scrollTo","top");
			}
		}
	});
}

// 点击表格的添加按钮会调用这个方法
function scrollFunction_hidden_textarea(tableId){
	$.fn.getCursorPosition=function(){
		var el=$(this).get(0),pos=0;
		if("selectionStart" in el){
			pos=el.selectionStart;
		}else if("selection" in document){
			el.focus();
			var sel=document.selection.createRange(),selLength=document.selection.createRange().text.length;
			sel.moveStart("character",-el.value.length);
			pos=sel.text.length-selLength;
		}
		return pos;
	}
	
	var classDiv="<div class='textarea-example text_examples'><div class='content content-hidden'><form class='formClass'><div class='textarea-wrapper textarea-wrapper-hidden'>";
	var textarea_clone_div="<div class='textarea-clone'></div>";
	$("#"+tableId).find("tr:last").find("textarea.textarea-hidden").each(function(index,obj){// 只处理最后一行
		$(obj).wrap(classDiv);
		$(obj).after(textarea_clone_div);
	});
	
	$("#"+tableId).find("tr:last").find(".textarea-wrapper-hidden").each(function(index,obj){// 只处理最后一行
		var textareaLineHeight=parseInt($(obj).find("textarea").css("line-height"));
		
		var height=$(obj).find("textarea").height();// 获取textarea对象的高度
		if(height==0){// 代表文本框中没有写height，而是以rows来代表高度
			var rows=$(obj).find("textarea").attr("rows");
			if(rows){
				height=rows*textareaLineHeight;
			}
		}
		
		$(obj).height(height+5);
		$(obj).parent().parent().height(height+10);
		$(obj).find("textarea").css("min-height",height);
		
		// 绑定滚动条
		$(obj).mCustomScrollbar({
			scrollInertia:0,
			theme:"dark",
			advanced:{autoScrollOnFocus:false},
			mouseWheel:{disableOver:["select","option","keygen","datalist",""]},
			keyboard:{enable:false},
			snapAmount:textareaLineHeight,
			autoHideScrollbar:false  // true代表默认隐藏滚动条
		});
	
		var textarea=$(obj).find("textarea"),textareaWrapper=$(obj),textareaClone=$(obj).find(".textarea-clone");
		
		textarea.bind("keyup keydown",function(e){
			var $this=$(this),textareaContent=$this.val(),clength=textareaContent.length,cursorPosition=textarea.getCursorPosition();
			textareaContent="<span>"+textareaContent.substr(0,cursorPosition)+"</span>"+textareaContent.substr(cursorPosition,textareaContent.length);
			textareaContent=textareaContent.replace(/\n/g,"<br />");
			textareaClone.html(textareaContent+"<br />");
			$this.css("height",textareaClone.height());
			var textareaCloneSpan=textareaClone.children("span"),textareaCloneSpanOffset=0,
				viewLimitBottom=(parseInt(textareaClone.css("min-height")))-textareaCloneSpanOffset,viewLimitTop=textareaCloneSpanOffset,
				viewRatio=Math.round(textareaCloneSpan.height()+textareaWrapper.find(".mCSB_container").position().top);
			if(viewRatio>viewLimitBottom || viewRatio<viewLimitTop){
				if((textareaCloneSpan.height()-textareaCloneSpanOffset)>0){
					textareaWrapper.mCustomScrollbar("scrollTo",textareaCloneSpan.height()-textareaCloneSpanOffset-textareaLineHeight);
				}else{
					textareaWrapper.mCustomScrollbar("scrollTo","top");
				}
			}
		});
	});
}






/**
 * add by qhh 20171113 信用主体信用校验
 */
function ajaxCreditValidateBefore(ruleType,processType){
	// processType 标识规则类型
	// ruleType 标识校验阶段
	var rtn = false;
	$.ajax({
		url:"/egrantweb/grantsetting/validate-grant",
		data:{"ruleType":ruleType,"processType":processType,"grantCode":0},
		dataType:'text',
		async:false,
		success:function(msg){
			if(!!msg){
				// 违反了信用
				var msgData = msg.split('[br@br@br]');// STMS-13626
				var content = '';
				for ( var i = 0, length = msgData.length; i < length; i++) {
					content += (i + 1) + '.' + msgData[i]
							+ '<br/>';
				}
				// 先关闭了该页面的弹出层，才能弹出另外的层。
				tb_remove();
				$("#creditObject_content_dlg").html(content);
				tb_show('提示','#TB_inline?height=50%&width=50%&inlineId=creditObject_inlineDlg',false);
				rtn = false;
			}else{
				rtn = true;
			}
		}
	});
	return rtn;
}



/**
 * add by qhh 20171113 信用主体信用恢复校验
 */
function ajaxCreditResetValidateBefore(ruleType,processType,creditObjCode){
	// processType 标识规则类型
	// ruleType 标识校验阶段
	// creditObjCode 信用主体code
	var rtn = false;
	$.ajax({
		url:"/egrantweb/grantsetting/validate-grant",
		data:{"ruleType":ruleType,"processType":processType,"grantCode":0,"creditObjCode":creditObjCode},
		dataType:'text',
		async:false,
		success:function(msg){
			if(!!msg){
				// 违反了信用
				var msgData = msg.split('[br@br@br]');// STMS-13626
				var content = '';
				for ( var i = 0, length = msgData.length; i < length; i++) {
					content += (i + 1) + '.' + msgData[i]
							+ '<br/>';
				}
				// 先关闭了该页面的弹出层，才能弹出另外的层。
				tb_remove();
				$("#creditObject_content_dlg").html(content);
				tb_show('提示','#TB_inline?height=50%&width=50%&inlineId=creditObject_inlineDlg',false);
				rtn = false;
			}else{
				rtn = true;
			}
		}
	});
	return rtn;
}

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function irisUuid(){ return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); }

function buDel(buCode_){
	confirm("此类工作提醒将在以下时间范围内不再提醒：","",function (isConfirm,buWinSelfObj_){
		if(isConfirm){
			var cur_bu_time_setting_=$("#cur_bu_time_setting").val();
			var bu_close_self_time_=$("#bu_close_self_time").val();
			debugger;
			if(cur_bu_time_setting_==''){
				scmWarn("请先选择不再提醒的时间范围");
				return;
			}else if(cur_bu_time_setting_=='5'){
				if($("#bu_close_self_time").val()==''){
					scmWarn("请先选择自定义时间范围");
					return;
				}else if(!irisValDateByObjPrivate($("#bu_close_self_time"))){
					scmWarn("自定义时间范围不符合日期规范，请重新选择");
					return;
				}else{
					var bu_close_self_time_dateObj_=new Date(bu_close_self_time_);
					var cur_dateObj_=new Date();
					if(cur_dateObj_>bu_close_self_time_dateObj_){
						scmWarn("自定义时间范围不能小于当前日期");
						return;
					}
				}
			}
			$.ajax({
    			url: ctx + '/bu/ajax_bu_time_setting',
    			data:{"buCode_":buCode_,"cur_bu_time_setting_":cur_bu_time_setting_,"bu_close_self_time_":bu_close_self_time_},
    			type : "post",// 提交方式 post,get
    			success : function(data) {
    				if(data.cz_res_flag=='success'){
    					buWinSelfObj_.close();
    					scmSuccess(data.cz_res);
    					//隐藏当前bu
    					$("[buTinfo='bu_content_"+buCode_+"_buTinfo']").remove();
    					$('.bu_info_').tooltipster('content', $("#tooltip_content_bu"));//刷新右上角工作提醒内容
    					//刷新bu序号
    					var bu_s_index_=0;
    					$(".bu_span_index").each(function(){
    						$(this).text(++bu_s_index_);
    					});
    					$("#buTotal").text($("#buList").find("li").length);//刷新bu总数
    					//qhh 异步刷新session中buMap的内容
    					$.ajax({
    		    			url: ctx + '/bu/refreshBuMap',
    		    			data:{"buCode_":buCode_},
    		    			type : "post",// 提交方式 post,get
    		    			success : function(data) {
    		    			},
    		    			error : function() {
    		    			}
    		    		});
    				}else if(data.cz_res_flag=='error'){
    					scmError(data.cz_res);	
    				}else{
    					scmWarn(data.cz_res);
    				}
    				
    			},
    			error : function() {
    				scmError("操作失败，请联系管理员");
    			}
    		});
		}else{
			
		}
	},{type:"info",width:"545",height:"300",ajaxLoadContent:ctx+"/bu/load_bu_time_setting?f_=-dialog",lazyConfirmButFlag:true});
}

function buReback(buCode_){
	tb_show("恢复工作提醒",ctx+'/bu/bu_reback?f_=-dialog&TB_iframe=true&height=50%&width=400');
}

//验证日期
function irisValDateByObjPrivate(obj) {
	var str = getTagValueByJq(obj);
	var yyyy_mm_flag = false;
	var dateformate=obj.attr("dateformate");
	if(typeof(dateformate)=='undefined'||dateformate==null||dateformate==''){
		dateformate="yyyy-mm-dd";
	}else if(dateformate=='yyyy-mm'){
		if(str == ""){
			return false;
		}
		str = str + "-01";
		yyyy_mm_flag = true;
	}else{
		dateformate=dateformate.toLowerCase();
	}
	var HHII="";
	var HHIISS="";
	var messageTipDate="";
	var flag_hhii=false;
	var flag_hhiiss=false; 
	if(dateformate.indexOf("hh:ii:ss")>0){
		//日期格式 yyyy-mm-dd hh:ii:ss
		flag_hhiiss=true;
		messageTipDate=messageTip.dateHHMM;
		var str_bak=str;
		str=str_bak.split(" ")[0];
		try {
			HHIISS=str_bak.split(" ")[1];
		} catch (e) {
			HHIISS="";
		}
		if(HHIISS=='undefined'||HHIISS==null||HHIISS==''){
			HHIISS="";
		}
	}else if(dateformate.indexOf("hh:ii")>0){
		//日期格式 yyyy-mm-dd hh:ss
		flag_hhii=true;
		messageTipDate=messageTip.dateHHMM;
		var str_bak=str;
		str=str_bak.split(" ")[0];
		try {
			HHII=str_bak.split(" ")[1];
		} catch (e) {
			HHII="";
		}
		if(HHII=='undefined'||HHII==null||HHII==''){
			HHII="";
		}
	}else if(yyyy_mm_flag){
		//日期格式 yyyy-mm
		messageTipDate=messageTip.dateYYYYMM;
	}
	else{
		//日期格式 yyyy-mm-dd
		messageTipDate=messageTip.date;
	}
	var matchArray = str
			.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))([-])(10|12|0?[13578])([-])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-])(11|0?[469])([-])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-])(0?2)([-])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-])(0?2)([-])(29)$)|(^([3579][26]00)([-])(0?2)([-])(29)$)|(^([1][89][0][48])([-])(0?2)([-])(29)$)|(^([2-9][0-9][0][48])([-])(0?2)([-])(29)$)|(^([1][89][2468][048])([-])(0?2)([-])(29)$)|(^([2-9][0-9][2468][048])([-])(0?2)([-])(29)$)|(^([1][89][13579][26])([-])(0?2)([-])(29)$)|(^([2-9][0-9][13579][26])([-])(0?2)([-])(29)$))/ig);
	if (locale == "en_US") {
		matchArray = str
				.match(/^((((02|2)\/29)\/(19|20)(([02468][048])|([13579][26])))|((((0?[1-9])|(1[0-2]))\/((0?[1-9])|(1\d)|(2[0-8])))|((((0?[13578])|(1[02]))\/31)|(((0?[1,3-9])|(1[0-2]))\/(29|30))))\/((20[0-9][0-9])|(19[0-9][0-9])|(18[0-9][0-9])))$/);
	}
	var flag_hhII_ok=true; 
	if(flag_hhii){
		//验证时 分
		var matchArrayHHii=HHII.match(/^(([0-1]\d)|(2[0-4])):[0-5]\d$/);
		if(matchArrayHHii==null){
			flag_hhII_ok=false; 
		}
	}
	var flag_hhIISS_ok=true; 
	if(flag_hhiiss){
		//验证时 分 秒
		var matchArrayHHiiss=HHIISS.match(/^(([0-1]\d)|(2[0-4])):[0-5]\d:[0-5]\d$/);
		if(matchArrayHHiiss==null){
			flag_hhIISS_ok=false; 
		}
	}
	
	if (str != "" && (matchArray == null || !flag_hhII_ok || !flag_hhIISS_ok)) {
		return false;
	}

	return true;
}

function ajaxTest(){
	$.ajax({
		url: ctx + '/ajaxTest',
		data:{},
		type : "post",
		success : function(data) {
		},
		error : function() {
		}
	});
}


//查看评审答辩材料--专家账号下
function viewDefenseMaterialsInfos(dmId,atcCode,showFlag_){
	if(showFlag_=='parentPage'){
		//评审表编辑界面，在iframe父页面显示弹出框
		tb_show_inIframe_parent("查看答辩材料",ctx+"/review/uploadmaterial/showDefenseMaterialPage?dm_id="+dmId+"&flag=view&TB_iframe=true&height=500&width=900",false);
	}else{
		showDefenseMterialsFile(dmId,'view');	
	}
}

//查看答辩材料公用函数
function showDefenseMterialsFile(dm_id,flag){
	var title="上传答辩材料";
	if("view"==flag){
		title="查看答辩材料";
	}
	tb_show(title,ctx+"/review/uploadmaterial/showDefenseMaterialPage?dm_id="+dm_id+"&flag="+flag+"&TB_iframe=true&height=500&width=900",false);
}

function buUpdateExp(title,url){
	debugger;
	tb_remove(null,"showBu");
	parent.tb_remove();
	tb_show(title,url, false);
}

//选择证件类型为身份证时 给性别、生日初始化
function changeCardType(){
	var cardTypeObj = $('input[card_info="card_type_value"]');
	var cardCodeObj = $('input[card_info="card_code"]');
	if(cardTypeObj.val()=="1"){
		cardCodeObj.addClass("idCard");
		cardCodeObj.attr("label","身份证");
		cardCodeObj.bind('blur',function() {
			if(fetchGenderNum(cardCodeObj.val()) % 2 == 0){//偶数为女性
				$('input[card_info="gender_1"]').removeAttr('checked');
				$('input[card_info="gender_2"]').attr("checked",true); 
				$('input[card_info="gender"]').val("F");
				$('input[card_info="gender_name"]').val("女");
			}else{
				$('input[card_info="gender_2"]').removeAttr('checked');
				$('input[card_info="gender_1"]').attr("checked",true);
				$('input[card_info="gender"]').val("M");
				$('input[card_info="gender_name"]').val("男");
			}
			if(cardCodeObj.val() == null || cardCodeObj.val() == ""){
				$('input[card_info="gender_1"]').removeAttr('checked');
				$('input[card_info="gender_2"]').removeAttr('checked');
				$('input[card_info="gender_name"]').val("");
				$('input[card_info="gender"]').val("");
			}
			$("#birthday").val(parseStr2Date(fetchDateFromCardNum(cardCodeObj.val())));
		});
	} else {
		cardCodeObj.removeClass("idCard");
		cardCodeObj.attr("label","证件号码");
		cardCodeObj.unbind('blur');
	}
}

//选择证件类型为身份证时 给性别、生日初始化（弹窗用）
function changeCardType2(){
	var card_type_value = $('#card_type_value').val();
	var card_code = $('#card_code').val();
	if(card_type_value=="1"){
		if(fetchGenderNum(card_code) % 2 == 0){//偶数为女性
			$('#gender', parent.document).val("2");
			$('input[card_info="gender"]', parent.document).val("2");
			$('input[card_info="gender_name"]', parent.document).val("女");
		}else{
			$('#gender', parent.document).val("1");
			$('input[card_info="gender"]', parent.document).val("1");
			$('input[card_info="gender_name"]', parent.document).val("男");
		}
		$('#dob', parent.document).val(parseStr2Date(fetchDateFromCardNum(card_code)));
		$('#birthday', parent.document).val(parseStr2Date(fetchDateFromCardNum(card_code)));
	} 
}

//选择证件类型为身份证时 给性别、生日初始化
function changeCardType3(){
	var cardTypeObj = $('input[card_info="card_type_value"]');
	var cardCodeObj = $('input[card_info="card_code"]');
	if(cardTypeObj.val()=="1"){
		cardCodeObj.addClass("idCard");
		cardCodeObj.attr("label","身份证");
		cardCodeObj.bind('blur',function() {
			if(fetchGenderNum(cardCodeObj.val()) % 2 == 0){//偶数为女性
				$('#gender').val("2");
				$('input[card_info="gender"]').val("2");
				$('input[card_info="gender_name"]').val("女");
			}else{
				$('#gender').val("1");
				$('input[card_info="gender"]').val("1");
				$('input[card_info="gender_name"]').val("男");
			}
			if(cardCodeObj.val() == null || cardCodeObj.val() == ""){
				$('#gender').val("");
				$('input[card_info="gender"]').val("");
				$('input[card_info="gender_name"]').val("");
			}
			$("#birthday").val(parseStr2Date(fetchDateFromCardNum(cardCodeObj.val())));
		});
	} else {
		cardCodeObj.removeClass("idCard");
		cardCodeObj.attr("label","证件号码");
		cardCodeObj.unbind('blur');
	}
}

//身份证号发生改动
function changeCardCode(){
	var cardCodeObj = $('input[card_info="card_code"]');
	cardCodeObj.bind('blur',function() {
		if(fetchGenderNum(cardCodeObj.val()) % 2 == 0){//偶数为女性
			$('input[card_info="gender_1"]').removeAttr('checked');
			$('input[card_info="gender_2"]').attr("checked",true); 
			$('input[card_info="gender"]').val("F");
		}else{
			$('input[card_info="gender_2"]').removeAttr('checked');
			$('input[card_info="gender_1"]').attr("checked",true);
			$('input[card_info="gender"]').val("M");
		}
		if(cardCodeObj.val() == null || cardCodeObj.val() == ""){
			$('input[card_info="gender_1"]').removeAttr('checked');
			$('input[card_info="gender_2"]').removeAttr('checked');
		}
		$("#birthday").val(parseStr2Date(fetchDateFromCardNum(cardCodeObj.val())));
	});
}

function fetchGenderNum(cardNum) {
	return cardNum.substring(cardNum.length - 2, cardNum.length - 1);
}

function fetchDateFromCardNum(cardNum) {
	return cardNum.substring(cardNum.length - 12, cardNum.length - 4);
}

function parseStr2Date(str) {
	var births = [];
	if ("en_US" == "${locale}") {
		births.push(str.substring(4, 6));
		births.push(str.substring(6, 8));
		births.push(str.substring(0, 4));
		return births.join("/");
	} else {
		births.push(str.substring(0, 4));
		births.push(str.substring(4, 6));
		births.push(str.substring(6, 8));
		return births.join("-");
	}
}

//选择证件类型为身份证时 给性别、生日初始化(预留方法：)
function changeCardInfo(id){
	var cardTypeObj = $('input[card_info="card_type_value'+id+'"]');
	var cardCodeObj = $('input[card_info="card_code_'+id+'"]');
	if(cardTypeObj.val()=="1"){
		cardCodeObj.addClass("idCard");
		cardCodeObj.attr("label","身份证");
		cardCodeObj.bind('blur',function() {
			if(fetchGenderNum(cardCodeObj.val()) % 2 == 0){//偶数为女性
				$('input[card_info="gender_1_'+id+'"]').removeAttr('checked');
				$('input[card_info="gender_2_'+id+'"]').attr("checked",true); 
				$('input[card_info="gender_'+id+'"]').val("F");
			}else{
				$('input[card_info="gender_2_'+id+'"]').removeAttr('checked');
				$('input[card_info="gender_1_'+id+'"]').attr("checked",true);
				$('input[card_info="gender"]_'+id+'').val("M");
			}
			if(cardCodeObj.val() == null || cardCodeObj.val() == ""){
				$('input[card_info="gender_1_'+id+'"]').removeAttr('checked');
				$('input[card_info="gender_2"]').removeAttr('checked');
			}
			$('input[card_info="birthday_'+id+'"]').val(parseStr2Date(fetchDateFromCardNum(cardCodeObj.val())));
		});
	} else {
		cardCodeObj.removeClass("idCard");
		cardCodeObj.attr("label","证件号码");
		cardCodeObj.unbind('blur');
	}
}
//选择国籍为中国时 给性别、生日初始化
function changeRegion(){
	var cardTypeObj = $('input[card_info="region_value"]');
	var cardCodeObj = $('input[card_info="card_code"]');
	if(cardTypeObj.val()=="156"){
		cardCodeObj.bind('blur',function() {
			if(fetchGenderNum(cardCodeObj.val()) % 2 == 0){//偶数为女性
				$('input[card_info="gender_1"]').removeAttr('checked');
				$('input[card_info="gender_2"]').attr("checked",true); 
				$('input[card_info="gender"]').val("F");
				$('input[card_info="gender_name"]').val("女");
			}else{
				$('input[card_info="gender_2"]').removeAttr('checked');
				$('input[card_info="gender_1"]').attr("checked",true);
				$('input[card_info="gender"]').val("M");
				$('input[card_info="gender_name"]').val("男");
			}
			if(cardCodeObj.val() == null || cardCodeObj.val() == ""){
				$('input[card_info="gender_1"]').removeAttr('checked');
				$('input[card_info="gender_2"]').removeAttr('checked');
				$('input[card_info="gender_name"]').val("");
				$('input[card_info="gender"]').val("");
			}
			$("#birthday").val(parseStr2Date(fetchDateFromCardNum(cardCodeObj.val())));
		});
	} else {
		cardCodeObj.unbind('blur');
	}
}	
/*
 *在线查看pdf   
 *参数　fileCode：文件filecode
 *download：是否显示下载按钮　0:显示　　１：隐藏
 *print：是否显示打印按钮0:显示　　１：隐藏
 */
function showOnlinePdf(fileCode,download,print){
	var file_path=ctx+"/file/ajax-filedownload?fileCode="+fileCode;
	$.ajax({
		   url:ctx+"/file/valid-filepdf",
		   data:{
			   "fileCode":fileCode
		   },
		   async:true,
		   type : "post",
		   success : function(data) {
			   debugger;
			   if(data.file_type=="pdf"){
				  var pdf_file_path=domainegrant+res_app_home+"/"+data.file_path;
				  var pdfPageUrl=res_app+"/js/pdf/web/viewer.html?download="+download+"&print="+print+"&v="+Math.random()+"&file="+encodeURIComponent(pdf_file_path)+"#page=1";
				  window.open(pdfPageUrl);
				  //window.open(pdfPageUrl,'top');
				  //tb_show("在线查看pdf",pdfPageUrl+"&TB_iframe=true&height=500&width=700",false);
				  //tb_show('在线查看pdf',pdfPageUrl+"&TB_iframe=true&height=500&width=700&zIndex=1000000",false,false,"showPagePdf");
			   }/*else if(data.file_type=="jpg" || data.file_type=="jpeg"　|| data.file_type=="png"　|| data.file_type=="gif"　|| data.file_type=="bmp"){
				   var imagePageUrl=domainegrant+res_app_home+"/"+data.file_path;
				   //tb_show("",imagePageUrl,true);
				   var wBoxObj=getParent();
				   var wBox = wBoxObj.wBox({
						wBoxURL: imagePageUrl,
						callBack: null,
				        noTitle: false,
				        title : "查看图片",
						show:true,
						timeout:0,
						target:imagePageUrl,
						requestType:'img',// iframe,ajax,img
						drag:true
					});
				    wBoxObj.find("#wBox").find(".wBox_body").css({"border":"0px solid #c9001c"});
			   }*/else{
				   window.location.href=file_path;
			   }
			},
			error : function() {
				scmWarn('查看出错，请求稍后重试!');
			}
	   });
}

function showOnlinePdfReview(fileCode,download,print,pdfDes,evCodeStr){
	$.ajax({
		   url:ctx+"/file/showOnlinePdfReview",
		   data:{
			   "fileCode":fileCode,
			   "pdfDes":pdfDes,
			   "evCodeStr":evCodeStr
		   },
		   async:false,
		   type : "post",
		   success : function(data) {
			   debugger;
			   var pdf_file_path=domainegrant+res_app_home+"/"+data.file_path;
			   var pdfPageUrl=res_app+"/js/pdf/web/viewer.html?download="+download+"&print="+print+"&v="+Math.random()+"&file="+encodeURIComponent(pdf_file_path)+"#page=1";
			   window.open(pdfPageUrl);
			},
			error : function() {
				scmWarn('查看出错，请求稍后重试!');
			}
	   });
}

function showOnlineReview(fileCode,download,print){
	var file_path=ctx+"/file/ajax-filedownload?fileCode="+fileCode;
	$.ajax({
		   url:ctx+"/file/valid-filepdf",
		   data:{
			   "fileCode":fileCode
		   },
		   async:true,
		   type : "post",
		   success : function(data) {
			   if(data.file_type=="pdf"){
				   showOnlinePdfReview(fileCode,download,print,'','');
			   }else{
				   window.location.href=file_path;
			   }
			},
			error : function() {
				scmWarn('查看出错，请求稍后重试!');
			}
	   });
}


function getParent(){
	var allObj=$("#tb_show_image");
	var allObjVal=allObj.val();
	if(allObjVal=="1"){
		return $("body");
	}else{
		var v_parent=$("#tb_show_image",parent.document);
		var v_parentVal=v_parent.val();
		if(v_parentVal=="1"){
			return parent.$("body");
		}else{
			return parent.parent.$("body");// 最多只能支持三层
		}
	}
}