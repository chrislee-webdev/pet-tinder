import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Select from "react-select";
import '../../styles/AddPet.css';
import { ADD_PET } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Age = [
  { label: "0 - 1", value: 1 },
  { label: "1 - 3", value: 2 },
  { label: "3 - 5", value: 3 },
  { label: "5 - 7", value: 4 },
  { label: "8+", value: 5 },
];

const Gender = [
  { label: "Male", value: 1 },
  { label: "Female", value: 2 },
];

const Temper = [
  { label: "Happy", value: 1 },
  { label: "Eager to please", value: 2 },
  { label: "Friendly", value: 3 },
  { label: "Excellent family dog", value: 4 },
  { label: "Stubborn", value: 5 },
];

const Breed = [
  { label: "French Bulldog", value: 1 },
  { label: "Golden Retriever", value: 2 },
  { label: "Shiba Inu", value: 3 },
  { label: "Poodle", value: 4 },
  { label: "Samoyed", value: 5 },
];
const AddPet = () => {
  const [addPetData, setAddPetData] = useState({ 
    age: '', 
    gender: '', 
    temper: '', 
    breed: '',
  });


  const [addPet, { error }] = useMutation(ADD_PET);


  const handleChange = async (event) => {
    const { name, value } = event.target;
    setAddPetData({
      ...addPetData, 
      [name]: value,
    })
  };

//submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

  try {
    const { data } = await addPet({
      variables: { ...addPetData}
    })
    console.log(data);
    Auth.login(data.addPet.token)
  }catch (e) {
    console.error(e);
  }
    setAddPetData({
      age:'',
      gender: '',
      temper: '',
      breed: '',
    });
  };

  return (
 
    <section className='addPetContainer'>
      <h1>Create a pet profile</h1>
      <form onSubmit={handleFormSubmit}>
      <div>
        Pet Name: 
      </div>
      <div value={addPetData.breed} onChange={handleChange}>
        Breed: <Select options={Breed} />
      </div>

      <div value={addPetData.gender} onChange={handleChange}>
        Gender: <Select options={Gender} />
      </div>

      <div value={addPetData.age} onChange={handleChange}>
        Age: <Select options={Age} />
      </div>

      <div value={addPetData.temper} onChange={handleChange}>
        Temperament: <Select options={Temper} />
      </div>
      <button className="btn" type='submit'>Submit</button>
      </form> 
    </section>
  );
}

export default AddPet;
