export const customerMainColumn = `
ROW_NUMBER() OVER(
    ORDER BY c.customer_id ASC
) no,
c.customer_id,
c.customer_name,
ISNULL(
    STUFF(
        (
            SELECT ', ' + ct.value
            FROM DevelopERP_ForTesting..Contact ct
            WHERE ct.customer_id = c.customer_id
                AND ct.contact_code_id = 2 FOR XML PATH('')
        ),
        1,
        2,
        ''
    ),
    '-'
) telephone,
ISNULL(
    STUFF(
        (
            SELECT ', ' + ct.value
            FROM DevelopERP_ForTesting..Contact ct
            WHERE ct.customer_id = c.customer_id
                AND ct.contact_code_id = 3 FOR XML PATH('')
        ),
        1,
        2,
        ''
    ),
    '-'
) email`;
