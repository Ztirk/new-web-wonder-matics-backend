import sql, { ISqlType } from "mssql";
import { devConfig } from "../config/devDb.config";
import { customerMainColumn } from "../utils/customer.mainColumn";
import { customerIndividualColumn } from "../utils/customer.individualColumn";
import { contactMainColumn } from "../utils/contact.mainColumn";
import { personMainColumn } from "../utils/person.mainColumn";
import { contactIndividualColumn } from "../utils/contact.individualColumn";
import { addressMainColumn } from "../utils/address.mainColumn";
import { fleetMainColumn } from "../utils/fleet.mainColumn";
import { vehicleMainColumn } from "../utils/vehicle.mainColumn";

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
          SELECT ${customerMainColumn}
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
          SELECT ${customerMainColumn}
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

export const selectIndividualCustomer = async (customer_id: string) => {
  try {
    let pool = await sql.connect(devConfig);
    let result = await pool
      .request()
      .input("customer_id", sql.Int, customer_id)
      .query(
        `
        SELECT ${customerIndividualColumn}
        FROM DevelopERP_ForTesting..Customer c
        WHERE customer_id = @customer_id

        SELECT ${personMainColumn}
        FROM DevelopERP_ForTesting..Customer_Person cp
            LEFT JOIN DevelopERP_ForTesting..Person p ON cp.person_id = p.person_id
        WHERE cp.customer_id = @customer_id

        SELECT ${contactIndividualColumn}
        FROM DevelopERP_ForTesting..Contact ct
            LEFT JOIN DevelopERP_ForTesting..MasterCode mc ON ct.contact_code_id = mc.code_id
        WHERE ct.customer_id = @customer_id

        SELECT ${addressMainColumn}
        FROM DevelopERP_ForTesting..Address_Customer ac
            LEFT JOIN DevelopERP_ForTesting..Address a ON ac.address_id = a.address_id
        WHERE ac.customer_id = @customer_id

        SELECT ${fleetMainColumn}
        FROM DevelopERP_ForTesting..Fleet_Customer fc
            LEFT JOIN DevelopERP_ForTesting..Fleet f ON fc.fleet_id = f.fleet_id
        WHERE fc.customer_id = @customer_id

        SELECT ${vehicleMainColumn}
        FROM DevelopERP_ForTesting..Vehicle_Customer vc
            LEFT JOIN DevelopERP_ForTesting..Vehicle v ON vc.vehicle_id = v.vehicle_id
        WHERE vc.customer_id = @customer_id
        `
      );

    if (Array.isArray(result.recordsets)) {
      return {
        customer: result.recordsets[0],
        person: result.recordsets[1],
        contact: result.recordsets[2],
        address: result.recordsets[3],
        fleet: result.recordsets[4],
        vehicle: result.recordsets[5],
      };
    }
  } catch (err) {
    return { response: err };
  }
};

// ลองทำ insert customer ใหม่พร้อมกับข้อมูล บุคคล ที่อยู่ การติดต่อ
// หน้าตาคงประมาณนี้
// {customer: {customer_id:, customer_name:, sales_type_code_id, customer_type_code_id}
//  personExist: id
//  personNew: {firstname:, lastname:, title_code_id:, }
//  personDelete:
//  addressExist: id 
//  addressNew: {..}
//  addressDelete:
//  contactExist: id
//  contactNew: {contact_type_code_id:, value:}
//  contactDelete: id 
//}

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
    return {};
  } catch (err) {
    return { response: err };
  }
};
