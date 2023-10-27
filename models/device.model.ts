import sql from "mssql";
import { devConfig } from "../config/devDb.config";
import { deviceMainColumn } from "../utils/device.mainColumn";

export const selectDevice = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        WITH Device AS (
            SELECT 
                ${deviceMainColumn}
        
            FROM DevelopERP_ForTesting..Device d
			WHERE (SELECT serial_id FROM DevelopERP_ForTesting..DeviceSerial ds
			WHERE ds.device_serial_id = d.device_serial_id) LIKE @filter
        )
        
        SELECT * FROM Device
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