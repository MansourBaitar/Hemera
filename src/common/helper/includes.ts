export function includesOne(a1: any[], a2: any[]) {
    for (let i = 0; i < a1.length; i++) {
      const item = a1[i];
      if (a2.includes(item)) return true;
    }
  
    return false;
  }
  