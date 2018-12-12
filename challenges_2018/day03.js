export function findOverlapping(claimStrings) {
  const claims = parseClaims(claimStrings);
  const fabricClaims = buildClaimsMap(claims);

  const idsPerPosition = Object.values(fabricClaims);
  const conflictingPositions = idsPerPosition.filter(x => x.length > 1);
  return conflictingPositions.length;
}

export function findIdWithNoOverlapping(claimStrings) {
  const claims = parseClaims(claimStrings);
  const fabricClaims = buildClaimsMap(claims);

  const overlappingIds = new Set();
  Object.values(fabricClaims).forEach(ids => {
    if (ids.length > 1) {
      ids.forEach(id => overlappingIds.add(id));
    }
  })

  const allIds = claims.map(c => c.id);
  const nonOverlappingId = allIds.find(x => !overlappingIds.has(x));
  return nonOverlappingId;
}

function buildClaimsMap(claims) {
  const fabricClaims = {};

  claims.forEach(claim => {
    const { id, fromLeft, fromTop, height, width } = claim;
    for(let top = fromTop + 1; top <= fromTop + height; top++ ) {
      for(let left = fromLeft + 1; left <= fromLeft + width; left++) {
        const coordinates = `${left}x${top}`;
        if (fabricClaims[coordinates]) fabricClaims[coordinates].push(id);
        else fabricClaims[coordinates] = [id]
      }
    }
  })

  return fabricClaims;
}

function parseClaims(claimStrings) {
  return claimStrings.map(claimString => {
    // Each claim is a string in this form: '#18 @ 229,923: 29x22'

    const parts1 = claimString.split('@');
    const id = parseInt(parts1[0].replace('#', '').trim());

    const parts2 = parts1[1].split(':');

    const parts3 = parts2[0].split(',');
    const fromLeft = parseInt(parts3[0].trim());
    const fromTop = parseInt(parts3[1].trim());

    const parts4 = parts2[1].split('x');
    const width = parseInt(parts4[0].trim());
    const height = parseInt(parts4[1].trim());

    return {
      id,
      fromLeft,
      fromTop,
      width,
      height
    }
  })
}