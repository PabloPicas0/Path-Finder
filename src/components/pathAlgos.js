export function BFS(graph, hashmap, prevmap, start, target, refArr) {
    let queue = [start]
    let count = 0

    hashmap[`${start.x}-${start.y}`] = true

    while(queue.length > 0) {
        count++
        let c = queue.pop()

        refArr[c.x + c.y * 50].current.style['transition-delay']=`${count * 7}ms`
        refArr[c.x + c.y * 50].current.classList.add("visited")

        if(c.x === target.x && c.y === target.y) {
            return [c,count]
        }

        if(c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
            queue.unshift({x: c.x + 1, y: c.y})
            prevmap[`${c.x + 1}-${c.y}`] = {...c}
            hashmap[`${c.x + 1}-${c.y}`] = true
        }

        if(c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
            queue.unshift({x: c.x - 1, y: c.y})
            prevmap[`${c.x - 1}-${c.y}`] = {...c}
            hashmap[`${c.x - 1}-${c.y}`] = true
        }

        if(c.y + 1 < 26 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
            queue.unshift({ x: c.x, y: c.y + 1 });
            prevmap[`${c.x}-${c.y + 1}`] = { ...c };
            hashmap[`${c.x}-${c.y + 1}`] = true;
        }

        if(c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
            queue.unshift({ x: c.x, y: c.y - 1 });
            prevmap[`${c.x}-${c.y - 1}`] = { ...c };
            hashmap[`${c.x}-${c.y - 1}`] = true;
        }
    }
    return null
}

export function DFS(graph, hashmap, prevmap, start, end, refArr) {
    const queue = [start]
    let count = 0

    hashmap[`${start.x}-${start.y}`] = true

    while(queue.length > 0) {
        count++
        let c = queue.shift()
        console.log(c)
        refArr[c.x + c.y * 50].current.style['transition-delay']=`${count * 7}ms`
        refArr[c.x + c.y * 50].current.classList.add("visited")

        if(c.x === end.x && c.y === end.y) {
            return [c, count]
        }

        if(c.y + 1 < 26 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
            queue.unshift({x: c.x, y: c.y + 1})
            prevmap[`${c.x}-${c.y + 1}`] = {...c}
            hashmap[`${c.x}-${c.y + 1}`] = true
        }

        if(c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
            queue.unshift({x: c.x - 1, y: c.y})
            prevmap[`${c.x - 1}-${c.y}`] = {...c}
            hashmap[`${c.x - 1}-${c.y}`] = true
        }

        if(c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
            queue.unshift({x: c.x, y: c.y - 1})
            prevmap[`${c.x}-${c.y - 1}`] = { ...c };
            hashmap[`${c.x}-${c.y - 1}`] = true;
        }
        
        if(c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
            queue.unshift({x: c.x + 1, y: c.y})
            prevmap[`${c.x + 1}-${c.y}`] = { ...c };
            hashmap[`${c.x + 1}-${c.y}`] = true;
        }
    }
    return null
}