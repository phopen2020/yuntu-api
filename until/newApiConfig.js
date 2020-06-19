function getConvertFrom() {
    return [{
        Document : ["DOC","PDF","XLS","CAJ","DWG","PPT","TXT"],
        Image : ["JPG","PNG","GIF"]
      }]
}

function getConvertTo(value) {
  const convertArray = [{
    id : 1,
    type : "DOC",
    Document : ["在线文档","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 2,
    type : "PDF",
    Document : ["在线文档","DOC"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 3,
    type : "XLS",
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 4,
    type : "CAJ",
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 5,
    type : "DWG",
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 6,
    type : "PPT",
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 7,
    type : "TXT",
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 8,
    type : "JPG",  
    Document : ["在线文档","DOC","PDF"],
    Image : ["PNG","GIF"],
    Extra : ["二维码","HTML5"]
  }, {
    id : 9,
    type : "PNG",  
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","GIF"],
    Extra : ["二维码","HTML5"]  
  }, {
    id : 10,
    type : "GIF",  
    Document : ["在线文档","DOC","PDF"],
    Image : ["JPG","PNG"],
    Extra : ["二维码","HTML5"]  
  }]

  const newArray = convertArray.filter(item => item && item.type == value)

return newArray
}

function getConvertMessage(obj,value) {
    if (!value && obj) {
      const firstArray = [{
        id : 1,
        type : "DOC",
        title : "DOC转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }, {
        id : 2,
        type : "PDF",
        title : "PDF转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }, {
        id : 3,
        type : "XLS",
        title : "XLS转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }, {
        id : 4,
        type : "CAJ",
        title : "CAJ转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }, {
        id : 5,
        type : "DWG",
        title : "DWG转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }, {
        id : 6,
        type : "PPT",
        title : "PPT转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }, {
        id : 7,
        type : "TXT",
        title : "TXT转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      },{
        id : 8,
        type : "JPG",
        title : "JPG转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      },{
        id : 9,
        type : "PNG",
        title : "PNG转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      },{
        id : 10,
        type : "GIF",
        title : "GIF转换",
        describe : "九云图是一个在线文档转换平台。除其他外，我们支持PDF，DOCX，PPTX，XLSX。得益于我们先进的转换技术，输出质量将与通过最新的Microsoft Office 2019套件保存文件时的输出质量完全相同。"
      }]
      const newArray = firstArray.filter(item => item.type == obj) 
    return newArray
    } else {
      const secondArray = [{
        id : 1,
        type : "DOC",
        convertType : "在线文档",
        title : "DOC转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 2,
        type : "DOC",
        convertType : "PDF",
        title : "DOC转换PDF",
        describe : "九云图能将DOC文档转换为PDF文档，支持下载。"
      }, {
        id : 3,
        type : "DOC",
        convertType : "JPG",
        title : "DOC转换JPG",
        describe : "九云图能将DOC文档转换为JPG图片，支持下载。"
      }, {
        id : 4,
        type : "DOC",
        convertType : "二维码",
        title : "DOC转换二维码",
        describe : "九云图能将DOC文档转换为二维码，支持永久保存。"
      }, {
        id : 5,
        type : "DOC",
        convertType : "HTML5",
        title : "DOC转换HTML5",
        describe : "九云图能将DOC文档转换为HTML5，支持下载。"
      }, {
        id : 6,
        type : "PDF",
        convertType : "在线文档",
        title : "DOC转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 7,
        type : "PDF",
        convertType : "DOC",
        title : "PDF转换DOC",
        describe : "九云图能将PDF文档转换为DOC文档，支持下载。"
      }, {
        id : 8,
        type : "PDF",
        convertType : "JPG",
        title : "PDF转换JPG",
        describe : "九云图能将PDF文档转换为JPG图片，支持下载。"
      }, {
        id : 9,
        type : "PDF",
        convertType : "PNG",
        title : "PDF转换PNG",
        describe : "九云图能将PDF文档转换为PNG图片，支持下载。"
      }, {
        id : 10,
        type : "PDF",
        convertType : "二维码",
        title : "PDF转换二维码",
        describe : "九云图能将PDF文档转换为二维码，支持永久保存。"
      }, {
        id : 11,
        type : "PDF",
        convertType : "HTML5",
        title : "PDF转换HTML5",
        describe : "九云图能将PDF文档转换为HTML5，支持下载。"
      }, {
        id : 12,
        type : "XLS",
        convertType : "在线文档",
        title : "XLS转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 13,
        type : "XLS",
        convertType : "DOC",
        title : "XLS转换DOC",
        describe : "九云图能将XLS文档转换为DOC，支持下载。"
      }, {
        id : 14,
        type : "XLS",
        convertType : "PDF",
        title : "XLS转换PDF",
        describe : "九云图能将XLS文档转换为PDF，支持下载。"
      }, {
        id : 15,
        type : "XLS",
        convertType : "JPG",
        title : "XLS转换JPG",
        describe : "九云图能将XLS文档转换为JPG图片，支持下载。"
      }, {
        id : 16,
        type : "XLS",
        convertType : "PNG",
        title : "XLS转换PNG",
        describe : "九云图能将XLS文档转换为PNG图片，支持下载。"
      }, {
        id : 17,
        type : "XLS",
        convertType : "二维码",
        title : "XLS转换二维码",
        describe : "九云图能将XLS文档转换为二维码，支持永久保存。"
      }, {
        id : 18,
        type : "XLS",
        convertType : "HTML5",
        title : "XLS转换HTML5",
        describe : "九云图能将XLS文档转换为HTML5，支持下载。"
      }, {
        id : 19,
        type : "CAJ",
        convertType : "在线文档",
        title : "CAJ转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 20,
        type : "CAJ",
        convertType : "DOC",
        title : "CAJ转换DOC",
        describe : "九云图能将CAJ文档转换为DOC，支持下载。"
      }, {
        id : 21,
        type : "CAJ",
        convertType : "PDF",
        title : "CAJ转换PDF",
        describe : "九云图能将CAJ文档转换为PDF，支持下载。"
      }, {
        id : 22,
        type : "CAJ",
        convertType : "JPG",
        title : "CAJ转换JPG",
        describe : "九云图能将CAJ文档转换为JPG图片，支持下载。"
      }, {
        id : 23,
        type : "CAJ",
        convertType : "PNG",
        title : "CAJ转换PNG",
        describe : "九云图能将CAJ文档转换为PNG图片，支持下载。"
      }, {
        id : 24,
        type : "CAJ",
        convertType : "二维码",
        title : "CAJ转换二维码",
        describe : "九云图能将CAJ文档转换为二维码，支持永久保存。"
      }, {
        id : 25,
        type : "CAJ",
        convertType : "HTML5",
        title : "CAJ转换HTML5",
        describe : "九云图能将CAJ文档转换为HTML5，支持下载。"
      }, {
        id : 26,
        type : "DWG",
        convertType : "在线文档",
        title : "DWG转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 27,
        type : "DWG",
        convertType : "DOC",
        title : "DWG转换DOC",
        describe : "九云图能将DWG文档转换为DOC，支持下载。"
      }, {
        id : 28,
        type : "DWG",
        convertType : "PDF",
        title : "DWG转换PDF",
        describe : "九云图能将DWG文档转换为PDF，支持下载。"
      }, {
        id : 29,
        type : "DWG",
        convertType : "JPG",
        title : "DWG转换JPG",
        describe : "九云图能将DWG文档转换为JPG图片，支持下载。"
      }, {
        id : 30,
        type : "DWG",
        convertType : "PNG",
        title : "DWG转换PNG",
        describe : "九云图能将DWG文档转换为PNG图片，支持下载。"
      }, {
        id : 31,
        type : "DWG",
        convertType : "二维码",
        title : "DWG转换二维码",
        describe : "九云图能将DWG文档转换为二维码，支持永久保存。"
      }, {
        id : 32,
        type : "DWG",
        convertType : "HTML5",
        title : "DWG转换HTML5",
        describe : "九云图能将DWG文档转换为HTML5，支持下载。"
      }, {
        id : 33,
        type : "PPT",
        convertType : "在线文档",
        title : "PPT转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 34,
        type : "PPT",
        convertType : "DOC",
        title : "PPT转换DOC",
        describe : "九云图能将PPT文档转换为DOC，支持下载。"
      }, {
        id : 35,
        type : "PPT",
        convertType : "PDF",
        title : "PPT转换PDF",
        describe : "九云图能将PPT文档转换为PDF，支持下载。"
      }, {
        id : 36,
        type : "PPT",
        convertType : "JPG",
        title : "PPT转换JPG",
        describe : "九云图能将PPT文档转换为JPG，支持下载。"
      }, {
        id : 37,
        type : "PPT",
        convertType : "PNG",
        title : "PPT转换PNG",
        describe : "九云图能将PPT文档转换为PNG，支持下载。"
      }, {
        id : 38,
        type : "PPT",
        convertType : "二维码",
        title : "PPT转换二维码",
        describe : "九云图能将PPT文档转换为二维码，支持永久保存。"
      }, {
        id : 39,
        type : "PPT",
        convertType : "HTML5",
        title : "PPT转换HTML5",
        describe : "九云图能将PPT文档转换为HTML5，支持下载。"
      }, {
        id : 40,
        type : "TXT",
        convertType : "在线文档",
        title : "TXT转换在线文档",
        describe : "九云图能将文档转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 41,
        type : "TXT",
        convertType : "DOC",
        title : "TXT转换DOC",
        describe : "九云图能将TXT文档转换为DOC，支持下载。"
      }, {
        id : 42,
        type : "TXT",
        convertType : "PDF",
        title : "TXT转换PDF",
        describe : "九云图能将TXT文档转换为PDF，支持下载。"
      }, {
        id : 43,
        type : "TXT",
        convertType : "JPG",
        title : "TXT转换JPG",
        describe : "九云图能将TXT文档转换为JPG图片，支持下载。"
      }, {
        id : 44,
        type : "TXT",
        convertType : "PNG",
        title : "TXT转换PNG",
        describe : "九云图能将TXT文档转换为PNG图片，支持下载。"
      }, {
        id : 45,
        type : "TXT",
        convertType : "二维码",
        title : "TXT转换二维码",
        describe : "九云图能将TXT文档转换为二维码，支持永久保存。"
      }, {
        id : 46,
        type : "TXT",
        convertType : "HTML5",
        title : "TXT转换HTML5",
        describe : "九云图能将TXT文档转换为HTML5，支持下载。"
      }, {
        id : 47,
        type : "JPG",
        convertType : "在线文档",
        title : "TXT转换在线文档",
        describe : "九云图能将图片转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 48,
        type : "JPG",
        convertType : "DOC",
        title : "JPG转换DOC",
        describe : "九云图能将图片转换为DOC，支持下载。"
      }, {
        id : 49,
        type : "JPG",
        convertType : "PDF",
        title : "JPG转换PDF",
        describe : "九云图能将图片转换为PDF，支持下载。"
      }, {
        id : 50,
        type : "JPG",
        convertType : "PNG",
        title : "JPG转换PNG",
        describe : "九云图能将JPG转换为PNG，支持下载。"
      }, {
        id : 51,
        type : "JPG",
        convertType : "GIF",
        title : "JPG转换GIF",
        describe : "九云图能将JPG转换为GIF，支持下载。"
      }, {
        id : 52,
        type : "JPG",
        convertType : "二维码",
        title : "JPG转换二维码",
        describe : "九云图能将JPG转换为二维码，支持永久保存。"
      }, {
        id : 53,
        type : "JPG",
        convertType : "HTML5",
        title : "JPG转换HTML5",
        describe : "九云图能将JPG转换为HTML5，支持下载。"
      }, {
        id : 54,
        type : "PNG",
        convertType : "在线文档",
        title : "PNG转换在线文档",
        describe : "九云图能将图片转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 55,
        type : "PNG",
        convertType : "DOC",
        title : "PNG转换DOC",
        describe : "九云图能将PNG转换为DOC，支持下载。"
      }, {
        id : 56,
        type : "PNG",
        convertType : "PDF",
        title : "PNG转换PDF",
        describe : "九云图能将PNG转换为PDF，支持下载。"
      }, {
        id : 57,
        type : "PNG",
        convertType : "JPG",
        title : "PNG转换JPG",
        describe : "九云图能将PNG转换为JPG，支持下载。"
      }, {
        id : 58,
        type : "PNG",
        convertType : "GIF",
        title : "PNG转换GIF",
        describe : "九云图能将PNG转换为GIF，支持下载。"
      }, {
        id : 59,
        type : "PNG",
        convertType : "二维码",
        title : "PNG转换二维码",
        describe : "九云图能将PNG转换为二维码，支持永久保存。"
      }, {
        id : 60,
        type : "PNG",
        convertType : "HTML5",
        title : "PNG转换HTML5",
        describe : "九云图能将PNG转换为HTML5，支持下载。"
      }, {
        id : 61,
        type : "GIF",
        convertType : "在线文档",
        title : "GIF转换在线文档",
        describe : "九云图能将图片转换为在线文档，支持转发微信朋友圈。"
      }, {
        id : 62,
        type : "GIF",
        convertType : "DOC",
        title : "GIF转换DOC",
        describe : "九云图能将GIF转换为DOC，支持下载。" 
      }, {
        id : 63,
        type : "GIF",
        convertType : "PDF",
        title : "GIF转换PDF",
        describe : "九云图能将GIF转换为PDF，支持下载。" 
      }, {
        id : 64,
        type : "GIF",
        convertType : "JPG",
        title : "GIF转换JPG",
        describe : "九云图能将GIF转换为JPG，支持下载。" 
      }, {
        id : 65,
        type : "GIF",
        convertType : "PNG",
        title : "GIF转换PNG",
        describe : "九云图能将GIF转换为PNG，支持下载。" 
      }, {
        id : 66,
        type : "GIF",
        convertType : "二维码",
        title : "GIF转换二维码",
        describe : "九云图能将GIF转换为二维码，支持永久保存。" 
      }, {
        id : 67,
        type : "GIF",
        convertType : "HTML5",
        title : "GIF转换HTML5",
        describe : "九云图能将GIF转换为HTML5，支持下载。" 
      }]
      const newArray = secondArray.filter(item => item.type == obj && item.convertType == value)
      return newArray
    }
}
export const newApiConfig = {
  getConvertFrom,
  getConvertTo,
  getConvertMessage
}