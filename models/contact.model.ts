import sql from "mssql";
import { devConfig } from "../config/devDb.config";
import { contactMainColumn } from "../utils/contact.mainColumn";

export const selectContact = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        WITH Contact AS (
            SELECT ${contactMainColumn}
            FROM DevelopERP_ForTesting..Contact ct
            WHERE ct.value LIKE @filter
        )
        SELECT *
        FROM Contact --WHERE no BETWEEN (@page -1) * 10 + 1 AND (@page -1) * 10 + 10
        WHERE no BETWEEN (@page -1) * 10 + 1 AND (@page -1) * 10 + 10    
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};
