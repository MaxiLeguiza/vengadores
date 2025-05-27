import express from 'express';

import vengadoresRoutes from './routes/vengadores.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use("/vengadores", vengadoresRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
