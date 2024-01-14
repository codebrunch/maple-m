document.addEventListener('DOMContentLoaded', function () {
    const characterNameInput = document.getElementById('characterName');
    const serverSelect = document.getElementById('serverSelect');

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

        const searchApiUrl = `https://open.api.nexon.com/maplestorym/v1/character/search?character_name=${characterName}&server=${server}&apiKey=${apiKey}`;

        fetch(searchApiUrl)
            .then(response => response.json())
            .then(idData => {
                // Extracting ocid from the response
                const ocid = idData.ocid;

                // Use ocid to fetch additional information
                const idApiUrl = `https://open.api.nexon.com/maplestorym/v1/id?ocid=${ocid}&apiKey=${apiKey}`;

                return fetch(idApiUrl);
            })
            .then(response => response.json())
            .then(characterInfo => {
                // Handle the additional character information
                console.log(characterInfo);
            })
            .catch(error => {
                console.error('정보를 가져오는 도중 에러 발생:', error);
            });
    }

    const fetchButton = document.querySelector('button');
    fetchButton.addEventListener('click', fetchCharacterInfo);
});
