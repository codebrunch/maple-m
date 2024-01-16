document.addEventListener('DOMContentLoaded', function () {
    const characterNameInput = document.getElementById('characterName');
    const serverSelect = document.getElementById('serverSelect');

    // 포커스 이벤트 처리
    characterNameInput.addEventListener('focus', function () {
        if (characterNameInput.value === '캐릭터명을 입력해주세요.') {
            characterNameInput.value = '';
        }
    });

    // 포커스 아웃 이벤트 처리
    characterNameInput.addEventListener('blur', function () {
        if (characterNameInput.value === '') {
            characterNameInput.value = '캐릭터명을 입력해주세요.';
        }
    });

    const fetchButton = document.querySelector('button');
    fetchButton.addEventListener('click', fetchCharacterInfo);

    async function fetchCharacterInfo() {
        const apiKey = 'test_7bd80f4de26d58e5774b999a4fa19bfeedcbecdcd4e10ae62c93010860e37a6ba15bcd2f39f06a91bca84af63852f7c1';
        const characterName = encodeURIComponent(characterNameInput.value.trim());
        const server = serverSelect.value;

        if (!characterName || !server) {
            alert("캐릭터명과 서버를 입력 후 검색해주세요.");
            return;
        }

        const searchApiUrl = `https://open.api.nexon.com/maplestorym/v1/id?character_name=${characterName}&world_name=${server}`;

        try {
            const response = await fetch(searchApiUrl, {
                headers: {
                    "x-nxopen-api-key": apiKey,
                },
            });

            const idData = await response.json();

            //if (!idData.ocid) {
            //    throw new Error('ocid not found in the response');
            //}

            const ocid = idData.ocid;
            console.log(ocid);
            /*
            const idApiUrl = `https://open.api.nexon.com/maplestorym/v1/id?ocid=${ocid}&apiKey=${apiKey}`;

            const idResponse = await fetch(idApiUrl);
            const characterInfo = await idResponse.json();
            */
            // 이제 characterInfo 변수에 원하는 정보가 들어있습니다.
            //console.log(characterInfo);
        } catch (error) {
            console.error('정보를 가져오는 도중 에러 발생:', error);
        }
    }
});
