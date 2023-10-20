import sql from "mssql";
import { devConfig } from "../config/devDb.config";

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
                ROW_NUMBER() OVER(ORDER BY d.device_id ASC) no,

			device_id,

			veh_id,

			(SELECT serial_id FROM DevelopERP_ForTesting..DeviceSerial ds
			WHERE ds.device_serial_id = d.device_serial_id) serial_id,
     
			(SELECT mc.value FROM DevelopERP_ForTesting..DeviceSerial ds
			INNER JOIN DevelopERP_ForTesting..MasterCode mc ON ds.device_type_code_id = mc.code_id
			WHERE ds.device_serial_id = d.device_serial_id) device_type,

			(SELECT mc.value FROM DevelopERP_ForTesting..DeviceConfig dc
			INNER JOIN DevelopERP_ForTesting..MasterCode mc ON dc.sim_type_code_id = mc.code_id
			WHERE dc.device_id = d.device_id) sim_type,

			create_date
        
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