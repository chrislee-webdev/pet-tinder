import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Select from "react-select";
import "../../styles/AddPet.css";
import { ADD_PET } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Age = [
  { label: "0 - 1", name: "age" },
  { label: "1 - 3", name: "age" },
  { label: "3 - 5", name: "age" },
  { label: "5 - 7", name: "age" },
  { label: "8+", name: "age" },
];

const Gender = [
  { label: "Male", name: "gender" },
  { label: "Female", name: "gender" },
];

const Temper = [
  { label: "Happy", name: "temperment" },
  { label: "Eager to please", name: "temperment" },
  { label: "Friendly", name: "temperment" },
  { label: "Excellent family dog", name: "temperment" },
  { label: "Stubborn", name: "temperment" },
];

const Breed = [
  { label: "French Bulldog", name: "breed" },
  { label: "Golden Retriever", name: "breed" },
  { label: "Shiba Inu", name: "breed" },
  { label: "Poodle", name: "breed" },
  { label: "Samoyed", name: "breed" },
];

const coat = [
  { label: "Long", name: "coat" },
  { label: "Short", name: "coat" },
  { label: "Medium", name: "coat" },
  { label: "Double Coat", name: "coat" },
  { label: "Curly", name: "coat" },
  { label: "Wire", name: "coat" },
  { label: "Silky", name: "coat" },
  { label: "Hairless", name: "coat" },
];

const color = [
  { label: "Black", name: "color" },
  { label: "White", name: "color" },
  { label: "Blonde", name: "color" },
  { label: "Brown", name: "color" },
  { label: "Grey", name: "color" },
];

const AddPet = () => {
  const [addPetData, setAddPetData] = useState({
    name: "",
    age: "",
    gender: "",
    breed: "",
    picture: "",
    temperment: "",
    coat: "",
    color: "",
    allergies: "",
    disabilities: "",
    funFact: "",

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

  const handleChange = async (option) => {
    const { name, value, label } = option;
    setAddPetData({
      ...addPetData,
      [name]: label,
    });
  };

  //submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: { input: { ...addPetData } },
      });
      Auth.login(data.addPet.token);
    } catch (e) {
      console.error(e);
    }
    setAddPetData({
      name: "",
      age: "",
      gender: "",
      breed: "",
      picture: "",
      temperment: "",
      coat: "",
      color: "",
      allergies: "",
      disabilities: "",
      funFact: "",
    });
  };

  return (
    <section className="addPetContainer">
      <h1>Create a pet profile</h1>
      <form onSubmit={handleFormSubmit}>
       <div className="input">
          Pet Name:{" "}
          <input
            type={"text"}
            name="name"
            onChange={(e) =>
              setAddPetData({ ...addPetData, [e.target.name]: e.target.value })
            }
          />
        </div >
        <div className="input" value={addPetData.picture}>
          <input type={"file"} name={"petPic"} onChange={picChangeHandler} />
          <input
            className="uploadBtn"
            type={"button"}
            name="uploadPic"
            onClick={uploadPetPic}
            value="Upload"
          />
        </div>
        <div className="input" value={addPetData.breed}>
          Breed:{" "}
          <Select options={Breed} onChange={(option) => handleChange(option)} />
        </div>

        <div className="input" value={addPetData.gender}>
          Gender:{" "}
          <Select
            options={Gender}
            onChange={(option) => handleChange(option)}
          />
        </div>

        <div className="input" value={addPetData.age}>
          Age:{" "}
          <Select options={Age} onChange={(option) => handleChange(option)} />
        </div>

        <div className="input" value={addPetData.temper}>
          Temperament:{" "}
          <Select
            options={Temper}
            onChange={(e, option) => handleChange(e, option)}
          />
        </div>

        <div className="input" >
          Coat:{" "}
          <Select
            options={coat}
            onChange={(e, option) => handleChange(e, option)}
          />
        </div>

        <div className="input">
          Color:{" "}
          <Select
            options={color}
            onChange={(e, option) => handleChange(e, option)}
          />
        </div>

        <div className="input">
          Allergies:{" "}
          <input
            type={"text"}
            name={"allergies"}
            value={addPetData.allergies}
            onChange={(e) =>
              setAddPetData({ ...addPetData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="input">
          Disabilities:{" "}
          <input
            type={"text"}
            name={"disabilities"}
            value={addPetData.diabilities}
            onChange={(e) =>
              setAddPetData({ ...addPetData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="input">
          Fun Fact:{" "}
          <input
            type={"text"}
            name={"funFact"}
            value={addPetData.funFact}
            onChange={(e) =>
              setAddPetData({ ...addPetData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPet;
