export function equals(a1: Array<any>, a2: Array<any>) {
    // sort arrays
    a1.sort();
    a2.sort();
  
    if (a1.length !== a2.length) return false;
    for (let i = 0; i < a1.length; i++) {
      if (a1[i] !== a2[i]) return false;
    }
  
    return true;
  }
  