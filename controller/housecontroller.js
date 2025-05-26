const houses = require("../model/housemodel");
const {CATEGORIES, STATE} = require("../constant/index");


const houseController ={
    getAllHouse: async (req, res)=>{
        try {
            const house = await houses.find()
            res.render("index", {house});
            
        } catch (error) {
            res.status(500).send('Error fetching jobs');
        }
    },

    getAllCategories: async (req, res)=>{
        try {
            const categories = Object.values(CATEGORIES);
            res.status(200).json({Status:"success", message:"success", categories});
            
            
            
        } catch (error) {
            res.status(500).send('Error fetching categories');
        }
    },

    search: async (req, res)=>{
        const criteria = req.body;
        const {state, name} = criteria;
        const query = {};
        if(state){
            query.state = {$regex: state, $options: 'i'};
        }
        if(name){
            query.name = {$regex: name, $options: 'i'};;
        }
       
        try {
            const house = await houses.find(query);
            //console.log(house);
            res.render('search', {house});
            
        } catch (error) {
            res.status(500).send('Error fetching jobs');
        }
        
    },

    getAllState: async (req, res)=>{
        try {
            const states = Object.values(STATE);
            res.status(200).json({Status:"success", message:"success", states});
            
            
            
        } catch (error) {
            res.status(500).send('Error fetching categories');
        }
    },
    cart: async(req, res)=>{
        const {id} = req.params;
          try {
            const cart = await houses.findById(id);
            if(!cart){
                return res.status(404).json({status:"failed", message:"house not found"});
            }
            //console.log(cart);
            res.render('cart', {cart});
            
          } catch (error) {
            
          } 
    },

    count: async(req, res)=>{
        try{
            const{userId} = req.body;
            const myHouse = await houses.find({
                userId: userId,

            })
            const num = myHouse.length
            res.render('house_owner_dash/dashboard', {num})
        }catch(error){

        }
    }
}

module.exports = houseController;