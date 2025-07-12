document.addEventListener('DOMContentLoaded', () => {
    // --- 요소 선택 ---
    const adminViewBtn = document.getElementById('admin-view-btn');
    const adminViewSection = document.getElementById('admin-view-section');
    const statusSection = document.querySelector('.status-section');
    const form = document.getElementById('application-form');
    const tableBody = document.querySelector('#application-table tbody');

    // --- 관리자 인증 ---
    const ADMIN_PASSWORD = 'admin'; // 🚨 원하는 비밀번호로 변경하세요.

    adminViewBtn.addEventListener('click', () => {
        const password = prompt('관리자 비밀번호를 입력하세요:');
        if (password === ADMIN_PASSWORD) {
            statusSection.classList.add('visible');
            adminViewSection.style.display = 'none'; // 버튼 영역 숨기기
            alert('인증되었습니다. 관리자 모드로 접속합니다.');
        } else if (password !== null && password !== "") {
            alert('비밀번호가 틀렸습니다.');
        }
    });
    
    // --- 폼 제출 이벤트 처리 ---
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
        
        alert(`'${university} ${major}' 지원 정보가 추가되었습니다.`);

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