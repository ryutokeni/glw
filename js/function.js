var prefix;
var suffix;

function TextWidth(width, data) {
    var finalText;
    var prefixText = "<td width='" + width + "px' align='center' valign='middle' background='../images/tabbg.jpg'>";
    var suffixText = "</td>";

    finalText = prefixText + data + suffixText;

    return finalText;
}

function TextWith(data) {
    var finalText;

    finalText = prefix + data + suffix;

    return finalText;
}


function StringBulider() {
    this._strings = [];
    if (arguments.length == 1) {
        this._strings.push(arguments[0]);
    }
} window.frames[0]

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

/* 删除后几位字符 */
StringBulider.prototype.del = function (num) {
    var len = this.length();
    var str = this.toString();
    str = str.slice(0, len - num);
    this._strings = [];
    this._strings.push(str);
}


function EgameType(type) {
    switch (type) {
        case "EAA":
            return "Games - Caribbean Stud";
        case "EAB":
            return "Games - Caribbean Stud Jackpot";
        case "EAC":
            return "Games - Slot06";
        case "EAD":
            return "Games - Slot06 Jackpot";
        case "EAE":
            return "Games - Joker Poker";
        case "EAF":
            return "Games - Joker Poker Jackpot";
        case "EAG":
            return "Games - Slot 5";
        case "EAH":
            return "Games - Slot 5 Jackpot";
        case "EAM":
            return "Games - Virtual";
        case "EAN":
            return "Games - Virtual Jackpot";
        case "EAR":
            return "Games - CasinoHoldem";
        case "EAS":
            return "Games - CasinoHoldem Jackpot";
        case "EAT":
            return "Games - Virtual Horse";
        case "EAU":
            return "Games - Virtual Dog";
        case "EAV":
            return "Games - Virtual Football";
        case "EAW":
            return "Games - Virtual Motors";
        case "EAX":
            return "Games - Slot 7";
        case "EAY":
            return "Games - Slot 7 Jackpot";
        case "EBC":
            return "Games - Baccarat";
        case "EBJ":
            return "Games - BlackJack";
        case "ECG":
            return "Games - Baccarat Squeeze";
        case "ECH":
            return "Games - Baccarat Squeeze Jackpot";
        case "ELA":
            return "Games - Live Baccarat";
        case "ERL":
            return "Games - Roulette";
        case "ES1":
            return "Games - Slot 1";
        case "EU1":
            return "Games - Slot 1 Jackpot";
        case "ES2":
            return "Games - Slot 2";
        case "EU2":
            return "Games - Slot 2 Jackpot";
        case "ES3":
            return "Games - Slot 3";
        case "EU3":
            return "Games - Slot 3 Jackpot";
        case "ESB":
            return "Games - Sic Bo";
        case "EVP":
            return "Games - Video Poker";
        case "EV1":
            return "Games - Video Poker Jackpot";




    }
}

function betType(bet) {
    switch (bet) {
        case "1":
            return Text(362);
        case "2":
            return Text(363);
        case "3":
            return Text(364);
        case "4":
            return Text(365);
        case "5":
            return Text(366);
        case "6":
            return Text(367);
        case "7":
            return Text(368);
        case "8":
            return Text(369);
        case "9":
            return Text(370);
        case "10":
            return Text(371);
        case "11":
            return Text(372);
        case "12":
            return Text(340);
        case "13":
            return Text(341);
        case "14":
            return "闲保险";
        default:
            return "";

    }
}
function betTypeLh(bet) {
    switch (bet) {
        case "1":
            return Text(373);
        case "2":
            return Text(374);
        case "3":
            return Text(375);
        default:
            return "";
    }

}
function betTypenn(bet) {
    switch (bet) {
        case "1":
            return Text(376);
        case "2":
            return Text(363);
        case "3":
            return Text(377);
        default:
            return "";
    }

}
function game(type) {
    switch (type) {
        case "95":
            return Text(378);
        case "30":
            return Text(379);
        case "29":
            return Text(380);
        case "28":
            return Text(381);
        case "27":
            return Text(382);
        case "26":
            return Text(383);
        case "25":
            return Text(384);
        case "23":
            return Text(385);
        case "101":
            return Text(386);
    }
}
function gameType(type) {

    var str;
    // Baccarat hanlder
    if (type >= 1 && type <= 20) {
        str = Text(378) + GetNumberText(type);
        return str;
    } else if (type >= 21 && type <= 30) {
        str = Text(379) + GetNumberText(type - 20);
        return str;
    } else if (type >= 31 && type <= 40) {
        str = Text(380) + GetNumberText(type - 30);
        return str;
    } else if (type >= 41 && type <= 50) {
        str = Text(381) + GetNumberText(type - 40);
        return str;
    } else if (type >= 51 && type <= 60) {
        str = Text(382) + GetNumberText(type - 50);
        return str;
    }

    switch (type) {
//        case "0":
//            return "";
//        case "1":
//            return "百家乐一";
//        case "2":
//            return "百家乐二";
//        case "3":
//            return "百家乐三";
//        case "4":
//            return "百家乐四";
//        case "5":
//            return "百家乐五";
//        case "6":
//            return "百家乐六";
//        case "7":
//            return "百家乐七";
//        case "8":
//            return "百家乐八";
//        case "9":
//            return "百家乐九";
//        case "10":
//            return "百家乐十";
//        case "11":
//            return "百家乐十一";
//        case "12":
//            return "百家乐十二";
//        case "13":
//            return "百家乐十三";
//        case "14":
//            return "百家乐十四";
//        case "15":
//            return "百家乐十五";
//        case "16":
//            return "百家乐十六";
//        case "17":
//            return "百家乐十七";
//        case "18":
//            return "百家乐十八";
//        case "19":
//            return "百家乐十九";
//        case "20":
//            return "百家乐二十";
//        case "21":
//            return "龙虎一";
//        case "22":
//            return "龙虎二";
//        case "23":
//            return "龙虎三";
//        case "24":
//            return "龙虎四";
//        case "25":
//            return "龙虎五";
//        case "26":
//            return "龙虎六";
//        case "27":
//            return "龙虎七";
//        case "28":
//            return "龙虎八";
//        case "29":
//            return "龙虎九";
//        case "30":
//            return "龙虎十";
//        case "31":
//            return "牛牛一";
//        case "32":
//            return "牛牛二";
//        case "33":
//            return "牛牛三";
//        case "34":
//            return "牛牛四";
//        case "35":
//            return "牛牛五";
//        case "36":
//            return "牛牛六";
//        case "37":
//            return "牛牛七";
//        case "38":
//            return "牛牛八";
//        case "39":
//            return "牛牛九";
//        case "40":
//            return "牛牛十";
//        case "41":
//            return "轮盘一";
//        case "42":
//            return "轮盘二";
//        case "43":
//            return "轮盘三";
//        case "44":
//            return "轮盘四";
//        case "45":
//            return "轮盘五";
//        case "46":
//            return "轮盘六";
//        case "47":
//            return "轮盘七";
//        case "48":
//            return "轮盘八";
//        case "49":
//            return "轮盘九";
//        case "50":
//            return "轮盘十";
//        case "51":
//            return "骰宝一";
//        case "52":
//            return "骰宝二";
//        case "53":
//            return "骰宝三";
//        case "54":
//            return "骰宝四";
//        case "55":
//            return "骰宝五";
//        case "56":
//            return "骰宝六";
//        case "57":
//            return "骰宝七";
//        case "58":
//            return "骰宝八";
//        case "59":
//            return "骰宝九";
//        case "60":
//            return "骰宝十";
        case "61":
            return (Text(383) + GetNumberText(1));
        case "71":
        	return Text(384);
        case "91":
        	return Text(385); 
        case "101": 
            return Text(386); 
        default:
            return "";

    }
}

function GetNumberText(number){
    var startID = 387;
    var textStr = Text(startID + number - 1);
    return textStr;
}

function playType(type) {
    switch (type) {
        case "0":
            return Text(407);
        case "1":
            return Text(408);
        case "2":
            return Text(409);
        case "3":
            return Text(410);
        case "4":
            return Text(411);
        case "5":
            return Text(412);
    }
}
//电子游戏类型
function EgamePlayType(type) {
    switch (type) {
        case "2":
            return Text(411);
        case "3":
            return Text(412);

    }
}
//轮盘押码区
function lptype(type) {
    switch (type) {
        case "0":
            return "0";
        case "1":
            return "1";
        case "2":
            return "2";
        case "3":
            return "3";
        case "4":
            return "4";
        case "5":
            return "5";
        case "6":
            return "6";
        case "7":
            return "7";
        case "8":
            return "8";
        case "9":
            return "9";
        case "10":
            return "10";
        case "11":
            return "11";
        case "12":
            return "12";
        case "13":
            return "13";
        case "14":
            return "14";
        case "15":
            return "15";
        case "16":
            return "16";
        case "17":
            return "17";
        case "18":
            return "18";
        case "19":
            return "19";
        case "20":
            return "20";
        case "21":
            return "21";
        case "22":
            return "22";
        case "23":
            return "23";
        case "24":
            return "24";
        case "25":
            return "25";
        case "26":
            return "26";
        case "27":
            return "27";
        case "28":
            return "28";
        case "29":
            return "29";
        case "30":
            return "30";
        case "31":
            return "31";
        case "32":
            return "32";
        case "33":
            return "33";
        case "34":
            return "34";
        case "35":
            return "35";
        case "36":
            return "36";
        case "37":
            return Text(345) + "1";
        case "38":
            return Text(345) + "2";
        case "39":
            return Text(345) + "3";
        case "40":
            return Text(346) + "1";
        case "41":
            return Text(346) + "2";
        case "42":
            return Text(346) + "3";
        case "43":
            return Text(368);
        case "44":
            return Text(367);
        case "45":
            return Text(347);
        case "46":
            return Text(348);
        case "47":
            return Text(349);
        case "48":
            return Text(350);
        case "49":
            return "0,1";
        case "50":
            return "0,2";
        case "51":
            return "0,3";
        case "53":
            return "1-6";
        case "54":
            return "1,2,4,5";
        case "55":
            return "2,3,5,6";
        case "56":
            return "4-9";
        case "57":
            return "4,5,7,8";
        case "58":
            return "6,7,8,9";
        case "59":
            return "7-12";
        case "60":
            return "7,8,10,11";
        case "61":
            return "8,9,11,12";
        case "62":
            return "10-15";
        case "63":
            return "10,11,13,14";
        case "64":
            return "11,12,14,15";
        case "65":
            return "13-18";
        case "66":
            return "13,14,16,17";
        case "67":
            return "14,15,17,18";
        case "68":
            return "16-21";
        case "69":
            return "16,17,19,20";
        case "70":
            return "17,18,20,21";
        case "71":
            return "19-24";
        case "72":
            return "19,20,22,23";
        case "73":
            return "20,21,23,24";
        case "74":
            return "22-27";
        case "75":
            return "22,23,25,26";
        case "76":
            return "23,24,26,27";
        case "77":
            return "25-30";
        case "78":
            return "25,26,28,29";
        case "79":
            return "26,27,29,30";
        case "80":
            return "28-33";
        case "81":
            return "28,29,31,32";
        case "82":
            return "29,30,32,33";
        case "83":
            return "31-36";
        case "84":
            return "31,32,34,35";
        case "85":
            return "32,33,35,36";
        case "86":
            return "0,1,2,3";
        case "87":
            return "0,1,2";
        case "88":
            return "0,2,3";
        case "90":
            return "1,2,3";
        case "91":
            return "1,2";
        case "92":
            return "2,3";
        case "93":
            return "4,5,6";
        case "94":
            return "4,5";
        case "95":
            return "5,6";
        case "96":
            return "7,8,9";
        case "97":
            return "7,8";
        case "98":
            return "8,9";
        case "99":
            return "10,11,12";
        case "100":
            return "10,11";
        case "101":
            return "11,12";
        case "102":
            return "13,14,15";
        case "103":
            return "13,14";
        case "104":
            return "14,15";
        case "105":
            return "16,17,18";
        case "106":
            return "16,17";
        case "107":
            return "17,18";
        case "108":
            return "19,20,21";
        case "109":
            return "19,20";
        case "110":
            return "20,21";
        case "111":
            return "22,23,24";
        case "112":
            return "22,23";
        case "113":
            return "23,24";
        case "114":
            return "25,26,27";
        case "115":
            return "25,26";
        case "116":
            return "26,27";
        case "117":
            return "28,29,30";
        case "118":
            return "28,29";
        case "119":
            return "29,30";
        case "120":
            return "31,32,33";
        case "121":
            return "31,32";
        case "122":
            return "32,33";
        case "123":
            return "34,35,36";
        case "124":
            return "34,35";
        case "125":
            return "35,36";
        case "130":
            return "1,4";
        case "131":
            return "2,5";
        case "132":
            return "3,6";
        case "133":
            return "4,7";
        case "134":
            return "5,8";
        case "135":
            return "6,9";
        case "136":
            return "7,10";
        case "137":
            return "8,11";
        case "138":
            return "9,12";
        case "139":
            return "10,13";
        case "140":
            return "11,14";
        case "141":
            return "12,15";
        case "142":
            return "13,16";
        case "143":
            return "14,17";
        case "144":
            return "15,18";
        case "145":
            return "16,19";
        case "146":
            return "17,20";
        case "147":
            return "18,21";
        case "148":
            return "19,22";
        case "149":
            return "20,23";
        case "150":
            return "21,24";
        case "151":
            return "22,25";
        case "152":
            return "23,26";
        case "153":
            return "24,27";
        case "154":
            return "25,28";
        case "155":
            return "26,29";
        case "156":
            return "27,30";
        case "157":
            return "28,31";
        case "158":
            return "29,32";
        case "159":
            return "30,33";
        case "160":
            return "31,34";
        case "161":
            return "32,35";
        case "162":
            return "33,36";
    }
}

var answer = new Array(Text(407), "", "", "", "", "", "", "", Text(417), Text(418), Text(419), Text(420), Text(368), Text(369), Text(366), Text(365), Text(421), Text(422), Text(423));
var answerlh = new Array(Text(407), "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", Text(424), Text(425), Text(426));
var answerbb = new Array(Text(407), "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", Text(427), "", Text(428));
var sbtype = new Array("", "111", "222", "333", "444", "555", "666", Text(351), "011", "022", "033", "044", "055", "066", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "012", "013", "014", "015", "016", "023", "024", "025", "026", "034", "035", "036", "045", "046", "056", "001", "002", "003", "004", "005", "006", Text(368), Text(367), Text(347), Text(348));
var ftType = new Array("", "1", "2", "3", "4", "1N2", "1N3", "1N4", "2N1", "2N3", "2N4", "3N1", "3N2", "3N4", "4N1", "4N2", "4N3", "12", "23", "34", "41", "13", "24", "123", "124", "134", "234", "23T1", "24T1", "34T1", "13T2", "14T2", "34T2", "12T3", "14T3", "24T3", "12T4", "13T4", "23T4");

function nnhigntype(type) {
    switch (type) {
        case "0":
            return Text(66);
        case "1":
            return Text(494);
        case "4":
            return Text(495);
        default:
            return "";
    }
}

function nnlowtype(type) {
    switch (type) {
        case "0":
            return "";
        case "1":
            return Text(429);
        case "2":
            return Text(430);
        case "3":
            return Text(431);
        case "4":
            return Text(432);
        case "5":
            return Text(433);
        case "6":
            return Text(434);
        case "7":
            return Text(435);
        case "8":
            return Text(436);
        case "9":
            return Text(437);
        case "10":
            return Text(438);
        case "14":
            return Text(439);
        case "15":
            return Text(440);
        default:
            return "";

    }
}

function sbanswer(type) {
    switch (type) {
        case "0":
            return " ";
        case "3":
            return "3 " + Text(441);
        case "4":
            return "4 " + Text(442);
        case "5":
            return "5 " + Text(441);
        case "6":
            return "6 " + Text(442);
        case "7":
            return "7 " + Text(441);
        case "8":
            return "8 " + Text(442);
        case "9":
            return "9 " + Text(441);
        case "10":
            return "10 " + Text(442);
        case "11":
            return "11 " + Text(443);
        case "12":
            return "12 " + Text(444);
        case "13":
            return "13 " + Text(443);
        case "14":
            return "14 " + Text(444);
        case "15":
            return "15 " + Text(443);
        case "16":
            return "16 " + Text(444);
        case "17":
            return "17 " + Text(443);
        case "18":
            return "18 " + Text(444);

    }
}
function lpanswer(type) {
    switch (type) {
        case "0":
            return "0";
        case "1":
            return "1 " + Text(445);
        case "2":
            return "2 " + Text(446);
        case "3":
            return "3 " + Text(445);
        case "4":
            return "4 " + Text(446);
        case "5":
            return "5 " + Text(445);
        case "6":
            return "6 " + Text(446);
        case "7":
            return "7 " + Text(445);
        case "8":
            return "8 " + Text(446);
        case "9":
            return "9 " + Text(445);
        case "10":
            return "10 " + Text(446);
        case "11":
            return "11 " + Text(448);
        case "12":
            return "12 " + Text(447);
        case "13":
            return "13 " + Text(448);
        case "14":
            return "14 " + Text(447);
        case "15":
            return "15 " + Text(448);
        case "16":
            return "16 " + Text(447);
        case "17":
            return "17 " + Text(448);
        case "18":
            return "18 " + Text(447);
        case "19":
            return "19 " + Text(449);
        case "20":
            return "20 " + Text(452);
        case "21":
            return "21 " + Text(449);
        case "22":
            return "22 " + Text(452);
        case "23":
            return "23 " + Text(449);
        case "24":
            return "24 " + Text(452);
        case "25":
            return "25 " + Text(449);
        case "26":
            return "26 " + Text(452);
        case "27":
            return "27 " + Text(449);
        case "28":
            return "28 " + Text(452);
        case "29":
            return "29 " + Text(451);
        case "30":
            return "30 " + Text(450);
        case "31":
            return "31 " + Text(451);
        case "32":
            return "32 " + Text(450);
        case "33":
            return "33 " + Text(451);
        case "34":
            return "34 " + Text(450);
        case "35":
            return "35 " + Text(451);
        case "36":
            return "36 " + Text(450);
    }
}

function showPlayListDeatil(StrArray, iLine) {
    var ss = StrArray.split('##');
    var str = new StringBulider();
    var aa;
    var bb = "";
    var tdAlignCenter = "<td align='Center'>";


    if (iLine == 0) {
        str.append("<tr style='height:25px' bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append(tdAlignCenter + ss[9] + "</td>");
        str.append(tdAlignCenter + ss[10] + "</td>");
        if (ss[12] == "2") {
            str.append(tdAlignCenter + EgameType(ss[13]) + "</td>");
        }
        else {
            str.append(tdAlignCenter + gameType(ss[0]) + "</td>");
        }

        if (ss[1] == "0-0") {
            str.append("<td align='Center'></td>"); //局 次
        }
        else {
            str.append(tdAlignCenter + ss[1] + "</td>"); //局 次
        }


        if (ss[2] > "" && ss[12] == "1") {
            aa = ss[2].split(',');
            if (parseInt(ss[0]) >= 31 && parseInt(ss[0]) < 41) {
                bb = nnhigntype(aa[0]) + " " + nnlowtype(aa[1]);
            }
            else if (parseInt(ss[0]) >= 41 && parseInt(ss[0]) < 51) {
                if (aa[0] == "-2147483648") {
                    bb = Text(407);
                }
                else {
                    bb = lpanswer(aa[0]);
                }
            }
            else if (parseInt(ss[0]) >= 51 && parseInt(ss[0]) < 61) {
                // bb = sbanswer(aa[0]);
                bb = aa[0];
                if (bb == "0") {
                    bb = Text(407);
                }
            }
            else if (parseInt(ss[0]) >= 61 && parseInt(ss[0]) < 71) {
                if (aa[0] == "-2147483648") {
                    bb = Text(66);
                }
                else {
                    bb = aa[0];
                }
            }
            else {

                for (var i = aa.length - 1; i >= 0; i--) {
                    if (aa[i] == "1") {
                        if (parseInt(ss[0]) < 21 || parseInt(ss[0]) == 71) {
                            bb += answer[i] + " ";
                        }
                        if (parseInt(ss[0]) >= 21 && parseInt(ss[0]) < 31) {
                            bb += answerlh[i] + " ";
                        }
                        if (parseInt(ss[0]) == 91) {
                            bb += answerbb[i] + " ";
                        }
                    }
                }
            }
            str.append("<td align='left'>" + bb + "</td>"); //结果
        }
        else {
            str.append(tdAlignCenter + ss[14] + "</td>"); //结果
        }
        //        if (ss[8] == "1") {
        //            str.append("<td align='Center'><img src='../../images/222.jpg' onMouseOver=\"toolTip('<img src=http://27.98.196.201/pic/" + String(Math.floor(ss[11] / 3000) * 3000) + "/" + ss[11] + ".jpg>')\" onMouseOut=\"toolTip()\"></td>"); //图片
        //        }
        //        else {
        //            str.append("<td align='Center'></td>");
        //        }
        str.append(tdAlignCenter + ss[3] + "</td>"); //时间
        str.append(tdAlignCenter + playType(ss[8]) + "&nbsp;</td>");
        str.append("<td align='Right'>" + ss[5] + "&nbsp;</td>"); //投注金额
        ss[6] = ss[6].replace('.0000', '');
        if (ss[6] > 0) {
            str.append("<td style='background-color: #cc0033;color: white;text-align: right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }
        else {
            str.append("<td align='Right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }
        str.append("<td align='Right'>" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //剩余额度
        if (ss[8] == "1" && ss[12] == "1") {
            if (parseInt(ss[0]) < 21 || parseInt(ss[0]) == 71 || parseInt(ss[0]) == 91) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + betType(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (21 <= parseInt(ss[0]) && parseInt(ss[0]) < 31) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + betTypeLh(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (31 <= parseInt(ss[0]) && parseInt(ss[0]) < 41) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + betTypenn(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (41 <= parseInt(ss[0]) && parseInt(ss[0]) < 51) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + lptype(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (51 <= parseInt(ss[0]) && parseInt(ss[0]) < 61) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + sbtype[betMoney[i].replace('：', ':').split(':')[0]] + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (61 <= parseInt(ss[0]) && parseInt(ss[0]) < 71) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    if (betMoney[i] != "") {
                        str.append("" + ftType[betMoney[i].replace('：', ':').split(':')[0]] + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                    }
                }
                str.append("&nbsp;</td>");
            }
        }
        else {
            str.append("<td align='left'>" + ss[7] + "</td>");
        }
        //str.append("<td align='left'>&nbsp;&nbsp;" + betType(betMoney[0]) + "：" + betMoney[1] + "&nbsp;</td>");
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr style='height:25px' bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append(tdAlignCenter + ss[9] + "</td>");
        str.append(tdAlignCenter + ss[10] + "</td>");
        if (ss[12] == "2") {
            str.append(tdAlignCenter + EgameType(ss[13]) + "</td>");
        }
        else {
            str.append(tdAlignCenter + gameType(ss[0]) + "</td>");
        }

        if (ss[1] == "0-0") {
            str.append("<td align='Center'></td>"); //局 次
        }
        else {
            str.append(tdAlignCenter + ss[1] + "</td>"); //局 次
        }

        if (ss[2] > "" && ss[12] == "1") {
            aa = ss[2].split(',');
            if (parseInt(ss[0]) >= 31 && parseInt(ss[0]) < 41) {
                bb = nnhigntype(aa[0]) + " " + nnlowtype(aa[1]);
            }
            else if (parseInt(ss[0]) >= 41 && parseInt(ss[0]) < 51) {
                if (aa[0] == "-2147483648") {
                    bb = Text(407);
                }
                else {
                    bb = lpanswer(aa[0]);
                }
            }
            else if (parseInt(ss[0]) >= 51 && parseInt(ss[0]) < 61) {
                //bb = sbanswer(aa[0]);
                bb = aa[0];
                if (bb == "0") {
                    bb = Text(407);
                }
            }
            else if (parseInt(ss[0]) >= 61 && parseInt(ss[0]) < 71) {
                if (aa[0] == "-2147483648") {
                    bb = Text(407);
                }
                else {
                    bb = aa[0];
                }
            }
            else {
                for (var i = aa.length - 1; i >= 0; i--) {
                    if (aa[i] == "1") {
                        if (parseInt(ss[0]) < 21 || parseInt(ss[0]) == 71) {
                            bb += answer[i] + " ";
                        }
                        if (parseInt(ss[0]) >= 21 && parseInt(ss[0]) < 31) {
                            bb += answerlh[i] + " ";
                        }
                        if (parseInt(ss[0]) == 91) {
                            bb += answerbb[i] + " ";
                        }
                    }
                }
            }
            str.append("<td align='left'>" + bb + "</td>"); //结果

        }
        else {
            str.append(tdAlignCenter + ss[14] + "</td>"); //结果
        }
        //        if (ss[8] == "1") {
        //            str.append("<td align='Center'><img src='../../images/222.jpg' onMouseOver=\"toolTip('<img src=http://27.98.196.201/pic/" + String(Math.floor(ss[11] / 3000) * 3000) + "/" + ss[11] + ".jpg>')\" onMouseOut=\"toolTip()\"></td>"); //图片
        //        }
        //        else {
        //            str.append("<td align='Center'></td>");
        //        }
        str.append(tdAlignCenter + ss[3] + "</td>"); //时间
        str.append(tdAlignCenter + playType(ss[8]) + "&nbsp;</td>");
        str.append("<td align='Right'>" + ss[5] + "&nbsp;</td>"); //投注金额
        ss[6] = ss[6].replace('.0000', '');
        if (ss[6] > 0) {
            str.append("<td style='background-color: #cc0033;color: white;text-align: right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }
        else {
            str.append("<td align='Right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }
        str.append("<td align='Right'>" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //剩余额度
        if (ss[8] == "1" && ss[12] == "1") {
            if (parseInt(ss[0]) < 21 || parseInt(ss[0]) == 71 || parseInt(ss[0]) == 91) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + betType(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (21 <= parseInt(ss[0]) && parseInt(ss[0]) < 31) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + betTypeLh(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (31 <= parseInt(ss[0]) && parseInt(ss[0]) < 41) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + betTypenn(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (41 <= parseInt(ss[0]) && parseInt(ss[0]) < 51) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + lptype(betMoney[i].replace('：', ':').split(':')[0]) + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (51 <= parseInt(ss[0]) && parseInt(ss[0]) < 61) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    str.append("" + sbtype[betMoney[i].replace('：', ':').split(':')[0]] + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
            if (61 <= parseInt(ss[0]) && parseInt(ss[0]) < 71) {
                var betMoney = ss[7].split(',');
                str.append("<td align='left'>&nbsp;&nbsp;");
                for (var i = 0; i < betMoney.length; i++) {
                    if (betMoney[i] != "") {
                        str.append("" + ftType[betMoney[i].replace('：', ':').split(':')[0]] + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                    }
                    //str.append("" + ftType[betMoney[i].replace('：', ':').split(':')[0]] + ":" + betMoney[i].replace('：', ':').split(':')[1] + "&nbsp;");
                }
                str.append("&nbsp;</td>");
            }
        }
        else {
            str.append("<td align='left'>" + ss[7] + "</td>");
        }
        //str.append("<td align='left'>&nbsp;&nbsp;" + betType(betMoney[0]) + "：" + betMoney[1] + "&nbsp;</td>");
        str.append("</tr>");
    }
    return str;
}

function BuildTextArray() {
    var ssName = new Array(6);
    ssName[0] = Text(453);
    ssName[1] = Text(454);
    ssName[2] = Text(455);
    ssName[3] = Text(456);
    ssName[4] = Text(457);
    ssName[5] = Text(458);
    ssName[6] = Text(459);
    ssName[7] = Text(460);
    ssName[9] = Text(461);
    ssName[10] = Text(462);
    ssName[11] = Text(463);
    ssName[12] = Text(464);

    return ssName;
}
function showTableHead() {

    var ssName = new Array(6);
    ssName = BuildTextArray();


    var str = new StringBulider();
    str.append("<tr style='height:25px'>");
    str.append("<td  width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    str.append("<td  width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td  width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='180px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    //str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("<td width='140px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='450px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("</tr>");
    return str;
}
function showTableHeadEgame() {
    var ssName = new Array(6);
    ssName = BuildTextArray();

    var str = new StringBulider();
    str.append("<tr style='height:25px'>");
    str.append("<td  width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    str.append("<td  width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td  width='250px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    // str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='180px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    //str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("<td width='140px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    // str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='400px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("</tr>");
    return str;
}
function showPlayListDeatilEgame(StrArray, iLine) {
    var ss = StrArray.split('##');
    var str = new StringBulider();
    var aa;
    var bb = "";
    if (iLine == 0) {
        str.append("<tr style='height:25px' bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append(tdAlignCenter + ss[9] + "</td>");
        str.append(tdAlignCenter + ss[10] + "</td>");
        str.append("<td align='left'>" + EgameType(ss[13]) + "</td>");
        str.append("<td align='left'>" + ss[14] + "</td>"); //结果
        str.append(tdAlignCenter + ss[3] + "</td>"); //时间
        str.append(tdAlignCenter + playType(ss[8]) + "&nbsp;</td>");
        str.append("<td align='Right'>" + ss[5] + "&nbsp;</td>"); //投注金额
        ss[6] = ss[6].replace('.0000', '');
        if (ss[6] > 0) {
            str.append("<td style='background-color: #cc0033;color: white;text-align: right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }
        else {
            str.append("<td align='Right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }

        str.append("<td align='left'>" + ss[7] + "</td>");
        //str.append("<td align='left'>&nbsp;&nbsp;" + betType(betMoney[0]) + "：" + betMoney[1] + "&nbsp;</td>");
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr style='height:25px' bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append(tdAlignCenter + ss[9] + "</td>");
        str.append(tdAlignCenter + ss[10] + "</td>");
        str.append("<td align='left'>" + EgameType(ss[13]) + "</td>");
        str.append("<td align='left'>" + ss[14] + "</td>"); //结果
        str.append(tdAlignCenter + ss[3] + "</td>"); //时间
        str.append(tdAlignCenter + playType(ss[8]) + "&nbsp;</td>");
        str.append("<td align='Right'>" + ss[5] + "&nbsp;</td>"); //投注金额
        ss[6] = ss[6].replace('.0000', '');
        if (ss[6] > 0) {
            str.append("<td style='background-color: #cc0033;color: white;text-align: right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }
        else {
            str.append("<td align='Right'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //输赢
        }

        str.append("<td align='left'>" + ss[7] + "</td>");
        //str.append("<td align='left'>&nbsp;&nbsp;" + betType(betMoney[0]) + "：" + betMoney[1] + "&nbsp;</td>");
        str.append("</tr>");
    }
    return str;
}
function format(date, formatStr) {
    var str = formatStr;
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getFullYear() % 100) > 9 ? (date.getFullYear() % 100).toString() : "0" + (date.getFullYear() % 100));
    str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate());
    str = str.replace(/d|D/g, date.getDate());
    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : "0" + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : "0" + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : "0" + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());
    return str;
}

//   &#35745;算日期&#20026;当年的第几周     
//   &#33719;取   2008 7  5  &#20026;当年的第几周     
//   返回:  28
function weekOfYear(year, month, day) {
    //   year       年     
    //   month     月     
    //   day         日     
    //   &#27599;周从周日&#24320;始     
    var date1 = new Date(year, 0, 1);
    var date2 = new Date(year, month - 1, day, 1);
    var dayMS = 24 * 60 * 60 * 1000;
    var firstDay = (7 - date1.getDay() + 1) * dayMS;
    var weekMS = 7 * dayMS;
    date1 = date1.getTime();
    date2 = date2.getTime();
    return Math.ceil((date2 - date1 - firstDay) / weekMS) + 1;
}
//   通&#36807;周数和星期&#35745;算日期  
//   &#33719;取    2005   年第   37   周的周六的日期   。 (0-6,   0代表周日)       
//   返回:   2005年9月10号
function dateFromWeek(year, week, day) {
    //   year       年     
    //   week       周     
    //   day         星期   (0-6,   0代表周日)     
    var date1 = new Date(year, 0, 1);
    var dayMS = 24 * 60 * 60 * 1000;
    var firstDay = (7 - date1.getDay() + 1) * dayMS;
    var weekMS = (week - 2) * 7 * dayMS;
    var result = date1.getTime() + firstDay + weekMS + day * dayMS;
    date1.setTime(result);
    // return   date1.toLocaleDateString();     
    return date1;
}

//&#38024;&#23545;不同的&#26102;&#38388;&#21333;位做加&#36816;算，得到日期年月日等加数字后的日期
function dateAdd(date, interval, number) {
    switch (interval) {
        case "y":
            date.setFullYear(date.getFullYear() + number);
            return date;
        case "q":
            date.setMonth(date.getMonth() + number * 3);
            return date;
        case "m":
            date.setMonth(date.getMonth() + number);
            return date;
        case "w":
            date.setDate(date.getDate() + number * 7);
            return date;
        case "d":
            date.setDate(date.getDate() + number);
            return date;
        case "h":
            date.setHours(date.getHours() + number);
            return date;
        case "m":
            date.setMinutes(date.getMinutes() + number);
            return date;
        case "s":
            date.setSeconds(date.getSeconds() + number);
            return date;
        default:
            date.setDate(d.getDate() + number);
            return date;
    }
}
//&#33719;取某年某个月的天数
function monthDays(iYear, iMonth) {
    iYear = parseInt(iYear);
    iMonth = parseInt(iMonth);
    var iDay = 31;
    if ((iMonth == 4 || iMonth == 6 || iMonth == 9 || iMonth == 11) && iDay == 31) {
        iDay = 30;
    }
    if (iMonth == 2) {
        if (isLeapYear(iYear)) {
            iDay = 29;
        } else {
            iDay = 28;
        }
    }
    return iDay;
}
//判断一个数字是否&#38384;年
function isLeapYear(iYear) {
    if (iYear + "" == "undefined" || iYear + "" == "null" || iYear + "" == "") {
        return false;
    }
    iYear = parseInt(iYear);
    if ((iYear % 4 == 0 && iYear % 100 != 0) || iYear % 400 == 0) {
        return true
    } else {
        return false
    };
}
//&#26174;示周
function showWeek(today) {
    var week = weekOfYear(today.getFullYear(), today.getMonth() + 1, today.getDate());
    var xingqiri = dateFromWeek(today.getFullYear(), week, 0);
    var format_xingqiri = format(xingqiri, "yyyy-MM-DD");
    return format_xingqiri;

}
//&#26174;示月
function showMonth(today, format_t) {
    var m_days = monthDays(today.getFullYear(), today.getMonth() + 1);
    var m_YearAndMonth = (format_t.substring(0, 4)) + "/" + (format_t.substring(5, 7));
    $("m_date").innerHTML = m_YearAndMonth + "/01" + "到" + m_YearAndMonth + "/" + m_days;
}
function showYesterDay() {
    var Nowdate = new Date();
    var localTime = Nowdate.getTime(); //当前时间，时间戳格式 毫秒级
    var offsetTime = Nowdate.getTimezoneOffset() * 60000; //当前时区偏移时间，毫秒级
    var utcTime = localTime + offsetTime; //标准时间
    Nowdate = new Date(utcTime + 3600000 * 8); //标准时间加上北京时区的偏移时间(东八区)，得到北京时间
    if ((Nowdate.getHours() + ":" + Nowdate.getMinutes() + ":" + Nowdate.getSeconds()) < "12:00:00") {
        Nowdate = dateAdd(Nowdate, "d", -1);
    }
    M = Number(Nowdate.getMonth()) + 1;
    var d = "";
    if (M < 10) {
        d = "0" + M;
    }
    else {
        d = M;
    }
    var r = "";
    if (Nowdate.getDate() < 10) {
        r = "0" + Nowdate.getDate();
    }
    else {
        r = Nowdate.getDate();
    }
    return Nowdate.getFullYear() + "-" + d + "-" + r;
}
function showToDay() {
    var Nowdate = new Date();
    var localTime = Nowdate.getTime(); //当前时间，时间戳格式 毫秒级
    var offsetTime = Nowdate.getTimezoneOffset() * 60000; //当前时区偏移时间，毫秒级
    var utcTime = localTime + offsetTime; //标准时间
    Nowdate = new Date(utcTime + 3600000 * 8); //标准时间加上北京时区的偏移时间(东八区)，得到北京时间
    if ((Nowdate.getHours() + ":" + Nowdate.getMinutes() + ":" + Nowdate.getSeconds()) >= "12:00:00") {
        Nowdate = dateAdd(Nowdate, "d", 1);
    }
    M = Number(Nowdate.getMonth()) + 1;
    var d = "";
    if (M < 10) {
        d = "0" + M;
    }
    else {
        d = M;
    }
    var r = "";
    if (Nowdate.getDate() < 10) {
        r = "0" + Nowdate.getDate();
    }
    else {
        r = Nowdate.getDate();
    }
    return Nowdate.getFullYear() + "-" + d + "-" + r;
}
//本周第一天
function showWeekFirstDay() {
    var today = new Date();
    var WeekFirstDay = showWeek(today);
    return WeekFirstDay;
}
//上周第一天
function showPreviousFirstWeekDay() {
    var today = new Date();
    var week = weekOfYear(today.getFullYear(), today.getMonth() + 1, today.getDate());
    var xingqiri = dateFromWeek(today.getFullYear(), week, 0);
    var prev_xingqiri = dateAdd(xingqiri, "d", -7);
    format_xingqiri = format(prev_xingqiri, "yyyy-MM-DD");
    return format_xingqiri;
}
//上周最后一天
function showPreviousLastWeekDay() {
    var today = new Date();
    var week = weekOfYear(today.getFullYear(), today.getMonth() + 1, today.getDate());
    var xingqiliu = dateFromWeek(today.getFullYear(), week, 6);
    var prev_xingqiliu = dateAdd(xingqiliu, "d", -6);
    format_xingqiliu = format(prev_xingqiliu, "yyyy-MM-DD");
    return format_xingqiliu;
}
function setDate(num) {
    if (num == 1) {
        document.all.dateBegin.value = showMonthFirstDay();
        //document.all.dateEnd.value = showMonthLastDay();
    }
    if (num == 2) {
        document.all.dateBegin.value = showWeekFirstDay();
        //document.all.dateEnd.value = showWeekLastDay();
    }
    if (num == 3) {
        document.all.dateBegin.value = showToDay();
        document.all.dateEnd.value = showToDay();
    }
    if (num == 4) {
        document.all.dateBegin.value = showPreviousFirstDay();
        document.all.dateEnd.value = showMonthFirstDay();
    }
    if (num == 5) {
        document.all.dateBegin.value = showNextFirstDay();
        document.all.dateEnd.value = showNextLastDay();
    }
    if (num == 6) {
        document.all.dateBegin.value = showPreviousFirstWeekDay();
        document.all.dateEnd.value = showPreviousLastWeekDay();
    }
    if (num == 7) {
        document.all.dateBegin.value = showNextFirstWeekDay();
        document.all.dateEnd.value = showNextLastWeekDay();
    }
    if (num == 8) {
        document.all.dateBegin.value = showPreviousDay();
        document.all.dateEnd.value = showPreviousDay();
    }
    if (num == 9) {
        document.all.dateBegin.value = showNextDay();
        document.all.dateEnd.value = showNextDay();
    }
}
//本月第一天
function showMonthFirstDay() {
    var today = new Date();
    var format_t = format(today, "yyyy-MM-DD");
    var m_days = monthDays(today.getFullYear(), today.getMonth() + 1);
    var m_YearAndMonth = (format_t.substring(0, 4)) + "-" + (format_t.substring(5, 7));
    return m_YearAndMonth + "-01";

}
//本月最后一天
function showMonthLastDay() {
    var today = new Date();
    var format_t = format(today, "yyyy-MM-DD");
    var m_days = monthDays(today.getFullYear(), today.getMonth() + 1);
    var m_YearAndMonth = (format_t.substring(0, 4)) + "-" + (format_t.substring(5, 7));
    return m_YearAndMonth + "-" + m_days;
}
//上月第一天
function showPreviousFirstDay() {
    var today = new Date();
    var prev_monthFirst = dateAdd(today, "m", -1);
    var prev_month_LastDay = monthDays(prev_monthFirst.getFullYear(), prev_monthFirst.getMonth() + 1);
    prev_monthFirst = format(prev_monthFirst, "yyyy-MM-DD");
    m_YearAndMonth = (prev_monthFirst.substring(0, 4)) + "-" + (prev_monthFirst.substring(5, 7));
    return m_YearAndMonth + "-01"

}
//上月最后一天
function showPreviousLastDay() {
    var today = new Date();
    var prev_monthFirst = dateAdd(today, "m", -1);
    var prev_month_LastDay = monthDays(prev_monthFirst.getFullYear(), prev_monthFirst.getMonth() + 1);
    prev_monthFirst = format(prev_monthFirst, "yyyy-MM-DD");
    m_YearAndMonth = (prev_monthFirst.substring(0, 4)) + "-" + (prev_monthFirst.substring(5, 7));
    return m_YearAndMonth + "-" + prev_month_LastDay;
}

