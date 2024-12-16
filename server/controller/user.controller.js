import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/users.model.js"

export const register = async (req, res,next) => {

    const {name,email,password} =  req.body

    try {
        const user = await User.findOne({ email })
    
        if (user) return res.status(200).json({ message: `User already exists with email ${email}`})
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const saveUser = new User({
            name,
            email,
            password:hashedPassword
        })

        try {
            await saveUser.save().then(() => {
            next()
            })
        } catch (error) {
                return res.status(200).json({ message: "Something went wrong" })
        }
           
    } catch (error) {
        return res.status(501).json({ message: "Something wrong at server" })
    }
}

export const login = async (req, res) => {

    const {email,password} =  req.body

    try {
        const user = await User.findOne({ email })
          
        if (user) {
            // check for password match the requested password matches with the user details or not 
            const isMatch = await bcrypt.compare(password, user.password)
       
            // if password doesn't match don't allow to the user to login
            if (!isMatch) { return res.status(200).json({ message: `Wrong password` }) }
            // make jwt token withrequest user id and role of the requested user and token will be valid only for 1 hour
            const token = jwt.sign({
                id: user._id,
                email: user.email,
            },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )        
            return res.status(201).json({token })
        }

        return res.status(200).json({ message: `No user found with email ${email}` })
       
    } catch (error) {
        return res.status(501).json({ message: "Something wrong at server" })
    }
}