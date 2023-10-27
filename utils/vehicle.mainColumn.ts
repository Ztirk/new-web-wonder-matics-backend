export const vehicleMainColumn = `
ROW_NUMBER() OVER(
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
) model_type`;
