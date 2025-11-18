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
            id = packages[i].id;
            const cost = basePrice + (weight*10) + (distance*5); 
            let discount = packages[i].offerCode;
            discount = discount.slice(discount.length-2);
            discount = Number(discount);
            if(isNaN(discount)) discount=0;
            else discount = (discount/100) * cost;       
            const costAfterDiscount = Math.round((cost-discount));
            arr.push({packageId: id, discount:Math.round(discount), costAfterDiscount})
        

        res.json({
            success: true,
            results: arr
        })  
        
         await Courier.create({
            basePrice, packageCount, packages
        })
    }
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}