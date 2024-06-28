import mongoose from 'mongoose';
import {validateSSN, extractSSNInfo} from '../utils/ssnutils.js'

const citizenSchema = new mongoose.Schema({
  ssn: {
    type: String,
    equired: true,
    unique: true,
    validate: 
      {
        validator: function(value) {
            const { valid } = validateSSN(value);
            return valid;
        },
        message: props => `Invalid SSN: ${props.value}`
    }
  },
  motherSSN: {
    type: String,
    equired: true,
    validate: 
      {
        validator: function(value) {
            const { valid } = validateSSN(value);
            return valid;
        },
        message: props => `Invalid Mother SSN: ${props.value}`
    }
  },
  motherName: {
    type: String,
    required: true,
  }
})

export const Citizen = mongoose.model('Citizen', citizenSchema);