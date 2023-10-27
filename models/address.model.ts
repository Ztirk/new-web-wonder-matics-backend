import sql from "mssql";
import { devConfig } from "../config/devDb.config";
import { addressMainColumn } from "../utils/address.mainColumn";

export const selectAddress = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        WITH Address AS (
            SELECT ${addressMainColumn}
            FROM DevelopERP_ForTesting..Address a
            WHERE COALESCE(a.name + ' ', '') + COALESCE(a.house_no + ' ', '') + COALESCE(a.village_no + ' ', '') + COALESCE(a.alley + ' ', '') + COALESCE(a.road + ' ', '') + COALESCE(a.sub_district + ' ', '') + COALESCE(a.district + ' ', '') + COALESCE(a.province + ' ', '') + COALESCE(a.postal_code, '') LIKE @filter
        )
        SELECT *
        FROM Address
        WHERE no BETWEEN (@page -1) * 10 + 1 AND (@page -1) * 10 + 10
        `
      );
    return {
      address: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};
