const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./src/config/index.config');

// use server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.use('/login', require('./src/routes/login.routes'));
app.use('/create', require('./src/routes/createUsers.routes'));
app.use('/download', require('./src/routes/download.routes'));
app.use('/medicalFiles', require('./src/routes/medicalFiles.routes'));
app.use('/uploads', require('./src/routes/uploads.routes'));

app.listen(PORT, () => { console.log(`Server Orquesta Running On Port ${PORT}`) });