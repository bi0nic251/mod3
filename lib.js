// libitems.js – FINAL stable utility library for EaglerForge 1.12.2

(function () {
  if (!window.ModAPI) {
    console.error("ModAPI missing!");
    return;
  }

  const lib = {};

  // =====================
  // CORE REFERENCES
  // =====================
  lib.player = () => ModAPI.player;
  lib.world = () => ModAPI.world;

  // =====================
  // CHAT
  // =====================
  lib.chat = function (msg) {
    ModAPI.displayChatMessage("§a[LibItems] §f" + msg);
  };

  // =====================
  // POSITION HELPERS
  // =====================
  lib.playerPos = function () {
    const p = ModAPI.player;
    return {
      x: Math.floor(p.posX),
      y: Math.floor(p.posY),
      z: Math.floor(p.posZ)
    };
  };

  // =====================
  // BLOCK HELPERS
  // =====================
  lib.getBlock = function (x, y, z) {
    return ModAPI.world.getBlockState(x, y, z);
  };

  lib.setBlock = function (x, y, z, id) {
    ModAPI.world.setBlockState(x, y, z, id);
  };

  // =====================
  // UNDO / REDO SYSTEM
  // =====================
  lib.undoStack = [];
  lib.redoStack = [];
  lib.MAX_HISTORY = 20;

  lib.pushUndo = function (changes) {
    if (!changes || !changes.length) return;

    lib.undoStack.push(changes);
    if (lib.undoStack.length > lib.MAX_HISTORY) {
      lib.undoStack.shift();
    }
    lib.redoStack.length = 0;
  };

  lib.undo = function () {
    const last = lib.undoStack.pop();
    if (!last) {
      lib.chat("Nothing to undo");
      return;
    }

    last.forEach(b => {
      ModAPI.world.setBlockState(b.x, b.y, b.z, b.oldId);
    });

    lib.redoStack.push(last);
    lib.chat("Undo complete");
  };

  lib.redo = function () {
    const last = lib.redoStack.pop();
    if (!last) {
      lib.chat("Nothing to redo");
      return;
    }

    last.forEach(b => {
      ModAPI.world.setBlockState(b.x, b.y, b.z, b.newId);
    });

    lib.undoStack.push(last);
    lib.chat("Redo complete");
  };

  // =====================
  // CHANGE RECORDING
  // =====================
  lib.recordBlockChange = function (x, y, z, newId) {
    return {
      x: x,
      y: y,
      z: z,
      oldId: ModAPI.world.getBlockState(x, y, z),
      newId: newId
    };
  };

  // =====================
  // CLIPBOARD (STRUCTURES)
  // =====================
  lib.clipboard = [];

  lib.copyRegion = function (minX, minY, minZ, maxX, maxY, maxZ) {
    lib.clipboard = [];

    for (let x = minX; x <= maxX; x++)
      for (let y = minY; y <= maxY; y++)
        for (let z = minZ; z <= maxZ; z++) {
          lib.clipboard.push({
            x: x - minX,
            y: y - minY,
            z: z - minZ,
            id: ModAPI.world.getBlockState(x, y, z)
          });
        }

    lib.chat("Copied " + lib.clipboard.length + " blocks");
  };

  lib.pasteClipboard = function (originX, originY, originZ) {
    if (!lib.clipboard.length) {
      lib.chat("Clipboard empty");
      return null;
    }

    const undo = [];

    lib.clipboard.forEach(b => {
      const x = originX + b.x;
      const y = originY + b.y;
      const z = originZ + b.z;

      undo.push({
        x, y, z,
        oldId: ModAPI.world.getBlockState(x, y, z),
        newId: b.id
      });

      ModAPI.world.setBlockState(x, y, z, b.id);
    });

    lib.pushUndo(undo);
    lib.chat("Pasted structure");
  };

  // =====================
  // SAFETY / DEBUG
  // =====================
  lib.clearHistory = function () {
    lib.undoStack.length = 0;
    lib.redoStack.length = 0;
    lib.chat("History cleared");
  };

  // =====================
  // EXPORT
  // =====================
  window.libitems = lib;
  lib.chat("Loaded (final)");
})();
