document.addEventListener('DOMContentLoaded', function () {
    const characterNameInput = document.getElementById('characterName');
    const serverSelect = document.getElementById('serverSelect');
    const characterResult = document.getElementById('characterResult');
    const equipmentInfoContainer = document.querySelector('.cb-section2');

    characterNameInput.addEventListener('focus', function () {
        if (characterNameInput.value === '수행자명을 입력해주세요.') {
            characterNameInput.value = '';
        }
    });

    characterNameInput.addEventListener('blur', function () {
        if (characterNameInput.value === '') {
            characterNameInput.value = '수행자명을 입력해주세요.';
        }
    });

    function updateCharacterInfo(data) {
        const characterInfoContainer = characterResult;

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
            <p>OCID: ${data.ocid}</p> <!-- 이 부분을 추가했습니다. -->
        `;

        characterInfoContainer.innerHTML = characterInfo;
    }

    function updateEquipmentInfo(data) {
        // 장비 정보가 있는 경우에만 업데이트
        if (data.item_equipment && data.item_equipment.length > 0) {
            const equipmentList = data.item_equipment.map(item => {
                return `<p>${item.item_equipment_page_name} - ${item.item_name}</p>`;
            }).join('');

            equipmentInfoContainer.innerHTML = equipmentList;
        } else {
            equipmentInfoContainer.innerHTML = '<p>장비 정보가 없습니다.</p>';
        }
    }

    function fetchCharacterInfo() {
        const apiKey = 'test_7bd80f4de26d58e5774b999a4fa19bfeedcbecdcd4e10ae62c93010860e37a6ba15bcd2f39f06a91bca84af63852f7c1';
        const characterName = characterNameInput.value;
        const server = serverSelect.value;

        const idApiUrl = `https://open.api.nexon.com/maplestorym/v1/id?character_name=${encodeURIComponent(characterName)}&world_name=${encodeURIComponent(server)}&apiKey=${apiKey}`;

        fetch(idApiUrl)
            .then(response => response.json())
            .then(idData => {
                // OCID를 화면에 표시
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
