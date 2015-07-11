function checknames(name) {
    var charpos = name.search("[^A-Za-z0-9]");
    if (charpos >= 0) {
        return false;
    }
    return true;
}

//修改密码
function changePwd()
{
    var oldPwd=document.getElementById("txtOldPwd").value;
    var newPwd=document.getElementById("txtPwd").value;
    var newPwdAgain=document.getElementById("txtPwdAgain").value;
    
    if(oldPwd=="")
    {
        alert(Text(51));
       return;
   }
   
    if(newPwd=="")
    {
        alert(Text(52));
       return;
    }
    if(newPwd.length<6)
    {
      alert(Text(53));
       return;
   }
   if (!checknames(newPwd)) {
       alert(Text(54));
       return;
   }
   if (newPwdAgain == "") {
       alert(Text(58));
    }
    if(newPwd !=newPwdAgain)
    {
        alert(Text(55));
       return;
    }
     var cbo = new CallBackObject();
			    cbo.OnComplete = Cbo_changePwdComplete;
    			//cbo.onError = Cbo_Error;
			    cbo.DoCallBack("AjaxDb.aspx?PageName=ChangeMyPwd&NewPwd=" + newPwd + "&OldPwd=" + oldPwd);	
}
function Cbo_changePwdComplete(responseText) {
    if (responseText == "1" || responseText == "10") {
        alert(Text(56));
        window.location = "SubGroupManage.aspx";
    }
    if (responseText == "2") {
        alert(Text(57));
        document.getElementById("txtOldPwd").values = "";
        document.getElementById("txtOldPwd").focus();
        return;
    }
}
//取消
function cancleChange()
{
  window.location="SubGroupManage.aspx";
}