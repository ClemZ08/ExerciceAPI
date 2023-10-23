class LoadPicture {
  constructor(
    apiUrl = "https://jsonplaceholder.typicode.com/photos",
    displayArea = document.body,
    batchSize = 5,
    order = "ASC"
  ) {
    this.apiUrl = apiUrl;
    this.displayArea = displayArea;
    this.batchSize = batchSize;
    this.order = order;
    this.pictures = [];
    this.currentBatch = 0;

    this.init();
  }

  async init() {
    await this.load();
  }

  async load() {
    this.showLoadingIcon();

    try {
      let response = await fetch(`${this.apiUrl}?_limit=5000`);
      let data = await response.json();
      this.pictures = this.order === "ASC" ? data : data.reverse();
      this.display();
    } catch (err) {
      console.error("Error fetching pictures:", err);
    }

    this.hideLoadingIcon();
  }

  showLoadingIcon() {
    document.getElementById("loadingIcon").style.display = "block";
  }

  hideLoadingIcon() {
    document.getElementById("loadingIcon").style.display = "none";
  }

  display() {
    let batch = this.pictures.slice(
      this.currentBatch * this.batchSize,
      (this.currentBatch + 1) * this.batchSize
    );

    for (let pic of batch) {
      let img = document.createElement("img");
      img.src = pic.url;
      this.displayArea.appendChild(img);
    }

    this.currentBatch++;

    if (this.currentBatch * this.batchSize < this.pictures.length) {
      let btn = document.createElement("button");
      btn.innerText = "Autres images";
      btn.addEventListener("click", () => this.display());
      this.displayArea.appendChild(btn);
    }
  }
}
new LoadPicture();
