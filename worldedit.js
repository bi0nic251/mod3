if (m.startsWith("//build ")) {
  const name = m.split(" ")[1];
  const s = VANILLA_STRUCTURES[name];

  if (!s) {
    chat("Unknown structure");
    chat(Object.keys(VANILLA_STRUCTURES).join(", "));
    e.cancel = true;
    return;
  }

  const p = libitems.playerPos();
  const undo = [];
  const blocks = s.build();

  blocks.forEach(b => {
    const x = p.x + b.x;
    const y = p.y + b.y;
    const z = p.z + b.z;

    undo.push({
      x,y,z,
      id: ModAPI.world.getBlockState(x,y,z),
      newId: b.id
    });

    ModAPI.world.setBlockState(x,y,z,b.id);
  });

  libitems.saveUndo(undo);
  chat("Built: " + name);
  e.cancel = true;
}
