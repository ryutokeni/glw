using System.IO;

/// <summary>
/// Summary description for LocBuilder
/// </summary>
    public class LocBuilder
    {
        private string langPath;
        private string[] langContent, langList;
        private int[] langID;
        public int currentLanguage
        {
            get;
            set;
        }

        public string[] GetContent()
        {
            return langContent;
        }

        public bool isLoaded;

        private static readonly LocBuilder instance = new LocBuilder();

        public static LocBuilder Instance
        {
            get
            {
                return instance;
            }
        }

        public LocBuilder(string path)
        {
            isLoaded = false;
            langPath = path;
        }

        private LocBuilder()
        {
            isLoaded = false;
            langPath = null;
        }

        public void SetPath(string path)
        {
            langPath = path;
        }

        public void LoadLanguagePackage()
        {
            if (!isLoaded)
                isLoaded = DoLoad();
        }

        private bool DoLoad()
        {

            langContent = File.ReadAllLines(langPath);
            BuildConfig();
            return (langContent != null);
        }

        public string LoadTextAtID(int id)
        {
            string content = null;
            string[] splitData = LoadLineAtID(id);

            content = splitData[Common.langID];

            return content;
        }

        private string[] LoadLineAtID(int id)
        {

            return langContent[id].Split(',');
        }

        /// <summary>
        /// Use to build config to load text list 
        /// base on current selected language
        /// Note: This function work follow current langs.csv structure
        /// Check again if we add new language or rebuild langs.csv
        /// </summary>
        private void BuildConfig()
        {
            BuildLanguageList();
            string[] csvStruct = LoadLineAtID(0);
            int i = 0, j = 3, csvLength = csvStruct.Length, length = langList.Length;

            langID = new int[length];

            for (; i < length; i++)
            {
                for (; j < csvLength; j++)
                {
                    if (langList[i].CompareTo(csvStruct[j]) == 0)
                    {
                        langID[i] = j;
                        break;
                    }
                }
            }
        }


        private void BuildLanguageList()
        {
            langList = new string[3];
            langList[0] = "Chinese";
            langList[1] = "English";
            langList[2] = "Vietnamese";
        }

        public string[] BuildTextListInRange(int startID, int endID)
        {
            int length = endID - startID + 1;
            string[] strList = new string[length];

            int i = 0, getID = startID;
            for (i = 0; i < length; i++)
            {
                strList[i] = LoadTextAtID(getID++);
            }

            return strList;
        }

        public string Text(int id)
        {
            return this.LoadTextAtID(id);
        }

        public string GetLocScript()
        {
            //string myScript;
            //myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventLangScriptBlock\">\n";
            //myScript += "var _loc;";

            //int i = 0;
            //string line;
            //for (; i < langContent.Length; i++)
            //{
            //    line = langContent[i];
            //    myScript += "loc.push(\"" + line + "\")";

            //}
            //    myScript += "\n\n </script>\n";
            //return myScript;
            return "";
        }
    }
