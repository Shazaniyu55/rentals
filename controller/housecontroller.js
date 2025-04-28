const houses = require("../model/housemodel");
const {CATEGORIES} = require("../constant/index");


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
            console.log(categories);
            //res.render("categories", {categories});
            
        } catch (error) {
            res.status(500).send('Error fetching categories');
        }
    },
}

module.exports = houseController;