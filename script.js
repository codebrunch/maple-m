document.addEventListener('DOMContentLoaded', function () {
    const characterNameInput = document.getElementById('characterName');
    const serverSelect = document.getElementById('serverSelect');

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

    function fetchCharacterInfo() {
        const apiKey = 'test_7bd80f4de26d58e5774b999a4fa19bfeedcbecdcd4e10ae62c93010860e37a6ba15bcd2f39f06a91bca84af63852f7c1';
        const characterName = characterNameInput.value;
        const server = serverSelect.value;

        // ID 검색 API 호출
        const idApiUrl = `https://open.api.nexon.com/maplestorym/v1/id?character_name=${encodeURIComponent(characterName)}&world_name=${encodeURIComponent(server)}&apiKey=${apiKey}`;

        fetch(idApiUrl)
            .then(response => response.json())
            .then(idData => {
                // ID 검색 결과를 기반으로 아이템 장비 정보 API 호출
                const equipmentApiUrl = `https://open.api.nexon.com/maplestorym/v1/character/item-equipment?ocid=${idData.ocid}&apiKey=${apiKey}`;

                return fetch(equipmentApiUrl);
            })
            .then(response => response.json())
            .then(equipmentData => {
                // 가져온 장비 정보로 DOM 업데이트
                updateEquipmentInfo(equipmentData);
            })
            .catch(error => {
                console.error('정보를 가져오는 도중 에러 발생:', error);
            });
    }

    // 장비 정보를 업데이트하는 함수 정의
    function updateEquipmentInfo(data) {
        const equipmentInfoContainer = document.querySelector('.cb-section2');

        // 예시: 가져온 장비 정보를 사용하여 DOM 엘리먼트를 업데이트
        if (data.item_equipment && data.item_equipment.length > 0) {
            const equipmentList = data.item_equipment.map(item => {
                return `<p>${item.item_equipment_page_name} - ${item.item_name}</p>`;
            }).join('');

            equipmentInfoContainer.innerHTML = equipmentList;
        } else {
            equipmentInfoContainer.innerHTML = '<p>장비 정보가 없습니다.</p>';
        }
    }

    const fetchButton = document.querySelector('button');
    fetchButton.addEventListener('click', fetchCharacterInfo);
});
