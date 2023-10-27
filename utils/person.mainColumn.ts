export const personMainColumn = `
ROW_NUMBER() OVER(ORDER BY p.person_id ASC) no,
        
p.person_id,

p.nickname,

COALESCE(p.firstname + ' ', '') + COALESCE(p.lastname + '', '') full_name,

STUFF((
    SELECT ', ' + ct.value 
    FROM DevelopERP_ForTesting..Contact ct
    WHERE ct.person_id = p.person_id AND ct.contact_code_id = 2
    FOR XML PATH('')
), 1, 2, '') mobile,

STUFF((
    SELECT ', ' + ct.value 
    FROM DevelopERP_ForTesting..Contact ct
    WHERE ct.person_id = p.person_id AND ct.contact_code_id = 3
    FOR XML PATH('')
), 1, 2, '') email,

STUFF((
    SELECT ', ' + mc.value
    FROM DevelopERP_ForTesting..Person_Role pr
    INNER JOIN DevelopERP_ForTesting..MasterCode mc ON pr.role_code_id = mc.code_id
    WHERE p.person_id = pr.person_id
    FOR XML PATH('')
), 1, 2, '') role,

p.description`