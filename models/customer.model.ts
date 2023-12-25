import sql, { ISqlType, MSSQLError } from "mssql";
import { devConfig } from "../config/devDb.config";
import { customerMainColumn } from "../utils/customer.mainColumn";
import { customerIndividualColumn } from "../utils/customer.individualColumn";
import { contactMainColumn } from "../utils/contact.mainColumn";
import { personMainColumn } from "../utils/person.mainColumn";
import { contactIndividualColumn } from "../utils/contact.individualColumn";
import { addressMainColumn } from "../utils/address.mainColumn";
import { fleetMainColumn } from "../utils/fleet.mainColumn";
import { vehicleMainColumn } from "../utils/vehicle.mainColumn";
import { InsertCustomer } from "../interfaces/customer.interface";

export const selectCustomer = async (filter: string, page: number | null) => {
  try {
    const pool = await sql.connect(devConfig);
    const result = await pool
      .request()
      .input("filter", sql.NVarChar, filter)
      .input("page", sql.Int, page)
      .query(
        `
        EXEC DevelopERP_ForKrit..select_customer @page, @filter
        `
      );
    return {
      status: 1,
      message: "Success",
      customer: result.recordset,
    };
  } catch (err) {
    return {
      status: 0,
      message: err instanceof MSSQLError ? err.originalError?.message : err,
    };
  }
};

export const selectIndividualCustomer = async (customer_id: number) => {
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
        status: 1,
        message: "",
        response: {
          customer: result.recordsets[0],
          person: result.recordsets[1],
          contact: result.recordsets[2],
          address: result.recordsets[3],
          fleet: result.recordsets[4],
          vehicle: result.recordsets[5],
        },
      };
    }
  } catch (err) {
    return {
      status: 0,
      message: err instanceof MSSQLError ? err.originalError?.message : err,
    };
  }
};

export const insertCustomer = async (body: InsertCustomer) => {
  const pool = await sql.connect(devConfig);
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();

    const customer = body.customer;
    await transaction
      .request()
      .input("customer_name", sql.NVarChar, customer.customer_name)
      .input("customer_type_code_id", sql.Int, customer.customer_type_code_id)
      .input("sales_type_code_id", sql.Int, customer.sales_type_code_id)
      .query(
        "EXEC DevelopERP_ForKrit..insert_customer @customer_name, @customer_type_code_id, @sales_type_code_id"
      );

    const personExist = body.personExist;
    for (const personId of personExist) {
      // await transaction.request().input()
    }

    const contactNew = body.contactNew;
    for (const contactData of contactNew) {
    }

    await transaction.commit();

    return { status: 1, message: "Inserted successfully" };
  } catch (err) {
    await transaction.rollback();
    return {
      status: 0,
      message: err instanceof MSSQLError ? err.originalError?.message : err,
    };
  } finally {
    await pool.close();
  }
};

export const updateCustomer = async (filter: string, page: string) => {};

export const deleteCustomer = async (filter: string, page: string) => {};
