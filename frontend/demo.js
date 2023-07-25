const extractKeyValuePairs = (string) => {
    const pattern = /(\w+):(.+)/g;
    const results = {};
  
    let match;
    while ((match = pattern.exec(string)) !== null) {
      const key = match[1];
      const value = match[2];
      results[key] = value;
    }
  
    return results;
  };
  
  const string = 'gender:male;';
  const results = extractKeyValuePairs(string);
  
  console.log(results); // { name: 'Ryan', department: '2', age: '3' }
  