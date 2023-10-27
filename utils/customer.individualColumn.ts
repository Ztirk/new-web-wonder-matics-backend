export const customerIndividualColumn = `c.customer_id, 
c.sales_type_code_id, 
c.customer_type_code_id,
(SELECT mc.value FROM DevelopERP_ForTesting..MasterCode mc
WHERE mc.code_id = c.customer_type_code_id) customer_type,
(SELECT mc.value FROM DevelopERP_ForTesting..MasterCode mc
WHERE mc.code_id = c.sales_type_code_id) sales_type`