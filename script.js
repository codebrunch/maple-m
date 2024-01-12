document.addEventListener('DOMContentLoaded', function () {
    const characterNameInput = document.getElementById('characterName');

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
});

const resultDiv = document.getElementById("result");

// fetchCharacterInfo 함수 내에서 characterData에 대한 'try' 블록 이후에 다음을 추가하세요
const itemEquipmentResponse = await fetch(`https://open.api.nexon.com/maplestorym/v1/item-equipment?ocid=${ocid}`, {
    headers: {
        "x-nxopen-api-key": baramyconfig,
    },
});

const itemEquipmentData = await itemEquipmentResponse.json();

const statResponse = await fetch(`https://open.api.nexon.com/maplestorym/v1/stat?ocid=${ocid}`, {
    headers: {
        "x-nxopen-api-key": baramyconfig,
    },
});

const statData = await statResponse.json();

const guildResponse = await fetch(`https://open.api.nexon.com/maplestorym/v1/guild?ocid=${ocid}`, {
    headers: {
        "x-nxopen-api-key": baramyconfig,
    },
});

const guildData = await guildResponse.json();

// 캐릭터 정보 처리 이후, 데이터를 화면에 표시하세요
resultDiv.innerHTML = `
    <h2>최고 레벨 캐릭터</h2>
    <p>서버: ${highestLevelCharacter.server}</p>
    <p>캐릭터 레벨: ${highestLevelCharacter.character_level}</p>
    <p>캐릭터 이름: ${highestLevelCharacter.character_name}</p>
    <p>캐릭터 클래스: ${highestLevelCharacter.character_class_name}</p>
    <p>다른 서버:</p>
    <ul>
        ${otherServers.map((character) => `
            <li>
                서버: ${character.server}
                | 레벨: ${character.character_level}
                | 이름: ${character.character_name}
                | 클래스: ${character.character_class_name}
            </li>
        `).join('')}
    </ul>
    <h2>아이템 장비</h2>
    <pre>${JSON.stringify(itemEquipmentData, null, 2)}</pre>
    <h2>캐릭터 스탯</h2>
    <pre>${JSON.stringify(statData, null, 2)}</pre>
    <h2>길드 정보</h2>
    <pre>${JSON.stringify(guildData, null, 2)}</pre>
`;

// HTML 구조와 스타일을 필요에 맞게 조정하실 수 있습니다
