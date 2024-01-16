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

    const fetchButton = document.getElementById('fetchButton');
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

            // 다른 url에 ocid를 이용해서 response를 받아오는 함수 호출
            await fetchAdditionalInfo(ocid, apiKey);

        } catch (error) {
            console.error('정보를 가져오는 도중 에러 발생:', error);
        }
    }
    
    async function fetchAdditionalInfo(ocid, cfgn) {
        try {
            // 다른 url에 ocid를 이용해서 response를 받아오는 코드 작성
            const charBasicUrl = `https://open.api.nexon.com/maplestorym/v1/character/basic?ocid=${ocid}`;
            const equipItemUrl = `https://open.api.nexon.com/maplestorym/v1/character/item-equipment?ocid=${ocid}`;
            const statInfoUrl = `https://open.api.nexon.com/maplestorym/v1/character/stat?ocid=${ocid}`;
            const guildInfoUrl = `https://open.api.nexon.com/maplestorym/v1/character/guild?ocid=${ocid}`;

            const charBasicResponse = await fetch(charBasicUrl, {
                headers: {
                    "x-nxopen-api-key": cfgn,
                },
            });

            const equipItemResponse = await fetch(equipItemUrl, {
                headers: {
                    "x-nxopen-api-key": cfgn,
                },
            });

            const statInfoResponse = await fetch(statInfoUrl, {
                headers: {
                    "x-nxopen-api-key": cfgn,
                },
            });

            const guildInfoResponse = await fetch(guildInfoUrl, {
                headers: {
                    "x-nxopen-api-key": cfgn,
                },
            });
    
            const charBasicData = await charBasicResponse.json();
            const equipItemData = await equipItemResponse.json();
            const statInfoData = await statInfoResponse.json();
            const guildInfoData = await guildInfoResponse.json();
            
            // 받아온 데이터 활용 예시
            console.log("캐릭터 기본 정보:", charBasicData);
            console.log("캐릭터 아이템 정보:", equipItemData);
            console.log("캐릭터 스탯 정보:", statInfoData);
            console.log("캐릭터 길드 정보:", guildInfoData);
    
            // 추가 정보를 활용하는 코드 작성
            // ...
    
        } catch (error) {
            console.error('캐릭터 추가 정보를 가져오는 도중 에러 발생:', error);
            // 에러가 발생한 경우, 이에 대한 처리를 할 수도 있습니다.
            throw error; // 에러를 호출한 곳으로 전파
        }
    }
});
