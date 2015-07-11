using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using Microsoft.VisualBasic;
using System.Web.UI.HtmlControls;
using System.Text.RegularExpressions;


/// <summary>
/// Summary description for Login
/// </summary>

    public class LoginPage : Cw.PageBase.BasePage
    {

        virtual protected void Page_Load(object sender, EventArgs e)
        {
            init();
        }
        protected void init()
        {
            //
            // TODO: Add constructor logic here
            //

            string path = Server.MapPath("~/Localization/langs.csv");
            LocBuilder.Instance.SetPath(path);
            LocBuilder.Instance.LoadLanguagePackage();
            //
            string myScript;
            myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
            myScript += "var isDev = '" + Common.isDevEnv() + "'; \n";
            myScript += "window.onload = function () { ";
            if (Common.isDevEnv())
            {
                myScript += "document.getElementById('txt_username').value = '" + Common.acc_dev + "'; ";
                myScript += "document.getElementById('tipLogPwd').value = '" + Common.password + "'; ";
                myScript += "document.getElementById('Button2').click() } ";
            }
            myScript += "\n\n </script>";
            Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
        }

        public static bool IsIPAddress(string str1)
        {
            if (str1 == null || str1 == string.Empty || str1.Length < 7 || str1.Length > 15) return false;
            string regformat = @"^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$";
            Regex regex = new Regex(regformat, RegexOptions.IgnoreCase);
            return regex.IsMatch(str1);
        }

        public void onChangeLanguage(object Source, EventArgs e)
        {
            HtmlContainerControl sender = (HtmlContainerControl)Source;

            string selectedLanguage = sender.InnerText;
            switch (selectedLanguage)
            {
                case "简体": // chinese simple
                    {
                        Common.langID = 3;
                        break;
                    }
                case "繁體": // chinese
                    {
                        Common.langID = 4;
                        Common.strGroupLevleName = "GroupLevleName";
                        Common.strMoney = "money";
                        Common.imgPrefix = "";
                        break;
                    }
                case "English":
                    {
                        Common.langID = 5;
                        Common.strGroupLevleName = "GroupLevleName_en";
                        Common.strMoney = "money_en";
                        Common.imgPrefix = "_en";
                        break;
                    }
                case "Việt Nam": //vietnamese
                    {
                        Common.langID = 6;
                        Common.strGroupLevleName = "GroupLevleName_yn";
                        Common.strMoney = "money_yn";
                        Common.imgPrefix = "_yn";
                        break;
                    }
                case "한국어": // korea??
                    {
                        Common.langID = 7;
                        break;
                    }
            }
            Response.Redirect(Request.RawUrl);
        }
        public static string IPAddress
        {
            get
            {
                string result = String.Empty;
                result = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (result != null && result != String.Empty)
                {
                    //可能有代理 
                    if (result.IndexOf(".") == -1)    //没有“.”肯定是非IPv4格式 
                        result = null;
                    else
                    {
                        if (result.IndexOf(",") != -1)
                        {
                            //有“,”，估计多个代理。取第一个不是内网的IP。 
                            result = result.Replace(" ", "").Replace("'", "");
                            string[] temparyip = result.Split(",;".ToCharArray());
                            for (int i = 0; i < temparyip.Length; i++)
                            {
                                if (IsIPAddress(temparyip[i])
                                    && temparyip[i].Substring(0, 3) != "10."
                                    && temparyip[i].Substring(0, 7) != "192.168"
                                    && temparyip[i].Substring(0, 7) != "172.16.")
                                {
                                    return temparyip[i];    //找到不是内网的地址 
                                }
                            }
                        }
                        else if (IsIPAddress(result)) //代理即是IP格式 
                            return result;
                        else
                            result = null;    //代理中的内容 非IP，取IP 
                    }
                }
                string IpAddress = (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null && HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != String.Empty) ? HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] : HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];

                if (null == result || result == String.Empty)
                    result = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                if (result == null || result == String.Empty)
                    result = HttpContext.Current.Request.UserHostAddress;
                return result;
            }
        }
    }
