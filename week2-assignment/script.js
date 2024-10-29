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
      (name === '' || member.name.includes(name)) &&
      (englishName === '' || member.englishName.toLowerCase().includes(englishName)) &&
      (github === '' || member.github.toLowerCase().includes(github)) &&
      (gender === '' || member.gender === gender) &&
      (role === '' || member.role === role) &&
      (firstWeekGroup === '' || member.firstWeekGroup == firstWeekGroup) &&
      (secondWeekGroup === '' || member.secondWeekGroup == secondWeekGroup)
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
  const firstWeekGroup = parseInt(document.getElementById('modal-week1').value);
  const secondWeekGroup = parseInt(document.getElementById('modal-week2').value);

  if (!name || !englishName || !github || !gender || !role || !firstWeekGroup || !secondWeekGroup) {
    alert('모든 필드를 입력해 주세요.');
    return;
  }

  const newMember = {
    id: getNewMemberId(),
    name: name,
    englishName: englishName,
    github: github,
    gender: gender,
    role: role,
    firstWeekGroup: firstWeekGroup,
    secondWeekGroup: secondWeekGroup
  };

  const membersData = getMembersFromLocalStorage();
  membersData.push(newMember);
  setMembersToLocalStorage(membersData);
  populateMembersTable(membersData);
  closeModal();

  document.getElementById('add-member-form').reset();
});

document.addEventListener('DOMContentLoaded', () => {
  populateMembersTable(getMembersFromLocalStorage());
});
