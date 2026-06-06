// import { MAX } from "uuid";
import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const switchBranchsogetBranch = async (orgname, orgcode, username) => {
  try {
    let rows;
    if (username === "admin") {
      [rows] = await connection.execute(
        "SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ? And  IsDeleted = 0",
        [orgname, orgcode]
      );
    } else {
      [rows] = await connection.execute(
        "SELECT ownbranchname, branchcode FROM branchaccess WHERE orgname = ? AND orgcode = ? AND username = ? And  IsDeleted = 0",
        [orgname, orgcode, username]
      );
    }
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};

export const fetchBranchStats = async (
  orgname,
  orgcode,
  branchnameofemp,
  branchcodeofemp
) => {
  try {
    // Common parameters for all queries
    const params = [orgname, orgcode, branchnameofemp, branchcodeofemp];

    // Get all import job stats in a single query
    const [impJobStats] = await connection.execute(
      `SELECT 
          COUNT(*) AS totalImpJobsCount,
          SUM(IsActive = '1' AND IsComplete = '1') AS totalCompletedImpJobsCount,
          SUM(IsActive = '0' AND IsComplete = '0') AS totalPendingImpJobsCount
        FROM impjobcreation 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      params
    );

    // Get all export job stats in a single query
    const [expJobStats] = await connection.execute(
      `SELECT 
          COUNT(*) AS totalExpjobsCount,
          SUM(IsActive = '1' AND IsComplete = '1') AS totalCompletedExpJobsCount,
          SUM(IsActive = '0' AND IsComplete = '0') AS totalPendingExpJobsCount
        FROM expjobcreation 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      params
    );

    // transport jobs
    const [totalTransportJobsCount] = await connection.execute(
      `SELECT COUNT(*) AS totalTransportJobsCount FROM (
         SELECT id, orgname, orgcode, branchname, branchcode 
         FROM impjobcreation 
         WHERE owntransportation = 'YES'
         UNION ALL
         SELECT id, orgname, orgcode, branchname, branchcode 
         FROM expjobcreation 
         WHERE owntransportation = 'YES'
       ) AS combinedJobs
       WHERE orgname = ? 
         AND orgcode = ? 
         AND branchname = ? 
         AND branchcode = ?`,
      params
    );

    // Get prospect count
    const [prospects] = await connection.execute(
      `SELECT COUNT(*) AS ProspectsCount 
         FROM prospect 
         WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      params
    );

    //Get Import charts count
    const [monthlyImpStats] = await connection.execute(
      `SELECT 
        DATE_FORMAT(jobdate, '%Y-%m') AS month,
        COUNT(*) AS totalImpJobs
      FROM impjobcreation
      WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
      GROUP BY DATE_FORMAT(jobdate, '%Y-%m')
      ORDER BY month`,
      params
    );

    //Get Export charts count
    const [monthlyExpStatus] = await connection.execute(
      `SELECT 
        DATE_FORMAT(jobdate, '%Y-%m') AS month,
        COUNT(*) AS totalExpJobs
      FROM expjobcreation
      WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
      GROUP BY DATE_FORMAT(jobdate, '%Y-%m')
      ORDER BY month`,
      params
    );

    const allParams = [...params, ...params, ...params, ...params];

    const [monthlyAccStatus] = await connection.execute(
      `SELECT 
        COALESCE(c.month, d.month) AS month,
        COALESCE(totalcreditno, 0) AS totalcreditno,
        COALESCE(totaldebitno, 0) AS totaldebitno
      FROM (
        SELECT 
          DATE_FORMAT(currentdate, '%Y-%m') AS month,
          SUM(amountReceived) AS totalcreditno
        FROM credit
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
        GROUP BY DATE_FORMAT(currentdate, '%Y-%m')
      ) AS c
      LEFT JOIN (
        SELECT 
          DATE_FORMAT(date, '%Y-%m') AS month,
          SUM(CAST(netpaymentamount AS DECIMAL(12,2))) AS totaldebitno
        FROM debit
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
        GROUP BY DATE_FORMAT(date, '%Y-%m')
      ) AS d ON c.month = d.month

      UNION

      SELECT 
        COALESCE(c.month, d.month) AS month,
        COALESCE(totalcreditno, 0) AS totalcreditno,
        COALESCE(totaldebitno, 0) AS totaldebitno
      FROM (
        SELECT 
          DATE_FORMAT(currentdate, '%Y-%m') AS month,
          SUM(amountReceived) AS totalcreditno
        FROM credit
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
        GROUP BY DATE_FORMAT(currentdate, '%Y-%m')
      ) AS c
      RIGHT JOIN (
        SELECT 
          DATE_FORMAT(date, '%Y-%m') AS month,
          SUM(CAST(netpaymentamount AS DECIMAL(12,2))) AS totaldebitno
        FROM debit
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
        GROUP BY DATE_FORMAT(date, '%Y-%m')
      ) AS d ON c.month = d.month
      ORDER BY month`,
      allParams
    );

    // Combine results and handle null values
    return {
      totalImpJobsCount: Number(impJobStats[0].totalImpJobsCount) || 0,
      totalCompletedImpJobsCount:
        Number(impJobStats[0].totalCompletedImpJobsCount) || 0,
      totalPendingImpJobsCount:
        Number(impJobStats[0].totalPendingImpJobsCount) || 0,
      totalExpjobsCount: Number(expJobStats[0].totalExpjobsCount) || 0,
      totalCompletedExpJobsCount:
        Number(expJobStats[0].totalCompletedExpJobsCount) || 0,
      totalPendingExpJobsCount:
        Number(expJobStats[0].totalPendingExpJobsCount) || 0,
      totalTransportJobsCount:
        Number(totalTransportJobsCount[0].totalTransportJobsCount) || 0,
      ProspectsCount: Number(prospects[0].ProspectsCount) || 0,

      chartData: {
        monthlyImpJobs: monthlyImpStats.map((row) => ({
          month: row.month,
          ImpJobs: Number(row.totalImpJobs) || 0,
        })),
        monthlyExpJobs: monthlyExpStatus.map((row) => ({
          month: row.month,
          ExpJobs: Number(row.totalExpJobs) || 0,
        })),
        monthlyAccStats: monthlyAccStatus.map((row) => ({
          month: row.month,
          credit: Number(row.totalcreditno) || 0,
          debit: Number(row.totaldebitno) || 0,
        })),
      },
    };
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};

export const fetchImpStats = async (
  orgname,
  orgcode,
  branchnameofemp,
  branchcodeofemp,
  startDate,
  endDate
) => {
  try {
    // console.log("SD", startDate);
    // console.log("ED", endDate);
    // Common parameters for all queries
    const params = [
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      startDate,
      endDate,
    ];

    // 1. Combine the four ImpJobCreation queries into a single query
    const [jobStats] = await connection.execute(
      `SELECT 
          SUM(owntransportation = 'YES') AS OwnTransportJobCount,
          SUM(ownbooking = 'YES') AS OwnBookingJobCount,
          SUM(transportmode = 'AIR') AS AirTransportationCount,
          SUM(transportmode = 'SEA') AS SeaTransportationCount,
          SUM(consignmenttype = 'FCL') AS FCLConsignmentCount,
          SUM(consignmenttype = 'LCL') AS LCLConsignmentCount,
          SUM(consignmenttype = 'Break Bulk') AS BreakBulkConsignmentCount,
          SUM(deliverymode = 'Loaded') AS LoadedDeliveryCount,
          SUM(deliverymode = 'Destuff') AS DestuffDeliveryCount
        FROM impjobcreation 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND jobdate BETWEEN ? AND ?`,
      params
    );

    // 2. Container stats query - kept separate because of the JSON_TABLE join
    const [containerStats] = await connection.execute(
      `SELECT 
          SUM(type = "20'") AS TwentyCount,
          SUM(type = "40'") AS FortyCount,
          SUM(type = "20' ISO Tank") AS TwentyISOCount,
          SUM(type = "40' ISO Tank") AS FortyISOCount,
          SUM(type = "LCL") AS LCLCount,
          SUM(type = "Flat Bulk") AS FlatBulkCount,
          SUM(type = "Break Bulk") AS BreakBulkCount,
          SUM(type IN ("20'", "40'", "20' ISO Tank", "40' ISO Tank", "LCL", "Flat Bulk", "Break Bulk")) AS TotalContainers
        FROM impjobcreation
        JOIN JSON_TABLE(containerNoAndWeight, '$[*]' COLUMNS (
          type VARCHAR(20) PATH '$.type'
        )) AS container
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND jobdate BETWEEN ? AND ?`,
      params
    );

    // 3. Tracking stats with all processing in SQL instead of JavaScript
    const [trackingStats] = await connection.query(
      `SELECT 
    SUM(IF(timing = "Before", 1, 0)) AS CompletedOnTimeCount,
    SUM(IF(timing = "After" , 1, 0)) AS DelayedCount
FROM (
    SELECT ti.jobnumber, ti.plandate, ti.actualdate, ti.timing
FROM trackingimport ti
INNER JOIN (
    SELECT jobnumber, MAX(plandate) AS maxPlanDate
    FROM trackingimport
    WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
    GROUP BY jobnumber
) AS finalMilestone 
ON ti.jobnumber = finalMilestone.jobnumber 
AND ti.plandate = finalMilestone.maxPlanDate
WHERE ti.actualdate BETWEEN ? AND ?
) AS timeliness;`,
      params
    );

    // NEW QUERY: Monthly stats for line charts
    const [monthlyStats] = await connection.execute(
      `SELECT 
        DATE_FORMAT(jobdate, '%Y-%m') AS month,
        COUNT(*) AS totalJobs,
        SUM(consignmenttype = 'FCL') AS FCLCount,
        SUM(consignmenttype = 'LCL') AS LCLCount,
        SUM(consignmenttype = 'Break Bulk') AS BreakBulkCount
      FROM impjobcreation
      WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? 
            AND jobdate BETWEEN ? AND ?
      GROUP BY DATE_FORMAT(jobdate, '%Y-%m')
      ORDER BY month`,
      params
    );

    // NEW QUERY: Monthly completion stats for line chart
    const [monthlyCompletionStats] = await connection.execute(
      `SELECT 
        DATE_FORMAT(ti.actualdate, '%Y-%m') AS month,
        SUM(IF(ti.timing = "Before", 1, 0)) AS completedOnTime,
        SUM(IF(ti.timing = "After", 1, 0)) AS delayedCount
      FROM trackingimport ti
      INNER JOIN (
        SELECT jobnumber, MAX(plandate) AS maxPlanDate
        FROM trackingimport
        WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
        GROUP BY jobnumber
      ) AS finalMilestone 
      ON ti.jobnumber = finalMilestone.jobnumber AND ti.plandate = finalMilestone.maxPlanDate
      WHERE ti.actualdate BETWEEN ? AND ?
      GROUP BY DATE_FORMAT(ti.actualdate, '%Y-%m')
      ORDER BY month`,
      params
    );

    // NEW QUERY: Delayed milestone stats for bar chart
    const [delayedMilestoneStats] = await connection.execute(
      `SELECT 
        tatimpcolumn AS milestoneName,
        COUNT(*) AS delayedCount
      FROM trackingimport
      WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
        AND timing = "After" AND actualdate BETWEEN ? AND ?
      GROUP BY tatimpcolumn
      ORDER BY delayedCount DESC`,
      params
    );

    // 4. Combine all results into a single response
    const result = {
      // Apply default values for all numeric values
      ...Object.fromEntries(
        Object.entries({
          ...trackingStats[0],
          ...jobStats[0],
          ...containerStats[0],
        }).map(([key, value]) => [key, value ?? 0])
      ),
      // Add chart data
      chartData: {
        monthlyCompletionStats: monthlyCompletionStats.map((row) => ({
          month: row.month,
          completedOnTime: Number(row.completedOnTime) || 0,
          delayed: Number(row.delayedCount) || 0,
        })),
        monthlyConsignmentStats: monthlyStats.map((row) => ({
          month: row.month,
          FCL: Number(row.FCLCount) || 0,
          LCL: Number(row.LCLCount) || 0,
          BreakBulk: Number(row.BreakBulkCount) || 0,
        })),
        delayedMilestoneStats: delayedMilestoneStats.map((row) => ({
          tatimpcolumn: row.milestoneName,
          count: Number(row.delayedCount) || 0,
        })),
      },
    };

    return result;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for higher-level error handling
  }
};

export const fetchExpStats = async (
  orgname,
  orgcode,
  branchnameofemp,
  branchcodeofemp,
  startDate,
  endDate
) => {
  try {
    // Common parameters for all queries
    const params = [
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      startDate,
      endDate,
    ];

    // 1. Combine the four ImpJobCreation queries into a single query
    const [jobStats] = await connection.execute(
      `SELECT 
          SUM(owntransportation = 'YES') AS OwnTransportJobCount,
          SUM(ownbooking = 'YES') AS OwnBookingJobCount,
          SUM(transportmode = 'AIR') AS AirTransportationCount,
          SUM(transportmode = 'SEA') AS SeaTransportationCount,
          SUM(consignmenttype = 'FCL') AS FCLConsignmentCount,
          SUM(consignmenttype = 'LCL') AS LCLConsignmentCount,
          SUM(consignmenttype = 'Break Bulk') AS BreakBulkConsignmentCount,
          SUM(deliverymode = 'Factory stuff') AS FactoryStuffCount,
          SUM(deliverymode = 'Dock stuff') AS DockStuffCount
        FROM expjobcreation 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND jobdate BETWEEN ? AND ?`,
      params
    );

    // 2. Container stats query - kept separate because of the JSON_TABLE join
    const [containerStats] = await connection.execute(
      `SELECT 
          SUM(type = "20'") AS TwentyCount,
          SUM(type = "40'") AS FortyCount,
          SUM(type = "20' ISO Tank") AS TwentyISOCount,
          SUM(type = "40' ISO Tank") AS FortyISOCount,
          SUM(type = "LCL") AS LCLCount,
          SUM(type = "Flat Bulk") AS FlatBulkCount,
          SUM(type = "Break Bulk") AS BreakBulkCount,
          SUM(type IN ("20'", "40'", "20' ISO Tank", "40' ISO Tank", "LCL", "Flat Bulk", "Break Bulk")) AS TotalContainers
        FROM expjobcreation
        JOIN JSON_TABLE(containerNoAndWeight, '$[*]' COLUMNS (
          type VARCHAR(20) PATH '$.type'
        )) AS container
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND jobdate BETWEEN ? AND ?`,
      params
    );

    // 3. Tracking stats with all processing in SQL instead of JavaScript
    const [trackingStats] = await connection.execute(
      `SELECT 
    SUM(IF(timing = "Before", 1, 0)) AS CompletedOnTimeCount,
    SUM(IF(timing = "After" , 1, 0)) AS DelayedCount
FROM (
    SELECT te.jobnumber, te.timing
    FROM trackingexport te
    INNER JOIN (
        SELECT jobnumber, MAX(plandate) AS maxPlanDate
        FROM trackingexport
        WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
        GROUP BY jobnumber
    ) AS finalMilestone 
    ON te.jobnumber = finalMilestone.jobnumber 
    AND te.plandate = finalMilestone.maxPlanDate
    WHERE te.actualdate BETWEEN ? AND ?
) AS timeliness;`,
      params
    );

    // NEW QUERY: Monthly stats for line charts
    const [monthlyStats] = await connection.execute(
      `SELECT 
        DATE_FORMAT(jobdate, '%Y-%m') AS month,
        COUNT(*) AS totalJobs,
        SUM(consignmenttype = 'FCL') AS FCLCount,
        SUM(consignmenttype = 'LCL') AS LCLCount,
        SUM(consignmenttype = 'Break Bulk') AS BreakBulkCount
      FROM expjobcreation
      WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? 
            AND jobdate BETWEEN ? AND ?
      GROUP BY DATE_FORMAT(jobdate, '%Y-%m')
      ORDER BY month`,
      params
    );

    // NEW QUERY: Monthly completion stats for line chart
    const [monthlyCompletionStats] = await connection.execute(
      `SELECT 
        DATE_FORMAT(te.actualdate, '%Y-%m') AS month,
        SUM(IF(te.timing = "Before", 1, 0)) AS completedOnTime,
        SUM(IF(te.timing = "After", 1, 0)) AS delayedCount
      FROM trackingexport te
      INNER JOIN (
        SELECT jobnumber, MAX(plandate) AS maxPlanDate
        FROM trackingexport
        WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
        GROUP BY jobnumber
      ) AS finalMilestone 
      ON te.jobnumber = finalMilestone.jobnumber AND te.plandate = finalMilestone.maxPlanDate
      WHERE te.actualdate BETWEEN ? AND ?
      GROUP BY DATE_FORMAT(te.actualdate, '%Y-%m')
      ORDER BY month`,
      params
    );

    // NEW QUERY: Delayed milestone stats for bar chart
    const [delayedMilestoneStats] = await connection.execute(
      `SELECT 
        tatexpcolumn AS milestoneName,
        COUNT(*) AS delayedCount
      FROM trackingexport
      WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
        AND timing = "After" AND actualdate BETWEEN ? AND ?
      GROUP BY tatexpcolumn
      ORDER BY delayedCount DESC`,
      params
    );

    // 4. Combine all results into a single response
    const result = {
      // Apply default values for all numeric values
      ...Object.fromEntries(
        Object.entries({
          ...trackingStats[0],
          ...jobStats[0],
          ...containerStats[0],
        }).map(([key, value]) => [key, value ?? 0])
      ),
      // Add chart data
      chartData: {
        monthlyCompletionStats: monthlyCompletionStats.map((row) => ({
          month: row.month,
          completedOnTime: Number(row.completedOnTime) || 0,
          delayed: Number(row.delayedCount) || 0,
        })),
        monthlyConsignmentStats: monthlyStats.map((row) => ({
          month: row.month,
          FCL: Number(row.FCLCount) || 0,
          LCL: Number(row.LCLCount) || 0,
          BreakBulk: Number(row.BreakBulkCount) || 0,
        })),
        delayedMilestoneStats: delayedMilestoneStats.map((row) => ({
          tatexpcolumn: row.milestoneName,
          count: Number(row.delayedCount) || 0,
        })),
      },
    };

    return result;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for higher-level error handling
  }
};

export const fetchDashboardAccess = async (
  username,
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT section FROM accesscontrol WHERE username = ? AND orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?",
      [username, orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for higher-level error handling
  }
};
