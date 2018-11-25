export class Card {
  constructor(characters) {
    this.characters = characters;
    this.input = document.getElementById("searchBar");
    this.ul = document.getElementById("searchList");
    this.container = document.getElementById("container");
    this.h2 = document.getElementById("h2");
    this.box = document.getElementById("box");
    this.seeAllBtn = document.getElementById("seeAllBtn");
  }

  deleteAll() {
    this.ul.innerHTML = ``;
  }

  reset() {
    this.container.innerHTML = "";
  }

  resetContainer() {
    this.h2.textContent = "";
    this.box.innerHTML = "";
  }

  displayAll() {
    this.deleteAll();
    this.resetContainer();

    this.seeAllBtn.onclick = () => {
      this.characters.forEach(character => {
        let li = document.createElement("li");
        li.classList.add("list-inline-item", "m-2");
        li.innerHTML = `${character.name}`;
        this.ul.appendChild(li);
      });
      Array.from(this.ul.children).forEach(child => {
        child.onclick = () => {
          this.deleteAll();
          this.displayCharacter(child);
        };
      });
    };
  }

  callDetails(url) {
    return new Promise(function(resolve, reject) {
      const request = new Request(url);
      fetch(request).then(response => {
        !response.ok ? reject(response.status) : resolve(response.json());
      });
    });
  }

  displayCharacter(li) {
    this.resetContainer();

    this.characters.forEach(character => {
      if (character.name === li.innerHTML) {
        let data = Promise.all([
          this.callDetails(character.species),
          this.callDetails(character.homeworld)
        ])
          .then(data => {
            this.h2.textContent = character.name;
            this.box.innerHTML = `<p class="col-3">Birth year: ${
              character.birth_year
            }</p>
          <p class="col-3">Mass: ${character.mass}</p>
          <p class="col-3">Height: ${character.height}</p>
          <p class="col-3">Eye color: ${character.eye_color}</p>
          <p class="col-3">Skin color: ${character.skin_color}</p>
          <p class="col-3">Hair color: ${character.hair_color}</p>
          <p class="col-3">Gender: ${character.gender}</p>
          <p class="col-3">Species: ${data[0].name} </p>
          <p class="col-3">Homeworld: ${data[1].name} </p>
          `;
          })
          .catch(error => {
            this.box.innerHTML = `<h5 class="col-12">${error}</h5><br><br>
            <img src="yoda.jpg">`;
          });
      }
    });
  }

  displayList() {
    this.input.onkeyup = e => {
      this.deleteAll();
      if (e.target.value.length > 0) {
        let filtered = this.characters.filter(character => {
          let name = character.name.toLowerCase();
          return name.indexOf(e.target.value.toLowerCase()) === 0;
        });

        filtered.forEach(obj => {
          let li = document.createElement("li");
          li.classList.add("list-inline-item", "m-2");
          li.innerHTML = `${obj.name}`;
          this.ul.appendChild(li);
        });
      } else if (e.target.value.length == 0) {
        this.resetContainer();
      }
      Array.from(this.ul.children).forEach(child => {
        child.onclick = () => {
          this.displayCharacter(child);
        };
      });
    };
  }
}
