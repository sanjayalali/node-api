require("dotenv").config();
const express = require('express');

//mongoose connection
const connectDB = require('./connection');

//mongoose model
const userModel = require('./user');

const app = express();

//configuration

app.use(express.json());

// route:  /
//description: to get all users
//parameters: none
app.get('/', async(req, res) => {

    try{

        const user = await userModel.find();
        return res.json({user});

    } catch (error) {
       return res.status(500).json({error : error.message});
    }
    
});



// route:  /user/tyoe/:type
//description: to get all users by type
//parameters: type
app.get('/user/type/:type', async(req, res) => {

    try{
        const { type } = req.params;
        const user = await userModel.find({ userType: type });
        
        if(!user){
            return res.json({message : 'no user found'});
        }
    
        return res.json({user});
    } catch (error) {
        return res.status(500).json({error : error.message});
     }
    

});


// route:  /user/:_id
//description: to get all users by id
//parameters: id
app.get('/user/:_id', async(req, res) => {

    try{
        const { _id } = req.params;
        const user = await userModel.findById( _id );
        
        if(!user){
            return res.json({message : 'no user found'});
        }
    
        return res.json({user});
    } catch (error) {
        return res.status(500).json({error : error.message});
     }
    

});


// route:  /user/new
//description: to add users
//parameters: none
//body: user Object
app.post('/user/new', async(req, res) => {

    try{
        const { newUser } = req.body;

        await userModel.create(newUser);
    
        return res.json({ message: 'User created successfully' });

    } catch (error) {
        return res.status(500).json({error : error.message});
     }

});


// route:  /user/update/:_id
//description: to update user
//parameters: _id
//body: user object

app.put('/user/update/:_id', async(req, res) => {

    try{
        const { _id } = req.params;

         const { userData } = req.body;

        const updateUser = await userModel.findByIdAndUpdate(
        _id, 
        { $set: userData },
        { new: true }
        );

        return res.json({ user: updateUser });

    } catch (error) {
        return res.status(500).json({error : error.message});
     }
    
});

// route:  /user/delete/:_id
//description: to delete a user
//parameters: _id
//body: 

app.delete('/user/delete/:_id', async(req, res) => {

    try{
        const { _id } = req.params;

        await userModel.findByIdAndDelete( _id );
    
            return res.json({ message: 'User deleted successfully' });

    } catch (error) {
        return res.status(500).json({error : error.message});
     }

});



// route:  /user/delete/type/:userType
//description: to delete users by type
//parameters: userType
//body: 

app.delete('/user/delete/type/:userType', async(req, res) => {

    try{
        const { userType } = req.params;

        await userModel.deleteMany({ userType });
    
            return res.json({ message: 'Users deleted successfully', userType });
    } catch (error) {
        return res.status(500).json({error : error.message});
     }

});



app.listen(4000, () => 
    connectDB()
    .then((data) => console.log('Listening on 4000 http://localhost:4000/', data))
    .catch((err) => console.log(err))
);

