import { members } from './data/members.js';

const membersTbody = document.getElementById('members-tbody');

if (!localStorage.getItem("membersData")) {
  localStorage.setItem("membersData", JSON.stringify(members));
} 

function getMembersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("membersData")) || [];
}

function setMembersToLocalStorage(membersData) {
  localStorage.setItem('membersData', JSON.stringify(membersData));
}

function populateMembersTable(membersData) {
  membersTbody.innerHTML = ''; 

  membersData.forEach(member => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td><input type="checkbox" data-id="${member.id}"></td>
      <td>${member.name}</td>
      <td>${member.englishName}</td>
      <td><a href="https://github.com/${member.github}">${member.github}</a></td>
      <td>${member.gender === 'male' ? '남자' : '여자'}</td>
      <td>${member.role}</td>
      <td>${member.firstWeekGroup}</td>
      <td>${member.secondWeekGroup}</td>
    `;
    
    membersTbody.appendChild(row);
  });
  selectAllCheckbox.checked = false;
}
function filterByName(member, name) {
  return name === '' || member.name.includes(name);
}

function filterByEnglishName(member, englishName) {
  return englishName === '' || member.englishName.toLowerCase().includes(englishName);
}

function filterByGithub(member, github) {
  return github === '' || member.github.toLowerCase().includes(github);
}

function filterByGender(member, gender) {
  return gender === '' || member.gender === gender;
}

function filterByRole(member, role) {
  return role === '' || member.role === role;
}

function filterByFirstWeekGroup(member, firstWeekGroup) {
  return firstWeekGroup === '' || member.firstWeekGroup == firstWeekGroup;
}

function filterBySecondWeekGroup(member, secondWeekGroup) {
  return secondWeekGroup === '' || member.secondWeekGroup == secondWeekGroup;
}

function filterMembers() {
  const name = document.getElementById('name').value;
  const englishName = document.getElementById('eng-name').value.toLowerCase();
  const github = document.getElementById('github').value.toLowerCase();
  const gender = document.getElementById('gender').value;
  const role = document.getElementById('role').value;
  const firstWeekGroup = document.getElementById('week1').value;
  const secondWeekGroup = document.getElementById('week2').value;

  const membersData = getMembersFromLocalStorage();

  const filteredMembers = membersData.filter(member => {
    return (
      filterByName(member, name) &&
      filterByEnglishName(member, englishName) &&
      filterByGithub(member, github) &&
      filterByGender(member, gender) &&
      filterByRole(member, role) &&
      filterByFirstWeekGroup(member, firstWeekGroup) &&
      filterBySecondWeekGroup(member, secondWeekGroup)
    );
  });

  populateMembersTable(filteredMembers);
}

function resetFilters() {
  document.getElementById('name').value = '';
  document.getElementById('eng-name').value = '';
  document.getElementById('github').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('role').value = '';
  document.getElementById('week1').value = '';
  document.getElementById('week2').value = '';

  populateMembersTable(getMembersFromLocalStorage());
}

document.getElementById('search-button').addEventListener('click', filterMembers);
document.getElementById('reset-button').addEventListener('click', resetFilters);
document.getElementById('delete-selected').addEventListener('click', deleteSelectedMembers);

const selectAllCheckbox = document.getElementById('select-all');
selectAllCheckbox.addEventListener('change', function () {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});

membersTbody.addEventListener('change', function () {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
  selectAllCheckbox.checked = allChecked;
});

function deleteSelectedMembers() {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked'); 
  const membersData = getMembersFromLocalStorage(); 

  const idsToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-id')));

  const updatedMembers = membersData.filter(member => !idsToDelete.includes(member.id));

  setMembersToLocalStorage(updatedMembers); 
  populateMembersTable(updatedMembers);
}


document.getElementById('add-member').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'flex';
});

const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
};

document.querySelector('.close').addEventListener('click', closeModal);

document.getElementById('modal').addEventListener('click', closeModal);

document.querySelector('.modal-content').addEventListener('click', function(e) {
  e.stopPropagation();
});

function getNewMemberId() {
  const membersData = getMembersFromLocalStorage();
  if (membersData.length === 0) return 1; 
  const maxId = Math.max(...membersData.map(member => member.id));
  return maxId + 1;
}

document.getElementById('add-member-button').addEventListener('click', function() {
  const name = document.getElementById('modal-name').value.trim();
  const englishName = document.getElementById('modal-eng-name').value.trim();
  const github = document.getElementById('modal-github').value.trim();
  const gender = document.getElementById('modal-gender').value;
  const role = document.getElementById('modal-role').value;
  const firstWeekGroup = document.getElementById('modal-week1').value; // 1주차 그룹
  const secondWeekGroup = document.getElementById('modal-week2').value; // 2주차 그룹

  // 모든 필드가 입력되었는지 확인
  if (!name || !englishName || !github || !gender || !role || !firstWeekGroup || !secondWeekGroup) {
    alert('모든 필드를 입력해 주세요.');
    return;
  }

  // 첫째 주와 둘째 주 그룹이 1에서 9 사이인지 확인
  if (!/^[1-9]$/.test(firstWeekGroup) || !/^[1-9]$/.test(secondWeekGroup)) {
    alert('1주차 및 2주차 그룹은 1에서 9 사이의 숫자만 입력할 수 있습니다.');
    document.getElementById('modal-week1').focus(); // 잘못된 입력 필드에 포커스를 이동
    return;
  }

  const newMember = {
    id: getNewMemberId(),
    name: name,
    englishName: englishName,
    github: github,
    gender: gender,
    role: role,
    firstWeekGroup: parseInt(firstWeekGroup),
    secondWeekGroup: parseInt(secondWeekGroup)
  };

  const membersData = getMembersFromLocalStorage();
  membersData.push(newMember);
  setMembersToLocalStorage(membersData);
  populateMembersTable(membersData);

  // 모든 필드가 유효한 경우에만 모달을 닫습니다.
  closeModal(); 
  
  document.getElementById('add-member-form').reset();
});

document.addEventListener('DOMContentLoaded', () => {
  populateMembersTable(getMembersFromLocalStorage());
});