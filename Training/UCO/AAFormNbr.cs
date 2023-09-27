using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Training.UCO
{
    public class AAFormNbr : Ede.Uof.WKF.ExternalUtility.IFormAutoNumber
    {
        public void Finally()
        {
           // throw new NotImplementedException();
        }

        public string GetFormNumber(string formId, string userGroupId, string formValueXML)
        {

            DemoUCO uco = new DemoUCO();


            return uco.GetNextFormNumber("AA");
        }

        public void OnError()
        {
          //  throw new NotImplementedException();
        }

        public void OnExecption(Exception errorException)
        {
            throw new NotImplementedException();
        }
    }
}
