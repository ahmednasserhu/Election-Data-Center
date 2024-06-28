import {Citizen} from '../models/citizen.js';
import { catchAsyncErr } from "../utils/catchError.js";
import { validateSSN, extractSSNInfo } from '../utils/ssnutils.js';
import motherNameValidator from '../utils/nameValidator.js'

const createCitizen = catchAsyncErr(async (req,res) => {
  const { ssn, motherSSN, motherName } = req.body;
  const ssnValidation = validateSSN(ssn);
  const motherSSNValidation = validateSSN(motherSSN)
  if (!ssnValidation.valid) {
      return res.status(400).json({ message: ssnValidation.message });
  }

  if (!motherSSNValidation.valid) {
    return res.status(400).json({ message: motherSSNValidation.message });
}

  const nameValidator = motherNameValidator(motherName);

  if(!nameValidator.valid) {
    return res.status(400).json({ message: nameValidator.message });
  }

  const { birthDate, age, governorate, gender } = extractSSNInfo(motherSSN);

  if(gender === 'Male') {
    return res.status(400).json({ message: 'You have entered SSN that relate to a male'});
  }


  const existingCitizen = await Citizen.findOne({ ssn });
  if (existingCitizen) {
      return res.status(400).json({ message: 'SSN already exists.' });
  }

  const newCitizen = await Citizen.create({
    ssn,
    motherSSN,
    motherName
  });

  res.status(201).json({ message: "Inserted successfully", citizen: newCitizen });
})

const getCitizenBySSN = catchAsyncErr(async (req, res) => {
  const { ssn, motherSSN, motherName } = req.body;

  
  const citizen = await Citizen.findOne({ ssn });
  
  if (!citizen) {
    return res.status(404).json({ message: 'Citizen not found.' });
  }

  
  if (citizen.motherSSN !== motherSSN) {
    return res.status(400).json({ message: 'Invalid motherSSN.' });
  }

  if (citizen.motherName !== motherName) {
    return res.status(400).json({ message: 'Invalid motherName.' });
  }

  res.status(200).json({ message: 'Valid citizen data.', citizen });
});

export {createCitizen, getCitizenBySSN};