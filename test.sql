SELECT $ { customerIndividualColumn }
FROM DevelopERP_ForTesting..Customer c
WHERE customer_id = @customer_id

SELECT $ { personMainColumn }
FROM DevelopERP_ForTesting..Customer_Person cp
    LEFT JOIN DevelopERP_ForTesting..Person p ON cp.person_id = p.person_id
WHERE cp.customer_id = @customer_id

SELECT $ { contactIndividualColumn }
FROM DevelopERP_ForTesting..Contact ct
    LEFT JOIN DevelopERP_ForTesting..MasterCode mc ON ct.contact_code_id = mc.code_id
WHERE ct.customer_id = @customer_id

SELECT $ { addressMainColumn }
FROM DevelopERP_ForTesting..Address_Customer ac
    LEFT JOIN DevelopERP_ForTesting..Address a ON ac.address_id = a.address_id
WHERE ac.customer_id = @customer_id

SELECT $ { fleetMainColumn }
    LEFT JOIN DevelopERP_ForTesting..Fleet f ON fc.fleet_id = f.fleet_id
WHERE fc.customer_id = @customer_id

SELECT $ { vehicleMainColumn }
FROM DevelopERP_ForTesting..Vehicle_Customer vc
    LEFT JOIN DevelopERP_ForTesting..Vehicle v ON vc.vehicle_id = v.vehicle_id
WHERE vc.customer_id = @customer_id