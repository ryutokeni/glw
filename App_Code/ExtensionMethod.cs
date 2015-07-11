using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

/// <summary>
/// Summary description for ExtensionMethod
/// </summary>

    public static class ExtensionMethod
    {
        public static string preText;
        public static string postText;

        public static string Text(this string id)
        {
            string text = LocBuilder.Instance.Text(int.Parse(id));
            return text;
        }

        public static void WhatTheFuck()
        {
            // Do nothing
        }

        public static void AppendWith(this StringBuilder builder, string data, bool isMerge)
        {
            string finalText = data;
            if (isMerge)
                finalText = preText + data + postText;

            builder.Append(finalText);
        }

        public static void AddAsPrefix(this string prefix)
        {
            preText = prefix;
        }

        public static void AddAsSuffix(this string suffix)
        {
            postText = suffix;
        }
    }
