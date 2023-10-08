export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userInfo.textContent,
    };
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
  this._userInfo.textContent = description;
  }
}
