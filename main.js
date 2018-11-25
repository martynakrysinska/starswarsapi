import { Card } from "./card.js";

const callStarWars = url => {
  return new Promise(function(resolve, reject) {
    const request = new Request(url);
    fetch(request).then(response => {
      !response.ok ? reject(response.status) : resolve(response.json());
    });
  });
};

const renderData = data => {
  const characters = data.reduce((arr, obj) => {
    return arr.concat(obj.results);
  }, []);
  return characters;
};

let data = Promise.all([
  callStarWars("https://swapi.co/api/people/"),
  callStarWars("https://swapi.co/api/people/?page=2"),
  callStarWars("https://swapi.co/api/people/?page=3"),
  callStarWars("https://swapi.co/api/people/?page=4"),
  callStarWars("https://swapi.co/api/people/?page=5"),
  callStarWars("https://swapi.co/api/people/?page=6"),
  callStarWars("https://swapi.co/api/people/?page=7"),
  callStarWars("https://swapi.co/api/people/?page=8"),
  callStarWars("https://swapi.co/api/people/?page=9")
]);

data.then(data => {
  let rendered = renderData(data);
  const obj = new Card(rendered);
  obj.displayAll();
  obj.displayList();
});
