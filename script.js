async function fetchCharacterInfo() {
    const apiKey = 'test_7bd80f4de26d58e5774b999a4fa19bfeedcbecdcd4e10ae62c93010860e37a6ba15bcd2f39f06a91bca84af63852f7c1';
    const characterName = characterNameInput.value;
    const server = serverSelect.value;

    if (!characterName || !server) {
        alert("수행자명과 서버를 입력 후 검색해주세요.");
        return;
    }

    const searchApiUrl = `https://open.api.nexon.com/maplestorym/v1/character/search?character_name=${characterName}&server=${server}&apiKey=${apiKey}`;

    try {
        const searchResponse = await fetch(searchApiUrl);
        const idData = await searchResponse.json();

        if (!idData.ocid) {
            throw new Error('ocid not found in the response');
        }

        const ocid = idData.ocid;

        const idApiUrl = `https://open.api.nexon.com/maplestorym/v1/id?ocid=${ocid}&apiKey=${apiKey}`;

        const idResponse = await fetch(idApiUrl);
        const characterInfo = await idResponse.json();

        // 이제 characterInfo 변수에 원하는 정보가 들어있습니다.
        console.log(characterInfo);
    } catch (error) {
        console.error('정보를 가져오는 도중 에러 발생:', error);
    }
}
