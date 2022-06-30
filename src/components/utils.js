import {
  profileAvatar,
  profileName,
  profileAbout
} from './data'
// import PopupWithForm from './PopupWithForm';


function confirmProfileData(userData) {
  profileAvatar.src = userData.avatar;
  profileName.textContent = userData.name;
  profileAbout.textContent = userData.about;
}

export { confirmProfileData }