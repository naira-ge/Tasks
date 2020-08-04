var gridRepresentation = function(N, num, queries) {
    const rowMap = new Map();
    const colMap = new Map();
    const hillMap = new Map();
    const daleMap = new Map();
    const numMap = new Map();
    
    const direction = [[0,0],[0,1],[1,0],[-1,0],[0,-1],[-1,-1],[1,1]];
    
    /*map what areas are represent
    all the diagonals with slope= 1, can be represented by 
    x= y+c i.e. they have x-y = constant
    all the diagonals with slope= -1, can be represented by 
    x= -y+c i.e they have x+y = constantstore the counts in separate maps*/
    for(let [x, y] of num) {
        insert(rowMap, x);
        insert(colMap, y);
        insert(hillMap, x+y);
        insert(daleMap, x-y);
        numMap.set(N*x+y, true);
    }
    
    const result = new Array(queries.length).fill(0);
    let count = 0; // prob could've iterated with queries
    for(let [x, y] of queries) {
        if(rowMap.get(x) > 0 || colMap.get(y) > 0 || hillMap.get(x+y) > 0 || daleMap.get(x-y) > 0) {
            result[count] = 1;
        }
        for(let [i, j] of direction) {
            let newX = x + i;
            let newY = y + j;
            if(numMap.has(N*newX+newY)) {
                decrease(rowMap, newX);
                decrease(colMap, newY);
                decrease(hillMap, newX+newY);
                decrease(daleMap, N*newX+newY);
                numMap.delete(N*newX+newY);
            }
        }
        count++;
    }
    return result;
};

const insert = (map, value) => {
    if(map.has(value)) {
        map.set(value, map.get(value)+1);
    } else {
        map.set(value, 1);
    }
}

const decrease = (map, value) => {
    if(map.has(value)) {
        map.set(value, map.get(value)-1);
    }
}
