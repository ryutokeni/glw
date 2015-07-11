 function Text(id) {
     var line = langContent[id];
     var text = line.split(",");
     return text[langID];
 }

///
/// Parse localization data which push from server
/// into a fake enum type 
///
//function ParseIntoDumpEnum() {

//}

//function LocBuilder() {
//    this._content = [];
//}

//LocBuilder.prototype.Text(text_id)
//{

//}

//LocBuilder.prototype.ParseData()
//{
//    // Get header length
//    var headerLength = langContent[0].length;
//}