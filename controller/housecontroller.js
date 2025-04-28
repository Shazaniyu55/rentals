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
        const {location, category, price} = criteria;
        const query = {};
        if(location){
            query.location = {$regex: location, $options: 'i'};
        }
        if(category){
            query.category = category;
        }
        if(price){
            query.price = {$lte: price};
        }
        try {
            const house = await houses.find(query);
            res.render("index", {house});
            
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
}

module.exports = houseController;