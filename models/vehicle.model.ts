import sql from "mssql";
import { devConfig } from "../config/devDb.config";
import { vehicleMainColumn } from "../utils/vehicle.mainColumn";

export const selectVehicle = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        WITH Vehicle AS (
            SELECT ROW_NUMBER() OVER(
                    ORDER BY v.vehicle_id ASC
                ) no,
                v.vehicle_id,
                COALESCE(v.license_plate + ' ', '') + '(' + COALESCE(
                    (
                        SELECT mc.value
                        FROM DevelopERP_ForTesting..MasterCode mc
                        WHERE mc.code_id = v.registration_province_code_id
                    ),
                    ' ',
                    ''
                ) + ')' license_plate,
                v.frame_no,
                (
                    SELECT mc.value
                    FROM DevelopERP_ForTesting..MasterCode mc
                    WHERE v.vehicle_type_code_id = mc.code_id
                ) vehicle_type,
                (
                    SELECT COALESCE(vm.brand + ' ', '') + COALESCE(vm.model, '')
                    FROM DevelopERP_ForTesting..VehicleModel vm
                    WHERE v.vehicle_model_id = vm.vehicle_model_id
                ) model_type
            FROM DevelopERP_ForTesting..Vehicle v
            WHERE v.frame_no LIKE @filter
        )
        SELECT *
        FROM Vehicle
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

export const selectAllVehicle = async (filter: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .query(
        `
            SELECT ${vehicleMainColumn}
            FROM DevelopERP_ForTesting..Vehicle v
            WHERE v.frame_no LIKE @filter
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};
