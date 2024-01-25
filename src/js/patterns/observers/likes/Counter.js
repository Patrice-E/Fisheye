class LikesCounter {
  constructor() {
    this._count = 0;
    this._$likesCount = document.querySelector('.likes-count');
  }

  update(action) {
    if (action === 'INC') {
      this._count += 1;
    } else if (action === 'DEC') {
      this._count -= 1;
    } else {
      throw 'Unknown action';
    }

    this._$likesCount.innerHTML = this._count;
  }
}

export { LikesCounter };
