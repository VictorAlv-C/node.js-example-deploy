
const { filterObj } = require('../utils/filterObj')
const users = [
    {id: 1, name: 'Max', age: 23, user: 'Maxi'},
    {id: 2, name: 'Victor', age: 29, user: 'Vic'},
    {id: 3, name: 'Diego', age: 25, user: 'Dago'}
]

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        stautus: 'Success',
        data: { users }
    })
};

exports.getUserByID = (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === +id);

    if(!user){
        res.status(404).json({
            stautus: 'error',
            message: 'Cant get user whith given ID'
        })
        return;
    }

    res.status(201).json({
        stautus: 'Success',
        data: {user}
    })
    
};

exports.saveUser = (req, res) => {
    const { name, age, user } = req.body;

    if(!name || !age || !user || name.length === 0 || age.length === 0 || user.length === 0){
        res.status(404).json({
            status: 'error',
            message: 'Falta algun campo o esta vacio'
        })
        return;
    }

    const newUser = {
        id: Math.floor(Math.random() * 10),
        name,
        age,
        user
    }

    users.push(newUser);

    res.status(201).json({
        stautus: 'Success',
        message: 'SE agrego correctamente'
    })
};

exports.updateUserPut = (req, res) => {
    const { id } = req.params;
    const{name, age, user} = req.body;

    if(!name || !age || !user || name.length === 0 || age.length === 0 || user.length === 0 || id === -1){
        res.status(404).json({
            status: 'erros',
            message: 'Information or Id incorrects'
        })
        return;
    }

    const indexUser = users.findIndex(user => user.id === id);

    const updateUser = {
        id: +id,
        name,
        age,
        user
    }

    users.splice(indexUser, 1, updateUser);

    res.status(201).json({
        status: 'Success',
        message: 'Update correct',
        data:{updateUser}
    })
};

exports.updateUserPatch = (req, res) => {
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'age', 'user');
    const indexUser = users.findIndex(user => user.id === +id);

    if(indexUser === -1){
        res.status(404).json({
            status: 'error',
            message: 'Cant update user with given Id'
        })
        return;
    }

    if(Object.keys(data).length === 0){
        res.status(404).json({
            status: 'error',
            message:'Data is null'
        })
    }

    users[indexUser] = {...users[indexUser], ...data};

    res.status(201).json({
        status: 'Success',
        message: 'Correct'
    })

}; 