export const diffList = (o: string[], n: string[]) => {
  let out = diff(o, n);

  let os = "";
  for (let i = 0; i < out.o.length; i++) {
    if (out.o[i].text != null) {
      os += out.o[i].text + "\n";
    } else {
      os += out.o[i] + "\n";
    }
  }

  let ns = "";
  for (let i = 0; i < out.n.length; i++) {
    if (out.n[i].text != null) {
      ns += out.n[i].text + "\n";
    } else {
      ns += out.n[i] + "\n";
    }
  }
  console.log(os, ns);
};

export const diffList2 = (o: string[], n: string[]) => {
  let out = diff(o, n);

  let str = "";

  if (out.n.length === 0) {
    for (let i = 0; i < out.o.length; i++) {
      str += i + ". " + out.o[i] + "\n";
    }
  } else {
    if (out.n[0].text == null) {
      for (let j = 0; j < out.o.length && out.o[j].text == null; j++) {
        str += "   " + out.o[j] + "\n";
      }
    }

    for (let i = 0; i < out.n.length; i++) {
      if (out.n[i].text == null) {
        str += "   " + out.n[i] + "\n";
      } else {
        let pre = "";

        for (
          let j = out.n[i].row + 1;
          j < out.o.length && out.o[j].text == null;
          j++
        ) {
          pre += j + ". " + out.o[j] + "\n";
        }
        str += i + ". " + out.n[i].text + "\n" + pre;
      }
    }
  }
  return str;
};

function diff(o: any, n: any) {
  let newSeq: any = {};
  let oldSeq: any = {};

  const deepO = JSON.parse(JSON.stringify(o));
  const deepN = JSON.parse(JSON.stringify(n));

  for (let i = 0; i < n.length; i++) {
    if (newSeq[deepN[i]] == null)
      newSeq[deepN[i]] = {rows: new Array(), o: null};
    newSeq[deepN[i]].rows.push(i);
  }

  for (let i = 0; i < o.length; i++) {
    if (oldSeq[deepO[i]] == null)
      oldSeq[deepO[i]] = {rows: new Array(), n: null};
    oldSeq[deepO[i]].rows.push(i);
  }

  for (let i in newSeq) {
    if (
      newSeq[i].rows.length === 1 &&
      typeof oldSeq[i] != "undefined" &&
      oldSeq[i].rows.length === 1
    ) {
      deepN[newSeq[i].rows[0]] = {
        text: deepN[newSeq[i].rows[0]],
        row: oldSeq[i].rows[0],
      };
      deepO[oldSeq[i].rows[0]] = {
        text: deepO[oldSeq[i].rows[0]],
        row: newSeq[i].rows[0],
      };
    }
  }

  for (let i = 0; i < n.length - 1; i++) {
    if (
      deepN[i].text != null &&
      deepN[i + 1].text == null &&
      deepN[i].row + 1 < o.length &&
      deepO[deepN[i].row + 1].text == null &&
      deepN[i + 1] === deepO[deepN[i].row + 1]
    ) {
      deepN[i + 1] = {text: deepN[i + 1], row: deepN[i].row + 1};
      deepO[deepN[i].row + 1] = {text: deepO[deepN[i].row + 1], row: i + 1};
    }
  }

  for (let i = n.length - 1; i > 0; i--) {
    if (
      deepN[i].text != null &&
      deepN[i - 1].text == null &&
      deepN[i].row > 0 &&
      deepO[deepN[i].row - 1].text == null &&
      deepN[i - 1] === deepO[deepN[i].row - 1]
    ) {
      deepN[i - 1] = {text: deepN[i - 1], row: deepN[i].row - 1};
      deepO[deepN[i].row - 1] = {text: deepO[deepN[i].row - 1], row: i - 1};
    }
  }

  return {o: deepO, n: deepN};
}
