const {filterObj} = require('../utils/filterObj');
//Model
const {Post} = require('../models/post.model');


exports.getAllPost = async (req, res) => {
    try{
        const posts = await Post.findAll();

        res.status(200).json({
            status: 'sucess',
            data: {
                posts
            }
        });

    }catch{
        console.log(err);
    }
        
};

exports.getPostById = async (req, res) => {
    try{
        const { id } = req.params;
        const post = await Post.findOne({where:{id}})

        if(!post){
            res.status(404).json({
                status:'error', 
                message:'Post no found whit given ID'
            });
            return;
        }

        res.status(200).json({
            status: 'Sucess',
            data: {
                post,
            }
        })
    }catch{
        console.log(err);
    }
};

exports.savePost = async (req, res) => {
    try{
        const {title, content, author} = req.body;

        if(!title || !content || !author || title.length === 0 || content.length === 0 || author.length === 0){
            res.status(400).json({
                status: 'error',
                message: 'Must a invalid title or content or author'
            });
            return;
        }

        const newPost = await Post.create({title,content,author});

        res.status(201).json({
            status: 'Success',
            data: { newPost }
        })

    }catch{
        console.log(err)
    }
    
};

exports.updatePostPut = async (req, res) => {
    try{
        const { id } = req.params;

        const { title, content, author } = req.body;

        if(!title || !content || !author || title.length === 0 || content.length === 0 || author.length === 0){
            res.status(400).json({
                status: 'error',
                message: 'Must a invalid title or content or author'
            });
            return;
        }

        const updatePost = await Post.findOne({where:{id}})

        if(!updatePost){
            res.status(404).json({
                status: 'error',
                message: 'Cant this post, invalid ID'
            })
            return;
        }

         await updatePost.update({
            title,
            content,
            author
        })

        res.status(201).json({
            status: 'Success',
            message: 'Update success'
        })

    }catch{
        console.log(err)
    }
    
};

exports.updatePostPatch = async (req, res) => {
    try{
        const { id } = req.params;

        const data = filterObj(req.body, 'title', 'content', 'author');

        if(Object.keys(data).length === 0){
            res.status(404).json({
                status: 'error',
                message:'Data is null'
            })
        }

        const post = await Post.findOne({where:{id}});

        if(!post){
            res.status(404).json({
                status: 'error',
                message: 'Cant update post with given Id'
            })
            return;
        }

        await post.update({...data });

        res.status(204).json({status:'Success'});

    }catch{
        console.log(err)
    }
};

exports.deletePost = async (req, res) => {
    try{
        const { id } = req.params;
        const post = await Post.findOne({where:{id}})

        if(!post){
            res.status(404).json({
                status:'error',
                message: 'Cant delete post whit given ID'
            })
            return;
        }

        await post.destroy();

        res.status(200).json({
            status: 'Success',
            data:{ post }
        });
    }catch{
        console.log(err)
    }
};