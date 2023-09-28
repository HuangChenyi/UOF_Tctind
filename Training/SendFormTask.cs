using Ede.Uof.EIP.Organization.Util;
using Ede.Uof.Utility.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Training.Data;
using Training.UCO;

namespace Training
{
    public class SendFormTask : BaseTask
    {
        public override void Run(params string[] args)
        {
            // throw new NotImplementedException();

            DemoUCO uco = new DemoUCO();

            DemoDataSet ds = uco.GetForm();

            foreach(var dr in ds.TB_DEMO_DLL_FORM)
            {
                UserUCO useruco = new UserUCO();
                EBUser ebUser = useruco.GetEBUser(useruco.GetGUID("Tony"));
                DLLFormSchema form = new DLLFormSchema("681159a2-f893-4d09-87bb-5be6b97c415e",
                UrgentLevel.Normal  , ebUser.Account, ebUser.UserGUID, ebUser.Name);

                form.Fields.Field_A01.FieldValue = dr.ITEM;
                form.Fields.Field_A02.FieldValue = dr.ITEM_PRICE.ToString();
                form.Fields.Field_A03.FieldValue = dr.ITEM_QTY.ToString();
                form.Fields.Field_A04.FieldValue = dr.REMARK;

                string formInfo = form.ConvertToFormInfoXml();

                Ede.Uof.WKF.Utility.TaskUtilityUCO taskUCO = new Ede.Uof.WKF.Utility.TaskUtilityUCO();
               string result= taskUCO.WebService_CreateTask(formInfo);

                uco.UpdateDLLFormResult(dr.ID ,result);
            }

        }
    }
}
