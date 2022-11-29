import { client } from "./connexion";

client.connect();


const getDrone = (req, res) => {
    return client
    .query('SELECT * from drones', (error,result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    })
} 
const getDronesById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from drones Where drone_id =$1',[id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    })
}

const addDrone = (req, res) => {
    const {drone_id, firmware, last_maintenance } = req.body;
    return client
    .query('INSERT INTO drones (drone_id, firmware, last_maintenance) VALUES ($1,$2,$3)',
    [drone_id,firmware,last_maintenance],
    (error,result) => {
        if(error) throw error;
        res.status(201).send("Drone created succesfully");
    })
}
const removeDroneById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from drones Where drone_id =$1',[id], (error,result) => {
        const noDroneFound = !result.rows.length;
        if (noDroneFound){
            res.send("Drone does not exist");
        }

        client.query('DELETE FROM drones WHERE drone_id = $1'[id], (error,result) => {
            if (error) throw error;
            res.status(200).send("Drone deleted succesfully");
        })
    })
}

const updateDroneLastmaintenance = (req, res) => {
    const id = parseInt(req.params.id);
    const { last_maintenance } = req.body;
    return client
    .query('SELECT * from drones Where drone_id =$1',[id], (error,result) => {
        const noDroneFound = !result.rows.length;
        if (noDroneFound){
            res.send("Drone does not exist");
        }

        client.query('UPDATE drones SET last_maintenance = $1 WHERE drone_id = $2',
        [last_maintenance,id], 
        (error,result) => {
            if (error) throw error;
            res.status(200).send("Drone updated");
        })
    })
}
export { getDrone, getDronesById, addDrone ,removeDroneById, updateDroneLastmaintenance}