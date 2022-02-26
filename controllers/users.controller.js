
const { filterObj } = require('../utils/filterObj')

const {User} = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll({where:{status: 'active'}})
        res.status(200).json({
        stautus: 'Success',
        data: { users }
    })
    }catch{
        console.log('Error find all Users')
    }
};

exports.getUserByID = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findOne({where:{id, status:'active'}});

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

    }catch{
        console.log('Error find by ID')
    }
    
};

exports.saveUser = async (req, res) => {
   try{
        const { name, age, email } = req.body;

        if(!name || !age || !email || name.length === 0 || age.length === 0 || email.length === 0){
            res.status(404).json({
                status: 'error',
                message: 'Falta algun campo o esta vacio'
            })
            return;
        }

        await User.create({
            name,
            age,
            email
        });

        res.status(201).json({
            stautus: 'Success',
            message: 'Se agrego correctamente'
        })
   }catch{
       console.log('Error save user')
   }
};

exports.updateUserPut = async (req, res) => {
    try{
        const { id } = req.params;
        const{name, age, email} = req.body;

        if(!name || !age || !email || name.length === 0 || age.length === 0 || email.length === 0 || id === -1){
            res.status(404).json({
                status: 'erros',
                message: 'Information or Id incorrects'
            })
            return;
        }

        const user = await User.findOne({where:{id,status:'active'}});

        if(!user){
            res.status(404).json({
                status: 'error',
                message: 'Cant update user with given ID'
            })
            return;
        }
        
        await user.update({name,age,email})

        res.status(201).json({
            status: 'Success',
            message: 'Update correct',
            data:{user}
        })
    }catch{
        console.log('Error Update User')
    }
};

exports.updateUserPatch = async (req, res) => {
   try{
        const { id } = req.params;
        const data = filterObj(req.body, 'name', 'age', 'email');
        const user = await User.findOne({where:{id, status: 'active'}});

        if(!user){
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

        await user.update({...data})

        res.status(201).json({
            status: 'Success',
            message: 'Correct'
        })
   }catch{
       console.log('Error update user')
   }


}; 

exports.deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findOne({where:{id, status:'active'}});

        if(!user){
            res.status(404).json({
                status: 'error',
                message: 'Cant delete user with given id'
            })
            return;
        }

        await user.update({status: 'deleted'});

        res.status(200).json({
            status: 'Success',
            message:'Deleted success'
        })

    }catch{
        console.log('Error delete User')
    }

};