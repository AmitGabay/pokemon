import axios from "axios";

// export const getPokemonOld = (pokemon) =>
//   axios({
//     method: "get",
//     url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
//   }).then((res) => {
//     const name = res.data.species.name;
//     const type = res.data.types.map((type) => type.type.name);
//     const img = res.data.sprites.front_default;
//     const ability = res.data.abilities.map((ability) => ability.ability.name);

//     return axios({
//       method: "get",
//       url: `${res.data.species.url}`,
//     }).then((res) =>
//       axios({
//         method: "get",
//         url: `${res.data.evolution_chain.url}`,
//       }).then((res) => {
//         let evolve = "";
//         if (res.data.chain.evolves_to[0]) {
//           evolve = res.data.chain.evolves_to[0].species.name;
//         }
//         return { name, type, img, ability, evolve };
//       })
//     );
//   });

export const getPokemon = async (pokemon) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const id = data.id;
  const name = data.species.name;
  const type = data.types.map((type) => type.type.name);
  const img = data.sprites.other["official-artwork"].front_default;
  const ability = data.abilities.map((ability) => ability.ability.name);

  const {
    data: { evolution_chain, is_legendary },
  } = await axios.get(`${data.species.url}`);

  const {
    data: { chain },
  } = await axios.get(`${evolution_chain.url}`);
  let evolve;
  if (chain.evolves_to[0] && chain.species.name === name) {
    evolve = chain.evolves_to[0].species.name;
  } else if (
    chain.evolves_to[0]?.species.name === name &&
    chain.evolves_to[0].evolves_to[0]
  ) {
    evolve = chain.evolves_to[0].evolves_to[0].species.name;
  }

  return { id, name, type, img, ability, evolve, legendary: is_legendary };
};
