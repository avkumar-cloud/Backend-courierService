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
            let discount = 0;
            const cost = basePrice + (weight*10) + (distance*5);
            if(distance<200 && (weight>=70 && weight<=200)){
                discount = 0.1*cost;
            }else if((distance>50 && distance<150) && (weight>=100 && weight<=250)){
                discount = 0.07*cost;
            }else if((distance>50 && distance<250) && (weight>=10 && weight<=150)){
                discount = 0.05*cost;
            }
            const costAfterDiscount = cost-discount;
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