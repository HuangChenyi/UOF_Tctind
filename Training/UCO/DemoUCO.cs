using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Training.PO;
using Training.Data;

namespace Training.UCO
{
    public  class DemoUCO
    {
        DemoPO m_DemoPO = new DemoPO();


        public string GetNextFormNumber(string formNo)
        {

            int seq = m_DemoPO.GetCurrentFormNumber(formNo, DateTime.Today.Year, DateTime.Today.Month);
            seq++;


            if(seq>1)
            m_DemoPO.UpdateCurrentFormNumber(formNo, DateTime.Today.Year, DateTime.Today.Month, seq);
            else
                m_DemoPO.InsertCurrentFormNumber(formNo, DateTime.Today.Year, DateTime.Today.Month, seq);
            
            return $"{formNo}{((DateTime.Today.Year-1911)%100).ToString("d2")}{DateTime.Today.Month.ToString("d2")}{seq.ToString("d4")}";
            
        }

        public DataTable GetUserData(string groupId)
        {
            return m_DemoPO.GetUserData(groupId);
        }

        public void InsertTaskData(DataRow dr)
        {
            m_DemoPO.InsertTaskData(dr);
        }

      

        public DataTable GetUserData()
        {
            return m_DemoPO.GetUserData();
        }

        public void InsertWsEndFormData(DataRow dr)
        {
            m_DemoPO.InsertWsEndFormData(dr);
        }


        public void InsertDDLStartFormData(DemoDataSet.TB_DEMO_DLL_FORMRow dr)
        {
            m_DemoPO.InsertDDLStartFormData(dr);
        }

        public void UpdateFormStatus(string docNbr, string signStatus)
        {
            m_DemoPO.UpdateFormStatus(docNbr, signStatus);
        }

        public void UpdateFormResult(string docNbr, string formResult)
        {
            m_DemoPO.UpdateFormResult(docNbr, formResult);
        }

    }
}
