document.addEventListener('DOMContentLoaded', () => {
    // --- 관리자 인증 ---
    const ADMIN_PASSWORD = 'admin'; // 🚨 원하는 비밀번호로 변경하세요.
    const statusSection = document.querySelector('.status-section');

    function authenticateAdmin() {
        const password = prompt('관리자 비밀번호를 입력하세요:');
        if (password === "1234" ) {
            statusSection.classList.add('visible');
            alert('인증되었습니다. 관리자 모드로 접속합니다.');
        } else if (password !== null && password !== "") {
            alert('비밀번호가 틀렸습니다. 현황 목록을 볼 수 없습니다.');
        } else {
            alert('비밀번호를 입력하지 않았습니다. 현황 목록을 볼 수 없습니다.');
        }
    }
    
    // 페이지 로드 시 인증 함수 실행
    authenticateAdmin();


    // --- 기존 기능 (폼 처리) ---
    const form = document.getElementById('application-form');
    const tableBody = document.querySelector('#application-table tbody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const applicationType = document.getElementById('application-type').value;
        const applicationName = document.getElementById('application-name').value.trim();
        const university = document.getElementById('university').value.trim();
        const major = document.getElementById('major').value.trim();
        const schedule = document.getElementById('schedule').value;
        const changes = document.getElementById('changes').value.trim();

        if (!applicationName || !university || !major || !schedule) {
            alert('주요 변경 사항을 제외한 모든 필드를 채워주세요.');
            return;
        }

        addApplicationRow(applicationType, applicationName, university, major, schedule, changes);
        
        // 입력 완료 알림
        alert('"' + university + ' ' + major + '" 지원 정보가 추가되었습니다.');

        form.reset();
    });

    function addApplicationRow(type, name, uni, major, date, changes) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${type}</td>
            <td>${name}</td>
            <td>${uni}</td>
            <td>${major}</td>
            <td>${date}</td>
            <td>${changes || '변경 사항 없음'}</td>
            <td><button class="delete-btn">삭제</button></td>
        `;

        tableBody.appendChild(row);

        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            if(confirm(`'${uni} ${major}' 항목을 정말 삭제하시겠습니까?`)) {
                row.remove();
            }
        });
    }
});