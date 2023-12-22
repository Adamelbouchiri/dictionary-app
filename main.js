const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  let inputWord = document.getElementById("inp-word").value;
  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
        <div class="word">
          <h3>${inputWord}</h3>
          <button onclick=playSound() ><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
      </div>
      `;

      const exmParagraphe = document.createElement("p");
      exmParagraphe.classList = "word-example";
      exmParagraphe.innerHTML = `<h3>Example</h3> ${data[0].meanings[0].definitions[0].example}`;

      if (data[0].meanings[0].definitions[0].example != undefined) {
        result.appendChild(exmParagraphe);
      }

      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    }).catch(() => {
      result.innerHTML = `<h3 class='error-msg'>Couldn't Find The Word <i class="fa-regular fa-face-frown-open"></i></h3>`
    });
});

function playSound() {
  sound.play();
}
