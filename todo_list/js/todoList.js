
// 1) 전체 출력
// 초기 데이터
let mockData = [
    {id:0, isDone:false, content:"React study", date: new Date().toLocaleString()},
    {id:1, isDone:true, content:"친구만나기", date: new Date().toLocaleString()},
    {id:2, isDone:false, content:"낮잠자기", date: new Date().toLocaleString()},
];

// 요일 출력을 위한 배열
let day =["일","월","화","수","목","금","토"];


// 2) 추가(등록)
onload = ()=> {
    // initData 함수 호출

    // 현재 날짜를 년 월 일 요일로 출력
    let date = new Date();
    let year = date.getFullYear()+ "년 ";
    let month = date.getMonth()+1 + "월 ";
    let dayofWeek =  date.getDate() + "일 ";
    let week = day[new Date().getDay()] + "요일";
    let today = year + month + dayofWeek + week;

    document.getElementById("today").innerHTML = `${today}`;

    initData();

    addData();
    
}

    // 1) mockData 배열을 forEach를 사용하여 화면에 출력
    function initData (printData = mockData) {
        let todoItem = "";
        printData.forEach( item => {
            todoItem += `<div class="TodoItem">`;
            todoItem += `<input type="checkbox" data-key='${item.id}' ${item.isDone ? "checked" : ""} onchange="onUpdate(${item.id})">`;
            todoItem += `<div class="content">${item.content}</div>`;
            todoItem += `<div class="date">${item.date}</div>`;
            todoItem += `<button class="button" data-key='${item.id}' onclick="todoDel(${item.id})">삭제</button>`;
            todoItem += `</div>`;
        });
        document.querySelector(".todos_wrapper").innerHTML = todoItem;

        // todo의 isDone이 true이면 checked속성 추가
        // onchange=”onUpdate(id값)”
        document.querySelectorAll("input[type=checkbox]").forEach( (chk) => {
            chk.addEventListener("change", function(e){
                let isChk = e.target.checked;
                let key = e.target.dataset.key;
                let target = mockData.find(item => item.id == key);
                
                // target이 없을 경우 예외 처리
                if(!target) return;
                target.isDone = isChk;
                console.log(isChk);
            });
        });
    }

    // 2) 새로운 todo 추가
    function addData() {
        let idIndex = 3;
        document.querySelector(".Editor > button").onclick = (e)=>{
            e.preventDefault(); // 전송기능 막기
            let inputData = document.querySelector("#input");
            let content = inputData.value;
            let row = {
                id: idIndex++, // 아이디값 자동증가
                isDone: false, // 초기치 데이터는 false
                content: content, // 사용자가 입력한 값
                date: new Date().toLocaleString()
            }

            if(!content){
                alert("새로운 일정을 추가하세요");
                return;
            }

            mockData.push(row);
            inputData.value = ""; //입력값이 전송된 후 리셋
            initData(mockData);

            console.log(mockData);
        }
    }

    // 3) 수정(checkbox 상태 변경)
    const onUpdate = (targetId) => {
        // mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경
        // map함수를 이용한다. map함수의 결과를 배열형태로 mockData에 저장한다.
        mockData = mockData.map( item=> {
            if(item.id === Number(targetId)) { //값과 타입이 일치하면
                return { ...item, isDone: !item.isDone }; // 값을 복사하고 isDone을 반대로 설정한다
            }
            return item;
        });
        initData(mockData);
        console.log(mockData);
    }

    // 4) 삭제
    function todoDel(targetId) {
        // filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담든다.
        if(!confirm("삭제하시겠습니까?")) return;

        mockData = mockData.filter( item=> item.id !== targetId);
        initData();
    }

    // 5) 검색
    document.querySelector("#keyword").onkeyup = (e)=>{
        let searchedTodos = getFilterData(e.target.value);
        initData(searchedTodos);
    }
    const getFilterData = (search) => {
        //검색어가 없으면 mockData를 리턴
        if(search === ""){
            return mockData;
        }

        //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
        const searchedTodos = mockData.filter( item=> {
            return item.content.toLowerCase().includes(search.toLowerCase());
        });

        return searchedTodos;
    }