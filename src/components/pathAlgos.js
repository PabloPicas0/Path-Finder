export function BFS(graph, hashmap, prevmap, start, target, refArr) {
  let queue = [start];
  let count = 0;

  hashmap[`${start.x}-${start.y}`] = true;

  while (queue.length > 0) {
    count++;
    let c = queue.pop();

    refArr[c.x + c.y * 50].current.style["transition-delay"] = `${count * 7}ms`;
    refArr[c.x + c.y * 50].current.classList.add("visited");

    if (c.x === target.x && c.y === target.y) {
      return [c, count];
    }

    if (c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
      queue.unshift({ x: c.x + 1, y: c.y });
      prevmap[`${c.x + 1}-${c.y}`] = { ...c };
      hashmap[`${c.x + 1}-${c.y}`] = true;
    }

    if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
      queue.unshift({ x: c.x - 1, y: c.y });
      prevmap[`${c.x - 1}-${c.y}`] = { ...c };
      hashmap[`${c.x - 1}-${c.y}`] = true;
    }

    if (c.y + 1 < 26 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
      queue.unshift({ x: c.x, y: c.y + 1 });
      prevmap[`${c.x}-${c.y + 1}`] = { ...c };
      hashmap[`${c.x}-${c.y + 1}`] = true;
    }

    if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
      queue.unshift({ x: c.x, y: c.y - 1 });
      prevmap[`${c.x}-${c.y - 1}`] = { ...c };
      hashmap[`${c.x}-${c.y - 1}`] = true;
    }
  }
  return null;
}

export function DFS(graph, hashmap, prevmap, start, end, refArr) {
  const queue = [start];
  let count = 0;

  hashmap[`${start.x}-${start.y}`] = true;

  while (queue.length > 0) {
    count++;
    let c = queue.shift();

    refArr[c.x + c.y * 50].current.style["transition-delay"] = `${count * 7}ms`;
    refArr[c.x + c.y * 50].current.classList.add("visited");

    if (c.x === end.x && c.y === end.y) {
      return [c, count];
    }

    if (c.y + 1 < 26 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
      queue.unshift({ x: c.x, y: c.y + 1 });
      prevmap[`${c.x}-${c.y + 1}`] = { ...c };
      hashmap[`${c.x}-${c.y + 1}`] = true;
    }

    if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
      queue.unshift({ x: c.x - 1, y: c.y });
      prevmap[`${c.x - 1}-${c.y}`] = { ...c };
      hashmap[`${c.x - 1}-${c.y}`] = true;
    }

    if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
      queue.unshift({ x: c.x, y: c.y - 1 });
      prevmap[`${c.x}-${c.y - 1}`] = { ...c };
      hashmap[`${c.x}-${c.y - 1}`] = true;
    }

    if (c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
      queue.unshift({ x: c.x + 1, y: c.y });
      prevmap[`${c.x + 1}-${c.y}`] = { ...c };
      hashmap[`${c.x + 1}-${c.y}`] = true;
    }
  }
  return null;
}

export function Dijkstra(graph, hashmap, prevmap, start, end, refArr) {
  const queue = [start];
  let count = 0;
  console.log(prevmap);
  hashmap[`${start.x}-${start.y}`] = true;

  while (queue.length > 0) {
    count++;
    sortByWeight(queue);
    let c = queue.shift();

    refArr[c.x + c.y * 50].current.style["transition-delay"] = `${count * 7}ms`;
    refArr[c.x + c.y * 50].current.classList.add("visited");

    if (c.x === end.x && c.y === end.y) {
      return [c, count];
    }

    if (c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
      prevmap[`${c.x + 1}-${c.y}`] = { ...c };
      hashmap[`${c.x + 1}-${c.y}`] = true;
      queue.unshift({ x: c.x + 1, y: c.y, weight: graph[c.y][c.x + 1].weight + prevmap[`${c.x + 1}-${c.y}`].weight });
    }

    if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
      prevmap[`${c.x - 1}-${c.y}`] = { ...c };
      hashmap[`${c.x - 1}-${c.y}`] = true;
      queue.unshift({ x: c.x - 1, y: c.y, weight: graph[c.y][c.x - 1].weight + prevmap[`${c.x - 1}-${c.y}`].weight });
    }

    if (c.y + 1 < 26 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
      prevmap[`${c.x}-${c.y + 1}`] = { ...c };
      hashmap[`${c.x}-${c.y + 1}`] = true;
      queue.unshift({ x: c.x, y: c.y + 1, weight: graph[c.y + 1][c.x].weight + prevmap[`${c.x}-${c.y + 1}`].weight });
    }

    if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
      prevmap[`${c.x}-${c.y - 1}`] = { ...c };
      hashmap[`${c.x}-${c.y - 1}`] = true;
      queue.unshift({ x: c.x, y: c.y - 1, weight: graph[c.y - 1][c.x].weight + prevmap[`${c.x}-${c.y - 1}`].weight });
    }
  }
  return null;
}

export function aStar(graph, hashmap, prevmap, start, end, refArr) {
  const queue = [start];
  let count = 0;

  hashmap[`${start.x}-${start.y}`] = true;

  while (queue.length > 0) {
    count++;
    sortByfValue(queue);
    let c = queue.shift();
    let h = Math.abs(c.x - end.x) + Math.abs(c.y - end.y);
    
    refArr[c.x + c.y * 50].current.style["transition-delay"] = `${count * 7}ms`;
    refArr[c.x + c.y * 50].current.classList.add("visited");

    if (c.x === end.x && c.y === end.y) {
      return [c, count];
    }

    if (c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
      prevmap[`${c.x + 1}-${c.y}`] = { ...c };
      hashmap[`${c.x + 1}-${c.y}`] = true;
      queue.unshift({
        x: c.x + 1,
        y: c.y,
        weight: graph[c.y][c.x + 1].weight + prevmap[`${c.x + 1}-${c.y}`].weight,
        fValue: graph[c.y][c.x + 1].weight + prevmap[`${c.x + 1}-${c.y}`].weight + h,
      });
    }

    if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
      prevmap[`${c.x - 1}-${c.y}`] = { ...c };
      hashmap[`${c.x - 1}-${c.y}`] = true;
      queue.unshift({
        x: c.x - 1,
        y: c.y,
        weight: graph[c.y][c.x - 1].weight + prevmap[`${c.x - 1}-${c.y}`].weight,
        fValue: graph[c.y][c.x - 1].weight + prevmap[`${c.x - 1}-${c.y}`].weight + h,
      });
    }

    if (c.y + 1 < 26 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
      prevmap[`${c.x}-${c.y + 1}`] = { ...c };
      hashmap[`${c.x}-${c.y + 1}`] = true;
      queue.unshift({
        x: c.x,
        y: c.y + 1,
        weight: graph[c.y + 1][c.x].weight + prevmap[`${c.x}-${c.y + 1}`].weight,
        fValue: graph[c.y + 1][c.x].weight + prevmap[`${c.x}-${c.y + 1}`].weight + h,
      });
    }

    if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
      prevmap[`${c.x}-${c.y - 1}`] = { ...c };
      hashmap[`${c.x}-${c.y - 1}`] = true;
      queue.unshift({
        x: c.x,
        y: c.y - 1,
        weight: graph[c.y - 1][c.x].weight + prevmap[`${c.x}-${c.y - 1}`].weight,
        fValue: graph[c.y - 1][c.x].weight + prevmap[`${c.x}-${c.y - 1}`].weight + h,
      });
    }
  }
  return null
}

function sortByWeight(queue) {
  queue.sort((nodeA, nodeB) => nodeA.weight - nodeB.weight);
}

function sortByfValue(queue) {
  queue.sort((nodeA, nodeB) => nodeA.fValue - nodeB.fValue)
}
