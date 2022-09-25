import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username : String,
    email: String,
    password: String
})

const Users = models.Register_Users || model('Register_Users', userSchema);

export default Users;