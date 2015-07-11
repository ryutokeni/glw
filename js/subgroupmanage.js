var CardRestoreRight = null;    //恢复额度的权限
var userRight = null;           //登录类别
var GroupInfo = null;           //本群资料
var GroupInfoSS = null;         //本群资料数组未拆分   
var CardList = null;            //会员列表
var CardListSS = null;          //会员列表（未拆分）
var SubUser = null;             //子帐号列表
var SubUserSS = null;           //子帐号列表（未拆分）
var SubGroup = null;
var IsAdmin = null;
var GameSetupName; //设置名称
var arrGaemSetupName;
var isCompany = false; //是否公司级别
var varCardSetupID1;
var varCardSetupIDss;
var firstnode;
var ispause = "";
var chouma = null;
var bz; //币种
var qx = ""; //权限
var tsxx = Text(108);

var dTextInput2 = "<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='";
var dTextInput3 = "<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22'";
var dTextInput4 = "<tr><td align='left' valign='middle'>";

//格式化数字

function BuildSubmitButtons(fName1, fName2)
{
    var buttonScript = new StringBulider();
    buttonScript.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='" + fName1 + "'/></td>");
    buttonScript.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
    buttonScript.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='" + fName2 + "' /></td>");
}
// ngdlong - Temp comment since do not used
//function FormatNumber(srcStr, nAfterDot) {
//    var srcStr, nAfterDot;
//    var resultStr, nTen;
//    srcStr = "" + srcStr + "";
//    strLen = srcStr.length;
//    dotPos = srcStr.indexOf(".", 0);
//    if (dotPos == -1) {
//        resultStr = srcStr + ".";
//        for (i = 0; i < nAfterDot; i++) {
//            resultStr = resultStr + "0";
//        }
//        return resultStr;
//    }
//    else {
//        if ((strLen - dotPos - 1) >= nAfterDot) {
//            nAfter = dotPos + nAfterDot + 1;
//            nTen = 1;
//            for (j = 0; j < nAfterDot; j++) {
//                nTen = nTen * 10;
//            }
//            resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen;
//            return resultStr;
//        }
//        else {
//            resultStr = srcStr;
//            for (i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
//                resultStr = resultStr + "0";
//            }
//            return resultStr;
//        }
//    }
//}

// ngdlong - Temp remove since do not used
//function RTrim(str) {
//    var whitespace = new String(" \t\n\r");
//    var s = new String(str);
//    if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
//        var i = s.length - 1;
//        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
//            i--;
//        }
//        s = s.substring(0, i + 1);
//    }
//    return s;
//}

//function LTrim(str) {
//    var whitespace = new String(" \t\n\r");
//    var s = new String(str);
//    if (whitespace.indexOf(s.charAt(0)) != -1) {
//        var j = 0, i = s.length;
//        while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
//            j++;
//        }
//        s = s.substring(j, i);
//    }
//    return s;
//}



function Trim(str) {
    return RTrim(LTrim(str));
}

function StringBulider() {
    this._strings = [];
    if (arguments.length == 1) {
        this._strings.push(arguments[0]);
    }
}

StringBulider.prototype.append = function (str) {
    this._strings.push(str);
    return this;
}

StringBulider.prototype.toString = function () {
    return this._strings.join("");
}
/* 返回长度 */
StringBulider.prototype.length = function () {
    var str = this._strings.join("");
    return str.length;
}
String.prototype.isInChinese = function () {
    return (this.length != this.replace(/[^\x00-\xff]/g, "**").length);
}

/* 删除后几位字符 */
StringBulider.prototype.del = function (num) {
    var len = this.length();
    var str = this.toString();
    str = str.slice(0, len - num);
    this._strings = [];
    this._strings.push(str);
}
//清除所有内容
function ClearAll() {
    document.getElementById("divTitle").style.display = "none";
    document.getElementById("divContent").style.display = "none";
    document.getElementById("nodes").style.display = "none";
    document.getElementById("divSub").innerHTML = "";
}
function playAll() {
    document.getElementById("divTitle").style.display = "";
    document.getElementById("divContent").style.display = "";
    document.getElementById("divSub").innerHTML = "";
}
function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？\"]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}


//验证是否数字
function fucCheckNUM(NUM) {
    var i, j, strTemp;
    strTemp = "0123456789.";
    if (NUM.length == 0)
        return 0
    for (i = 0; i < NUM.length; i++) {
        j = strTemp.indexOf(NUM.charAt(i));
        if (j == -1) {
            //说明有字符不是数字   
            return 0;
        }
    }
    //说明是数字   
    return 1;
}
function checknames(name) {
    var charpos = name.search("[^A-Za-z0-9]");
    if (charpos >= 0) {
        return false;
    }
    return true;
}
//显示代理名称
function GetGroupString(grouplength) {
    var strGroupLevleName = document.getElementById("HiddenGroupLevleName").value;
    var arrGroupLevleName = strGroupLevleName.split(';');
    var groupstring = "";
    var iLeve = grouplength / 3 - 2;
    if (iLeve >= 0) {
        groupstring = arrGroupLevleName[iLeve];
    }
    return groupstring;
}
//错误提示
function falsePrompt(str) {
    switch (str) {
        case "14":
            return Text(109);
        case "1001":
            return Text(110);
        case "1002":
            return Text(111);
        case "1003":
            return Text(112);
        case "1004":
            return Text(113);
        case "1101":
            return Text(114);
        case "1102":
            return Text(115);
        case "1103":
            return Text(116);
        case "1104":
            return Text(117);
        case "1105":
            return Text(118);
        case "1106":
            return Text(119);
        case "1107":
            return Text(120);
        case "1108":
            return Text(121);
        case "1109":
            return Text(122);
        case "1110":
            return Text(123);
        case "1111":
            return Text(124);
        case "1112":
            return Text(125);
        case "1113":
            return Text(126);
        case "1114":
            return Text(127);
        case "1116":
            return Text(128);


    }
}
//获得币种
function getbz(id) {
    var str = "";
    var bztype = bz.split(';');
    str = bztype[id - 1];
    return str;
}
//----------------------------------------------菜单---------------------------------------
//显示管理菜单

var spanClass1 = "<span class='font19'>" + Text(129) + "</span> | ";
var spanClass2 = "<a onclick='showCardManage_Menu()' href='#' id='hreSubCard'>" + Text(130) + "</a> | ";
var spanClass3 = "<a onclick='showSubUserManage_Menu()' href='#' id='hreSubUser'>" + Text(131) + "</a> |";

function ShowMenuServer(StrArray) {
    GroupInfoSS = StrArray.split('##');
    var ss = StrArray.split('##')
    GroupInfo = ss;
    if (GroupInfo[0].length <= 6)//六位以下不能开会员
    {
        isCompany = true;
    }
    //标题
    var Str = "<table width='99%' height='24' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' valign='middle'>";
    Str += spanClass1;
    if (!isCompany) {
        Str += spanClass2;
    }
    Str += "<a onclick='showSubUserManage_Menu()' href='#' id='hreSubUser'>" + Text(131) + "</a> |";
    Str += "</td></tr></table> ";
    document.write(Str);
}
function ShowGroupMenu() {
    //标题
    var Str = "<table width='99%' height='24' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' valign='middle'>";
    Str += spanClass1;
    if (!isCompany) {
        Str += spanClass2;
    }
    Str += spanClass3;
    Str += "</td></tr></table> ";
    document.getElementById("divTitle").innerHTML = Str;
}
//客户操作标题
function ShowCardMenu() {
    //标题
    var Str = "<table width='99%' height='24' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' valign='middle'>";
    Str += "<a onclick='ShowGroupManage_Menu()' href='#' id='hreSubGroup'>" + Text(129) + "</a> | ";
    if (!isCompany) {
        Str += "<span class='font19'>" + Text(130) + "</span> | ";
    }
    Str += "<a onclick='showSubUserManage_Menu()' href='#' id='hreSubUser'>" + Text(131)+ "</a> | ";
    Str += "</td></tr></table> ";
    document.getElementById("divTitle").innerHTML = Str;
}
//子帐号操作标题
function ShowSubUserMenu() {
    //标题
    var Str = "<table width='99%' height='24' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' valign='middle'>";
    Str += "<a onclick='ShowGroupManage_Menu()' href='#' id='hreSubGroup'>" + Text(129) + "</a> | ";
    if (!isCompany) {
        Str += spanClass2;
    }
    Str += "<span class='font19'>" + Text(131) + "</span> |";
    Str += "</td></tr></table> ";
    document.getElementById("divTitle").innerHTML = Str;
}

function PushHTML(id, code)
{
    document.getElementById(id).innerHTML = code;
}




//显示下级代理管理(菜单点击,无数据更新)
function ShowGroupManage_Menu() {
    ShowGroupMenu();
    ShowGroupInfo("group");
    ShowSubGroup(SubGroup);
}
//显示帐户管理（无数据更新）
function ShowGroupManage() {
    ShowSubGroup(SubGroup);
}
//操作成功刷新群组数据
function refeshGroupManage() {
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_refeshGroupManageSuccess;
    cbo.DoCallBack("AjaxDb.aspx?PageName=GroupRefresh&GroupID=" + GroupInfo[0] + "&Nameid=" + GroupInfo[1]);
}
//新增成功重新显示群组资料及下线
function Cbo_refeshGroupManageSuccess(responseText) {
    var ss = responseText.split('@@');
    var ss1 = ss[0].split('##');
    GroupInfo = ss1;
    ShowGroupInfo("group");
    ShowSubGroup(ss[1]);
}
//显示会员管理(菜单点击)
function showCardManage_Menu() {
    ShowCardMenu();
    ShowGroupInfo("card");
    if (CardListSS != null) {
        ShowCard(CardListSS, "");
    }
    else//无数据则更新
    {
        getCardList(GroupInfo[0]);
    }
}
//显示会员管理
function showCardManage() {
    ShowCardMenu();
    ShowGroupInfo("card");
    ShowCard(CardListSS, "");
}
//操作成功卡刷新数据
function refeshCardManage() {
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_refeshCardManageSuccess;
    cbo.DoCallBack("AjaxDb.aspx?PageName=CardRefresh&GroupID=" + GroupInfo[0] + "&Nameid=" + GroupInfo[1]);
}
function Cbo_refeshCardManageSuccess(responseText) {
    if (responseText != "") {
        var ss = responseText.split('@@');
        var ss1 = ss[0].split('##');
        GroupInfo = ss1;
        ShowGroupInfo("card");
        ShowCard(ss[1]);
    }
}
//显示子帐号管理(菜单点击)
function showSubUserManage_Menu() {
    ShowSubUserMenu();
    ShowGroupInfo("subuser");
    if (SubUserSS != null) {
        showSubUser(SubUserSS, "");
    }
    else//无数据则更新
    {
        getSubUser(GroupInfo[0]);
    }

}
//显示子帐号管理
function showSubUserManage() {
    playAll();
    ShowSubUserMenu();
    ShowGroupInfo("subuser");
    showSubUser(SubUserSS, "");
}
//操作成功刷新子帐号数据
function refreshSubUserManage() {
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_refreshSubUserManageSuccess;
    cbo.DoCallBack("AjaxDb.aspx?PageName=SubUserRefresh&GroupID=" + GroupInfo[0]);
}
function Cbo_refreshSubUserManageSuccess(responseText) {
    if (responseText != "") {
        playAll();
        var reponse = responseText.split('%%');
        GroupInfoSS = reponse;
        ShowSubUserMenu();
        ShowGroupInfo("subuser");
        getSubUser();
    }
    else {
        playAll();
        ShowSubUserMenu();
        ShowGroupInfo("subuser");
        getSubUser();

    }
}
//------------------------------------------------------群组操作----------------------------------------
//显示群组信息

function BuildCurrentyArray() {
    var currenty = new Array("", Text(132), Text(133), Text(134));

    return currenty;
}

function BuildBetArray() {
    var betType = new Array(Text(135), Text(136));

    return betType;
}

function ShowGroupInfoServer(StrArray, type) {
    
    GroupInfoSS = StrArray.split('##');
    var Array1 = BuildCurrentyArray();
    var Array2 = BuildBetArray();
    var ss = StrArray.split('##');
    //GroupInfo=ss;
    //代理信息
    var Str = new StringBulider();
    Str.append("<table width='99%' border='0' cellpadding='4' cellspacing='0' bgcolor='#DFDFDF'><tr><td height='95' align='left' valign='middle'>");
    Str.append("<table width='80%' border='0' cellspacing='0' cellpadding='0'>");
    Str.append("<tr><td height='22'>" + GetGroupString(ss[0].length) + "" + Text(137) + "： <span style='color:red'>" + ss[1] + "</span>&nbsp;(&nbsp;" + ss[2] + "&nbsp;)" + "</td><td>" + Text(138) + "：" + ss[3] + "</td><td>" + Text(139) + "：" + ((ss[4] == "True") ? "<span style='color:Red'>" + Text(140) + "</span>" : "<span style='color:Green'>" + Text(141) + "</span>") + "</td><td>" + Text(142) + "：" + ((ss[5] == 'True') ? "<span style='color:Red'>" + Text(143) + "</span>" : "<span style='color:Green'>" + Text(141) + "</span>") + "</td></tr>");
    if (ss[0].length > 6) { Str.append("<tr><td height='22'>" + GetGroupString(ss[0].length) + "" + Text(144) + "： " + parseInt(ss[6] * 100) + "%" + "</td><td>" + Text(234) + "：" + Array2[ss[7]] + "</td><td>" + Text(146) + "：" + ss[8] + "%" + " </td><td>&nbsp;</td></tr>"); }
    //帐户管理
    if (type == "group") {
        if (GroupInfo[0].length >= 18) {
            Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td align='left'></td></tr>");
        }
        else {
            Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' class='font4' onclick='ShowAddGroup()' >" + Text(148) + " " + GetGroupString(ss[0].length + 3) + "</a></td><td align='left'></td></tr>");
        }
        Str.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
        Str.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
        Str.append("<tr><td width='80px'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(149) + "：</td><td width='16%'><input id='txtGroupNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchSubGroup()' value='" + Text(149) + "' class='btn1'/>");
        Str.append("</td></tr></table>");
    }
    //会员管理
    if (type == "card") {
        Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' class='font4' onclick='showAddCard()' >" + Text(151) + "</a></td><td align='left'></td></tr>");
        Str.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
        Str.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
        Str.append("<tr><td width='80px'>" + Text(150) + "：</td><td width='16%'><input id='txtCardNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchCard()' value='" + Text(149) + "' class='btn1'/>");
        Str.append("</td><td><div id='nodes1'></div></td> </tr></table>");
    }
    //子帐号管理
    if (type == "subuser") {
        Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' class='font4' onclick='showAddSubUser()' >" + Text(153) + "</a></td><td align='left'></td></tr>");
        Str.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
        Str.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
        Str.append("<tr><td width='80px'>" + Text(152) + "：</td><td width='16%'><input id='txtSubUserNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchSubUser()' value='" + Text(149) + "' class='btn1'/>");
        Str.append("</td><td><div id='nodes2'></div></td> </tr></table>");
    }
    Str.append("</td></tr></table>");
    Str.append("</td></tr></table>");
    Str.append("<table width='50%' height='10' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td>");
    Str.append("</td></tr></table>");
    document.write(Str);
}
//显示群组信息
function ShowGroupInfo(type) {
    var Array1 = BuildCurrentyArray();
    var Array2 = BuildBetArray();
    var ss = GroupInfo;
    //代理信息
    var Str = new StringBulider();
    Str.append("<table width='99%' border='0' cellpadding='4' cellspacing='0' bgcolor='#DFDFDF'><tr><td height='95' align='left' valign='middle'>");
    Str.append("<table width='80%' border='0' cellspacing='0' cellpadding='0'>");
    Str.append("<tr><td height='22'>" + GetGroupString(ss[0].length) + ""+ Text(137) + "： <span style='color:red'>" + ss[1] + "</span>&nbsp;(&nbsp;" + ss[2] + "&nbsp;)" + "</td><td>" + Text(138) + "：" + ss[3] + "</td><td>" + Text(139) + "：" + ((ss[4] == "True") ? "<span style='color:Red'>" + Text(140) + "</span>" : "<span style='color:Green'>" + Text(141) + "</span>") + "</td><td>" + Text(142) + "：" + ((ss[5] == 'True') ? "<span style='color:Red'>" + Text(143) + "</span>" : "<span style='color:Green'>" + Text(141) + "</span>") + "</td></tr>");
    if (ss[0].length > 6) { Str.append("<tr><td height='22'>" + GetGroupString(ss[0].length) + "" + Text(144) + "： " + parseInt(ss[6] * 100) + "%" + "</td><td>" + Text(234) + "：" + Array2[ss[7]] + "</td><td>" + Text(146) + "：" + ss[8] + "%" + " </td><td>&nbsp;</td></tr>"); }
    //帐户管理
    if (type == "group") {
        if (GroupInfo[0].length >= 18) {
            Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td align='left'></td></tr>");
        }
        else {
            Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' class='font4' onclick='ShowAddGroup()' >" + Text(148) + " " + GetGroupString(ss[0].length + 3) + "</a></td><td align='left'></td></tr>");
        }
        Str.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
        Str.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
        Str.append("<tr><td width='80px'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(149) + "：</td><td width='16%'><input id='txtGroupNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchSubGroup()' value='" + Text(149) + "' class='btn1'/>");
        Str.append("</td></tr></table>");
    }
    //会员管理
    if (type == "card") {
        Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' class='font4' onclick='showAddCard()' >" + Text(151) + "</a></td><td align='left'></td></tr>");
        Str.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
        Str.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
        Str.append("<tr><td width='80px'>" + Text(150) + "：</td><td width='16%'><input id='txtCardNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchCard()' value='" + Text(149) + "' class='btn1'/>");
        Str.append("</td><td><div id='nodes1'></div></td> </tr></table>");
    }
    //子帐号管理
    if (type == "subuser") {
        Str.append("<tr><td height='22' width='200px'>" + Text(147) + "：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' class='font4' onclick='showAddSubUser()' >" + Text(153) + "</a></td><td align='left'></td></tr>");
        Str.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
        Str.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
        Str.append("<tr><td width='80px'>" + Text(152) + "：</td><td width='16%'><input id='txtSubUserNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchSubUser()' value='" + Text(149) + "' class='btn1'/>");
        Str.append("</td> </tr></table>");
    }
    Str.append("</td></tr></table>");
    Str.append("</td></tr></table>");
    Str.append("<table width='50%' height='10' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td>");
    Str.append("</td><td><div id='nodes2'></div></td></tr></table>");
    document.getElementById("divContent").innerHTML = Str;
}
//显示下级列表
function ShowSubGroupServer(StrArray) {
    var ss = StrArray.split('$$');
    SubGroup = StrArray;
    var Str = "<table width='99%'  border='0' cellpadding='0' cellspacing='1.5' bgcolor='#FFFFFF'>";
    Str += ShowSubGroupHead();
    //    if (firstnode.length > 9) {
    //        if (ss[0].split('##')[0].length - 3 == firstnode.length) {
    //            for (var i = 0; i < (ss.length); i++) {
    //                var iLine = i % 2;
    //                Str += ShowGroupDetail(ss[i], iLine);
    //            }
    //        }
    //    }
    //    else {
    for (var i = 0; i < (ss.length); i++) {
        var iLine = i % 2;
        Str += ShowGroupDetail(ss[i], iLine);
    }
    //    }

    Str += "</table>";
    document.write(Str);
}
//显示下级列表
function ShowSubGroup(StrArray) {
    ss = StrArray.split('$$');
    SubGroup = StrArray;
    playAll()
    var Str = new StringBulider();
    Str.append("<table width='99%'  border='0' cellpadding='0' cellspacing='1.5' bgcolor='#FFFFFF'>");
    Str.append(ShowSubGroupHead());
    //    if (firstnode.length > 9) {
    //        if (ss[0].split('##')[0].length - 3 == firstnode.length) {
    //            for (var i = 0; i < (ss.length); i++) {
    //                var iLine = i % 2;
    //                Str += ShowGroupDetail(ss[i], iLine);
    //            }
    //        }
    //    }
    //    else {
    for (var i = 0; i < ss.length; i++) {
        var iLine = i % 2;
        Str.append(ShowGroupDetail(ss[i], iLine));
    }
    //    }
    document.getElementById("divSub").innerHTML = Str + "</table>";

}

// Show sub group 
// 
function ShowSubGroupHead() {
    var ssName = new Array(20);
    ssName[0] = Text(155);
    ssName[1] = Text(156);
    ssName[2] = Text(138);
    ssName[3] = Text(144);
    ssName[4] = Text(145);
    ssName[5] = Text(157);
    ssName[6] = Text(158);
    ssName[7] = Text(159);
    ssName[8] = Text(160);
    ssName[9] = Text(161);
    ssName[15] = Text(162);
    ssName[10] = Text(163);
    ssName[11] = Text(155);
    ssName[12] = Text(160);
    ssName[13] = Text(164);
    ssName[14] = Text(182);
    ssName[16] = Text(166);
    ssName[17] = Text(167);
    ssName[18] = Text(168);
    var Str = new StringBulider();
    Str.append("<tr >");
    Str.append("<td  width='60px' height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    Str.append(TextWidth(60, ssName[1]));
    Str.append(TextWidth(85, ssName[2]));

    if (GroupInfo[0].length > 3) {
        Str.append(TextWidth(60, ssName[3]));
        if (GroupInfo[0].length == 9) {
            Str.append(TextWidth(90, ssName[13]));
            Str.append(TextWidth(95, ssName[14]));        
        }
        Str.append(TextWidth(65, ssName[4]));
        Str.append(TextWidth(85, ssName[5]));
        Str.append(TextWidth(90, ssName[18]));
        Str.append(TextWidth(120, ssName[17]));
    }

    Str.append(TextWidth(70, ssName[7]));
    Str.append(TextWidth(60, ssName[8]));
    Str.append(TextWidth(60, ssName[9]));
    Str.append(TextWidth(80, ssName[15]));
    Str.append(TextWidth(60, ssName[16]));
    Str.append(TextWidth(60, ssName[10]));
    Str.append(TextWidth(60, ssName[11]));
    Str.append(TextWidth(60, ssName[12]));

    Str.append("</tr>");
    return Str;
}

function TextWidth(width, data) {
    var finalText;
    var prefixText = "<td width='" + width + "px' align='center' valign='middle' background='../images/tabbg.jpg'>";
    var suffixText = "</td>";

    finalText = prefixText + data + suffixText;

    return finalText;
}

function TextWith(data){
    var finalText;

    finalText = prefix + data + suffix;

    return finalText;
}
function ShowGroupDetail(StrArray, iLine) {
    if (StrArray == "") return "";

    var ss = StrArray.split('##');

    var Array2 = new Array(Text(189), Text(177));

    var Str = new StringBulider();
    if (iLine == 0) {
        Str.append("<tr  bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        Str.append("<td align='center'>" + ss[1] + "</td>"); //用  户
        Str.append("<td align='center'>" + ss[2] + "</td>"); //别   名
        Str.append("<td class='number'>" + ss[3] + "&nbsp;</td>"); //剩余点数
        if (GroupInfo[0].length > 3) {
            Str.append("<td class='per'>" + parseInt(ss[4] * 100) + "%" + "</td>"); //股东占成
            if (GroupInfo[0].length == 9) {
                var gd = parseInt(parseInt(GroupInfo[6] * 100) - parseInt(ss[4] * 100) - parseInt(ss[5] * 100))
                Str.append("<td class='per'>" + gd + "%" + "</td>");
                Str.append("<td class='per'>" + parseInt(100 - ss[4] * 100 - gd) + "%" + "</td>");
            }
            Str.append("<td width='50px' align='center'>" + Array2[ss[6]] + "</td>"); //洗码类型
            Str.append("<td class='per'>" + ss[7] + "%" + "</td>"); //洗码比
            Str.append("<td class='per'>" + parseInt(ss[17]*100) + "%" + "</td>"); //电子占成
            Str.append("<td class='per'>" + ss[16] + "%" + "</td>"); //电子洗码比
            
        }
        //Str.append( "<td class='number'>" + FormatNumber(ss[11],0) + "&nbsp;</td>");//洗码佣金
        //锁定
        if (ss[9] == "True")
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(140) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        if (ss[10] == "True") //投注
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(143) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        Str.append("<td class='date'>" + ss[11] + "</td>"); //开户日期
        Str.append("<td width='80px'>" + ss[13] + "</td>"); //最后登录ip
        Str.append("<td width='40px' align='center'>" + getbz(ss[14]) + "</td>"); //币种
        Str.append("<td width='170px' height='25px' align='center'>"); //设定
        Str.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
        Str.append("<tr>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(170) + "' name='imageField42' src='../images/index_r15_c21.jpg' onclick='ShowAddPoint(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(171) + "' src='../images/index_r15_c23.jpg'/ onclick='showReducePoint(\"" + ss + "\")'></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(163) + "' src='../images/index_r15_c26.jpg'/ onclick='showEditGroup(\"" + ss + "\")'></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(172) + "' disabled='disabled' src='../images/index_r15_c30.jpg '/></td>");
        Str.append("</tr>");
        Str.append("</table></td>");
        if (ss[9] == "True") {
            Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='lockGroup(\"" + ss[0] + "\",false)' /></td>");
        }
        else {
            Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='lockGroup(\"" + ss[0] + "\",true)'/></td>");
        }
        //暂停
        if (ss[10] == "True") {
            Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseGroup(\"" + ss[0] + "\",false)'/></td>");
        }
        else
        { Str.append("<td ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseGroup(\"" + ss[0] + "\",true)'/></td>"); }
        Str.append("</tr>");
    }
    if (iLine == 1) {
        Str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        Str.append("<td align='center'>" + ss[1] + "</td>"); //用  户
        Str.append("<td align='center'>" + ss[2] + "</td>"); //别   名
        Str.append("<td class='number'>" + ss[3] + "&nbsp;</td>"); //剩余点数
        if (GroupInfo[0].length > 3) {
            Str.append("<td class='per'>" + parseInt(ss[4] * 100) + "%" + "</td>"); //股东占成
            if (GroupInfo[0].length == 9) {
                var gd = parseInt(parseInt(GroupInfo[6] * 100) - parseInt(ss[4] * 100) - parseInt(ss[5] * 100))
                Str.append("<td class='per'>" + gd + "%" + "</td>");
                Str.append("<td class='per'>" + parseInt(100 - ss[4] * 100 - gd) + "%" + "</td>");
            }
            Str.append("<td width='50px' align='center'>" + Array2[ss[6]] + "</td>"); //洗码类型
            Str.append("<td class='per'>" + ss[7] + "%" + "</td>"); //洗码比
            Str.append("<td class='per'>" + parseInt(ss[17]*100) + "%" + "</td>"); //电子占成
            Str.append("<td class='per'>" + ss[16] + "%" + "</td>"); //电子洗码比
            
        }
        //Str.append( "<td class='number'>" + FormatNumber(ss[11],0) + "&nbsp;</td>");//洗码佣金
        //锁定
        if (ss[9] == "True")
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(140) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        if (ss[10] == "True") //投注
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(143) + "</td>"); }
        else {
            Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>");
        }
        Str.append("<td class='date'>" + ss[11] + "</td>"); //开户日期
        Str.append("<td width='80px'>" + ss[13] + "</td>"); //最后登录ip
        Str.append("<td width='40px' align='center'>" + getbz(ss[14]) + "</td>"); //币种
        Str.append("<td width='170px' height='25px' align='center'>"); //设定
        Str.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
        Str.append("<tr>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(170) + "' name='imageField42' src='../images/index_r15_c21.jpg' onclick='ShowAddPoint(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(171) + "' src='../images/index_r15_c23.jpg'/ onclick='showReducePoint(\"" + ss + "\")'></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(163) + "' src='../images/index_r15_c26.jpg'/ onclick='showEditGroup(\"" + ss + "\")'></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(172) + "' disabled='disabled' src='../images/index_r15_c30.jpg '/></td>");
        Str.append("</tr>");
        Str.append("</table></td>");
        if (ss[9] == "True") {
            Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='lockGroup(\"" + ss[0] + "\",false)' /></td>");
        }
        else {
            Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='lockGroup(\"" + ss[0] + "\",true)'/></td>");
        }
        //暂停
        if (ss[10] == "True") {
            Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseGroup(\"" + ss[0] + "\",false)'/></td>");
        }
        else
        { Str.append("<td ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseGroup(\"" + ss[0] + "\",true)'/></td>"); }
        Str.append("</tr>");
    }
    return Str;
}
//-----------------搜索下级群组---------------------
function searchSubGroup() {
    var searchGroupNameID = document.getElementById("txtGroupNameID").value;
    if (searchGroupNameID == "") {
        alert(Text(175));
        return;
    }

    var cbo = new CallBackObject();
    cbo.OnComplete = searchGroupComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=SearchGroup&NameID=" + searchGroupNameID);
}
//搜索完毕处理
function searchGroupComplete(responseText) {
    responseText = responseText.split("@@");
    if (responseText[0] != "") {
        var ssSubGroup = responseText[0].split('##');
        GroupInfo = responseText[2].split('##');
        var Str = new StringBulider();
        Str.append("<table width='99%'  border='0' cellpadding='0' cellspacing='1.5' bgcolor='#FFFFFF'>");
        Str.append(ShowSubGroupHead());
        var Array2 = new Array(Text(189), Text(177));
        var ss = ssSubGroup;
        if (ssSubGroup[0] != "") {
            Str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
            Str.append("<td align='center'>" + ss[1] + "</td>"); //用  户
            Str.append("<td align='center'>" + ss[2] + "</td>"); //别   名
            Str.append("<td class='number'>" + ss[3] + "&nbsp;</td>"); //剩余点数
            if (GroupInfo[0].length > 3) {
                Str.append("<td class='per'>" + parseInt(ss[4] * 100) + "%" + "</td>"); //股东占成
                if (GroupInfo[0].length == 9) {
                    var gd = parseInt(parseInt(GroupInfo[6] * 100) - parseInt(ss[4] * 100) - parseInt(ss[5] * 100))
                    Str.append("<td class='per'>" + gd + "%" + "</td>");
                    Str.append("<td class='per'>" + parseInt(100 - ss[4] * 100 - gd) + "%" + "</td>");
                }
                Str.append("<td width='50px' align='center'>" + Array2[ss[6]] + "</td>"); //洗码类型
                Str.append("<td class='per'>" + ss[7] + "%" + "</td>"); //洗码比
                Str.append("<td class='per'>" + parseInt(ss[17] * 100) + "%" + "</td>"); //电子占成
                Str.append("<td class='per'>" + ss[16] + "%" + "</td>"); //电子洗码比

            }
            //Str.append( "<td class='number'>" + FormatNumber(ss[11],0) + "&nbsp;</td>");//洗码佣金
            //锁定
            if (ss[9] == "True")
            { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(140) + "</td>"); }
            else
            { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
            if (ss[10] == "True") //投注
            { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(143) + "</td>"); }
            else {
                Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>");
            }
            Str.append("<td class='date'>" + ss[11] + "</td>"); //开户日期
            Str.append("<td width='80px'>" + ss[13] + "</td>"); //最后登录ip
            Str.append("<td width='40px' align='center'>" + getbz(ss[14]) + "</td>"); //币种
            Str.append("<td width='170px' height='25px' align='center'>"); //设定
            Str.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
            Str.append("<tr>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(170) + "' name='imageField42' src='../images/index_r15_c21.jpg' onclick='ShowAddPoint(\"" + ss + "\")'/></td>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(171) + "' src='../images/index_r15_c23.jpg'/ onclick='showReducePoint(\"" + ss + "\")'></td>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(163) + "' src='../images/index_r15_c26.jpg'/ onclick='showEditGroup(\"" + ss + "\")'></td>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(172) + "' disabled='disabled' src='../images/index_r15_c30.jpg '/></td>");
            Str.append("</tr>");
            Str.append("</table></td>");
            if (ss[9] == "True") {
                Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='lockGroup(\"" + ss[0] + "\",false)' /></td>");
            }
            else {
                Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='lockGroup(\"" + ss[0] + "\",true)'/></td>");
            }
            //暂停
            if (ss[10] == "True") {
                Str.append("<td><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseGroup(\"" + ss[0] + "\",false)'/></td>");
            }
            else
            { Str.append("<td ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseGroup(\"" + ss[0] + "\",true)'/></td>"); }
            Str.append("</tr>");
            if (responseText[1] > "") {
                var jiedian = responseText[1].split("#");
                var str1 = new StringBulider();
                str1.append("<table align='left'><tr><td align='left'>");
                for (var i = jiedian.length - 2; i >= 0; i--) {
                    str1.append("<a style='font-size:10pt;color:blue;' href='#' onclick='searchgroup1(\"" + jiedian[i].split(',')[1] + "\",\"" + jiedian[i].split(',')[0] + "\")'>");
                    str1.append(jiedian[i].split(',')[1]);
                    str1.append("</a>");
                    str1.append("&nbsp;/&nbsp;");
                }
                str1.del(7);
                str1.append("</td></tr><table>");
                document.getElementById("nodes").innerHTML = str1;
                document.getElementById("nodes").style.display = "";
            }
        }

        Str.append("</table>");
        document.getElementById("divSub").innerHTML = Str;
    }
    else {
        alert(Text(178));
        return;
    }
}
function searchgroup1(nameid, groupid)//搜索代理的上级代理信息
{
    var cbo = new CallBackObject();
    cbo.OnComplete = searchGroupComplete1;
    cbo.DoCallBack("AjaxDb.aspx?PageName=SearchGroup1&NameID=" + nameid + "&GroupID=" + groupid);
}
function searchGroupComplete1(responseText) {
    var ss2 = responseText.split('@@');
    var ss1 = ss2[0].split('##');
    GroupInfo = ss1;
    isCompany = false;
    if (GroupInfo[0].length <= 6)//六位以下不能开会员
    {
        isCompany = true;
    }
    var Str = "<table width='99%' height='24' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' valign='middle'>";
    Str += "<span class='font19'>" + Text(136) + "</span> | ";
    if (!isCompany) {
        Str += "<a onclick='showCardManage_Menu()' href='#' id='hreSubCard'>客户管理</a> | ";
    }
    Str += "<a onclick='showSubUserManage_Menu()' href='#' id='hreSubUser'>子帐号管理</a> |";
    Str += "</td></tr></table> ";
    document.getElementById("divTitle").innerHTML = Str;

    var Array2 = BuildBetArray();
    var ss = GroupInfo;
    //代理信息
    var Str1 = new StringBulider();
    Str1.append("<table width='99%' border='0' cellpadding='4' cellspacing='0' bgcolor='#DFDFDF'><tr><td height='95' align='left' valign='middle'>");
    Str1.append("<table width='80%' border='0' cellspacing='0' cellpadding='0'>");
    Str1.append("<tr><td height='22'>" + GetGroupString(ss[0].length) + "： <span style='color:red'>" + ss[1] + "</span>&nbsp;(&nbsp;" + ss[2] + "&nbsp;)" + "</td><td>" + Text(138) + "：" + ss[3] + "</td><td>" + Text(139) + "：" + ((ss[4] == "True") ? "<span style='color:Red'>" + Text(140) + "</span>" : "<span style='color:Green'>" + Text(141) + "</span>") + "</td><td>" + Text(142) + "：" + ((ss[5] == 'True') ? "<span style='color:Red'>" + Text(143) + "</span>" : "<span style='color:Green'>" + Text(141) + "</span>") + "</td></tr>");
    Str1.append("<tr><td height='22'>" + Text(144) + "： " + parseInt(ss[6] * 100) + "%" + "</td><td>" + Text(234) + "：" + Array2[ss[7]] + "</td><td>" + Text(146) + "：" + ss[8] * 1000 / 10 + "%" + " </td><td>&nbsp;</td></tr>");
    Str1.append("<tr><td height='22'>" + Text(147) + "：<a href='#' class='font4' onclick='ShowAddGroup()' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Text(148) + " " + GetGroupString(GroupInfo[0].length + 3) + "</a></td></td></tr>");
    Str1.append("<tr><td height='22' colspan='4' align='left' valign='middle'>");
    Str1.append("<table width='80%' border='0' cellspacing='0'cellpadding='0'>");
    Str1.append("<tr><td width='80px'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(149) + "：</td><td width='16%'><input id='txtGroupNameID' type='text' size='15' maxlength='20' /></td><td width='3%'></td><td align='left' valign='middle'><input type='button' id='btnSearch' onclick='searchSubGroup()' value='" + Text(149) + "' class='btn1'/>");
    Str1.append("</td><td align='left'></tr></table>");
    Str1.append("</td></tr></table>");
    document.getElementById("divContent").innerHTML = Str1;
    ShowSubGroup(ss2[1]);

}
//------------显示新增群组界面-----------------
function ShowAddGroup() {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll(); //清除内容
            //-------------------填写新增群组的内容---------
            var Str = new StringBulider();
            Str.append("<br><table width='99%' border='0' cellspacing='0' cellpadding='0'><tr><td width='3%'>&nbsp;</td>");
            Str.append("<td width='64%' align='center' valign='top'>");
            //标题
            Str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'><tr>");
            Str.append("<td align='center' valign='middle' class='font1'>" + Text(148) + "" + GetGroupString(GroupInfo[0].length + 3) + "[" + Text(186) + "：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td>");
            Str.append("</tr></table>");
            Str.append("</br>");
            //内容
            Str.append("<table width='820' border='0' cellspacing='0' cellpadding='0'>");
            if (GroupInfo[0].length <= 3) {
                Str.append("<tr><td width='95' align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(155) + "：</td><td  height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='textfield' id='txtGroupName' value='' />&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' id='btnValidate' style='width:50px' value='" + Text(184) + "' onclick='validateGroupNameID()' />（" + Text(185) + "）</td></tr> ");
            }
            else if (GroupInfo[0].length == 6) {
                Str.append("<tr><td width='95' align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(155) + "：</td><td  height='30' align='left' valign='middle'><input type='text' style=\"width: 130px\" name='textfield' id='txtGroupName' value='' />&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' id='btnValidate' style='width:50px'   value='" + Text(184) + "' onclick='validateGroupNameID()' />（" + Text(185) + "）</td></tr> ");
            }
            else {
                Str.append("<tr><td width='95' align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(155) + "：</td><td  height='30' align='left' valign='middle'>" + GroupInfo[1].substring(0, 1) + "<input type='text' style=\"width: 130px\" name='textfield' id='txtGroupName' value='' />&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' id='btnValidate' style='width:50px'   value='" + Text(184) + "' onclick='validateGroupNameID()' />（" + Text(185) + "）</td></tr> ");
            }
            Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + ""+ Text(156) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtGroupOtherName' id='txtGroupOtherName'  /></td></tr>");
            Str.append("<tr><td align='left' valign='middle'>" + Text(180) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 141px\"  id='txtPwd'/><span color='red' id='spPwd'></span><span color='black'>&nbsp;&nbsp;&nbsp;（"+ Text(183) +"）</span></td></tr>");
            Str.append("<tr><td align='left' valign='middle'>" + Text(181) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 141px\" id='txtPwdAgain' /></td></tr>");
            Str.append("<td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtMoney' id='txtMoney' value='0' onkeyup='validateMoney()' />&nbsp;&nbsp;&nbsp;/&nbsp;" + Math.ceil(GroupInfo[3]) + "<span  class='font4' id='spMoney'></span></td></tr>");
            if (GroupInfo[0].length == 9) {
                Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(144) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStock' id='txtStock' value='0' onkeyup='checkValue()'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + parseInt(GroupInfo[6] * 100) + "%" + "<span class='font4' id='spStock'></span></td></tr>");
                Str.append("<tr><td align='left' valign='middle'>"+ Text(164) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStock1' id='txtStock1' value='0'  onkeyup='checkValue1()' />&nbsp;&nbsp;&nbsp;%");
                Str.append("<tr><td align='left' valign='middle'>"+ Text(165) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStock2' id='txtStock2' disabled='disabled' value=" + parseInt(100 - GroupInfo[6] * 100) + ">&nbsp;&nbsp;&nbsp;%");
            }
            else {
                if (GroupInfo[0].length > 3) {
                    if (GroupInfo[0].length <= 6) {
                        Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(144) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStock' id='txtStock' value='0'  onkeyup='validateStock()'/>&nbsp;&nbsp;&nbsp;%</td></tr>");
                    }
                    else {
                        Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(144) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStock' id='txtStock' value='0'  onkeyup='validateStock1()'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + parseInt(GroupInfo[6] * 100) + "%" + "<span class='font4' id='spStock'></span></td></tr>");
                    }
                }
            }
            if (GroupInfo[0].length > 3) {
                if (GroupInfo[0].length <= 6) {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(234) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 146px\" id='selWaterType'><option  value='0'>" + Text(169) + " </option><option value='1'>" + Text(177) + " </option></td></tr>");
                    Str.append("<tr><td align='left' valign='middle'>" + Text(166) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 146px\" id='bzType'>");
                    var bztype = bz.split(';');
                    var bzstr = "";
                    for (var i = 0; i < bztype.length; i++) {
                        bzstr += "<option  value='" + (i + 1) + "'>" + bztype[i] + "</option>";
                    }
                    Str.append("" + bzstr + "");
                    Str.append("</td></tr>");
                }
                else {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(234) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 146px\" id='selWaterType' disabled='disabled'><option  value='0'>" + Text(169) + " </option><option value='1'>" + Text(177) + " </option></td></tr>");
                    Str.append("<tr><td align='left' valign='middle'>" + Text(166) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 146px\" id='bzType' disabled='disabled'>");
                    var bztype = bz.split(';');
                    var bzstr = "";
                    for (var i = 0; i < bztype.length; i++) {
                        bzstr += "<option  value='" + (i + 1) + "'>" + bztype[i] + "</option>";
                    }
                    Str.append("" + bzstr + "");
                    Str.append("</td></tr>");
                }
                if (GroupInfo[0].length>=6) {
                    Str.append("<tr><td align='left' valign='middle'>"+ Text(190) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='userLimit' id='userLimit' value='0' onkeyup='isNum()'/>&nbsp;&nbsp;&nbsp;</td></tr>");
                }
                if (GroupInfo[0].length == 6) {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(157) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtWaterPer' id='txtWaterPer' value='0' onkeyup='validateWaterPer()'/>&nbsp;&nbsp;&nbsp;%</td></tr>");
                    Str.append("<tr id='groupZC'><td align='left' valign='middle'>"+ Text(168) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStockEgame' id='txtStockEgame' value='0' onkeyup='validateStockEgame()'/>&nbsp;&nbsp;&nbsp;%</td></tr>");
                     Str.append("<tr id='groupXMB'><td align='left' valign='middle'>" + Text(167) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtWaterPerEgame' id='txtWaterPerEgame' value='0' onkeyup='validateWaterPerEgame()'/>&nbsp;&nbsp;&nbsp;%</td></tr>");
                     
                }
                else { 
                     Str.append("<tr><td align='left' valign='middle'>" + Text(157) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtWaterPer' id='txtWaterPer' value='0' onkeyup='validateWaterPer()'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + GroupInfo[8] + "%" + "</td></tr>");
                     Str.append("<tr id='groupZC'><td align='left' valign='middle'>"+ Text(168) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStockEgame' id='txtStockEgame' value='0' onkeyup='validateStockEgame()'/>&nbsp;&nbsp;/&nbsp;" + parseInt(GroupInfo[13] * 100) + "%</td></tr>");
                     Str.append("<tr id='groupXMB'><td align='left' valign='middle'>" + Text(167) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtWaterPerEgame' id='txtWaterPerEgame' value='0' onkeyup='validateWaterPerEgame()'/>&nbsp;&nbsp;/&nbsp;" + GroupInfo[12] + "%</td></tr>");

                 }
                 if (GroupInfo[0].length >= 6) {
                     if (GroupInfo[0].length == 6) {
                         Str.append(" <tr id='EgameChecked'><td align='left' valign='middle'>" + Text(235) + "：</td><td height='30' align='left'  valign='middle'><input type='checkbox' id='checkboxID' checked='checked' onclick='groupFnc()'/>" + Text(236) + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>");
                     }
                     else {
                         if (GroupInfo[14] == "1") {
                             Str.append(" <tr id='EgameChecked'><td align='left' valign='middle'>" + Text(235) + "：</td><td height='30' align='left'  valign='middle'><input type='checkbox' id='checkboxID' checked='checked' onclick='groupFnc()' />" + Text(236) + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>");
                         }
                     }

                 }
                Str.append("</table>");
                Str.append("<table align='left' border='0' cellspacing='0' cellpadding='0'><tr><td align='left' valign='middle'>" + Text(270) + "： </td>");
                Str.append("</tr></table>");
                Str.append("<table width='820' border='0' cellspacing='0' cellpadding='0'><tr><td align='left' valign='top'><br />");
                Str.append("<div id='divCardSetUp'></div></td></tr></table>");
            }

            Str.append("<div align='left' width='100%' ><table width='320' border='0' cellspacing='0' cellpadding='0'><tr height='10px'></tr><tr>");
            Str.append("<td align='left' valign='middle'><input type='button'  class='btn1'  name='Submit' value='"+ Text(194) + "' onclick='AddGroup()'/></td>");
            Str.append("<td align='left' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            Str.append("<td align='left' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='ShowGroupManage()'/></td>");
            Str.append("</tr></table>");
            Str.append("<p>&nbsp;</p></td>");
            Str.append("<td>&nbsp;</td></tr></table></div>");
            document.getElementById("divSub").innerHTML = Str;
            if (GroupInfo[0].length >= 6) {
                document.getElementById("selWaterType").selectedIndex = GroupInfo[7];
                document.getElementById("bzType").selectedIndex = parseInt(GroupInfo[11]) - 1;

            }
            chouma = null;
            showSetUpList_All();
            if (GroupInfo[0].length >= 6) {
                if (GroupInfo[14] == "0") {
                    document.getElementById("groupZC").style.display = "none";
                    document.getElementById("groupXMB").style.display = "none";
                }
                else {
                    document.getElementById("groupZC").style.display = "";
                    document.getElementById("groupXMB").style.display = "";
                }
            }
        }
        // $("#CardSetupID").multiselect();
    }  //显示设置列表


    
}
function checkIsNull() { if (document.getElementById('txtStock').value == "") { alert(Text(224)); document.getElementById('txtStock').focus(); } }
function checkValue() {
    var a = GroupInfo[6] * 100, b = document.getElementById('txtStock').value, c = document.getElementById('txtStock1').value;
    if (b == "") { document.getElementById('txtStock').focus(); document.getElementById('txtStock1').value = a; return; }
    if (fucCheckNUM(b)) {
        if (b <= a) {
            document.getElementById('txtStock1').value = a - b; document.getElementById('txtStock2').value = 100 - a;
        } else { alert(Text(200)); document.getElementById('txtStock').focus(); document.getElementById('txtStock').value = ""; document.getElementById('txtStock1').value = ""; }
    } else { alert(Text(201)); document.getElementById('txtStock').focus(); document.getElementById('txtStock').value = ""; document.getElementById('txtStock1').value = ""; }
}
function checkValue1() {
    var a = GroupInfo[6] * 100, b = document.getElementById('txtStock').value, c = document.getElementById('txtStock1').value, d = document.getElementById('txtStock2').value;
    if (c == "") { document.getElementById('txtStock1').focus(); return; }
    if (fucCheckNUM(c)) {
        if (c <= a && c <= a - b) {
            document.getElementById('txtStock2').value = 100 - b - c;
        } else { alert(Text(200)); document.getElementById('txtStock1').focus(); document.getElementById('txtStock1').value = ""; }
    } else { alert(Text(201)); document.getElementById('txtStock1').focus(); document.getElementById('txtStock1').value = ""; }
}
//转换验证按钮状态
function changeValidateState() {
    document.getElementById("btnValidate").onclick = validateGroupNameID;
}
//验证帐户是否存在
function validateGroupNameID() {
    var groupNameID = document.getElementById("txtGroupName").value;
    if (groupNameID == "") {
        alert(Text(202));
        document.getElementById("txtGroupName").focus();
        return;
    }
    if (GroupInfo[0].length <= 3) {
        groupNameID = document.getElementById("txtGroupName").value;
    }
    else if (GroupInfo[0].length == 6) {
        groupNameID = document.getElementById("txtGroupName").value;
    }
    else {
        groupNameID = GroupInfo[1].substr(0, 1) + document.getElementById("txtGroupName").value;
    }
    if (groupNameID.isInChinese()) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    if (!checknames(groupNameID)) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    if (groupNameID.length < 3 || groupNameID.length > 9) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }

    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_validateGroupNameIDComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=GroupValidateNameID&GroupID=" + GroupInfo[0] + "&NameID=" + groupNameID);
}
//验证帐户成功处理
function Cbo_validateGroupNameIDComplete(responseText) {
    if (responseText == "False") {
        alert(Text(203));
        return;
    }
    if (responseText == "True") {
        alert(Text(204));
        return;
    }
}
//验证占成
function validateStock() {
    var stock = document.getElementById("txtStock").value;
    if (stock == "") { return; }
    if (fucCheckNUM(stock) != 1) {
        alert(Text(205));
        document.getElementById("txtStock").focus();
        document.getElementById("txtStock").value = "";
        return;
    }
    else if (parseInt(stock) > 100) {
        alert(Text(206));
        document.getElementById("txtStock").focus();
        document.getElementById("txtStock").value = "";
        return;
    }

}
function isNum() {
    var num = document.getElementById("userLimit").value
    if (fucCheckNUM(num) != 1) {
        alert("必须是数字！");
        document.getElementById("userLimit").focus();
        document.getElementById("userLimit").value = "0";
        return;
    }
}
function validateStock1() {
    var stock = document.getElementById("txtStock").value;
    if (stock == "") { return; }
    if (fucCheckNUM(stock) != 1) {
        alert(Text(205));
        document.getElementById("txtStock").focus();
        document.getElementById("txtStock").value = "";
        return;
    }
    else if (parseFloat(stock) > GroupInfo[6] * 100) {
        alert(Text(207));
        document.getElementById("txtStock").focus();
        document.getElementById("txtStock").value = "";
        return;
    }
}
function validateStockEgame() {
    var stock = document.getElementById("txtStockEgame").value;
    if (stock == "") { return; }
    if (fucCheckNUM(stock) != 1) {
        alert(Text(205));
        document.getElementById("txtStockEgame").focus();
        document.getElementById("txtStockEgame").value = "";
        return;
    }
    else if (parseFloat(stock) > GroupInfo[13] * 100) {
        alert(Text(207));
        document.getElementById("txtStockEgame").focus();
        document.getElementById("txtStockEgame").value = "";
        return;
    }
}
//验证洗码比
function validateWaterPer() {
    var waterper = document.getElementById("txtWaterPer").value;
    if (waterper == "") { return; }
    if (fucCheckNUM(waterper) != 1) {
        alert(Text(209));
        document.getElementById("txtWaterPer").focus();
        document.getElementById("txtWaterPer").value = "";
        return;
    }
    if (GroupInfo[0].length >= 6) {
        if (parseFloat(waterper) > 10) {
            alert("洗码比不可超过10%！");
            document.getElementById("txtWaterPer").focus();
            document.getElementById("txtWaterPer").value = "";
            return;
        }
    }
    if (GroupInfo[0].length > 6) {
        if (parseFloat(waterper) > parseFloat(GroupInfo[8])) {
            alert(Text(211));
            document.getElementById("txtWaterPer").focus();
            document.getElementById("txtWaterPer").value = "";
            return;
        }
    }
}
//验证电子洗码比
function validateWaterPerEgame() {
    var waterper = document.getElementById("txtWaterPerEgame").value;
    if (waterper == "") { return; }
    if (fucCheckNUM(waterper) != 1) {
        alert(Text(209));
        document.getElementById("txtWaterPerEgame").focus();
        document.getElementById("txtWaterPerEgame").value = "";
        return;
    }
    if (GroupInfo[0].length >= 6) {
        if (parseFloat(waterper) > 10) {
            alert(Text(210));
            document.getElementById("txtWaterPerEgame").focus();
            document.getElementById("txtWaterPerEgame").value = "";
            return;
        }
    }
    if (GroupInfo[0].length > 6) {
        if (parseFloat(waterper) > parseFloat(GroupInfo[12])) {
            alert(Text(211));
            document.getElementById("txtWaterPerEgame").focus();
            document.getElementById("txtWaterPerEgame").value = "";
            return;
        }
    }
}
//验证额度
function validateMoney() {
    var money = document.getElementById("txtMoney").value;
    if (money == "") { return; }
    if (fucCheckNUM(money) != 1) {
        alert(Text(212));
        document.getElementById("txtMoney").focus();
        document.getElementById("txtMoney").value = "";
        return;
    }
    else if (parseInt(money) > parseInt(GroupInfo[3])) {
        alert(Text(213));
        document.getElementById("txtMoney").focus();
        document.getElementById("txtMoney").value = "";
        return;
    }

}
function validateMoney1() {
    var money = document.getElementById("txtMoney").value;
    if (money == "") { return; }
    if (fucCheckNUM(money) != 1) {
        alert(Text(212));
        document.getElementById("txtMoney").focus();
        document.getElementById("txtMoney").value = "";
        document.getElementById("txtXYMoney").value = "0";
        return;
    }
    else if (parseInt(money) > parseInt(GroupInfo[3])) {
        alert(Text(213));
        document.getElementById("txtMoney").focus();
        document.getElementById("txtMoney").value = "";
        document.getElementById("txtXYMoney").value = "0";
        return;
    }
    document.getElementById("txtXYMoney").value = document.getElementById("txtMoney").value;

}
//验证额度
function validateReductMoney(parentMoney) {
    var money = document.getElementById("txtMoney").value;
    if (money == "") { return; }
    if (fucCheckNUM(money) != 1) {
        alert(Text(212));
        document.getElementById("txtMoney").focus();
        document.getElementById("txtMoney").value = "";
        return;
    }
    else if (parseInt(money) > parseInt(parentMoney)) {
        alert(Text(213));
        document.getElementById("txtMoney").focus();
        document.getElementById("txtMoney").value = "";
        return;
    }

}
//验证最大赢额
function validateMaxWin(parentMoney) {
    var money = document.getElementById("txtMaxWin").value;
    if (money == "") { return; }
    if (fucCheckNUM(money) != 1) {
        alert(Text(212));
        document.getElementById("txtMaxWin").focus();
        document.getElementById("txtMaxWin").value = "";
        return;
    }
    else if (parseInt(money) >= parseInt(parentMoney)) {
        alert(Text(213));
        document.getElementById("txtMaxWin").focus();
        document.getElementById("txtMaxWin").value = "";
        return;
    }
    else {
        document.getElementById("spMaxWin").innerText = "";
    }
}
//显示设置列表
function showSetUpList() {
    var setupIndex = document.getElementById("CardSetupID").selectedIndex;
    if (setupIndex >= 0) {
        var setupID = document.getElementById("CardSetupID").options[setupIndex].value
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_showSetUpListComplete;
        cbo.DoCallBack("AjaxDb.aspx?PageName=SetUpList&ID=" + setupID);
    }
}
//显示设置列表(全部)
function showSetUpList_All() {
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_showSetUpListComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=SetUpListAll&ID=" + GroupInfo[9]);
}
function Cbo_showSetUpListComplete(responseText) {
    var ss = responseText.split('$$')
    var str = new StringBulider();
    str.append("<table width='300px' height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#666666'>");
    str.append(showSetUpHead());
    for (var i = 0; i < (ss.length - 1); i++) {
        str.append(showSetUpDetail(ss[i]));
    }
    str.append("</table><br>");
    document.getElementById("divCardSetUp").innerHTML = str;
    if (chouma != null) {
        var b = document.getElementById('divCardSetUp');
        var a = b.getElementsByTagName("input");
        var len = a.length;
        for (var i = 0; i < len; i++) {
            if (a[i].type == "checkbox") {
                for (var j = 0; j < chouma.length; j++) {
                    if (chouma[j] == a[i].id) {
                        a[i].checked = true;
                    }
                }

            }
        }
    }


}
//代理设置类表
function showSetUpList_All1() {
    var setupIndex = document.getElementById("CardSetupID").selectedIndex;
    if (setupIndex >= 0) {
        var setupID = document.getElementById("CardSetupID").options[setupIndex].value
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_showSetUpListComplete1;
        cbo.DoCallBack("AjaxDb.aspx?PageName=SetUpListAll&ID=" + setupID);
    }
}
function Cbo_showSetUpListComplete1(responseText) {
    var ss = responseText.split('$$')
    var str = new StringBulider();
    str.append("<table width='300px' height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#666666'>");
    str.append(showSetUpHead());
    for (var i = 0; i < (ss.length - 1); i++) {
        str.append(showSetUpDetail(ss[i]));
    }
    str.append("</table><br>");
    document.getElementById("divCardSetUp").innerHTML = str;

}
function showSetUpHead() {
    var ssName = new Array(20);
    ssName[0] = Text(214);
    ssName[1] = Text(215);
    //ssName[2]="下限";       
    //ssName[3]="上限";
    ssName[4] = Text(216);
    ssName[5] = Text(217);
    var Str = new StringBulider();
    Str.append("<tr >");
    Str.append("<td  width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    Str.append("<td  width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    //Str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");  // bgcolor='#666'  align=center
    //Str.append( "<td width='110px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    // Str.append( "<td width='110px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    Str.append("<td width='250px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    Str.append("</tr>");
    return Str;
}
function showSetUpDetail(StrArray) {
    var ss = StrArray.split('##');
    var Str = new StringBulider();
    Str.append("<tr>");
    Str.append("<td width='90px' align='center' valign='middle' bgcolor='#FFFFFF'><input id='" + ss[0] + "' type='checkbox' /></td>");
    Str.append("<td width='90px' align='center' valign='middle' bgcolor='#FFFFFF'>" + ss[0] + "</td>");
    // Str.append("<td width='90px' align='center' valign='middle' bgcolor='#FFFFFF'>"+ss[2]+"</td>");
    Str.append("<td width='250px' align='right' valign='middle' bgcolor='#FFFFFF'>" + ss[1] + "</td>");
    Str.append("</tr>");
    return Str;
}
//代理设置
function showSetUpHead1() {
    var ssName = new Array(20);
    ssName[0] = Text(214);
    ssName[1] = Text(215);
    //ssName[2] = "下限";
    //ssName[3] = "上限";
    ssName[4] = Text(216);
    var Str = new StringBulider();
    Str.append("<tr >");
    Str.append("<td  width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    //Str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");  // bgcolor='#666'  align=center
    //Str.append("<td width='110px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    //Str.append("<td width='110px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    Str.append("<td width='250px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    Str.append("</tr>");
    return Str;
}
function showSetUpDetail1(StrArray) {
    var ss = StrArray.split('##');
    var Str = new StringBulider();
    //var aa = ss[1].split(',');
    Str.append("<tr>");
    Str.append("<td width='90px' align='center' valign='middle' bgcolor='#FFFFFF'>" + ss[0] + "</td>");
    // Str.append("<td width='90px' align='center' valign='middle' bgcolor='#FFFFFF'>"+ss[2]+"</td>");
    //     Str.append("<td width='110px' align='center' valign='middle' bgcolor='#FFFFFF'>" + aa[0] + "</td>");
    //     Str.append("<td width='110px' align='center' valign='middle' bgcolor='#FFFFFF'>" + aa[1] + "</td>");
    Str.append("<td width='250px' align='right' valign='middle' bgcolor='#FFFFFF'>" + ss[1] + "</td>");
    Str.append("</tr>");
    return Str;
}
//新增群组
function AddGroup() {
    var GroupIDfather = GroupInfo[0];
    var Name = document.getElementById("txtGroupOtherName").value;
    Name = stripscript(Name);
    if (GroupIDfather.length <= 3) {
        var NameID = document.getElementById("txtGroupName").value;
    }
    else if (GroupIDfather.length == 6) {
        var NameID = document.getElementById("txtGroupName").value;
    }
    else {
        var NameID = GroupInfo[1].substring(0, 1) + document.getElementById("txtGroupName").value;
    }
    var checkDZ = "false";
    if (GroupInfo[0].length >= 6) {
        if (GroupInfo[0].length == 6) {
            checkDZ = document.getElementById("checkboxID").checked;
        }
        else {
            if (GroupInfo[14] == "1") {
                checkDZ = document.getElementById("checkboxID").checked;
            }
        }

    }
    else {
        checkDZ = "true";
    }
    var CreditMoney = window.document.getElementById("txtMoney").value;
    var PassWord = window.document.getElementById("txtPwd").value;
    var PassWordAgain = window.document.getElementById("txtPwdAgain").value;
    var userLimit = 0;
    if (GroupInfo[0].length >= 9) {
        userLimit = document.getElementById("userLimit").value;
    }
    var recompany = 0, Stock = 0, setupIndex = 0, WaterSelect = 0, WaterPercent = 0, WaterPercentEgame = 0, StockEgame = 0, checkValue = "", bztype = 0;
    if (GroupInfo[0].length > 3) {
        Stock = window.document.getElementById("txtStock").value;
        if (GroupInfo[0].length == 6) {
            setupIndex = document.getElementById("selWaterType").selectedIndex;
            WaterSelect = document.getElementById("selWaterType").options[setupIndex].value;

        }
        else {
            WaterSelect = GroupInfo[7];
        }
        WaterPercent = document.getElementById("txtWaterPer").value;
        WaterPercentEgame = document.getElementById("txtWaterPerEgame").value;
        StockEgame = document.getElementById("txtStockEgame").value;
    }
    setupIndex = document.getElementById("bzType").selectedIndex;
    bztype = document.getElementById("bzType").options[setupIndex].value;
    NameID = Trim(NameID);
    if (NameID.isInChinese()) {
        NameID = "";
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    else if (!checknames(NameID)) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    else {
        if (NameID.length < 3 || NameID.length > 9) {
            alert(Text(185));
            document.getElementById("txtGroupName").focus();
            return;
        }
    }
    if (Name == "") {
        alert(Text(220));
        document.getElementById("txtGroupOtherName").focus();
        return;
    }

    PassWord = Trim(PassWord);
    if (PassWord == "") {
        alert(Text(221));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (!checknames(PassWord)) {
        alert(Text(54));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PassWord.length < 6) {
        alert(Text(183));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PassWord != PassWordAgain) {
        alert(Text(222));
        document.getElementById("txtPwdAgain").focus();
        return;
    }
    if (!IsInt(CreditMoney)) {
        alert(Text(223));
        document.getElementById("txtMoney").focus();
        return;
    }
    if (GroupInfo[0].length > 3) {
        if (GroupInfo[0].length == 9) {
            if (document.getElementById('txtStock').value == "") { alert(Text(224)); document.getElementById('txtStock').focus(); return; }
            if (document.getElementById('txtStock1').value == "") { alert(Text(224)); document.getElementById('txtStock1').focus(); return; }
            recompany = GroupInfo[6] * 100 - document.getElementById('txtStock').value - document.getElementById('txtStock1').value;
        }
        else {
            if (CreditMoney < 0) CreditMoney = 0;
            if (parseInt(CreditMoney) > parseInt(GroupInfo[5])) {
                alert(Text(226));
                document.getElementById("txtMoney").focus();
                return;
            }
        }

        if (!IsFloat(Stock)) {
            alert(Text(227));
            document.getElementById("txtStock").focus();
            return;
        }
        else {
            if (GroupInfo[0].length > 6) {
                if (parseFloat(Stock) > parseFloat(GroupInfo[6]) && parseFloat(Stock) > 100) {
                    alert(Text(207));
                    document.getElementById("txtStock").focus();
                    return;
                }
            }

        }

        if (!IsFloat(WaterPercent)) {
            alert(Text(228));
            document.getElementById("txtWaterPer").focus();
            return;
        }
        else {
            if (GroupInfo[0].length > 6) {
                if (parseFloat(WaterPercent) > parseFloat(GroupInfo[8])) {
                    alert(Text(229));
                    document.getElementById("txtWaterPer").focus();
                    return;
                }
            }
        }
        if (!IsFloat(StockEgame)) {
            alert(Text(227));
            document.getElementById("txtStockEgame").focus();
            return;
        }
        else {
            if (GroupInfo[0].length > 6) {
                if (parseFloat(StockEgame) > parseFloat(GroupInfo[13]) && parseFloat(StockEgame) > 100) {
                    alert(Text(207));
                    document.getElementById("txtStockEgame").focus();
                    return;
                }
            }

        }

        if (!IsFloat(WaterPercentEgame)) {
            alert(Text(228));
            document.getElementById("txtWaterPerEgame").focus();
            return;
        }
        else {
            if (GroupInfo[0].length > 6) {
                if (parseFloat(WaterPercentEgame) > parseFloat(GroupInfo[12])) {
                    alert(Text(230));
                    document.getElementById("txtWaterPerEgame").focus();
                    return;
                }
            }
        }

    }
    if (GroupInfo[0].length > 3) {
        var a = document.getElementById('divCardSetUp').getElementsByTagName("input");
        var len = a.length, checkboxNum = 0, checkValue = "";
        for (var i = 0; i < len; i++) {
            if ((a[i].type == "checkbox") && (a[i].checked == true)) {
                checkboxNum++;
                checkValue += a[i].id + ",";
            }
        }
        if (checkboxNum < 1) {
            alert(Text(231));
            return;
        }
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_AddGroupComplete;
    cbo.DoCallBack(encodeURI("AjaxDb.aspx?PageName=GroupAdd&GroupIDfather=" + GroupIDfather + "&Name=" + Name + "&NameID=" + NameID + "&CreditMoney=" + CreditMoney + "&PassWord=" + PassWord + "&Stock=" + Stock + "&WaterSelect=" + WaterSelect + "&checkDZ="+checkDZ+"&WaterPercent=" + WaterPercent + "&WaterPercentEgame=" + WaterPercentEgame + "&StockEgame=" + StockEgame + "&recompany=" + recompany + "&bztype=" + bztype + "&CardSetupID=" + checkValue + "&userLimit=" + userLimit));
}
function Cbo_AddGroupComplete(responseText) {
    if (responseText == "10") {

        alert(Text(232));
        refeshGroupManage();
        parent.frames["left"].location.reload(); // 刷新左边菜单                              
    }
    else {
        alert(Text(233) + falsePrompt(responseText));

    }
}
//--------------------------------------群组设定-------------------------------------
function showEditGroup(arrGroup) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll(); //清除内容
            var editGroupInfo = arrGroup.split(',');
            //-------------------填写新增群组的内容---------
            var Str = new StringBulider();
            Str.append("<br><table width='99%' border='0' cellspacing='0' cellpadding='0'><tr><td width='3%'>&nbsp;</td>");
            Str.append("<td width='64%' align='center' valign='top'>");
            //标题
            Str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'><tr>");
            Str.append("<td align='center' valign='middle' class='font1'>" + GetGroupString(GroupInfo[0].length + 3) + "["+ Text(186) +"：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td>");
            Str.append("</tr></table>");
            Str.append("</br>");
            //内容
            Str.append("<table width='600px' border='0' cellspacing='0' cellpadding='0'>");
            Str.append("<tr><td width='95px' align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(155) + "</td><td width='405' height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtGroupName' disabled='disabled' value='" + editGroupInfo[1] + "' /></td></tr> ");
            Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + ""+ Text(156) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtGroupOtherName' value='" + editGroupInfo[2] + "'/></td></tr>");
            Str.append("<tr><td align='left' valign='middle'>" + Text(180) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" id='txtPwd'/><span >&nbsp;&nbsp;&nbsp;("+ Text(183) +")</span></td></tr>");
            Str.append("<tr><td align='left' valign='middle'>" + Text(181) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" id='txtPwdAgain' /></td></tr>");
            Str.append("<td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" value='" + Math.ceil(editGroupInfo[3]) + "' id='txtMoney' disabled='disabled' onmouseleave='validateMoney()'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + Math.ceil(GroupInfo[3]) + "<span class='font4' id='spMoney'></span></td></tr>");

            if (GroupInfo[0].length == 9) {
                Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(144) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtStock' value='" + parseInt(editGroupInfo[4] * 100) + "' onkeyup='checkValue()' />&nbsp;&nbsp;&nbsp;/&nbsp;" + parseInt(GroupInfo[6] * 100) + "%" + "</td></tr>");
                Str.append("<tr><td align='left' valign='middle'>"+ Text(164) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='txtStock1' id='txtStock1'  onkeyup='checkValue1()' value='" + (GroupInfo[6] * 100 - editGroupInfo[4] * 100 - editGroupInfo[5] * 100) + "' />&nbsp;&nbsp;&nbsp;%");
                Str.append("<tr><td align='left' valign='middle'>"+ Text(165) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='txtStock2' id='txtStock2' disabled='disabled' value=" + (100 - GroupInfo[6] * 100 + editGroupInfo[5] * 100) + ">&nbsp;&nbsp;&nbsp;%");
            }
            else {
                if (GroupInfo[0].length > 3) {
                    if (GroupInfo[0].length == 6) {
                        Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(144) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtStock' value='" + parseInt(editGroupInfo[4] * 100) + "' onkeyup='validateStock()' />&nbsp;&nbsp;&nbsp;%</td></tr>");
                    }
                    else {
                        Str.append("<tr><td align='left' valign='middle'>" + GetGroupString(GroupInfo[0].length + 3) + "" + Text(144) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtStock' value='" + parseInt(editGroupInfo[4] * 100) + "' onkeyup='validateStock1()' />&nbsp;&nbsp;&nbsp;/&nbsp;" + parseInt(GroupInfo[6] * 100) + "%" + "<span class='font4' id='spStock'></span></td></tr>");
                    }
                }
            }
            if (GroupInfo[0].length > 3) {
                if (GroupInfo[0].length <= 6) {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(234) + "： </td><td height='30' align='left' valign='middle'><select style=\"width: 165px\" id='selWaterType'><option  value='0'>" + Text(169) + " </option><option value='1'>" + Text(177) + " </option></td></tr>");
                    Str.append("<tr><td align='left' valign='middle'>" + Text(166) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 165px\" id='bzType'>");
                    var bztype = bz.split(';');
                    var bzstr = "";
                    for (var i = 0; i < bztype.length; i++) {
                        bzstr += "<option  value='" + (i + 1) + "'>" + bztype[i] + "</option>";
                    }
                    Str.append("" + bzstr + "");
                    Str.append("</td></tr>");
                } else {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(234) + "： </td><td height='30' align='left' valign='middle'><select style=\"width: 165px\" id='selWaterType' disabled='disabled'><option  value='0'>" + Text(169) + " </option><option value='1'>" + Text(177) + " </option></td></tr>");
                    Str.append("<tr><td align='left' valign='middle'>" + Text(166) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 165px\" id='bzType' disabled='disabled'>");
                    var bztype = bz.split(';');
                    var bzstr = "";
                    for (var i = 0; i < bztype.length; i++) {
                        bzstr += "<option  value='" + (i + 1) + "'>" + bztype[i] + "</option>";
                    }
                    Str.append("" + bzstr + "");
                    Str.append("</td></tr>");
                }
                if (GroupInfo[0].length >= 6) {
                    Str.append("<tr><td align='left' valign='middle'>"+ Text(190) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='userLimit' id='userLimit' value='0' onkeyup='isNum()'/>&nbsp;&nbsp;&nbsp;</td></tr>");
                }
                if (GroupInfo[0].length == 6) {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(157) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='txtWaterPer' id='txtWaterPer' value='" + editGroupInfo[7] + "' onkeyup='validateWaterPer()'/>&nbsp;&nbsp;&nbsp;%</td></tr>");
                    Str.append("<tr id='groupZC'><td align='left' valign='middle' width='95px'>"+ Text(168) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStockEgame' id='txtStockEgame' value='" + parseInt(editGroupInfo[17] * 100) + "' onkeyup='validateStockEgame()'/>&nbsp;&nbsp;&nbsp;</td></tr>");
                    Str.append("<tr id='groupXMB'><td align='left' valign='middle'>" + Text(167) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtWaterPerEgame' id='txtWaterPerEgame' value='" + editGroupInfo[16] + "' onkeyup='validateWaterPerEgame()'/>&nbsp;&nbsp;&nbsp;</td></tr>");
                }
                else {
                    Str.append("<tr><td align='left' valign='middle'>" + Text(157) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='txtWaterPer' id='txtWaterPer' value='" + editGroupInfo[7] + "' onkeyup='validateWaterPer()'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + GroupInfo[8] + "%" + "</td></tr>");
                    Str.append("<tr id='groupZC'><td align='left' valign='middle'>"+ Text(168) +"：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtStockEgame' id='txtStockEgame' value='" + parseInt(editGroupInfo[17] * 100) + "' onkeyup='validateStockEgame()'/>&nbsp;&nbsp;/&nbsp;" + parseInt(GroupInfo[13] * 100) + "%</td></tr>");
                    Str.append("<tr id='groupXMB'><td align='left' valign='middle'>" + Text(167) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" name='txtWaterPerEgame' id='txtWaterPerEgame' value='" + editGroupInfo[16] + "' onkeyup='validateWaterPerEgame()'/>&nbsp;&nbsp;/&nbsp;" + GroupInfo[12] + "%</td></tr>");
                }
                if (GroupInfo[0].length >= 6) {
                    if (GroupInfo[0].length == 6) {
                        Str.append(" <tr id='EgameChecked'><td align='left' valign='middle'>" + Text(235) + "：</td><td height='30' align='left'  valign='middle'><input type='checkbox' id='checkboxID' onclick='groupFnc()'/>" + Text(236) + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>");
                    }
                    else {
                        if (GroupInfo[14] == "1") {
                            Str.append(" <tr id='EgameChecked'><td align='left' valign='middle'>" + Text(235) + "：</td><td height='30' align='left'  valign='middle'><input type='checkbox' id='checkboxID' onclick='groupFnc()'/>" + Text(236) + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>");
                        }
                    }

                }
                Str.append("</table>");
                Str.append("<table width='600' border='0' cellspacing='0' cellpadding='0' ><tr><td width='95' align='left' valign='middle'>" + Text(270) + "： </td><td width='405' align='left' valign='middle'>");
                Str.append("</tr></table>");
                Str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'><tr><td align='left' valign='top'><br />");
                Str.append("<div id='divCardSetUp'></div></td></tr></table>");
            }
            Str.append("<div align='left' width='100%'><table width='500' border='0' cellspacing='0' cellpadding='0'><tr height='10px'></tr><tr>");
            Str.append("<td align='right' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='editGroup(\"" + editGroupInfo[0] + "\")'/></td>");
            Str.append("<td align='right' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            Str.append("<td align='right' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='ShowGroupManage()'/></td>");
            Str.append("</tr></table>");
            Str.append("<p>&nbsp;</p></td>");
            Str.append("<td>&nbsp;</td></tr></table></div>");
            document.getElementById("divSub").innerHTML = Str;
            chouma = editGroupInfo[12].substr(0, editGroupInfo[12].length - 2).split('||');
            showSetUpList_All();
            if (GroupInfo[0].length >= 6) {
                document.getElementById("selWaterType").value = editGroupInfo[6];
                document.getElementById("bzType").value = editGroupInfo[14];
                document.getElementById("userLimit").value = editGroupInfo[15];

            }
            if (GroupInfo[0].length >= 6) {
                if (GroupInfo[0].length == 6) {
                    if (editGroupInfo[18] == "1") {
                        document.getElementById("checkboxID").checked = true;
                        document.getElementById("groupZC").style.display = "";
                        document.getElementById("groupXMB").style.display = "";
                    }
                    else {
                        document.getElementById("checkboxID").checked = false;

                        document.getElementById("groupZC").style.display = "none";
                        document.getElementById("groupXMB").style.display = "none";

                    }
                }
                else {
                    if (GroupInfo[14] == "1") {
                        if (editGroupInfo[18] == "1") {
                            document.getElementById("checkboxID").checked = true;
                        }
                        else {
                            document.getElementById("checkboxID").checked = false;
                            document.getElementById("groupZC").style.display = "none";
                            document.getElementById("groupXMB").style.display = "none";
                            //document.getElementById("EgameChecked").style.display = "none";
                        }
                    }
                    else {
                        document.getElementById("groupZC").style.display = "none";
                        document.getElementById("groupXMB").style.display = "none";

                    }
                }

            }

        }
    }   //显示设置列表
}
function groupFnc() {
    if (document.getElementById("checkboxID").checked) {
        document.getElementById("groupZC").style.display = "";
        document.getElementById("groupXMB").style.display = "";
    }
    else {
        document.getElementById("groupZC").style.display = "none";
        document.getElementById("groupXMB").style.display = "none";
    }
}
//修改群组
function editGroup(groupID) {
    var WaterSelect = 0, WaterPercent = 0, WaterPercentEgame = 0, StockEgame = 0, CardSetupID = 0, Stock = 0, bztype = 0, userLimit = 0;
    var NameID = document.getElementById("txtGroupName").value;
    var Name = document.getElementById("txtGroupOtherName").value;
    Name = stripscript(Name);
    var PassWord = document.getElementById("txtPwd").value;
    setupIndex = document.getElementById("bzType").selectedIndex;
    bztype = document.getElementById("bzType").options[setupIndex].value;
    if (GroupInfo[0].length >= 9) {
        userLimit = document.getElementById("userLimit").value;
    }
    var checkDZ = "false";
    if (GroupInfo[0].length >= 6) {
        if (GroupInfo[0].length == 6) {
            checkDZ = document.getElementById("checkboxID").checked;
        }
        else {
            if (GroupInfo[14] == "1") {
                checkDZ = document.getElementById("checkboxID").checked;
            }
        }

    }
    else {
        checkDZ = "true";
    }
    var PassWordAgain = document.getElementById("txtPwdAgain").value;
    var checkValue = "";
    var recompany = 0;
    if (GroupInfo[0].length > 3) {
        var Stock = document.getElementById("txtStock").value;
        WaterSelect = document.getElementById("selWaterType").value;
        WaterPercent = document.getElementById("txtWaterPer").value;
        WaterPercentEgame = document.getElementById("txtWaterPerEgame").value;
        StockEgame = document.getElementById("txtStockEgame").value;
        var a = document.getElementById('divCardSetUp').getElementsByTagName("input");
        var len = a.length, checkboxNum = 0, checkValue = "";
        for (var i = 0; i < len; i++) {
            if ((a[i].type == "checkbox") && (a[i].checked == true)) {
                checkboxNum++;
                checkValue += a[i].id + ",";
            }
        }
        if (checkboxNum < 1) {
            alert(Text(231));
            return;
        }
        //押码设置类别
    }
    Name = Trim(Name);
    if (Name == "") {
        alert(Text(220));
        window.document.getElementById("txtGroupOtherName").focus();
        return;
    }

    PassWord = Trim(PassWord);
    if (!checknames(PassWord)) {
        alert(Text(54));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PassWord != "") {
        if (PassWord.length < 6) {
            alert(Text(53));
            window.document.getElementById("txtPwd").focus();
            return;
        }
        if (PassWord != PassWordAgain) {
            alert(Text(222));
            window.document.getElementById("txtPwdAgain").focus();
            return;
        }
    }

    if (!IsFloat(Stock)) {
        alert(Text(227));
        window.document.getElementById("txtStock").focus();
        return;
    }
    else {
        Stock = Math.round(Stock * 100) / 10000;
        if (parseFloat(Stock) > parseFloat(GroupInfo[6])) {
            alert(Text(207));
            document.getElementById("txtStock").focus();
            return;
        }
        if (GroupInfo[0].length == 9) {
            recompany = GroupInfo[6] * 100 - document.getElementById('txtStock').value - document.getElementById('txtStock1').value;
        }
    }
    //    WaterPercent = WaterPercent.split('%');
    //    WaterPercent = WaterPercent[0];
    if (!IsFloat(WaterPercent)) {
        alert(Text(228));
        window.document.getElementById("txtWaterPer").focus();
        return;
    }
    else {
        if (GroupInfo[0].length > 6) {
            if (parseFloat(WaterPercent) > parseFloat(GroupInfo[8])) {
                alert(Text(229));
                document.getElementById("txtWaterPer").focus();
                return;
            }
        }
    }
    if (!IsFloat(StockEgame)) {
            alert(Text(227));
        document.getElementById("txtStockEgame").focus();
        return;
    }
    else {
        StockEgame = Math.round(StockEgame * 100) / 10000;
        if (GroupInfo[0].length > 6) {
            if (parseFloat(StockEgame) > parseFloat(GroupInfo[13]) && parseFloat(StockEgame) > 100) {
                alert(Text(420));
                document.getElementById("txtStockEgame").focus();
                return;
            }
        }

    }

        if (!IsFloat(WaterPercentEgame)) {
            alert("电子洗码比出错,请重新输入！");
            document.getElementById("txtWaterPerEgame").focus();
            return;
        }
        else {
            if (GroupInfo[0].length > 6) {
                if (parseFloat(WaterPercentEgame) > parseFloat(GroupInfo[12])) {
                    alert(Text(230));
                    document.getElementById("txtWaterPerEgame").focus();
                    return;
                }
            }
        }

    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_editGroupComplete;
    cbo.DoCallBack(encodeURI("AjaxDb.aspx?PageName=GroupEdit&GroupID=" + groupID + "&NameID=" + NameID + "&Name=" + Name + "&PassWord=" + PassWord + "&Stock=" + Stock + "&WaterSelect=" + WaterSelect + "&WaterPercent=" + WaterPercent + "&WaterPercentEgame=" + WaterPercentEgame + "&StockEgame=" + StockEgame + "&CardSetupID=" + checkValue + "&bztype=" + bztype + "&checkDZ=" + checkDZ + "&recompany=" + recompany + "&userLimit=" + userLimit));
}
function Cbo_editGroupComplete(responseText) {
    if (responseText == "10") {
        alert(Text(237));
        refeshGroupManage();
    }
    else {
        alert("修改失败！" + falsePrompt(responseText));

    }
}

//--------------------------------------群组存入点数-------------------------------------
//显示介面

function ShowAddPoint(poingGroup) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            poingGroup = poingGroup.split(',');
            ClearAll();
            var str = new StringBulider();
            str.append("<br />");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='3%'>&nbsp;</td><td width='64%' align='center' valign='top'>");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'><tr><td align='center' valign='middle' class='font1'>"+ Text(239) +"：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr></table>");
            str.append("<br />");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + GetGroupString(poingGroup[0].length) + "" + Text(155) + "：</td><td height='30' align='left' valign='middle'><span class='font4'>" + poingGroup[1] + " (&nbsp;" + poingGroup[2] + "&nbsp;)</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'> " + Math.ceil(poingGroup[3]) + "                </td></tr>");
            str.append("<td align='left' valign='middle'>" + Text(227) + "：</td><td height='30' align='left' valign='middle'><input type='text' name='textfield3' id='txtMoney' onkeyup='validateMoney()'/>&nbsp;/&nbsp;" + Math.ceil(GroupInfo[3]) + "</td></tr>");
            str.append("</table>");
            str.append("<br />");
            str.append("<table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='addGroupPoint(\"" + poingGroup + "\")' /></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='ShowGroupManage()' /></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td><td>&nbsp;</td></tr></table>");
            document.getElementById("divSub").innerHTML = str;
        }
    }
}
//新增点数
function addGroupPoint(poingGroup) {
    poingGroup = poingGroup.split(',');
    var point = document.getElementById("txtMoney").value;
    if (point == "") {
        alert(Text(240));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    if (!IsInt(point)) {
        alert(Text(241));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_addGroupPointComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=GroupAddPoint&GroupID=" + poingGroup[0] + "&Point=" + point);
}
//新增点数成功处理
function Cbo_addGroupPointComplete(responseText) {
    if (responseText == "1") {
        alert(Text(242));
        refeshGroupManage();
        return;
    }
    else {
        alert(Text(485) + falsePrompt(responseText));
        return;
    }
}
//-----------------------------------群组提取点数------------------------------------------------
//显示介面
function showReducePoint(poingGroup) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            poingGroup = poingGroup.split(',');
            var str = new StringBulider();
            str.append("<br />");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='3%'>&nbsp;</td><td width='64%' align='center' valign='top'>");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'><tr><td align='center' valign='middle' class='font1'>" + Text(244) + "：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr></table>");
            str.append("<br />");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + GetGroupString(poingGroup[0].length) + "" + Text(155) + ": </td><td height='30' align='left' valign='middle'><span class='font4'>" + poingGroup[1] + " (&nbsp;" + poingGroup[2] + "&nbsp;)</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'> " + Math.ceil(poingGroup[3]) + "                </td></tr>");
            str.append("<td align='left' valign='middle'>" + Text(243) + "：</td><td height='30' align='left' valign='middle'><input type='text' name='textfield3' id='txtMoney' onkeyup='validateReductMoney(\"" + poingGroup[3] + "\")'/>&nbsp;</td></tr>");
            str.append("</table>");
            str.append("<br />");
            str.append("<table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='reduceGroupPoint(\"" + poingGroup + "\")'/></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='ShowGroupManage()' /></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td><td>&nbsp;</td></tr></table>");
            document.getElementById("divSub").innerHTML = str;
        }
    }
}
//提取点数
function reduceGroupPoint(poingGroup) {
    poingGroup = poingGroup.split(',');

    var point = document.getElementById("txtMoney").value;
    if (point == "") {
        alert(Text(240));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    if (!IsInt(point)) {
        alert(Text(241));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_reduceGroupPointComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=GroupReducePoint&GroupID=" + poingGroup[0] + "&Point=" + point);
}
//减少点数成功处理
function Cbo_reduceGroupPointComplete(responseText) {
    if (responseText == "1") {
        alert(Text(245));
        refeshGroupManage();
        return;
    }
    else {
        alert(Text(246) + falsePrompt(responseText));
    }


}
//---------------------------------------暂停群组--------------------------------------------
function pauseGroup(groupID, pause) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            var message = "";
            if (pause) {
                message = Text(247);
            }
            else {
                message = Text(248);
            }
            if (confirm(message)) {
                var cbo = new CallBackObject();
                cbo.OnComplete = Cbo_pauseGroupComplete;
                cbo.DoCallBack("AjaxDb.aspx?PageName=GroupPause&GroupID=" + groupID + "&Pause=" + pause);
            }
        }
    }

}
function Cbo_pauseGroupComplete(responseText) {
    if (responseText == "1") {
        alert(Text(249));
        refeshGroupManage();
    }
    else { alert(Text(250) + falsePrompt(responseText)); }
}
//---------------------------------------锁定群组--------------------------------------------
function lockGroup(groupID, lock) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            var message = "";
            if (lock) {
                message = Text(251);
            }
            else {
                message = Text(252);
            }
            if (confirm(message)) {
                var cbo = new CallBackObject();
                cbo.OnComplete = Cbo_lockGroupComplete;
                cbo.DoCallBack("AjaxDb.aspx?PageName=GroupLock&GroupID=" + groupID + "&Lock=" + lock);
            }
        }
    }

}
function Cbo_lockGroupComplete(responseText) {
    if (responseText == "1") {
        alert(Text(249));
        refeshGroupManage();
    }
    else { alert(Text(250) + falsePrompt(responseText)); }
}

//---------------------------------------显示会员列表-----------------------------------------
function getCardList(groupID) {
    var cbo = new CallBackObject();
    cbo.OnComplete = ShowCard;
    cbo.DoCallBack("AjaxDb.aspx?PageName=CardList&GroupID=" + groupID);
}
//显示会员列表
function ShowCard(responseText) {
    playAll();
    CardListSS = responseText;
    CardList = responseText.split('$$');
    var str = new StringBulider();
    str.append("<table width='99%'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(ShowCardHead());
    for (var i = 0; i < CardList.length; i++) {
        var iLine = i % 2;
        str.append(ShowCardDetail(CardList[i], iLine));
    }
    str.append("</table>");
    document.getElementById("divSub").innerHTML = str;
}
function ShowCardHead() {
    var ssName = new Array(20);
    ssName[0] = Text(253);
    ssName[1] = Text(156);
    ssName[2] = Text(138);
    ssName[3] = Text(145);
    ssName[4] = Text(157);
    ssName[5] = Text(158);
    ssName[6] = Text(159);
    ssName[7] = Text(160);
    ssName[8] = Text(254);
    ssName[9] = Text(163);
    ssName[10] = Text(155);
    ssName[11] = Text(160);
    ssName[12] = Text(255);
    ssName[13] = Text(166);
    var Str = new StringBulider();
    Str.append("<tr >");
    Str.append("<td  width='60px' style='height:25px'  align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    Str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    Str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    Str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    Str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    Str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    Str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    Str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    Str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    Str.append("<td width='120px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    Str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    Str.append("<td width='170px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    Str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    Str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    Str.append("</tr>");
    return Str;
}
function ShowCardDetail(StrArray, iLine) {
    if (StrArray == "") return "";

    var ss = StrArray.split('##');
    //alert(ss.length);
    var Array2 = new Array(Text(189), Text(177));
    var Str = new StringBulider();
    if (iLine == 0) {
        Str.append("<tr style='height:25px'  bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        Str.append("<td align='center'>" + ss[0] + "</td>"); //用  户
        Str.append("<td align='center'>" + ss[1] + "</td>"); //别   名
        Str.append("<td class='nunber' align='right'>" + ss[13] + "&nbsp;</td>"); //信用额度
        Str.append("<td class='nunber' align='right'>" + parseFloat(ss[2]).toFixed(2) + "&nbsp;</td>"); //剩余点数
        Str.append("<td width='50px' align='center'>" + Array2[ss[3]] + "</td>"); //洗码类型
        Str.append("<td class='per'>" + ss[4] + "%" + "</td>"); //洗码比
        Str.append("<td class='nunber' align='right'>" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        //锁定
        if (ss[6] == "True") //状态
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(140) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        //" + Text(143) + "
        if (ss[7] == "True") //投注
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(143) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        if (ss[8] == "1900-01-01 00:00:00") {
            Str.append("<td class='date'></td>"); //最后登录
        }
        else {
            Str.append("<td class='date'>" + ss[8] + "</td>");
        }
        Str.append("<td align='center'>" + getbz(ss[14]) + "</td>"); //币种
        Str.append("<td width='170px' height='25' align='center'>"); //" + Text(163) + "
        Str.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
        Str.append("<tr>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(170) + "' src='../images/index_r15_c21.jpg' onclick='showCardAddPoint(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(256) + "' src='../images/index_r15_c23.jpg' onclick='showCardReducePoint(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(163) + "' src='../images/index_r15_c26.jpg' onclick='showEditCard(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(172) + "' disabled='disabled' src='../images/index_r15_c30.jpg ' /></td>");
        Str.append("</tr>");
        Str.append("</table></td>");
        if (ss[6] == "True") //状态
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/q.jpg' value='" + Text(173) + "' onclick='lockCard(\"" + ss[0] + "\",false)' /></td>"); }
        else
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='lockCard(\"" + ss[0] + "\",true)'/></td>"); }
        //暂停
        if (ss[7] == "True") //投注
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseCard(\"" + ss[0] + "\",false)'/></td>"); }
        else
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseCard(\"" + ss[0] + "\",true)'/></td>"); }
        Str.append("</tr>");

    }
    if (iLine == 1) {
        Str.append("<tr style='height:25px'  bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        Str.append("<td align='center'>" + ss[0] + "</td>"); //用  户
        Str.append("<td align='center'>" + ss[1] + "</td>"); //别   名
        Str.append("<td class='nunber' align='right'>" + ss[13] + "&nbsp;</td>"); //信用额度
        Str.append("<td class='nunber' align='right'>" + parseFloat(ss[2]).toFixed(2) + "&nbsp;</td>"); //剩余点数
        Str.append("<td width='50px' align='center'>" + Array2[ss[3]] + "</td>"); //洗码类型
        Str.append("<td class='per'>" + ss[4] + "%" + "</td>"); //洗码比
        Str.append("<td class='nunber' align='right'>" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        //锁定
        if (ss[6] == "True") //状态
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(140) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        //暂停
        if (ss[7] == "True") //投注
        { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(143) + "</td>"); }
        else
        { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
        if (ss[8] == "1900-01-01 00:00:00") {
            Str.append("<td class='date'></td>"); //最后登录
        }
        else {
            Str.append("<td class='date'>" + ss[8] + "</td>");
        }
        Str.append("<td align='center'>" + getbz(ss[14]) + "</td>"); //币种
        Str.append("<td width='170px' height='25' align='center'>"); //" + Text(163) + "
        Str.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
        Str.append("<tr>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(170) + "' src='../images/index_r15_c21.jpg' onclick='showCardAddPoint(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(256) + "' src='../images/index_r15_c23.jpg' onclick='showCardReducePoint(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(163) + "' src='../images/index_r15_c26.jpg' onclick='showEditCard(\"" + ss + "\")'/></td>");
        Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(172) + "' disabled='disabled' src='../images/index_r15_c30.jpg ' /></td>");
        Str.append("</tr>");
        Str.append("</table></td>");
        if (ss[6] == "True") //状态
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/q.jpg' value='" + Text(173) + "' onclick='lockCard(\"" + ss[0] + "\",false)' /></td>"); }
        else
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='lockCard(\"" + ss[0] + "\",true)'/></td>"); }
        //暂停
        if (ss[7] == "True") //投注
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseCard(\"" + ss[0] + "\",false)'/></td>"); }
        else
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseCard(\"" + ss[0] + "\",true)'/></td>"); }
        Str.append("</tr>");

    }
    return Str;
}
//---------------------------------------搜索会员----------------------------------------------
function searchCard() {
    var searchCardNameID = document.getElementById("txtCardNameID").value;
    if (searchCardNameID == "") {
        alert(Text(258));
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Com_searchCardComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=SearchCard&NameID=" + searchCardNameID + "&groupid=" + GroupInfo[1]);
}
function Com_searchCardComplete(responseText) {
    responseText = responseText.split('@@');
    if (responseText[0] != "") {
        var ssCard = responseText[0].split('##');
        var Array2 = new Array(Text(189), Text(177));
        var Str = new StringBulider();
        var ss = ssCard;
        Str.append("<table width='99%'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
        Str.append(ShowCardHead());
        if (ssCard[0] != "") {
            Str.append("<tr style='height:25px'  bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
            Str.append("<td align='center'>" + ss[0] + "</td>"); //用  户
            Str.append("<td align='center'>" + ss[1] + "</td>"); //别   名
            Str.append("<td class='nunber' align='right'>" + ss[13] + "&nbsp;</td>"); //信用额度
            Str.append("<td class='nunber' align='right'>" + parseFloat(ss[2]).toFixed(2) + "&nbsp;</td>"); //剩余点数
            Str.append("<td width='50px' align='center'>" + Array2[ss[3]] + "</td>"); //洗码类型
            Str.append("<td class='per'>" + ss[4] + "%" + "</td>"); //洗码比
            Str.append("<td class='nunber' align='right'>" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
            //锁定
            if (ss[6] == "True") //状态
            { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(140) + "</td>"); }
            else
            { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
            //" + Text(143) + "
            if (ss[7] == "True") //投注
            { Str.append("<td width='40px' align='center' style='color:Red'>" + Text(143) + "</td>"); }
            else
            { Str.append("<td width='40px' align='center' style='color:Green'>" + Text(141) + "</td>"); }
            if (ss[8] == "1900-01-01 00:00:00") {
                Str.append("<td class='date'></td>"); //最后登录
            }
            else {
                Str.append("<td class='date'>" + ss[8] + "</td>");
            }
            Str.append("<td align='center'>" + getbz(ss[14]) + "</td>"); //币种
            Str.append("<td width='170px' height='25' align='center'>"); //" + Text(163) + "
            Str.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
            Str.append("<tr>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(170) + "' src='../images/index_r15_c21.jpg' onclick='showCardAddPoint(\"" + ss + "\")'/></td>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(256) + "' src='../images/index_r15_c23.jpg' onclick='showCardReducePoint(\"" + ss + "\")'/></td>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(163) + "' src='../images/index_r15_c26.jpg' onclick='showEditCard(\"" + ss + "\")'/></td>");
            Str.append("<td align='center' valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;' value='" + Text(172) + "' disabled='disabled' src='../images/index_r15_c30.jpg ' /></td>");
            Str.append("</tr>");
            Str.append("</table></td>");
            if (ss[6] == "True") //状态
            { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/q.jpg' value='" + Text(173) + "' onclick='lockCard(\"" + ss[0] + "\",false)' /></td>"); }
            else
            { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='lockCard(\"" + ss[0] + "\",true)'/></td>"); }
            //暂停
            if (ss[7] == "True") //投注
            { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseCard(\"" + ss[0] + "\",false)'/></td>"); }
            else
            { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseCard(\"" + ss[0] + "\",true)'/></td>"); }
            Str.append("</tr>");

            if (responseText[1] > "") {
                var jiedian = responseText[1].split("#");
                var str1 = new StringBulider();
                str1.append("<table><tr><td>");
                for (var i = jiedian.length - 2; i >= 0; i--) {
                    str1.append("<a style='font-size:10pt;color:blue;' href='#' onclick='searchgroup1(\"" + jiedian[i].split(',')[1] + "\",\"" + jiedian[i].split(',')[0] + "\")'>");
                    str1.append(jiedian[i].split(',')[1]);
                    str1.append("</a>");
                    str1.append("&nbsp;/&nbsp;");
                }
                str1.del(7);
                str1.append("</td></tr><table>");
                document.getElementById("nodes").innerHTML = str1;
                document.getElementById("nodes").style.display = "";
            }

        }
        Str.append("</table>");
        document.getElementById("divSub").innerHTML = Str;
    }
    else {
        alert(Text(259));
        return;
    }
}

//---------------------------------------新增会员----------------------------------------------
//
function showAddCard() {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            var str = new StringBulider();
            str.append("</br>");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td width='3%'>&nbsp;</td>");
            str.append("<td width='64%' align='center' valign='top'>");
            str.append("<br />");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'>");
            str.append("<tr><td align='center' valign='middle' class='font1'>" + Text(261) + "：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr>");
            str.append("</table>");
            str.append("<br />");
            str.append("<table width='820' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + Text(253) + "</td><td  height='30' align='left' valign='middle'>" + GroupInfo[1].substring(0, 2) + "<input type='text' style=\"width: 130px\" name='textfield' id='txtGroupName' value='' />&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' id='btnValidate' style='width:50px'   value='" + Text(184) + "' onclick='validateCardNameID()' />（" + Text(185) + "）</td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(262) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" id='txtOtherName'/>&nbsp;&nbsp;&nbsp;(建议使用A-Z字母加0-9数字)</td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(180) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 141px\" id='txtPwd'/><span>&nbsp;&nbsp;&nbsp;(密码必须使用（0-9，A-Z）而且不少于6位)</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(181) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 141px\" id='txtPwdAgain'/></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(263) + "： </td><td height='30' align='left' valign='middle'><select name='select' id='hfed' style=\"width: 146px\" onchange='selectchange()' disabled='disabled'><option selected='selected' value='0'>" + Text(265) + " </option><option value='1'>" + Text(266) + " </option><option value='2'>" + Text(267) + " </option></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(255) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\"id='txtMoney' value='0' onkeyup='validateMoney1()'disabled='disabled' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\"id='txtXYMoney' value='0' />&nbsp;&nbsp;&nbsp;/" + Math.ceil(GroupInfo[3]) + "<span class='font4' id='spMoney'></span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(234) + "： </td><td height='30' align='left' valign='middle'><select name='select' id='selWaterType' style=\"width: 146px\" disabled='disabled'><option selected='selected' value='0'>" + Text(169) + " </option><option value='1'>" + Text(177) + " </option></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(166) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 146px\" id='bzType' disabled='disabled'>");
            var bztype = bz.split(';');
            var bzstr = "";
            for (var i = 0; i < bztype.length; i++) {
                bzstr += "<option  value='" + (i + 1) + "'>" + bztype[i] + "</option>";
            }
            str.append("" + bzstr + "");
            str.append("</td></tr>");
            str.append(" <tr><td align='left' valign='middle'>" + Text(157) + "：</td><td height='30' align='left'  valign='middle'><input type='text' id='txtWaterPer' style=\"width: 141px\" onkeyup='validateWaterPer()' value='0'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + GroupInfo[8] + "%" + "</td></tr>");
            str.append(" <tr id='EgameRow'><td align='left' valign='middle'>" + Text(167) + "：</td><td height='30' align='left'  valign='middle'><input type='text' id='txtWaterPerEgame' style=\"width: 141px\" onkeyup='validateWaterPerEgame()' value='0'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + GroupInfo[12] + "%" + "</td></tr>");
            str.append(" <tr id='EgameChecked'><td align='left' valign='middle'>" + Text(235) + "：</td><td height='30' align='left'  valign='middle'><input type='checkbox' id='checkboxID' checked='checked' onclick='checkBoxClick()'/>" + Text(236) + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(268) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 141px\" id='txtMaxWin' onkeyup='validateMaxWin()' value='0' /></span>&nbsp;&nbsp;&nbsp;" + Text(269) + "</td></tr>");
            str.append("</table>");
            str.append("</br>");
            str.append("<table align='left' border='0' cellspacing='0' cellpadding='0'><tr><td align='left' valign='middle'>" + Text(270) + "： </td>");
            str.append("</tr></table>");
            str.append("<table width='820' border='0' cellspacing='0' cellpadding='0'><tr><td align='left' valign='top'><br />");
            str.append("<div id='divCardSetUp'></div></td></tr></table>");

            str.append("<div align='left' width='100%'><table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='addCard()'/></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='showCardManage()'/></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td>");
            str.append("<td>&nbsp;</td></tr></table></div>");
            document.getElementById("divSub").innerHTML = str;
            document.getElementById("selWaterType").selectedIndex = GroupInfo[7];
            document.getElementById("bzType").value = GroupInfo[11];
            chouma = null;
            showSetUpList_All();

            if (GroupInfo[14] == "0") {
                document.getElementById('EgameRow').style.display = "none";
                document.getElementById('EgameChecked').style.display = "none";
                document.getElementById('checkboxID').checked = false;
            }
            else {
                document.getElementById('EgameRow').style.display = "black";
                document.getElementById('EgameChecked').style.display = "black";
                document.getElementById('checkboxID').checked = true;
            }
        }
    }
}
function selectchange() {
    if (document.getElementById("hfed").value == "0") {
        document.getElementById("txtMoney").disabled = true;
        document.getElementById("txtXYMoney").disabled = false;
        document.getElementById("txtMoney").value = "0";
        document.getElementById("txtXYMoney").value = "0";
    }
    else {
        document.getElementById("txtMoney").disabled = false;
        document.getElementById("txtXYMoney").disabled = true;
    }
}
function selectchange1() {
    if (document.getElementById("hfed").value == "0") {
        document.getElementById("txtMoney").disabled = true;
        document.getElementById("txtMoney").value = "0";
    }
    else {
        document.getElementById("txtMoney").disabled = false;
    }
}
//新增会员
function addCard() {
    var Name = document.getElementById("txtOtherName").value;
    Name = stripscript(Name);
    var NameID = GroupInfo[1].substring(0, 2) + document.getElementById("txtGroupName").value;
    var PassWord = document.getElementById("txtPwd").value;
    var PassWordAgain = document.getElementById("txtPwdAgain").value;
    var CreditMoney = document.getElementById("txtMoney").value;
    var WaterSelect = document.getElementById("selWaterType").value;
    var bztype = document.getElementById("bzType").value;
    var WaterPercent = window.document.getElementById("txtWaterPer").value;
    var WaterPercentEgame = window.document.getElementById("txtWaterPerEgame").value;
    var xyed = document.getElementById("txtXYMoney").value;
    var edhf = document.getElementById("hfed").value;
    var EgameIsOpen=document.getElementById("checkboxID").checked;
    //var CardSetupID=document.getElementById("CardSetupID").value;
    //最大赢额
    var maxWind = document.getElementById("txtMaxWin").value;
    NameID = Trim(NameID);
    if (!checknames(NameID)) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    else if (NameID.isInChinese()) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    else {
        if (NameID.length < 6 || NameID.length > 9) {
            alert(Text(185));
            document.getElementById("txtGroupName").focus();
            return;
        }
    }
    if (Name == "") {
        alert(Text(220));
        document.getElementById("txtOtherName").focus();
        return;
    }

    PassWord = Trim(PassWord);
    if (PassWord == "") {
        alert(Text(221));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (!checknames(PassWord)) {
        alert(Text(54));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PassWord.length < 6) {
        alert(Text(54));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PassWordAgain != PassWord) {
        alert(Text(222));
        window.document.getElementById("txtPwdAgain").focus();
        return;
    }
    if (!IsInt(CreditMoney)) {
        alert(Text(223));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    if (!IsInt(xyed)) {
        alert(Text(223));
        window.document.getElementById("txtXYMoney").focus();
        return;
    }
    else {
        if (CreditMoney < 0) CreditMoney = 0;
        if (parseInt(CreditMoney) > parseInt(GroupInfo[5])) {
            alert(Text(226));
            document.getElementById("txtMoney").focus();
            return;
        }
    }

    if (!IsFloat(WaterPercent)) {
        alert(Text(228));
        window.document.getElementById("txtWaterPer").focus();
        return;
    }
    else {
        if (parseFloat(WaterPercent) > parseFloat(GroupInfo[8])) {
            alert(Text(229));
            document.getElementById("txtWaterPer").focus();
            return;
        }
    }
    if (!IsFloat(WaterPercentEgame)) {
        alert(Text(228));
        window.document.getElementById("txtWaterPerEgame").focus();
        return;
    }
    else {
        if (parseFloat(WaterPercentEgame) > parseFloat(GroupInfo[12])) {
            alert(Text(229));
            document.getElementById("txtWaterPerEgame").focus();
            return;
        }
    }
    if (!IsInt(maxWind)) {
        alert(Text(271));
        window.document.getElementById("txtMaxWin").focus();
        return;
    }
    else {
        if (maxWind < 0) maxWind = 0;
    }
    var a = document.getElementById('divCardSetUp').getElementsByTagName("input");
    var len = a.length, checkboxNum = 0, checkValue = "";
    for (var i = 0; i < len; i++) {
        if ((a[i].type == "checkbox") && (a[i].checked == true)) {
            checkboxNum++;
            if (checkboxNum > 3) {
                alert(Text(272));
                return;
            }
            else {
                checkValue += a[i].id + ",";
            }
        }
    }
    if (checkboxNum < 1) {
        alert(Text(231));
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_addCardComplete;
    cbo.DoCallBack(encodeURI("AjaxDb.aspx?PageName=CardAdd&GroupID=" + GroupInfo[0] + "&NameID=" + NameID + "&CardName=" + Name + "&PassWord=" + PassWord + "&CreditMoney=" + xyed + "&xyed=" + CreditMoney + "&edhf=" + edhf + "&WaterSelect=" + WaterSelect + "&WaterPercent=" + WaterPercent + "&WaterPercentEgame="+WaterPercentEgame+"&CardSetupID=" + checkValue + "&EgameIsOpen="+EgameIsOpen+"&bztype=" + bztype + "&MaxWin=" + maxWind));
}
function Cbo_addCardComplete(responseText) {
    if (responseText == "10") {
        alert(Text(232));
        refeshCardManage();
    }
    else {
        alert(Text(274) + falsePrompt(responseText));
    }
}
//---------------------------------------暂停卡--------------------------------------------
function pauseCard(cardID, pause) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            var message = "";
            if (pause) {
                message = Text(274);
            }
            else {
                message = Text(275);
            }
            if (confirm(message)) {
                var cbo = new CallBackObject();
                cbo.OnComplete = Cbo_pauseCardComplete;
                cbo.DoCallBack("AjaxDb.aspx?PageName=CardPause&CardID=" + cardID + "&Pause=" + pause);
            }
        }
    }
}
function Cbo_pauseCardComplete(responseText) {
    if (responseText == "1") {
        alert(Text(249));
        refeshCardManage();
    }
    else {
        alert(Text(250) + falsePrompt(responseText));
    }
}

//---------------------------------------锁定卡--------------------------------------------
function lockCard(cardID, lock) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            var message = "";
            if (lock) {
                message = Text(276);
            }
            else {
                message = Text(277);
            }
            if (confirm(message)) {
                var cbo = new CallBackObject();
                cbo.OnComplete = Cbo_lockCardComplete;
                cbo.DoCallBack("AjaxDb.aspx?PageName=CardLock&CardID=" + cardID + "&Lock=" + lock);
            }
        }
    }
}
function Cbo_lockCardComplete(responseText) {
    if (responseText == "1") {
        alert(Text(249));
        refeshCardManage();
    }
    else {
        alert(Text(250) + falsePrompt(responseText));
    }
}

//--------------------------------会员设定------------------------------------

//检查会员是否存在
function checkUserName(userName) {
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_checkCardComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=checkCard&CardID=" + userName);
}
function Cbo_checkCardComplete(responseText) {
    if (responseText == 1) {
        document.getElementById('EgameRow').style.display = "none";
        document.getElementById('EgameChecked').style.display = "";

    }
    else {
        // document.getElementById('EgameChecked')
    }

}
function checkBoxClick() {
    if (document.getElementById('checkboxID').checked == false) {
        document.getElementById('EgameRow').style.display = "none";
        document.getElementById('txtWaterPerEgame').value = "0";
    }
    else {
        document.getElementById('EgameRow').style.display = "";
        document.getElementById('checkboxID').checked = true;
    }

}
function showEditCard(editCard) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            editCard = editCard.split(',');
            //检查电子账户是否存在
            //checkUserName(editCard[0]);
            var str = new StringBulider();
            str.append("</br>");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td width='3%'>&nbsp;</td>");
            str.append("<td width='64%' align='center' valign='top'>");
            str.append("<br />");
            str.append("<table width='800' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'>");
            str.append("<tr><td align='center' valign='middle' class='font1'>"+ Text(484) +"：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr>");
            str.append("</table>");
            str.append("<br />");
            str.append("<table width='800' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + Text(253) + "</td><td width='405' height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtGroupName' value='" + editCard[0] + "' disabled='disabled'/></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(262) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\"  id='txtOtherName' value='" + editCard[1] + "' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(180) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" id='txtPwd' /><span class='font4' id='spPwd'></span><span >&nbsp;&nbsp;&nbsp;(" + Text(307) + ")</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(181) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" id='txtPwdAgain' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(263) + "： </td><td height='30' align='left' valign='middle'><select name='select' id='hfed' style=\"width: 165px\" onchange='selectchange1()' disabled='disabled'><option value='0'>" + Text(265) + " </option><option value='1'>" + Text(266) + " </option><option value='2'>" + Text(267) + " </option></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(255) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\"id='txtMoney' value='" + editCard[13] + "'' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtXYMoney' value='" + Math.ceil(editCard[2]) + "' disabled='disabled' />&nbsp;&nbsp;&nbsp;/&nbsp;" + Math.ceil(GroupInfo[3]) + "</td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(234) + "： </td><td height='30' align='left' valign='middle'><select style=\"width: 165px\" id='selWaterType' disabled='disabled'><option  value='0'>" + Text(169) + " </option><option value='1'>" + Text(177) + " </option></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(166) + "： </td><td height='30' align='left' valign='middle'><select name='select' style=\"width: 146px\" id='bzType' disabled='disabled'>");
             
            var bztype = bz.split(';');
            var bzstr = "";
            for (var i = 0; i < bztype.length; i++) {
                bzstr += "<option  value='" + (i + 1) + "'>" + bztype[i] + "</option>";
            }
            str.append("" + bzstr + "");
            str.append("</td></tr>");
            //var int1=parseInt(editCard[4]*10000);
            str.append(" <tr><td align='left' valign='middle'>" + Text(157) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" value='" + editCard[4] + "' onkeyup='validateWaterPer()' id='txtWaterPer'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + GroupInfo[8] + "%</td></tr>");
            str.append(" <tr id='EgameRow'><td align='left' valign='middle'>" + Text(167) + "：</td><td height='30' align='left'  valign='middle'><input type='text' id='txtWaterPerEgame' style=\"width: 141px\" onkeyup='validateWaterPerEgame()' value='"+editCard[15]+"'/>&nbsp;&nbsp;&nbsp;/&nbsp;" + GroupInfo[12] + "%" + "</td></tr>");
            str.append(" <tr id='EgameChecked'><td align='left' valign='middle'>" + Text(235) + "：</td><td height='30' align='left'  valign='middle'><input type='checkbox' id='checkboxID' onclick='checkBoxClick()'/>" + Text(236) + "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(268) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" id='txtMaxWin' onmouseleave='validateMaxWin()' value='" + editCard[9] + "' /><span  class='font4' id='spMaxWin'></span>&nbsp;&nbsp;&nbsp;" + Text(269) + "</td></tr>");
            str.append("</table>");
            str.append("</br>");
            str.append("<table width='800' border='0' cellspacing='0' cellpadding='0' ><tr><td width='95' align='left' valign='middle'>" + Text(270) + "： </td><td width='405' align='left' valign='middle'>");
            str.append("</tr></table>");

            str.append("<table width='800' border='0' cellspacing='0' cellpadding='0'><tr><td align='left' valign='top'><br />");
            str.append("<div id='divCardSetUp'></div></td></tr></table>");

            str.append("<div width='800px' align='left'><table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='right' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='editCard(\"" + editCard[0] + "\")'/></td>");
            str.append("<td align='right' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            str.append("<td align='right' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='showCardManage()'/></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td>");
            str.append("<td>&nbsp;</td></tr></table></div>");
            document.getElementById("divSub").innerHTML = str;
            document.getElementById("selWaterType").value = editCard[3];
            document.getElementById("hfed").value = editCard[12];
            document.getElementById("bzType").value = editCard[14];
            selectchange1();
            chouma = editCard[10].split('@');
            showSetUpList_All();
            if (GroupInfo[14] == "0") {
                document.getElementById('EgameRow').style.display = "none";
                document.getElementById('EgameChecked').style.display = "none";
                //document.getElementById('checkboxID').checked = false;
            }
            else {
                document.getElementById('EgameRow').style.display = "";
                document.getElementById('EgameChecked').style.display = "";
                if (editCard[16] == "1") {
                    document.getElementById('checkboxID').checked = true;
                }
                else {
                    document.getElementById('EgameRow').style.display = "none";
                }
            }
            
        }
    }
}

//#region Clllsdlasd

//修改卡
function editCard(cardID) {
    var Name = document.getElementById("txtOtherName").value;
    Name = stripscript(Name);
    var PassWord = document.getElementById("txtPwd").value;
    var PassWordAgain = document.getElementById("txtPwdAgain").value;
    var CreditMoney = document.getElementById("txtMoney").value;
    var WaterSelect = document.getElementById("selWaterType").value;
    var bztype = document.getElementById("bzType").value;
    var WaterPercent = window.document.getElementById("txtWaterPer").value;
    var WaterPercentEgame = window.document.getElementById("txtWaterPerEgame").value;
    var EgameIsOpen = document.getElementById("checkboxID").checked;
    var xyed = document.getElementById("txtXYMoney").value;
    var edhf = document.getElementById("hfed").value;
    //最大赢额
    var maxWind = document.getElementById("txtMaxWin").value;

    Name = Trim(Name);
    if (Name == "") {
        alert(Text(220));
        document.getElementById("txtOtherName").focus();
        return;
    }

    PassWord = Trim(PassWord);
    if (!checknames(PassWord)) {
        alert(Text(54));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PassWord != "") {
        if (PassWord.length < 6) {
            alert(Text(183));
            window.document.getElementById("txtPwd").focus();
            return;
        }
        if (PassWordAgain != PassWord) {
            alert(Text(222));
            window.document.getElementById("txtPwdAgain").focus();
            return;
        }
    }
    if (!IsInt(edhf)) {
        alert(Text(223));
        window.document.getElementById("txtXYMoney").focus();
        return;
    }
    if (!IsInt(CreditMoney)) {
        alert(Text(223));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    else {
        if (CreditMoney < 0) CreditMoney = 0;
    }

    if (!IsFloat(WaterPercent)) {
        alert(Text(228));
        document.getElementById("txtWaterPer").focus();
        return;
    }
    else {
        if (parseFloat(WaterPercent) > parseFloat(GroupInfo[8])) {
            alert(Text(229));
            document.getElementById("txtWaterPer").focus();
            return;
        }
    }
    if (!IsFloat(WaterPercentEgame)) {
        alert(Text(228));
        document.getElementById("txtWaterPerEgame").focus();
        return;
    }
    else {
        if (parseFloat(WaterPercentEgame) > parseFloat(GroupInfo[12])) {
            alert(Text(229));
            document.getElementById("txtWaterPerEgame").focus();
            return;
        }
    }
    if (!IsInt(maxWind)) {
        alert(Text(271));
        window.document.getElementById("txtMaxWin").focus();
        return;
    }
    else {
        if (maxWind < 0) maxWind = 0;
    }
    var a = document.getElementById('divCardSetUp').getElementsByTagName("input");
    var len = a.length, checkboxNum = 0, checkValue = "";
    for (var i = 0; i < len; i++) {
        if ((a[i].type == "checkbox") && (a[i].checked == true)) {
            checkboxNum++;
            if (checkboxNum > 3) {
                alert(Text(272));
                return;
            }
            else { checkValue += a[i].id + ","; }
        }
    }
    if (checkboxNum < 1) {
        alert(Text(231));
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_addCardComplete;
    cbo.DoCallBack(encodeURI("AjaxDb.aspx?PageName=CardEdit&CardID=" + cardID + "&CardName=" + Name + "&PassWord=" + PassWord + "&GroupID=" + GroupInfo[0] + "&CreditMoney=" + xyed + "&xyed=" + CreditMoney + "&edhf=" + edhf + "&WaterSelect=" + WaterSelect + "&WaterPercent=" + WaterPercent + "&WaterPercentEgame=" + WaterPercentEgame + "&CardSetupID=" + checkValue + "&EgameIsOpen=" + EgameIsOpen + "&bztype=" + bztype + "&MaxWin=" + maxWind));
}
//-------------------------------------------会员名称验证--------------------
//验证帐户是否存在
function validateCardNameID() {
    var groupCardID = document.getElementById("txtGroupName").value;
    if (groupCardID == "") {
        alert(Text(202));
        return;
    }
    if (groupCardID.isInChinese()) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    if (!checknames(groupCardID)) {
        alert(Text(185));
        document.getElementById("txtGroupName").focus();
        return;
    }
    groupCardID = GroupInfo[1].substring(0, 2) + document.getElementById("txtGroupName").value;
    if (groupCardID.length < 6 || groupCardID.length > 9) {
        alert(Text(185));
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_validateCardNameIDComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=CardValidateNameID&NameID=" + groupCardID + "&groupid=" + GroupInfo[0] + "");
}



//验证帐户成功处理
function Cbo_validateCardNameIDComplete(responseText) {
    if (responseText == "False") {
        alert(Text(203));
        return;
    }
    if (responseText == "True") {
        alert(Text(204));
        return;
    }
}

//#endregion

//会员存入
function showCardAddPoint(editCard) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            editCard = editCard.split(',');
            var str = new StringBulider();
            str.append("<br />");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='3%'>&nbsp;</td><td width='64%' align='center' valign='top'>");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'><tr><td align='center' valign='middle' class='font1'>" + Text(239) + "：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr></table>");
            str.append("<br />");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + Text(253) + "：</td><td height='30' align='left' valign='middle'><span class='font4'>" + editCard[0] + " (&nbsp;" + editCard[1] + "&nbsp;)</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'> " + parseFloat(editCard[2]).toFixed(2) + "                </td></tr>");
            str.append("<td align='left' valign='middle'>" + Text(227) + "：</td><td height='30' align='left' valign='middle'><input type='text' name='textfield3' id='txtMoney' onkeyup='validateMoney()'/>&nbsp;/&nbsp;" + Math.ceil(GroupInfo[3]) + "<span  class='font4' id='spMoney'></span></td></tr>");
            str.append("</table>");
            str.append("<br />");
            str.append("<table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='addCardPoint(\"" + editCard + "\")' /></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2, value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='showCardManage()' /></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td><td>&nbsp;</td></tr></table>");
            document.getElementById("divSub").innerHTML = str;
        }
    }
}



//#region dasdasdas

//存入点数
function addCardPoint(pointCard) {
    pointCard = pointCard.split(',');

    var point = document.getElementById("txtMoney").value;
    if (point == "") {
        alert(Text(240));
        document.getElementById("txtMoney").focus();
        return;
    }
    if (point <= 0) {
        alert(Text(279));
        document.getElementById("txtMoney").focus();
        return;
    }
    if (!IsInt(point)) {
        alert(Text(241));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_addCardPointPointComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=CardAddPoint&CardID=" + pointCard[0] + "&Point=" + point + "&gropid=" + GroupInfo[0]);
}
//减少点数成功处理
function Cbo_addCardPointPointComplete(responseText) {
    if (responseText == "1") {
        alert(Text(242));
        refeshCardManage();
        return;
    }
    else {
        alert(Text(280) + falsePrompt(responseText));
        return;
    }
}
//提取
function showCardReducePoint(editCard) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            editCard = editCard.split(',');
            var str = new StringBulider();
            str.append("<br />");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='3%'>&nbsp;</td><td width='64%' align='center' valign='top'>");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'><tr><td align='center' valign='middle' class='font1'>"+ Text(281) +"：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr></table>");
            str.append("<br />");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + Text(253) + "：</td><td height='30' align='left' valign='middle'><span class='font4'>" + editCard[0] + " (&nbsp;" + editCard[1] + "&nbsp;)</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(138) + "：</td><td height='30' align='left' valign='middle'> " + parseFloat(editCard[2]).toFixed(2) + "                </td></tr>");
            str.append("<td align='left' valign='middle'>" + Text(243) + "：</td><td height='30' align='left' valign='middle'><input type='text' name='textfield3' id='txtMoney' onkeyup='validateReductMoney(\"" + parseFloat(editCard[2]).toFixed(2) + "\")'/>&nbsp;</td></tr>");
            str.append("</table>");
            str.append("<br />");
            str.append("<table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='reduceCardPoint(\"" + editCard[0] + "\")' /></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2, value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='showCardManage()' /></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td><td>&nbsp;</td></tr></table>");
            document.getElementById("divSub").innerHTML = str;
        }
    }
}
//减少点数
function reduceCardPoint(pointCard) {
    pointCard = pointCard.split(',');

    var point = document.getElementById("txtMoney").value;
    if (point == "") {
        alert(Text(240));
        document.getElementById("txtMoney").focus();
        return;
    }
    if (point <= 0) {
        alert(Text(279));
        document.getElementById("txtMoney").focus();
        return;
    }
    if (!IsInt(point)) {
        alert(Text(241));
        window.document.getElementById("txtMoney").focus();
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_reduceCardPointPointComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=CardReducePoint&CardID=" + pointCard[0] + "&Point=" + point + "&gropid=" + GroupInfo[0]);
}
//减少点数成功处理
function Cbo_reduceCardPointPointComplete(responseText) {
    if (responseText == "1") {
        alert(Text(245));
        refeshCardManage();
        return;
    }
    else {
        alert(Text(246)+ falsePrompt(responseText));
        return;
    }
}
//--------------------------------显示子帐号列表------------------------------
function getSubUser() {
    var cbo = new CallBackObject();
    cbo.OnComplete = showSubUser;
    cbo.DoCallBack("AjaxDb.aspx?PageName=SubUser&GroupID=" + GroupInfo[0]);
}
function showSubUser(responseText) {
    SubUserSS = responseText;
    SubUser = responseText.split('$$');
    var str = new StringBulider();
    str.append("<table width='99%'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showSubUserHead());
    for (var i = 0; i < SubUser.length; i++) {
        var iLine = i % 2;
        str.append(showSubUserDetail(SubUser[i], iLine));
    }

    str.append("</table>");
    document.getElementById("divSub").innerHTML = str;
}


function showSubUserHead() {
    var ssName = new Array(20);
    ssName[0] = Text(282);
    ssName[1] = Text(283);
    ssName[2] = Text(284);
    ssName[3] = Text(162);
    ssName[4] = Text(139);
    ssName[5] = "";
    ssName[6] = "";
    ssName[7] = "";
    ssName[8] = Text(156);
    var Str = new StringBulider();
    Str.append("<tr >");
    Str.append("<td  width='60' style='height:25px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    Str.append("<td  width='60'  align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    Str.append("<td width='120' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");  // bgcolor='#666'  align=center
    Str.append("<td width='120' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    Str.append("<td width='120' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    Str.append("<td width='80' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    Str.append("<td width='40' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    Str.append("<td width='40' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    Str.append("<td width='40' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    Str.append("</tr>");
    return Str;
}
function showSubUserDetail(StrArray, iLine) {
    if (StrArray == "") return "";
    var ss = StrArray.split('##');
    var Str = new StringBulider();
    if (iLine == 0) {
        Str.append("<tr bgcolor='#FFE3C8' style='height:25px'  onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        Str.append("<td align='center'>" + ss[1] + "</td>"); //子帐号
        Str.append("<td align='center'>" + ss[2] + "</td>"); //bieming
        if (ss[3] == "1900-01-01 00:00:00") {
            Str.append("<td></td>");
        }
        else {
            Str.append("<td>" + ss[3] + "</td>");
        }
        //Str.append("<td>" + ss[3] + "</td>"); //最后登录日期
        Str.append("<td >" + ss[4] + "</td>"); //登记日期
        Str.append("<td >" + ss[5] + "</td>"); //最后修改日期
        //暂停
        if (ss[6] == "True")
        { Str.append("<td align='middle'>" + Text(143) + "</td>"); }
        else
        { Str.append("<td align='middle'>" + Text(141) + "</td>"); } //帐号状态
        Str.append("<td   valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(163) + "' name='imageField22' src='../images/index_r15_c26.jpg' onclick='showEditSubUser(\"" + StrArray + "\")' /></td>"); //设定
        if (ss[6] == "True") //暂停操作
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseSubUser(\"" + ss[1] + "\",false)'/></td>"); }
        else
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseSubUser(\"" + ss[1] + "\",true)'/></td>"); }
        Str.append("<td   valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(286) + "'  onclick='delSubUser(\"" + ss[1] + "\")' /></td>"); //删除
        Str.append("</tr>");
    }
    if (iLine == 1) {
        Str.append("<tr bgcolor='#E1E1E1' style='height:25px'  onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        Str.append("<td align='center'>" + ss[1] + "</td>"); //子帐号
        Str.append("<td align='center'>" + ss[2] + "</td>"); //bieming
        if (ss[3] == "1900-01-01 00:00:00") {
            Str.append("<td></td>");
        }
        else {
            Str.append("<td>" + ss[3] + "</td>");
        }
        Str.append("<td >" + ss[4] + "</td>"); //登记日期
        Str.append("<td >" + ss[5] + "</td>"); //最后修改日期
        //暂停
        if (ss[6] == "True")
        { Str.append("<td align='middle'>" + Text(143) + "</td>"); }
        else
        { Str.append("<td align='middle'>" + Text(141) + "</td>"); } //帐号状态
        Str.append("<td   valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(163) + "' name='imageField22' src='../images/index_r15_c26.jpg' onclick='showEditSubUser(\"" + StrArray + "\")' /></td>"); //设定
        if (ss[6] == "True") //暂停操作
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseSubUser(\"" + ss[1] + "\",false)'/></td>"); }
        else
        { Str.append("<td  ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseSubUser(\"" + ss[1] + "\",true)'/></td>"); }
        Str.append("<td   valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(286) + "'  onclick='delSubUser(\"" + ss[1] + "\")' /></td>"); //删除
        Str.append("</tr>");
    }

    return Str;
}

function sWidthHeight(width, height)
{
    var str = " style='width:" + width + "px;height:" + height + "px;font-size:9pt;";
    return str;
}

//---------------------------搜索子帐号---------------------------------
function searchSubUser() {
    var searchSubUserNameID = document.getElementById("txtSubUserNameID").value;
    if (searchSubUserNameID == "") {
        showSubUser(SubUserSS, "");
        return;
    }
    var Str = new StringBulider();
    Str.append("<table width='99%'   border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    Str.append(showSubUserHead());
    for (var i = 0; i < SubUser.length; i++) {
        var ss = SubUser[i].split('##');
        if (searchSubUserNameID == ss[1]) {
            Str.append("<tr bgcolor='#FFE3C8' style='height:25px'  onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
            Str.append("<td align='center'>" + ss[1] + "</td>"); //子帐号
            Str.append("<td align='center'>" + ss[2] + "</td>"); //bieming
            Str.append("<td>" + ss[3] + "</td>"); //最后登录日期
            Str.append("<td >" + ss[4] + "</td>"); //登记日期
            Str.append("<td >" + ss[5] + "</td>"); //最后修改日期
            //暂停
            if (ss[6] == "True")
            { Str.append("<td align='middle'>" + Text(143) + "</td>"); }
            else
            { Str.append("<td align='middle'>" + Text(141) + "</td>"); } //帐号状态
            Str.append("<td   valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='" + Text(163) + "' name='imageField22' src='../images/index_r15_c26.jpg' onclick='showEditSubUser(\"" + SubUser[i] + "\")' /></td>"); //设定
            if (ss[6] == "True") //暂停操作
            { Str.append("<td ><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/q.jpg' value='" + Text(173) + "' onclick='pauseSubUser(\"" + ss[0] + "\",false)'/></td>"); }
            else
            { Str.append("<td  valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' name='imageField22' src='../images/index_r15_c34.jpg' value='" + Text(174) + "' onclick='pauseSubUser(\"" + ss[0] + "\",true)'/></td>"); }
            Str.append("<td   valign='middle'><input type='button' style='width:40px;height:21px;font-size:9pt;vertical-align:middle;text-align:center' class='btn1' value='"+ Text(286) +"'  onclick='delSubUser(\"" + ss[1] + "\")' /></td>"); //删除
            Str.append("</tr>");
        }
    }

    Str.append("</table>");
    document.getElementById("divSub").innerHTML = Str;
}
//---------------------------新增子帐号---------------------------------
function showAddSubUser() {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            var str = new StringBulider();
            str.append("</br>");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td width='3%'>&nbsp;</td>");
            str.append("<td width='64%' align='center' valign='top'>");
            str.append("</br>");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'>");
            str.append("<tr><td align='center' valign='middle' class='font1'>" + Text(287) + "：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr>");
            str.append("</table>");
            str.append("</br>");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'>");
            if (GroupInfo[0].length <= 6) {
                str.append("<tr><td width='95' align='left' valign='middle'>" + Text(288) + "</td><td width='405' height='30' align='left' valign='middle'>&nbsp;<input type='text' style=\"width: 160px\" name='txtGroupName2' id='txtGroupName2'  />&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' id='btnValidate'    value='" + Text(184) + "' onclick='validateSubGroupNameID()' /></td></tr>");
            } else { str.append("<tr><td width='95' align='left' valign='middle'>" + Text(288) + "</td><td width='405' height='30' align='left' valign='middle'>" + GroupInfo[1].substr(0, 2) + "&nbsp;<input type='text' style=\"width: 146px\" name='textfield' id='txtGroupName2'  />&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' id='btnValidate'    value='" + Text(184) + "' onclick='validateSubGroupNameID()' /></td></tr>"); }
            str.append("<tr><td align='left' valign='middle'>" + Text(289) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='textfield2' id='txtOtherName'/></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(180) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" name='textfield3' id='txtPwd' /><span>&nbsp;&nbsp;&nbsp;" + Text(307) + "</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(181) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" name='textfield4' id='txtPwdAgain' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(172) + "：</td><td height='30' align='left' valign='middle'><table id=\"quanxian\"><tr><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox1\" value=\"0\" class=\"t\"/><label>" + Text(294) + "</label></td><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox1\" value=\"2\"  class=\"t\"/><label>"+ Text(295) +"</label></td></tr><tr><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox3\" value=\"1\" class=\"t\"/><label>"+ Text(296) +"</label></td><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox4\" value=\"3\" class=\"t\"/><label>"+ Text(297) +"</label></td></tr></table></td></tr>");
            str.append("</table>");
            str.append("</br>");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'><tr><td width='94' align='left' valign='top'><br /></td><td align='left' valign='top'><br />");
            str.append("<br /></td></tr></table>");
            str.append("<div width='100%' align='center'><table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='addSubUser()'/></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='showSubUserManage()'/></td>");
            str.append("</tr></table></div>");
            str.append("<p>&nbsp;</p></td>");
            str.append("<td>&nbsp;</td></tr></table><div>");
            document.getElementById("divSub").innerHTML = str;
        }
    }
}



//-----------------------设定子帐号------------------------------------
function showEditSubUser(StrArray) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            ClearAll();
            var subUser = StrArray.split('##');
            var str = new StringBulider();
            str.append("</br>");
            str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td width='3%'>&nbsp;</td>");
            str.append("<td width='64%' align='center' valign='top'>");
            str.append("</br>");
            str.append("<table width='500' height='22' border='0' cellpadding='0' cellspacing='0' background='../images/bg_2.jpg'>");
            str.append("<tr><td align='center' valign='middle' class='font1'>" + Text(293) + "：<span style='color:red'>" + GroupInfo[1] + "</span>&nbsp;(&nbsp;" + GroupInfo[2] + "&nbsp;)]</td></tr>");
            str.append("</table>");
            str.append("</br>");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'>");
            str.append("<tr><td width='95' align='left' valign='middle'>" + Text(288) + "</td><td width='405' height='30' align='left' valign='middle'><input type='text'style=\"width: 160px\" Disabled='Disabled'  name='textfield' id='txtName' value='" + subUser[1] + "' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(289) + "：</td><td height='30' align='left' valign='middle'><input type='text' style=\"width: 160px\" name='textfield2' id='txtOtherName' value='" + subUser[2] + "'/></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(180) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" name='textfield3' id='txtPwd' /><span >&nbsp;&nbsp;&nbsp;("+ Text(183) +"）</span></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(181) + "：</td><td height='30' align='left' valign='middle'><input type='password' style=\"width: 160px\" name='textfield4' id='txtPwdAgain' /></td></tr>");
            str.append("<tr><td align='left' valign='middle'>" + Text(172) + "：</td><td height='30' align='left' valign='middle'>" 
                + "<table id=\"quanxian\"><tr><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox1\" value=\"0\" class=\"t\"/><label>" + Text(294) + "</label></td><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox1\" value=\"2\"  class=\"t\"/><label>"+ Text(295) +"</label></td></tr><tr><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox3\" value=\"1\" class=\"t\"/><label>"+ Text(296) +"</label></td><td align=\"left\" valign=\"middle\"><input type=\"checkbox\" name=\"checkbox4\" value=\"3\" class=\"t\"/><label>"+ Text(297) +"</label></td></tr></table></td></tr>");
            str.append("</table>");
            str.append("</br>");
            str.append("<table width='600' border='0' cellspacing='0' cellpadding='0'><tr><td width='94' align='left' valign='top'><br /></td><td align='left' valign='top'><br />");
            str.append("<br /></td></tr></table>");
            str.append("<div width='100%' align='center'><table width='40%' border='0' cellspacing='0' cellpadding='0'><tr>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit' value='"+ Text(194) + "' onclick='editSubUser()'/></td>");
            str.append("<td align='center' valign='middle'><input type='reset' class='btn1' name='Submit2' value='"+ Text(195) + "' /></td>");
            str.append("<td align='center' valign='middle'><input type='button' class='btn1' name='Submit3' value='"+ Text(196) + "' onclick='showSubUserManage()'/></td>");
            str.append("</tr></table>");
            str.append("<p>&nbsp;</p></td>");
            str.append("<td>&nbsp;</td></tr></table></div>");
            document.getElementById("divSub").innerHTML = str;
            var a = document.getElementById('quanxian').getElementsByTagName("input");
            var b = subUser[7].split(',');
            if (a[0].type == "checkbox") {
                if (b[0] == 1) {
                    a[0].checked = true;
                }
            }
            if (a[1].type == "checkbox") {
                if (b[2] == 1) {
                    a[1].checked = true;
                }
            }
            if (a[2].type == "checkbox") {
                if (b[1] == 1) {
                    a[2].checked = true;
                }
            }
            if (a[3].type == "checkbox") {
                if (b[3] == 1) {
                    a[3].checked = true;
                }
            }
        }
    }
}


//#region Do not touch

function addSubUser() {
    if (GroupInfo[0].length <= 6) {
        var NameID = document.getElementById("txtGroupName2").value;
    } else { var NameID = GroupInfo[1].substr(0, 2) + document.getElementById("txtGroupName2").value; }
    var Name = document.getElementById("txtOtherName").value;
    Name = stripscript(Name);
    var Pwd = document.getElementById("txtPwd").value;
    var PwdAgain = document.getElementById("txtPwdAgain").value;
    NameID = Trim(NameID);
    if (document.getElementById("txtGroupName2").value == "") {
        alert(Text(444));
        document.getElementById("txtGroupName2").focus();
        return;
    }
    if (!checknames(NameID)) {
        alert(Text(235));
        document.getElementById("txtGroupName2").focus();
        return;
    }
    if (NameID.isInChinese()) {
        alert(Text(235));
        document.getElementById("txtGroupName2").focus();
        return;
    }
    if (NameID == "") {
        alert(Text(444));
        document.getElementById("txtGroupName2").focus();
        return;
    }
    if (Name == "") {
        alert(Text(224));
        document.getElementById("txtOtherName").focus();
        return;
    }

    Pwd = Trim(Pwd);
    if (Pwd == "") {
        alert(Text(251));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (Pwd.length < 6) {
        alert(Text(445));
        document.getElementById("txtPwd").focus();
        return;
    }
    if (PwdAgain != Pwd) {
        alert(Text(350));
        window.document.getElementById("txtPwdAgain").focus();
        return;
    }
    var a = document.getElementById('quanxian').getElementsByTagName("input");
    var len = a.length, checkboxNum = 0, checkValue = "";
    for (var i = 0; i < len; i++) {
        if ((a[i].type == "checkbox") && (a[i].checked == true)) {
            checkboxNum++;
            checkValue += a[i].value + ",";
        }
    }
    if (checkboxNum < 1) {
        alert(Text(314));
        return;
    }


    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_addSubUserComplete;
    cbo.DoCallBack(encodeURI("AjaxDb.aspx?PageName=AddSubUser&GroupID=" + GroupInfo[0] + "&NameID=" + NameID + "&Name=" + Name + "&PassWord=" + Pwd + "&checkValue=" + checkValue));
}
//验证帐户是否存在
function validateSubGroupNameID() {
    if (GroupInfo[0].length <= 6) {
        var groupNameID = document.getElementById("txtGroupName2").value;
    } else {
        var groupNameID = GroupInfo[1].substr(0, 2) + document.getElementById("txtGroupName2").value;
    }
    if (document.getElementById("txtGroupName2").value == "") {
        alert(Text(224));
        return;
    }
    if (groupNameID.isInChinese()) {
        alert(Text(235));
        return;
    }
    if (!checknames(groupNameID)) {
        alert(Text(235));
        return;
    }
    if (groupNameID.length < 6 || groupNameID.length > 9) {
        alert(Text(235));
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_validateGroupNameIDComplete;
    cbo.DoCallBack("AjaxDb.aspx?PageName=subGroupValidateNameID&GroupID=" + GroupInfo[0] + "&NameID=" + groupNameID);
}
//帐户成功处理
function Cbo_addSubUserComplete(responseText) {
    if (responseText == "10") {
        alert(Text(318));
        refreshSubUserManage();
    }
    else {
        alert("添加失败！" + falsePrompt(responseText));
    }
}

//#endregion
//#region Do not modify

function editSubUser() {
    var NameID = document.getElementById("txtName").value;
    var Name = document.getElementById("txtOtherName").value;
    Name = stripscript(Name);
    var Pwd = document.getElementById("txtPwd").value;
    var PwdAgain = document.getElementById("txtPwdAgain").value;
    Name = Trim(Name);
    if (Name == "") {
        alert(Text(220));
        document.getElementById("txtOtherName").focus();
        return;
    }

    Pwd = Trim(Pwd);
    if (PwdAgain != Pwd) {
        alert(Text(222));
        window.document.getElementById("txtPwdAgain").focus();
        return;
    }
    var a = document.getElementById('quanxian').getElementsByTagName("input");
    var len = a.length, checkboxNum = 0, checkValue = "";
    for (var i = 0; i < len; i++) {
        if ((a[i].type == "checkbox") && (a[i].checked == true)) {
            checkboxNum++;
            checkValue += a[i].value + ",";
        }
    }
    if (checkboxNum < 1) {
        alert("对不起！至少选择一个权限！");
        return;
    }
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_editSubUserComplete;
    cbo.DoCallBack(encodeURI("AjaxDb.aspx?PageName=EditSubUser&NameID=" + NameID + "&Name=" + Name + "&PassWord=" + Pwd + "&checkValue=" + checkValue));
}
//验证帐户成功处理
function Cbo_editSubUserComplete(responseText) {
    if (responseText == "10") {
        alert(Text(237));
        refreshSubUserManage();
        return;
    }
    else {
        alert(Text(298) + falsePrompt(responseText));
    }
}
//暂停子帐号
function pauseSubUser(nameID, pause) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            var message = "";
            if (pause) {
                message = Text(299);
            }
            else {
                message = Text(300);
            }
            if (confirm(message)) {
                var cbo = new CallBackObject();
                cbo.OnComplete = Cbo_pauseSubGroupComplete;
                cbo.DoCallBack("AjaxDb.aspx?PageName=SubGroupPause&NameID=" + nameID + "&Pause=" + pause);
            }
        }
    }
}
function Cbo_pauseSubGroupComplete(responseText) {
    if (responseText == "1") {
        alert(Text(249))
        refreshSubUserManage();
    }
    else {
        alert(Text(250) + falsePrompt(responseText));
    }
}
function Cbo_pauseSubGroupComplete1(responseText) {
    if (responseText == "10") {
        alert(Text(301))
        refreshSubUserManage();
    }
    else {
        alert(Text(302) + falsePrompt(responseText));
    }
}
//删除子帐号
function delSubUser(nameID) {
    if (ispause == "True") {
        alert(Text(179));
    }
    else {
        if (qx == "False") {
            alert(tsxx);
        }
        else {
            if (confirm(Text(303))) {
                var cbo = new CallBackObject();
                cbo.OnComplete = Cbo_pauseSubGroupComplete1;
                cbo.DoCallBack("AjaxDb.aspx?PageName=SubGroupDel&NameID=" + nameID);
            }
        }
    }
}
//#endregion

