import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { FIND_MATCH, ME, PET, PETS } from "../../utils/queries";
import { LIKE_PET, UNLIKE_PET } from "../../utils/mutations";

//map pets to each user
//pets you like = matched
//pets like you = future match
// need access to user data and

export function LikedPets() {
  const [petState, setPet] = useState("");
  const { loading: gettingMe, error: meErr, data: myData } = useQuery(ME);
  const { data: petsData, loading: gettingPets } = useQuery(PETS);
  const [getMatches, { loading: gettingMatches }] = useLazyQuery(FIND_MATCH);

  const [getLiked, { data: likedPetsData, error, loading }] = useLazyQuery(
    PET,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const [likePet, { error: likeErr }] = useMutation(LIKE_PET, {
    refetchQueries: [ME, PET],
  });
  const [unlikePet, { error: unlikeErr }] = useMutation(UNLIKE_PET, {
    refetchQueries: [ME, PET],
  });

  useEffect(() => {
    if (petState !== "") {
      getLiked({ variables: { petId: petState.likes } });
    }
  }, [petState]);

  if (gettingMe || gettingPets) {
    return <h1>Loading...</h1>;
  }
  if (meErr) {
    return <h1>Server Error!</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  const { me } = myData;
  const { pets } = petsData;

  const likesMe = me.pets
    .map((myPet) =>
      pets.filter((theirPet) => theirPet.likes.includes(myPet._id)).flat()
    )
    .flat();

  const likeBack = (e, yourPetID, theirPetID) => {
    if (
      me.pets.find((pet) => pet._id === yourPetID).likes.includes(theirPetID)
    ) {
      e.target.disabled = true;
      return (e.target.textContent = "Already Liked❣️");
    }

    likePet({ variables: { petId: yourPetID, likedId: theirPetID } });
    e.target.textContent = "💕";
    e.target.disabled = true;
  };

  const unlike = (e, yourPetID, theirPetID) => {
    unlikePet({ variables: { petId: yourPetID, likedId: theirPetID } });
  };

  const getContactInfo = async (e, petId, matchId) => {
    try {
      const {
        data: { findMatch },
      } = await getMatches({ variables: { petId: petId } });
      const match = findMatch.find((user) =>
        user.pets.some((pet) => pet._id === matchId)
      );

      e.target.innerHTML = `<a href="mailto:${match.email}">Click to start an email</a>`;
    } catch (err) {
      if (err) throw err;
    }
  };

  return (
    <section>
      <div>
        <h2 className='likedText'>Matches</h2>
        {me.pets.map((yourPet) => (
          <ol>
            {likesMe
              .filter((theirPet) => yourPet.likes.includes(theirPet._id))
              .map((theirPet) => (
                <h3>
                  {theirPet.name}
                  <button
                    onClick={(e) =>
                      getContactInfo(e, yourPet._id, theirPet._id)
                    }
                  >
                    Get in touch ✉️
                  </button>
                </h3>
              ))}
          </ol>
        ))}
      </div>

      <div>
        <h2 className='likedText'>Click your pet to see who you've liked</h2>
        {me.pets.map((yourPet) => (
          <ol key={yourPet._id}>
            <h3
              key={yourPet.name}
              onClick={() => setPet(me.pets.find((x) => x._id === yourPet._id))}
            >
              {yourPet.name}
              <img src={yourPet.picture} width={"200px"} />
            </h3>
            {yourPet._id === petState._id &&
              likedPetsData?.pet.map((theirPet) => (
                <li key={theirPet._id}>
                  <h3>
                    {theirPet.name}
                    <button
                      onClick={(e) => unlike(e, yourPet._id, theirPet._id)}
                    >
                      Unlike❌
                    </button>
                  </h3>
                  <img src={theirPet.picture} width="200px" />
                  <p>Age: {theirPet.age}</p>
                  <p>Gender: {theirPet.gender}</p>
                  <p>Breed: {theirPet.breed}</p>
                  <p>Coat: {theirPet.coat}</p>
                  <p>Color: {theirPet.color}</p>
                  {theirPet.temperment !== "" && (
                    <p>Temperment: {theirPet.temperment}</p>
                  )}
                  {theirPet.disabilities !== "" && (
                    <p>Disabilities: {theirPet.disabilities}</p>
                  )}
                  {theirPet.allergies !== "" && (
                    <p>Allergies: {theirPet.allergies}</p>
                  )}
                  {theirPet.funFact !== "" && (
                    <p>Fun Fact: {theirPet.funFact}</p>
                  )}
                </li>
              ))}
          </ol>
        ))}
      </div>

      {likesMe.length === 0 ? (
        <h2 className='likedText'>No Likes Yet</h2>
      ) : (
        <div>
          {me.pets.map((yourPet) => (
            <>
              <h3 className='likedText' key={yourPet._id + "title"}>
                {yourPet.name} was liked by...
              </h3>
              {likesMe?.map((theirPet) => (
                <ol>
                  <li key={theirPet._id}>
                    <h3>
                      {theirPet.name}
                      <button
                        onClick={(e) => likeBack(e, yourPet._id, theirPet._id)}
                      >
                        Like❤️
                      </button>
                    </h3>
                    <img src={theirPet.picture} width="200px" />
                    <p>Age: {theirPet.age}</p>
                    <p>Gender: {theirPet.gender}</p>
                    <p>Breed: {theirPet.breed}</p>
                    <p>Coat: {theirPet.coat}</p>
                    <p>Color: {theirPet.color}</p>
                    {theirPet.temperment !== "" && (
                      <p>Temperment: {theirPet.temperment}</p>
                    )}
                    {theirPet.disabilities !== "" && (
                      <p>Disabilities: {theirPet.disabilities}</p>
                    )}
                    {theirPet.allergies !== "" && (
                      <p>Allergies: {theirPet.allergies}</p>
                    )}
                    {theirPet.funFact !== "" && (
                      <p>Fun Fact: {theirPet.funFact}</p>
                    )}
                  </li>
                </ol>
              ))}
            </>
          ))}
        </div>
      )}
    </section>
  );
}
