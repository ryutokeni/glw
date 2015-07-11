using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.XPath;


    public class LOC
    {
        public string Description
        {
            get;
            set;
        }
        public int ID
        {
            get;
            set;
        }
        public LOC(string description, int id)
        {
            this.Description = description;
            this.ID = id;
        }
    }

    /// <summary>
    /// Summary description for Common
    /// </summary>
    /// 
    public class Common
    {
        public enum GameType { bac = 1, bactel, dt, sb, bacins };
        public enum State { open = 0, bet = 2, stop = 3, cal = 6 };// cal= calculate
        public enum Lang { cn = 1, en, hg, tw, yn };
        public enum UserStatus { offline = 0, online }
        public const String CARD_CREDIT_URL = "http://localhost/api.aspx?secret="; //hapi.bm.1sgames.com;
        const int EVN = 0;// 0:dev, 1:relese 
        public const string acc_dev = "ROOT";
        public const string password = "123456";
        public static int langID = 4;
        public static string strGroupLevleName = "GroupLevleName";
        public static string strMoney = "money";
        public static string imgPrefix = "";


        public static bool isDevEnv()
        {
            return EVN == 1;
        }



        public static String getGameTypeByGameIndex(int gameIndex)
        {
            String gameType = "";
            if (gameIndex > 0 && gameIndex < 10)
            {
                gameType = GameType.bac.ToString();
            }
            else if (gameIndex > 10 && gameIndex < 20)
            {
                gameType = GameType.bactel.ToString();
            }
            else if (gameIndex > 20 && gameIndex < 30)
            {
                gameType = GameType.dt.ToString();
            }
            else if (gameIndex > 50 && gameIndex < 60)
            {
                gameType = GameType.sb.ToString();
            }
            else if (gameIndex > 70 && gameIndex < 80)
            {
                gameType = GameType.bacins.ToString();
            }
            return gameType;
        }

        public static int getIndexGameByGameIndex(int gameIndex)
        {
            int idx = 0;
            if (gameIndex > 0 && gameIndex < 10)
            {
                idx = gameIndex;
            }
            else if (gameIndex > 10 && gameIndex < 20)
            {
                idx = gameIndex - 10;
            }
            else if (gameIndex > 20 && gameIndex < 30)
            {
                idx = gameIndex - 20;
            }
            else if (gameIndex > 50 && gameIndex < 60)
            {
                idx = gameIndex - 50;
            }
            else if (gameIndex > 70 && gameIndex < 80)
            {
                idx = gameIndex - 70;
            }
            return idx;
        }

        public static String GetLangPrefix()
        {
            string prefix = "";

            switch (Common.langID)
            {
                case 3:
                    prefix = "";
                    break;
                case 4:
                    prefix = "cn";
                    break;
                case 5:
                    prefix = "en";
                    break;
                case 6:
                    prefix = "yn";
                    break;
                case 7:
                    prefix = "";
                    break;
                default:
                    prefix = "";
                    break;
            }

            return prefix;
        }

        public static String getGameNameByGameIndex(int gameIndex, string lang)
        {
            lang = GetLangPrefix();
            String gameType = getGameTypeByGameIndex(gameIndex);
            if (gameType != "")
            {
                XmlDocument doc = new XmlDocument();
                string XmlPath = HttpContext.Current.Server.MapPath("~/language.xml");
                doc.Load(XmlPath);
                string xpath = string.Format(@"//langconfig/lang[@id=""{0}""]/gamenames/game[@type=""{1}""]/@value", lang, gameType);
                //string xpath = string.Format("//langconfig/lang[@id={0}]/gamenames/game[@type={1}]", lang, gameType);
                XmlNode ressult = doc.SelectSingleNode(xpath);
                string prefixName = ressult.Value;
                return prefixName + getIndexGameByGameIndex(gameIndex);
            }
            return "Unknow";
        }
        public static String getGameStateName(int state, string lang)
        {
            lang = GetLangPrefix();
            XmlDocument doc = new XmlDocument();
            string XmlPath = HttpContext.Current.Server.MapPath("~/language.xml");
            doc.Load(XmlPath);
            string xpath = string.Format(@"//langconfig/lang[@id=""{0}""]/gamestates/state[@type=""{1}""]/@value", lang, state);
            XmlNode ressult = doc.SelectSingleNode(xpath);
            return ressult.Value;
        }
        public static String getUserStatus(int type, string lang)
        {
            lang = GetLangPrefix();
            XmlDocument doc = new XmlDocument();
            string XmlPath = HttpContext.Current.Server.MapPath("~/language.xml");
            doc.Load(XmlPath);
            string xpath = string.Format(@"//langconfig/lang[@id=""{0}""]/userstatus/status[@type=""{1}""]/@value", lang, type);
            XmlNode ressult = doc.SelectSingleNode(xpath);
            return ressult.Value;
        }
        ////////////////////////////////bettpe///////////////////
        public static string bindBetType(int BetType)//百家乐投注类型
        {
            string bettype = "";
            switch (BetType)
            {
                case 1:
                    bettype = "Player";
                    break;
                case 2:
                    bettype = "Tie";
                    break;
                case 3:
                    bettype = "Banker";
                    break;
                case 4:
                    bettype = "P.Pair";
                    break;
                case 5:
                    bettype = "B.Pair";
                    break;
                case 6:
                    bettype = "Big";
                    break;
                case 7:
                    bettype = "Small";
                    break;
                case 8:
                    bettype = "PlayerOdd";
                    break;
                case 9:
                    bettype = "PlayerEven ";
                    break;
                case 10:
                    bettype = "BankerOdd";
                    break;
                case 11:
                    bettype = "BankerEven ";
                    break;
                case 12:
                    bettype = "庄保险(p)";
                    break;
                case 13:
                    bettype = "庄保险(b)";
                    break;
                case 14:
                    bettype = "闲保险";
                    break;
                default:
                    break;

            }
            return bettype;

        }
        public static string bindBetTypelh(int BetType)//龙虎投注类型
        {
            string bettype = "";
            switch (BetType)
            {
                case 1:
                    bettype = "Tiger";
                    break;
                case 2:
                    bettype = "Tie";
                    break;
                case 3:
                    bettype = "Dragon";
                    break;
                default:
                    break;

            }
            return bettype;

        }
        public static string bindBetTypenn(int BetType)//牛牛投注类型
        {
            string bettype = "";
            switch (BetType)
            {
                case 1:
                    bettype = "Cow";
                    break;
                case 2:
                    bettype = "Tie";
                    break;
                case 3:
                    bettype = "Matador";
                    break;
                default:
                    break;

            }
            return bettype;

        }
        public static string bindBetTypeft(string BetType)//ft投注类型
        {
            string bettype = "";
            switch (BetType)
            {
                case "0":
                    bettype = "";
                    break;
                case "1":
                    bettype = "1";
                    break;
                case "2":
                    bettype = "2";
                    break;
                case "3":
                    bettype = "3";
                    break;
                case "4":
                    bettype = "4";
                    break;
                case "5":
                    bettype = "1N2";
                    break;
                case "6":
                    bettype = "1N3";
                    break;
                case "7":
                    bettype = "1N4";
                    break;
                case "8":
                    bettype = "2N1";
                    break;
                case "9":
                    bettype = "2N3";
                    break;
                case "10":
                    bettype = "2N4";
                    break;
                case "11":
                    bettype = "3N1";
                    break;
                case "12":
                    bettype = "3N2";
                    break;
                case "13":
                    bettype = "3N4";
                    break;
                case "14":
                    bettype = "4N1";
                    break;
                case "15":
                    bettype = "4N2";
                    break;
                case "16":
                    bettype = "4N3";
                    break;
                case "17":
                    bettype = "12";
                    break;
                case "18":
                    bettype = "23";
                    break;
                case "19":
                    bettype = "34";
                    break;
                case "20":
                    bettype = "41";
                    break;
                case "21":
                    bettype = "13";
                    break;
                case "22":
                    bettype = "24";
                    break;
                case "23":
                    bettype = "123";
                    break;
                case "24":
                    bettype = "124";
                    break;
                case "25":
                    bettype = "134";
                    break;
                case "26":
                    bettype = "234";
                    break;
                case "27":
                    bettype = "23T1";
                    break;
                case "28":
                    bettype = "24T1";
                    break;
                case "29":
                    bettype = "34T1";
                    break;
                case "30":
                    bettype = "13T2";
                    break;
                case "31":
                    bettype = "14T2";
                    break;
                case "32":
                    bettype = "34T2";
                    break;
                case "33":
                    bettype = "12T3";
                    break;
                case "34":
                    bettype = "14T3";
                    break;
                case "35":
                    bettype = "24T3";
                    break;
                case "36":
                    bettype = "12T4";
                    break;
                case "37":
                    bettype = "13T4";
                    break;
                case "38":
                    bettype = "23T4";
                    break;
                default:
                    break;

            }
            return bettype;

        }
        public static string bindBetTypelp(string BetType)//轮盘投注类型
        {
            string bettype = "";
            switch (BetType)
            {
                case "0":
                    bettype = "0";
                    break;
                case "1":
                    bettype = "1";
                    break;
                case "2":
                    bettype = "2";
                    break;
                case "3":
                    bettype = "3";
                    break;
                case "4":
                    bettype = "4";
                    break;
                case "5":
                    bettype = "5";
                    break;
                case "6":
                    bettype = "6";
                    break;
                case "7":
                    bettype = "7";
                    break;
                case "8":
                    bettype = "8";
                    break;
                case "9":
                    bettype = "9";
                    break;
                case "10":
                    bettype = "10";
                    break;
                case "11":
                    bettype = "11";
                    break;
                case "12":
                    bettype = "12";
                    break;
                case "13":
                    bettype = "13";
                    break;
                case "14":
                    bettype = "14";
                    break;
                case "15":
                    bettype = "15";
                    break;
                case "16":
                    bettype = "16";
                    break;
                case "17":
                    bettype = "17";
                    break;
                case "18":
                    bettype = "18";
                    break;
                case "19":
                    bettype = "19";
                    break;
                case "20":
                    bettype = "20";
                    break;
                case "21":
                    bettype = "21";
                    break;
                case "22":
                    bettype = "22";
                    break;
                case "23":
                    bettype = "23";
                    break;
                case "24":
                    bettype = "24";
                    break;
                case "25":
                    bettype = "25";
                    break;
                case "26":
                    bettype = "26";
                    break;
                case "27":
                    bettype = "27";
                    break;
                case "28":
                    bettype = "28";
                    break;
                case "29":
                    bettype = "29";
                    break;
                case "30":
                    bettype = "30";
                    break;
                case "31":
                    bettype = "31";
                    break;
                case "32":
                    bettype = "32";
                    break;
                case "33":
                    bettype = "33";
                    break;
                case "34":
                    bettype = "34";
                    break;
                case "35":
                    bettype = "35";
                    break;
                case "36":
                    bettype = "36";
                    break;
                case "37":
                    bettype = "行1";
                    break;
                case "38":
                    bettype = "行2";
                    break;
                case "39":
                    bettype = "行3";
                    break;
                case "40":
                    bettype = "组1";
                    break;
                case "41":
                    bettype = "组2";
                    break;
                case "42":
                    bettype = "组3";
                    break;
                case "43":
                    bettype = "Small";
                    break;
                case "44":
                    bettype = "Big";
                    break;
                case "45":
                    bettype = "Single";
                    break;
                case "46":
                    bettype = "Pair";
                    break;
                case "47":
                    bettype = "red";
                    break;
                case "48":
                    bettype = "black";
                    break;
                case "49":
                    bettype = "0,1";
                    break;
                case "50":
                    bettype = "0,2";
                    break;
                case "51":
                    bettype = "0,3";
                    break;
                case "53":
                    bettype = "1-6";
                    break;
                case "54":
                    bettype = "1,2,4,5";
                    break;
                case "55":
                    bettype = "2,3,5,6";
                    break;
                case "56":
                    bettype = "4-9";
                    break;
                case "57":
                    bettype = "4,5,7,8";
                    break;
                case "58":
                    bettype = "6,7,8,9";
                    break;
                case "59":
                    bettype = "7-12";
                    break;
                case "60":
                    bettype = "7,8,10,11";
                    break;
                case "61":
                    bettype = "8,9,11,12";
                    break;
                case "62":
                    bettype = "10-15";
                    break;
                case "63":
                    bettype = "10,11,13,14";
                    break;
                case "64":
                    bettype = "11,12,14,15";
                    break;
                case "65":
                    bettype = "13-18";
                    break;
                case "66":
                    bettype = "13,14,16,17";
                    break;
                case "67":
                    bettype = "14,15,17,18";
                    break;
                case "68":
                    bettype = "16-21";
                    break;
                case "69":
                    bettype = "16,17,19,20";
                    break;
                case "70":
                    bettype = "17,18,20,21";
                    break;
                case "71":
                    bettype = "19-24";
                    break;
                case "72":
                    bettype = "19,20,22,23";
                    break;
                case "73":
                    bettype = "20,21,23,24";
                    break;
                case "74":
                    bettype = "22-27";
                    break;
                case "75":
                    bettype = "22,23,25,26";
                    break;
                case "76":
                    bettype = "23,24,26,27";
                    break;
                case "77":
                    bettype = "25-30";
                    break;
                case "78":
                    bettype = "25,26,28,29";
                    break;
                case "79":
                    bettype = "26,27,29,30";
                    break;
                case "80":
                    bettype = "28-33";
                    break;
                case "81":
                    bettype = "28,29,31,32";
                    break;
                case "82":
                    bettype = "29,30,32,33";
                    break;
                case "83":
                    bettype = "31-36";
                    break;
                case "84":
                    bettype = "31,32,34,35";
                    break;
                case "85":
                    bettype = "32,33,35,36";
                    break;
                case "86":
                    bettype = "0,1,2,3";
                    break;
                case "87":
                    bettype = "0,1,2";
                    break;
                case "88":
                    bettype = "0,2,3";
                    break;
                case "90":
                    bettype = "1,2,3";
                    break;
                case "91":
                    bettype = "1,2";
                    break;
                case "92":
                    bettype = "2,3";
                    break;
                case "93":
                    bettype = "4,5,6";
                    break;
                case "94":
                    bettype = "4,5";
                    break;
                case "95":
                    bettype = "5,6";
                    break;
                case "96":
                    bettype = "7,8,9";
                    break;
                case "97":
                    bettype = "7,8";
                    break;
                case "98":
                    bettype = "8,9";
                    break;
                case "99":
                    bettype = "10,11,12";
                    break;
                case "100":
                    bettype = "10,11";
                    break;
                case "101":
                    bettype = "11,12";
                    break;
                case "102":
                    bettype = "13,14,15";
                    break;
                case "103":
                    bettype = "13,14";
                    break;
                case "104":
                    bettype = "14,15";
                    break;
                case "105":
                    bettype = "16,17,18";
                    break;
                case "106":
                    bettype = "16,17";
                    break;
                case "107":
                    bettype = "17,18";
                    break;
                case "108":
                    bettype = "19,20,21";
                    break;
                case "109":
                    bettype = "19,20";
                    break;
                case "110":
                    bettype = "20,21";
                    break;
                case "111":
                    bettype = "22,23,24";
                    break;
                case "112":
                    bettype = "22,23";
                    break;
                case "113":
                    bettype = "23,24";
                    break;
                case "114":
                    bettype = "25,26,27";
                    break;
                case "115":
                    bettype = "25,26";
                    break;
                case "116":
                    bettype = "26,27";
                    break;
                case "117":
                    bettype = "28,29,30";
                    break;
                case "118":
                    bettype = "28,29";
                    break;
                case "119":
                    bettype = "29,30";
                    break;
                case "120":
                    bettype = "31,32,33";
                    break;
                case "121":
                    bettype = "31,32";
                    break;
                case "122":
                    bettype = "32,33";
                    break;
                case "123":
                    bettype = "34,35,36";
                    break;
                case "124":
                    bettype = "34,35";
                    break;
                case "125":
                    bettype = "35,36";
                    break;
                case "130":
                    bettype = "1,4";
                    break;
                case "131":
                    bettype = "2,5";
                    break;
                case "132":
                    bettype = "3,6";
                    break;
                case "133":
                    bettype = "4,7";
                    break;
                case "134":
                    bettype = "5,8";
                    break;
                case "135":
                    bettype = "6,9";
                    break;
                case "136":
                    bettype = "7,10";
                    break;
                case "137":
                    bettype = "8,11";
                    break;
                case "138":
                    bettype = "9,12";
                    break;
                case "139":
                    bettype = "10,13";
                    break;
                case "140":
                    bettype = "11,14";
                    break;
                case "141":
                    bettype = "12,15";
                    break;
                case "142":
                    bettype = "13,16";
                    break;
                case "143":
                    bettype = "14,17";
                    break;
                case "144":
                    bettype = "15,18";
                    break;
                case "145":
                    bettype = "16,19";
                    break;
                case "146":
                    bettype = "17,20";
                    break;
                case "147":
                    bettype = "18,21";
                    break;
                case "148":
                    bettype = "19,22";
                    break;
                case "149":
                    bettype = "20,23";
                    break;
                case "150":
                    bettype = "21,24";
                    break;
                case "151":
                    bettype = "22,25";
                    break;
                case "152":
                    bettype = "23,26";
                    break;
                case "153":
                    bettype = "24,27";
                    break;
                case "154":
                    bettype = "25,28";
                    break;
                case "155":
                    bettype = "26,29";
                    break;
                case "156":
                    bettype = "27,30";
                    break;
                case "157":
                    bettype = "28,31";
                    break;
                case "158":
                    bettype = "29,32";
                    break;
                case "159":
                    bettype = "30,33";
                    break;
                case "160":
                    bettype = "31,34";
                    break;
                case "161":
                    bettype = "32,35";
                    break;
                case "162":
                    bettype = "33,36";
                    break;
                default:
                    break;

            }
            return bettype;

        }
        public static string bindBetTypesb(string BetType)//牛牛投注类型
        {
            string bettype = "";
            switch (BetType)
            {
                case "0":
                    bettype = "";
                    break;
                case "1":
                    bettype = "111";
                    break;
                case "2":
                    bettype = "222";
                    break;
                case "3":
                    bettype = "333";
                    break;
                case "4":
                    bettype = "444";
                    break;
                case "5":
                    bettype = "555";
                    break;
                case "6":
                    bettype = "666";
                    break;
                case "7":
                    bettype = "Triple";
                    break;
                case "8":
                    bettype = "011";
                    break;
                case "9":
                    bettype = "022";
                    break;
                case "10":
                    bettype = "033";
                    break;
                case "11":
                    bettype = "044";
                    break;
                case "12":
                    bettype = "055";
                    break;
                case "13":
                    bettype = "066";
                    break;
                case "14":
                    bettype = "4";
                    break;
                case "15":
                    bettype = "5";
                    break;
                case "16":
                    bettype = "6";
                    break;
                case "17":
                    bettype = "7";
                    break;
                case "18":
                    bettype = "8";
                    break;
                case "19":
                    bettype = "9";
                    break;
                case "20":
                    bettype = "10";
                    break;
                case "21":
                    bettype = "11";
                    break;
                case "22":
                    bettype = "12";
                    break;
                case "23":
                    bettype = "13";
                    break;
                case "24":
                    bettype = "14";
                    break;
                case "25":
                    bettype = "15";
                    break;
                case "26":
                    bettype = "16";
                    break;
                case "27":
                    bettype = "17";
                    break;
                case "28":
                    bettype = "012";
                    break;
                case "29":
                    bettype = "013";
                    break;
                case "30":
                    bettype = "014";
                    break;
                case "31":
                    bettype = "015";
                    break;
                case "32":
                    bettype = "016";
                    break;
                case "33":
                    bettype = "023";
                    break;
                case "34":
                    bettype = "024";
                    break;
                case "35":
                    bettype = "025";
                    break;
                case "36":
                    bettype = "026";
                    break;
                case "37":
                    bettype = "034";
                    break;
                case "38":
                    bettype = "035";
                    break;
                case "39":
                    bettype = "036";
                    break;
                case "40":
                    bettype = "045";
                    break;
                case "41":
                    bettype = "046";
                    break;
                case "42":
                    bettype = "056";
                    break;
                case "43":
                    bettype = "001";
                    break;
                case "44":
                    bettype = "002";
                    break;
                case "45":
                    bettype = "003";
                    break;
                case "46":
                    bettype = "004";
                    break;
                case "47":
                    bettype = "005";
                    break;
                case "48":
                    bettype = "006";
                    break;
                case "49":
                    bettype = "Small";
                    break;
                case "50":
                    bettype = "Big";
                    break;
                case "51":
                    bettype = "Single";
                    break;
                case "52":
                    bettype = "Pair";
                    break;
                default:
                    break;

            }
            return bettype;

        }
    }
