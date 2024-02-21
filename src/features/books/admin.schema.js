import mongoose from 'mongoose';

export const adminSchema = new mongoose.Schema({
    name : {
      type: String,
      'default': "Rakesh"
    },
    username: {
      type: String,
      'default': "rakesh123"
    },
    password: {
      type: String,
      'default': "1234"
    },
    token:String,

    feedbacks:[]
});