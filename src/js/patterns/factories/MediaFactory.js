class MediaFactory {
  constructor(data) {
    if (data.image) {
      return new MediaImage(data);
    } else if (data.video) {
      return new MediaVideo(data);
    } else {
      throw 'Unknown data';
    }
  }
}
export { MediaFactory };

class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
}

class MediaImage extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }
}

class MediaVideo extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }
}
