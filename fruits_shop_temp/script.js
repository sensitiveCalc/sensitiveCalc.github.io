

// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// 카드 렌더링 함수
function renderProducts(data, container) {//data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  let container = document.querySelector("#fruitList");
  //화면에 다시 출력
  let keyword = searchBox.value.trim(); //공백제거
  let filtered = fruits.filter(fruit => {
    return fruit.name.includes(keyword);
  });

  //정렬
  if(sortSelect.value === "low"){
     filtered.sort((a,b) => a.price - b.price);
  }else if(sortSelect.value === "high"){
     filtered.sort((a,b) => b.price - a.price);
  }else if(sortSelect.value === "name"){
     filtered.sort((a,b) => a.name.localeCompare(b.name));
  }

  console.log(filtered.length)

  renderProducts(filtered, fruitList);
}

// 채소 출력 (3개씩 증가)
let veggiePage = 0; // 현재 페이지
function loadVeggies() {
  const start = veggiePage*3;
  const end = start + 3;

  let keyword = searchBox.value.trim(); //공백제거
  let filtered = veggies.filter(veggie => {
    return veggie.name.includes(keyword);
  });

  // 가격 정렬
  if(sortSelect.value === "low"){
     filtered.sort((a,b) => a.price - b.price);
  }else if(sortSelect.value === "high"){
     filtered.sort((a,b) => b.price - a.price);
  }else if(sortSelect.value === "name"){
     filtered.sort((a,b) => a.name.localeCompare(b.name));
  }

  let nextItems = veggies.slice(0, end);
  veggiePage++;

  // 더이상 데이터가 없으면 버튼 숨기기
  if(end >= veggies.length) {
    loadMoreBtn.style.display = "none";
  }
  renderProducts(nextItems, veggieList);

}

////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
