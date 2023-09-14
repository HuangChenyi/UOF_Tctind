using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Training.FieldObj
{
    public class POFields
    {
        public string TASK_ID { get; set; } = "";
        public string 請購單號 { get; set; } = "";
        public string 品項 { get; set; } = "";
        public string 請購部門 { get; set; } = "";
        public string 申請者 { get; set; } = "";
        public List<POList> 清單 { get; set; }= new List<POList>();
    }

    public class POList
    {
        public string ID { get; set; } = "";
        public string 零件編號 { get; set; } = "";  
            public string 產品名稱 { get; set; } = "";
        public double   金額 { get; set; } = 0;
    }
}
