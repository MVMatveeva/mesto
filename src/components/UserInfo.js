export default class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector)
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
