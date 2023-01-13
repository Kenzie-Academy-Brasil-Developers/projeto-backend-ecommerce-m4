import {AnySchema} from 'yup'
import {Request,Response,NextFunction} from 'express'

const validatedBodyMiddleware =(schema:AnySchema) => async (req:Request,res:Response, next:NextFunction)=>{
    try {
        const validatedBody = await schema.validate(req.body,{stripUnknown:true,abortEarly:false})
        req.body = validatedBody
        return next()
        
    } catch (error) {
        res.status(400).json({message:error.errors})

    }
}

export default validatedBodyMiddleware