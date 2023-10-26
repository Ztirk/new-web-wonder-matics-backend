import sql from "mssql";
import { devConfig } from "../config/devDb.config";

export const selectCustomer = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        WITH Customer AS (
          SELECT ROW_NUMBER() OVER(
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
                              AND ct.contact_code_id = 1 FOR XML PATH('')
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
              ) email
          FROM DevelopERP_ForTesting..Customer c
          WHERE c.customer_name LIKE @filter
      )
      SELECT *
      FROM Customer c
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

export const selectAllCustomer = async (filter: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .query(
        `
          SELECT ROW_NUMBER() OVER(
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
                              AND ct.contact_code_id = 1 FOR XML PATH('')
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
              ) email
          FROM DevelopERP_ForTesting..Customer c
          WHERE c.customer_name LIKE @filter
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};

export const insertCustomer = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
      
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};

export const updateCustomer = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
      
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};

export const deleteCustomer = async (filter: string, page: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
      
        `
      );
    return {
      customer: result.recordset,
    };
  } catch (err) {
    return { response: err };
  }
};
