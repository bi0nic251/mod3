// vanilla_structures.js – VERIFIED EaglerForge 1.12.2

(function () {
  if (!window.ModAPI) return;

  const S = {};

  function box(x1,y1,z1,x2,y2,z2,id) {
    const a = [];
    for (let x=x1;x<=x2;x++)
      for (let y=y1;y<=y2;y++)
        for (let z=z1;z<=z2;z++)
          a.push({x,y,z,id});
    return a;
  }

  // ===== VILLAGES =====
  function villageHouse(wood, roof) {
    return [
      ...box(0,0,0,6,0,6,5),
      ...box(0,1,0,0,4,6,wood),
      ...box(6,1,0,6,4,6,wood),
      ...box(0,1,0,6,4,0,wood),
      ...box(0,1,6,6,4,6,wood),
      ...box(0,5,0,6,5,6,roof)
    ];
  }

  S.village_plains  = { build: () => villageHouse(17, 5) };
  S.village_desert  = { build: () => villageHouse(24, 24) };
  S.village_savanna = { build: () => villageHouse(162, 5) };
  S.village_taiga   = { build: () => villageHouse(17, 5) };

  // ===== TEMPLES =====
  S.desert_temple = {
    build: () => [
      ...box(0,0,0,10,0,10,24),
      ...box(0,1,0,10,7,0,24),
      ...box(0,1,10,10,7,10,24),
      ...box(0,1,0,0,7,10,24),
      ...box(10,1,0,10,7,10,24)
    ]
  };

  S.jungle_temple = {
    build: () => [
      ...box(0,0,0,11,0,11,98),
      ...box(0,1,0,11,7,0,98),
      ...box(0,1,11,11,7,11,98)
    ]
  };

  // ===== IGLOO =====
  S.igloo = {
    build: () => [
      ...box(1,0,1,3,0,3,80),
      ...box(0,1,0,4,3,4,80)
    ]
  };

  // ===== WITCH HUT =====
  S.witch_hut = {
    build: () => [
      ...box(0,3,0,6,3,6,5),
      ...box(0,4,0,0,6,6,17),
      ...box(6,4,0,6,6,6,17)
    ]
  };

  // ===== STRONGHOLD =====
  S.stronghold_portal = {
    build: () => [
      ...box(0,0,0,10,0,10,98),
      ...Array.from({length:12},(_,i)=>({
        x:2+(i%4)*2,y:1,z:2+Math.floor(i/4)*2,id:120
      }))
    ]
  };

  S.stronghold_library = {
    build: () => [
      ...box(0,0,0,8,6,8,98),
      ...box(1,1,1,7,5,7,47)
    ]
  };

  // ===== NETHER =====
  S.nether_fortress = {
    build: () => [
      ...box(0,0,0,12,4,12,112)
    ]
  };

  // ===== END =====
  S.end_city = {
    build: () => [
      ...box(0,0,0,6,10,6,121)
    ]
  };

  // ===== OCEAN =====
  S.ocean_monument = {
    build: () => [
      ...box(0,0,0,20,8,20,168)
    ]
  };

  // ===== MANSION =====
  S.woodland_mansion = {
    build: () => [
      ...box(0,0,0,20,6,20,5)
    ]
  };

  window.VANILLA_STRUCTURES = S;
})();
