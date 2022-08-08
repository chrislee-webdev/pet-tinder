import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Select from "react-select";
import "../../styles/AddPet.css";
import { ADD_PET } from "../../utils/mutations";
import Auth from "../../utils/auth";

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
    age: "",
    gender: "",
    temper: "",
    breed: "",
    picture: "",
  });

  const [addPet, { error }] = useMutation(ADD_PET);

  // image upload related states
  const [selectedFile, selectFile] = useState();
  const [isFileSelected, setFileStatus] = useState("notSelected");

  // save the target picture to state, flag selected
  const picChangeHandler = (e) => {
    selectFile(e.target.files[0]);
    setFileStatus("Selected");
  };

  // upload picture to imgbb.com, save img url to pet data state
  const uploadPetPic = async (e) => {
    if (isFileSelected === "notSelected") {
      return alert(`File not Selected`);
    }
    console.log(selectedFile);

    const body = new FormData();
    body.append("image", selectedFile);

    try {
      const req = await fetch(
        `https://api.imgbb.com/1/upload?&name=${selectedFile.name}&key=dd9e796ad2397d60fca82af89819101b`,
        {
          method: "POST",
          body: body,
        }
      );
      const res = await req.json();
      const {
        data: { image },
      } = res;
      setAddPetData({ ...addPetData, picture: image.url });
    } catch (err) {
      if (err) console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setAddPetData({
      ...addPetData,
      [name]: value,
    });
  };

  //submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: { ...addPetData },
      });
      console.log(data);
      Auth.login(data.addPet.token);
    } catch (e) {
      console.error(e);
    }
    setAddPetData({
      age: "",
      gender: "",
      temper: "",
      breed: "",
      picture: "",
    });
  };

  return (
    <section className="addPetContainer">
      <h1>Create a pet profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div>Pet Name:</div>
        <div value={addPetData.picture}>
          <input type={"file"} name={"petPic"} onChange={picChangeHandler} />
          <input
            type={"button"}
            name="uploadPic"
            onClick={uploadPetPic}
            value="Upload"
          />
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
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPet;
