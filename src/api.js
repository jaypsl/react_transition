// DO NOT MODIFY THIS FILE.
let nextName = 4;

export function initItems() {
  return new Promise(resolve => {
    const data = [
      { color: "#FF0000", name: 1 },
      { color: "#00FF00", name: 2 },
      { color: "#0000FF", name: 3 }
    ];
    setTimeout(() => resolve(data), 2000);
  });
}

export function newItem(color) {
  return new Promise(resolve => {
    const data = {
      color: color,
      name: nextName
    };
    nextName++;
    setTimeout(() => resolve(data), 500);
  });
}
