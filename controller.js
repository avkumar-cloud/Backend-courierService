import { Courier } from "./model/CourierModel.js";

export const calculatedDiscount = async(req,res) =>{
    try {
        let {basePrice, packageCount, packages} = req.body;
        const arr = [];
        let id;
        basePrice = Number(basePrice);
        for(let i=0;i<packages.length;i++){
            let weight = Number(packages[i].weight);
            let  distance = Number(packages[i].distance);
            id = packages[i].id
            let discount = packages[i].offerCode;
            discount = discount.slice(discount.length-2);
            if(isNaN(discount)) discount=0;
            else discount = Math.round(Number(discount),2);
            const cost = basePrice + (weight*10) + (distance*5);            
            const costAfterDiscount = Math.round((cost-discount),2);
            arr.push({packageId: id, discount, costAfterDiscount})
        }
        res.json({
            success: true,
            results: arr
        })  
        
         await Courier.create({
            basePrice, packageCount, packages
        })
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}