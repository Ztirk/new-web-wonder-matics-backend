import sql from "mssql";
import { devConfig } from "../config/devDb.config";

export const selectPackage = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};