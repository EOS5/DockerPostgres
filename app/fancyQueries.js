import { client } from "./connexion";

client.connect();

const createDroneActivitiesFromMaintenance = (req, res) => {
    client.query("CREATE view drone_activities_from_maintenance AS SELECT d.drone_id, last_maintenance "
    +"SUM(flying_minute) / 60 AS flying_hour, "
    +"SUM(docking_minute) / 60 AS docking_hour, "
    +"SUM(planting_minute) / 60 AS planting_hour, "
    +"SUM(gardening_minute) / 60 AS gardening_hour, "
    +"SUM(na_minute) / 60 AS na_hour, "
    +"SUM((planting_minute + gardening_minute) / 60 AS productivity_activity_hour "
    +"FROM drone_activities da "
    +"INNER JOIN drones d ON da.drone_id=d.drone_id "
    +"WHERE da.date > last_maintenance "
    +"GROUP BY d.drone_id, last_maintenance "
    +"ORDER BY d.drone_id;", (error, result) => {
        if (error) throw error;
        res.status(200).send("View created")
    });
}
const getView = (req, res) => {
    client.query("SELECT * FROM drone_activities_from_maintenance;", (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows)
    });
}

export {createDroneActivitiesFromMaintenance, getView}