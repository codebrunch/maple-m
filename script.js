document.addEventListener('DOMContentLoaded', function () {
    const characterNameInput = document.getElementById('characterName');
    const serverSelect = document.getElementById('serverSelect'); // 추가된 부분 

    // 포커스 이벤트 처리
    characterNameInput.addEventListener('focus', function () {
        if (characterNameInput.value === '수행자명을 입력해주세요.') {
            characterNameInput.value = '';
        }
    }); 

    // 포커스 아웃 이벤트 처리
    characterNameInput.addEventListener('blur', function () {
        if (characterNameInput.value === '') {
            characterNameInput.value = '수행자명을 입력해주세요.';
        }
    }); 

    async function fetchCharacterInfo() {
        const apiKey = 'test_7bd80f4de26d58e5774b999a4fa19bfeedcbecdcd4e10ae62c93010860e37a6ba15bcd2f39f06a91bca84af63852f7c1';
        const characterName = characterNameInput.value;
        const server = serverSelect.value; 

        if (!characterName || !server) {
            alert("수행자명과 서버를 입력 후 검색해주세요.");
            return;
        } 

        const idApiUrl = `https://open.api.nexon.com/maplestorym/v1/character/search?character_name=${characterName}&server=${server}&apiKey=${apiKey}`; 

        fetch(idApiUrl)
            .then(response => response.json())
            .then(idData => {
                updateCharacterInfo(idData); 

                const equipmentApiUrl = `https://open.api.nexon.com/maplestorym/v1/character/item-equipment?ocid=${idData.ocid}&apiKey=${apiKey}`;
                return fetch(equipmentApiUrl);
            })
            .then(response => response.json())
            .then(equipmentData => {
                updateEquipmentInfo(equipmentData);
            })
            .catch(error => {
                console.error('정보를 가져오는 도중 에러 발생:', error);
            });
    } 

    const fetchButton = document.querySelector('button');
    fetchButton.addEventListener('click', fetchCharacterInfo);
}); 

function updateCharacterInfo(data) {
    const characterInfoContainer = document.getElementById('characterResult'); 

    const characterInfo = `
        <p>캐릭터 이름: ${data.character_name}</p>
        <p>서버: ${data.world_name}</p>
        <p>생성일: ${data.character_date_create || 'N/A'}</p>
        <p>최근 접속일: ${data.character_date_last_login}</p>
        <p>최근 로그아웃일: ${data.character_date_last_logout}</p>
        <p>직업: ${data.character_job_name}</p>
        <p>성별: ${data.character_gender}</p>
        <p>경험치: ${data.character_exp}</p>
        <p>레벨: ${data.character_level}</p>
        <p>OCID: ${data.ocid}</p>
    `; 

    characterInfoContainer.innerHTML = characterInfo;
} 

function updateEquipmentInfo(data) {
    const equipmentInfoContainer = document.querySelector('.cb-section2'); 

    if (data.item_equipment && data.item_equipment.length > 0) {
        const equipmentList = data.item_equipment.map(item => {
            return `<p>${item.item_equipment_page_name} - ${item.item_name}</p>`;
        }).join(''); 

        equipmentInfoContainer.innerHTML = equipmentList;
    } else {
        equipmentInfoContainer.innerHTML = '<p>장비 정보가 없습니다.</p>';
    }
}
