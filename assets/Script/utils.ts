

export function loadJsonConfig(fileName: string): Promise<any> {
  const p = new Promise<any>((resolve, reject) => {
    cc.loader.loadRes("config/" + fileName, function (err, resource) {
      if (err) {
        resolve([]);
      }
      resolve(resource);
    })
  });
  return p;
}
