import { Router } from "express";
import { getAreas, getAreasById, addArea ,removeAreaById, updateAreaName} from "../app/functionsArea.js";
import { getDrone, getDronesById, addDrone, removeDroneById, updateDroneLastmaintenance} from "../app/functionDrone.js";
import { getTrees, getTreesById, addTree, removeTreeById, updateTreedrone_id} from "../app/functionTrees.js";
import { getdrone_activities, getdrone_activitiesById, addDroneActivity, removeDroneActivityById, updateDroneActivitydrone_id} from '../app/functionDroneActivities.js'
import { createDroneActivitiesFromMaintenance, getView } from "../app/fancyQueries.js";


const routeToArea = Router()
const routeToDrone = Router()
const routeToTrees = Router()
const routeToDroneActivities = Router()
const routeToFancyQuery = Router()

routeToArea.get("/",getAreas);
routeToArea.post("/",addArea);
routeToArea.get("/:id", getAreasById);
routeToArea.put("/:id", updateAreaName);
routeToArea.delete("/:id", removeAreaById);

routeToDrone.get("/",getDrone);
routeToDrone.post("/",addDrone);
routeToDrone.get("/:id", getDronesById);
routeToDrone.put("/:id", updateDroneLastmaintenance);
routeToDrone.delete("/:id", removeDroneById);

routeToTrees.get("/",getTrees);
routeToTrees.post("/",addTree);
routeToTrees.get("/:id", getTreesById);
routeToTrees.put("/:id", updateTreedrone_id);
routeToTrees.delete("/:id", removeTreeById);

routeToDroneActivities.get("/",getdrone_activities);
routeToDroneActivities.post("/",addDroneActivity);
routeToDroneActivities.get("/:id", getdrone_activitiesById);
routeToDroneActivities.put("/:id", updateDroneActivitydrone_id);
routeToDroneActivities.delete("/:id", removeDroneActivityById);

routeToFancyQuery.get("/",createDroneActivitiesFromMaintenance);
routeToFancyQuery.get("/view",getView);

export {routeToArea, routeToDrone, routeToTrees, routeToDroneActivities, routeToFancyQuery}