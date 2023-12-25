type KeyMappings = { [oldKey: string]: string };


interface InputObject {
    id?: string;
    name?: string;
  }

export function convertArrayOfObjects(array1: { [key: string]: string }[] | null, keyMappings: KeyMappings[]): { [key: string]: string }[] | any {
  
    if (array1 === null){
        return [{}];
    } 
  
    return array1.map(obj => {
    const newObj: { [key: string]: string } = {};
    
    for (const oldKey in obj) {
      const mapping = keyMappings.find(mapping => mapping[oldKey]);
      const newKey = mapping ? mapping[oldKey] : oldKey;
      
      newObj[newKey] = obj[oldKey];
    }
    
    return newObj;
  });
}
