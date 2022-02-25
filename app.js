const express = require('express');

//Routes
const {postRouter} = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes')

//Util
const {sequelize} = require('./utils/database')


const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);

app.use('/api/v1/posts', postRouter);

sequelize.authenticate()
         .then(() => console.log('Correct Conexion'))
         .catch(err => console.log(err));

sequelize.sync()
         .then(() => console.log('Sincronizacion exitosa'))
         .catch(err => console.log(err));

app.listen(4000, () => {
    console.log('App express is runing!!')
});
