import sql from "mssql";
import { devConfig } from "../config/devDb.config";

export const selectCustomer = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `WITH RowedTable AS(
           SELECT 
             ROW_NUMBER() OVER(ORDER BY c.customer_id ASC) no,
             c.customer_id, 
             c.customer_name,
             STUFF((SELECT ', ' + ct.value
                 FROM DevelopERP..ForTestingContact ct
                 INNER JOIN DevelopERP..ForTestingMasterCode mc ON ct.contact_code_id = mc.code_id
                 WHERE c.customer_id = ct.customer_id AND mc.value = 'แฟกซ์'
                 FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '') AS ConcatenatedValues,
             (SELECT TOP 1 ct.value FROM DevelopERP..ForTestingContact ct
             INNER JOIN DevelopERP..ForTestingMasterCode mc ON ct.contact_code_id = mc.code_id
             WHERE ct.customer_id = c.customer_id AND mc.value = 'แฟกซ์') fax,
             (SELECT TOP 1 ct.value FROM DevelopERP..ForTestingContact ct
             INNER JOIN DevelopERP..ForTestingMasterCode mc ON ct.contact_code_id = mc.code_id
             WHERE ct.customer_id = c.customer_id AND mc.value = 'ไลน์') line
           FROM DevelopERP..ForTestingCustomer c
           WHERE c.customer_name LIKE @filter
         )
         
        SELECT *
        FROM RowedTable rt
        WHERE no BETWEEN (@page - 1)*10 + 1 AND (@page - 1)*10 + 10
      `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};
