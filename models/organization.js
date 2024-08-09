import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true ,
    unique:true
  },
});

export default mongoose.model('Organization', OrganizationSchema);
