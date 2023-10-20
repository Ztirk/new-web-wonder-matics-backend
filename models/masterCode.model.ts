import sql from "mssql";
import { devConfig } from "../config/devDb.config";

export const selectMasterCode = async (category: string, className: string) => {
  try {
    category = `%${category}%`;
    className = `%${className}%`;
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("category", sql.NVarChar, category)
      .input("class", sql.NVarChar, className)
      .query(`SELECT * FROM MasterCode mc
              WHERE mc.category LIKE @category AND ${
                className == "%null%"
                  ? "mc.class IS NULL"
                  : "mc.class LIKE @class"
              }`);
    return {
      masterCode: result.recordset,
    };
  } catch (err) {
    return err;
  }
};
