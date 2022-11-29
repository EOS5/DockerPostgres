import { client } from "./connexion.js";


const getdrone_activities = (req, res) => {
    return client
    .query('SELECT * from drone_activities', (error,result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
} ;
const getdrone_activitiesById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from drone_activities Where drone_activity_id =$1',[id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

const addDroneActivity = (req, res) => {
    const {drone_activity_id, drone_id, date, flying_minute, docking_minute, planting_minute, gardening_minute, na_minute } = req.body;
    return client
    .query('INSERT INTO drone_activities (drone_activity_id, drone_id, date, flying_minute, docking_minute, planting_minute, gardening_minute, na_minute) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    [drone_activity_id, drone_id, date, flying_minute, docking_minute, planting_minute, gardening_minute, na_minute],
    (error,result) => {
        if(error) throw error;
        res.status(201).send("DroneActivity created succesfully");
    });
};
const removeDroneActivityById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from drone_activities Where drone_activity_id =$1',[id], (error,result) => {
        const noDroneActivityFound = !result.rows.length;
        if (noDroneActivityFound){
            res.send("DroneActivity does not exist");
        };

        client.query('DELETE FROM drone_activities WHERE drone_activity_id = $1'[id], (error,result) => {
            if (error) throw error;
            res.status(200).send("DroneActivity deleted succesfully");
        });
    });
};

const updateDroneActivitydrone_id = (req, res) => {
    const id = parseInt(req.params.id);
    const { drone_id } = req.body;
    return client
    .query('SELECT * from drone_activities Where drone_activity_id =$1',[id], (error,result) => {
        const noDroneActivityFound = !result.rows.length;
        if (noDroneActivityFound){
            res.send("DroneActivity does not exist");
        };

        client.query('UPDATE drone_activities SET drone_id = $1 WHERE drone_activity_id = $2',
        [drone_id,id], 
        (error,result) => {
            if (error) throw error;
            res.status(200).send("DroneActivity updated");
        });
    });
};
export { getdrone_activities, getdrone_activitiesById, addDroneActivity ,removeDroneActivityById, updateDroneActivitydrone_id}