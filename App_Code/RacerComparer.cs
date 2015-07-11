using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model;
using System.Configuration;
using System.IO;
using System.Net;
using System.Text;
using System.Xml;
/// <summary>
///RacerComparer 的摘要说明
/// </summary>

    public class RacerComparer
    {
        public RacerComparer()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        public int Compare(ComDeskStateInfo x, ComDeskStateInfo y)
        {
            if (x.nGameIndex == y.nGameIndex)
                return 0;
            else if (x.nGameIndex < y.nGameIndex)
                return -1;
            else
                return 1;
        }
        /// <summary>
        /// 取低位
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public static int LOWORD(int i)
        {
            return i & 0xFFFF;
        }
        /// <summary>
        /// 取高位
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public static int HIWORD(int i)
        {
            return i >> 16;
        }
        public static string bz(int id, string language)
        {
            string money = "";
            // ngdlong - Remove 
            //string str="";
            //if (language == "cn")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money"].ToString();
            //}
            //else if(language == "tw")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_tw"].ToString();
            //}
            //else if (language == "en")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_en"].ToString();
            //}
            //else
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_yn"].ToString();
            //}

            // ngdlong - Change to dynamic load connection string base on current selected language
            string str = ConfigurationManager.ConnectionStrings[Common.strMoney].ToString();
            string[] list = str.Split(';');
            if (id != 0)
            {
                money = list[id - 1];
            }
            return money;

        }
        public static string getbz(string language)
        {

            // ngdlong - Change to dynamic load string base on current selected language
            string str = ConfigurationManager.ConnectionStrings[Common.strMoney].ToString();

            // ngdlong - Remove
            //if (language == "cn")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money"].ToString();
            //}
            //else if (language == "tw")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_tw"].ToString();
            //}
            //else if (language == "en")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_en"].ToString();
            //}
            //else if (language == "yn")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_yn"].ToString();
            //}
            //else if (language == "hg")
            //{
            //    str = ConfigurationManager.ConnectionStrings["money_hg"].ToString();
            //}
            return str;
        }
        public static XmlElement getAPI(string url)
        {
            HttpWebResponse rsp = null;
            HttpWebRequest req = null;
            req = (HttpWebRequest)WebRequest.Create(new Uri(url));
            req.ContentType = "text/xml";
            req.Accept = "*/*";
            req.Timeout = 10000;//30秒连接不成功就中断 
            req.Method = "GET";
            rsp = (HttpWebResponse)req.GetResponse();
            StreamReader sr = new StreamReader(rsp.GetResponseStream(), Encoding.GetEncoding("utf-8"));
            string reValue = sr.ReadToEnd().Replace("\r\n", "").Replace("\t", "").Replace("&", "&amp;");
            sr.Close();
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(reValue);
            return xmlDoc.DocumentElement;
        }
        public static string getbzAPI(int id)
        {
            string bzValue = "RMB";
            switch (id)
            {
                case 1:
                    bzValue = "HKD";
                    break;
                case 2:
                    bzValue = "RMB";
                    break;
                case 3:
                    bzValue = "TWD";
                    break;
                case 4:
                    bzValue = "USD";
                    break;

            }
            return bzValue;
        }
    }
