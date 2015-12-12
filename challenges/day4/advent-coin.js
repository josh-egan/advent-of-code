import forge from 'node-forge'

export default {
  getSmallestIntForHashStartingWith(key, startsWith) {
    let n = 0
    while(true) {
      let md = forge.md.md5.create();
      md.update(`${key}${n}`);
      if (md.digest().toHex().slice(0, startsWith.length) === startsWith)
        break
      else
        n++

      if(n % 100000 === 0)
        console.log(n)
    }

    return n
  }
}
