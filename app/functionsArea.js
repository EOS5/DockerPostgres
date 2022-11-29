import { client } from "./connexion";

client.connect();

const getAreas = (req, res) => {
    return client
    .query('SELECT * from areas', (error,result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
} ;
const getAreasById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from areas Where area_id =$1',[id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

const addArea = (req, res) => {
    const {area_id, surface, name } = req.body;
    return client
    .query('INSERT INTO areas (area_id, surface, name) VALUES ($1,$2,$3)',
    [area_id,surface,name],
    (error,result) => {
        if(error) throw error;
        res.status(201).send("Area created succesfully");
    });
};
const removeAreaById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from areas Where area_id =$1',[id], (error,result) => {
        const noAreaFound = !result.rows.length;
        if (noAreaFound){
            res.send("area does not exist");
        };

        client.query('DELETE FROM areas WHERE area_id = $1'[id], (error,result) => {
            if (error) throw error;
            res.status(200).send("area deleted succesfully");
        });
    });
};

const updateAreaName = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    return client
    .query('SELECT * from areas Where area_id =$1',[id], (error,result) => {
        const noAreaFound = !result.rows.length;
        if (noAreaFound){
            res.send("area does not exist");
        };

        client.query('UPDATE areas SET name = $1 WHERE area_id = $2',
        [name,id], 
        (error,result) => {
            if (error) throw error;
            res.status(200).send("area updated");
        });
    });
};
export { getAreas, getAreasById, addArea ,removeAreaById, updateAreaName}