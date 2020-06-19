function getFileType(fileTitle) {
    let title = fileTitle;

    if (title) {
        title = '.' + title;
    } else {
        return title;
    }

    let type;

    if (title != null) {
        title = String(title);
        if (title.startsWith("Microsoft Word - ") || title.endsWith(".doc")
                || title.endsWith(".docx") || title.endsWith(".docm")
                || title.endsWith(".dot") || title.endsWith(".dotm")
                || title.endsWith(".dotx") || title.endsWith(".odt")
                || title.endsWith(".rtf")) {

            type = "doc";
        } else if (title.startsWith("Microsoft Excel - ")
                || title.endsWith(".xls") || title.endsWith(".xlsb")
                || title.endsWith(".xlsm") || title.endsWith(".xlt")
                || title.endsWith(".xltm") || title.endsWith(".xltx")
                || title.endsWith(".xlw") || title.endsWith(".xlv")
                || title.endsWith(".ods") || title.endsWith(".csv")
                || title.endsWith(".xlsx")) {

            type = "xls";
        } else if (title.startsWith("Microsoft PowerPoint - ")
                || title.endsWith(".ppt") || title.endsWith(".pot")
                || title.endsWith(".potm") || title.endsWith(".potx")
                || title.endsWith(".pps") || title.endsWith(".ppsm")
                || title.endsWith(".ppsx") || title.endsWith(".pptm")
                || title.endsWith(".odp") || title.endsWith(".pptx")) {

            type = "ppt";
        } else if (title.startsWith("Microsoft Office Outlook - ")) {

            type = "mail";
        } else if (title.endsWith(".dwg") || title.endsWith(".dft")
                || title.endsWith(".dws") || title.endsWith(".dwt")
                || title.endsWith(".dxf")) {

            type = "cad";
        } else if (title.endsWith(".wps")) {

            type = "doc";
        } else if (title.endsWith(".et") || title.endsWith(".ett")) {

            type = "xls";
        } else if (title.endsWith(".dpt") || title.endsWith(".dps")) {

            type = "ppt";
        } else if (title.endsWith(".pdf") || title.endsWith(".caj")) {

            type = "pdf";
        } else if (title.endsWith(".txt")) {

            type = "txt";
        } else if (title.startsWith("http:") || title.startsWith("https:")
                || title.endsWith(".htm") || title.endsWith(".html")
                || title.endsWith(".mht") || title.endsWith(".mhtml")
                || title.endsWith(".eml") || title.endsWith(".nws")
                || title.endsWith(".mime") || title.endsWith(".php")
                || title.endsWith(".jsp")) {

            type = "html";
        }
    }
    return type;
}
export const fileUntils = {
    getFileType
}