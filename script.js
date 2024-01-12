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
        const apiKey = 'YOUR_API_KEY';
        const characterName = characterNameInput.value;
        const server = serverSelect.value;

        // 예시로 'character/basic' 엔드포인트를 사용하여 기본 캐릭터 정보 가져오기
        const apiUrl = `https://open.api.nexon.com/maplestorym/v1/character/basic?apiKey=${apiKey}&name=${characterName}&server=${server}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // 가져온 데이터로 DOM 업데이트
                updateCharacterInfo(data);
            })
            .catch(error => {
                console.error('캐릭터 정보를 가져오는 도중 에러 발생:', error);
            });
    }

    // DOM 업데이트 함수 정의
    function updateCharacterInfo(data) {
        // 예시: 가져온 데이터를 사용하여 DOM 엘리먼트를 업데이트
        const characterInfoContainer = document.querySelector('.cb-section1');
        characterInfoContainer.innerHTML = `<p>캐릭터 이름: ${data.characterName}</p><p>레벨: ${data.level}</p>`;
    }

    const fetchButton = document.querySelector('button');
    fetchButton.addEventListener('click', fetchCharacterInfo);
});
