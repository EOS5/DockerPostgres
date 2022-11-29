import { client } from "./connexion";

client.connect();

const getTrees = (req, res) => {
    return client
    .query('SELECT * from trees', (error,result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    })
} 
const getTreesById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from trees Where tree_id =$1',[id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    })
}

const addTree = (req, res) => {
    const {tree_id, area_id, drone_id, species, planting_date } = req.body;
    return client
    .query('INSERT INTO trees (tree_id, area_id, drone_id, species, planting_date) VALUES ($1,$2,$3)',
    [tree_id,area_id,drone_id, species, planting_date],
    (error,result) => {
        if(error) throw error;
        res.status(201).send("Tree created succesfully");
    })
}
const removeTreeById = (req, res) => {
    const id = parseInt(req.params.id);
    return client
    .query('SELECT * from trees Where tree_id =$1',[id], (error,result) => {
        const noTreeFound = !result.rows.length;
        if (noTreeFound){
            res.send("Tree does not exist");
        }

        client.query('DELETE FROM trees WHERE tree_id = $1'[id], (error,result) => {
            if (error) throw error;
            res.status(200).send("Tree deleted succesfully");
        })
    })
}

const updateTreedrone_id = (req, res) => {
    const id = parseInt(req.params.id);
    const { drone_id } = req.body;
    return client
    .query('SELECT * from trees Where tree_id =$1',[id], (error,result) => {
        const noTreeFound = !result.rows.length;
        if (noTreeFound){
            res.send("Tree does not exist");
        }

        client.query('UPDATE trees SET drone_id = $1 WHERE tree_id = $2',
        [drone_id,id], 
        (error,result) => {
            if (error) throw error;
            res.status(200).send("Tree updated");
        })
    })
}
export { getTrees, getTreesById, addTree ,removeTreeById, updateTreedrone_id}