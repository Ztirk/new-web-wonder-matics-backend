import sql from "mssql";
import { devConfig } from "../config/devDb.config";

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
            SELECT ROW_NUMBER() OVER(
                    ORDER BY ct.customer_id ASC
                ) no,
                ct.contact_id,
                CASE
                    WHEN ct.customer_id IS NOT NULL THEN (
                        SELECT c.customer_name
                        FROM DevelopERP_ForTesting..Customer c
                        WHERE c.customer_id = ct.customer_id
                    )
                    WHEN ct.person_id IS NOT NULL THEN (
                        SELECT CASE
                                WHEN p.nickname IS NOT NULL THEN '('
                                ELSE ''
                            END + COALESCE(p.nickname + ' ', '') + CASE
                                WHEN p.nickname IS NOT NULL THEN ') '
                                ELSE ''
                            END + COALESCE(p.firstname + ' ', '') + COALESCE(p.lastname, ' ', '')
                        FROM DevelopERP_ForTesting..Person p
                        WHERE p.person_id = ct.person_id
                    )
                    ELSE '-'
                END owner_name,
                CASE
                    WHEN ct.customer_id IS NOT NULL THEN 'Customer'
                    WHEN ct.person_id IS NOT NULL THEN 'Person'
                    ELSE '-'
                END type,
                ct.value,
                (
                    SELECT mc.value
                    FROM DevelopERP_ForTesting..MasterCode mc
                    WHERE mc.code_id = ct.contact_code_id
                ) contact_type
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