import express from 'express'
import { routeToArea, routeToDrone, routeToTrees,routeToDroneActivities, routeToFancyQuery } from './routes/routes.js';




const app = express()

app.get('/', async (req, res) => {
  res.send('Hello World');
})

app.use(express.json());
app.use('/areas',  routeToArea);
app.use('/drones', routeToDrone);
app.use('/trees', routeToTrees);
app.use('/droneActivities',routeToDroneActivities);
app.use('/fancyQueries', routeToFancyQuery);
app.listen(3000);

