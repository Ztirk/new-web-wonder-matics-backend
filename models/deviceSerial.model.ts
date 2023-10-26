import sql from "mssql";
import { devConfig } from "../config/devDb.config";

export const selectDeviceSerial = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        WITH DeviceSerial As (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY ds.device_serial_id ASC) no,

			ds.device_serial_id,

			ds.serial_id,

			(SELECT mc.value FROM DevelopERP_ForTesting..MasterCode mc
			WHERE mc.code_id = ds.device_type_code_id) device_type,

			ds.create_date
        
            FROM DevelopERP_ForTesting..DeviceSerial ds
			WHERE ds.serial_id LIKE @filter
        )
        
        SELECT * FROM DeviceSerial
        WHERE no BETWEEN (@page-1)*10+1 AND (@page-1)*10+10
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};