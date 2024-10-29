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


document.addEventListener('DOMContentLoaded', () => {
  populateMembersTable(getMembersFromLocalStorage());
});
