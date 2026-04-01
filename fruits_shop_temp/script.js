

// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {//data는 과일 또는 야채의 배열
  console.log(data)
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
function filterAndSortFruits(data) {
  let container = document.querySelector("#fruitList");
   //화면에 다시 출력
  renderProducts(data, container);
}

// 채소 출력 (3개씩 증가)
function loadVeggies(data) {
  let container = document.querySelector("#veggieList");
  //container.innerHTML = "";
  //화면에 다시 출력
  renderProducts(data, container);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", (e) => {
  // 검색 단어 필터링
  let keyword = e.target.value;
  let filteredFruits = fruits.filter(item => {
    return item.name.includes(keyword);
  })

  let filteredVeggies = veggies.filter(item => {
    return item.name.includes(keyword);
  })

  filterAndSortFruits(filteredFruits);
  loadVeggies(filteredVeggies);
});

sortSelect.addEventListener("change", (e) => {
  // 셀렉트 조건 바꾸기
  let sortedFruits = [...fruits].sort( (a, b) => {
    if(e.target.value === "low") { // 가격 낮은순
      return a.price - b.price;
    }
    if(e.target.value === "high") { // 가격 높은순
      return b.price - a.price;
    }
  });

  let sortedVeggies = [...veggies].sort( (a, b) => {
    if(e.target.value === "low") { // 가격 낮은순
      return a.price - b.price;
    }
    if(e.target.value === "high") { // 가격 높은순
      return b.price - a.price;
    }
  });

  filterAndSortFruits(sortedFruits);
  loadVeggies(sortedVeggies);
});

// 더보기 버튼 이벤트
let veggiePages = 0; // 현재 페이지
const pageSize = 3; //한번에 보여줄 개수
//renderProducts(veggies.slice(0, 9), document.querySelector("#veggieList"));
loadMoreBtn.addEventListener("click", (e) => {
  veggiePages++;

  let container = document.querySelector("#veggieList");
  container.innerHTML = "";
  
  let sliced = veggies.slice(0, veggiePages * pageSize);
  //loadVeggies(sliced);
  renderProducts(sliced, container);


  // 더이상 데이터가 없으면 버튼 숨기기
  if(veggiePages * pageSize >= veggies.length) {
    loadMoreBtn.style.display = "none";
  }
});

// 초기 실행
filterAndSortFruits(fruits);
loadVeggies(veggies.slice(0, 9));
