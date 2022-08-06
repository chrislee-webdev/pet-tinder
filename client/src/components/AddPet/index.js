import React from "react";
import Select from "react-select";
import '../../styles/AddPet.css';
import { ADD_PET } from '../../utils/mutations';

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

function AddPet() {
  return (
    <section className='addPetContainer'>
      <h1>Create a pet profile</h1>

      <div>
        Breed: <Select options={Breed} />
      </div>

      <div>
        Gender: <Select options={Gender} />
      </div>

      <div>
        Age: <Select options={Age} />
      </div>

      <div>
        Temperament: <Select options={Temper} />
      </div>
      <button className="btn">Submit</button>
    </section>
  );
}

export default AddPet;
