<%@ WebService Language="C#" Class="WWWS" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下列一行。
// [System.Web.Script.Services.ScriptService]
public class WWWS  : System.Web.Services.WebService {

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    
}