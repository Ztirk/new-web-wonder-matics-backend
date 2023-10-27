export const fleetMainColumn = `
ROW_NUMBER() OVER(ORDER BY f.fleet_id ASC) no,

f.fleet_id,

f.fleet_name,

f.parent_fleet_id`;
