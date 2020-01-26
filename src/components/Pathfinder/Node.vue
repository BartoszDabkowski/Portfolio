<template>
  <div class="node" :class="classes" @click="toggleNode">
    <div class="dot"></div>
  </div>
</template>

<script lang="ts">
import { CellType } from "@/models/CellType";
import Cell from "@/models/Cell";

export default {
  name: "Node",
  data: () => ({}),
  props: {
    node: Cell,
    isLocked: Boolean
  },
  computed: {
    classes: function() {
      return {
        active: this.node.cellType === CellType.Wall,
        start: this.node.cellType === CellType.Start,
        finish: this.node.cellType === CellType.Finish,
        visited: this.node.isVisited,
        shortest: this.node.isShortest,
        locked: this.isLocked
      };
    }
  },
  methods: {
    toggleNode() {
      this.$emit("change-node", {
        rowIndex: this.node.rowIndex,
        colIndex: this.node.colIndex
      });
    }
  }
};
</script>

<style scoped>
.node {
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #bbb;
  background-color: white;
}
.node:not(.locked) {
  cursor: pointer;
}
.dot {
  position: relative;
  left: -1px;
  top: -1px;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
}
.node:not(.locked):hover {
  background-color: #eee;
}

.node.visited:hover {
  background-color: white;
  cursor: default;
}

.node.active {
  background-color: #ccc;
}

.node.visited > .dot {
  animation: 1s visitedAnimation;
  background-color: rgba(0, 190, 218, 0.75);
}

.node.start {
  background-color: green;
  border: 1px solid darkgreen;
}

.node.finish {
  background-color: red;
  border: 1px solid darkred;
}

.node.finish.visited > .dot {
  background-color: red;
}

.node.shortest.visited {
  background-color: rgba(0, 190, 218, 0.75);
  border: 1px solid rgba(0, 190, 218, 0.75);
}

.node.shortest.visited > .dot {
  animation: 1s visitedAnimation2;
  background-color: gold;
}

@keyframes visitedAnimation {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(0, 217, 159, 0.75);
  }

  100% {
    transform: scale(1);
    background-color: rgba(0, 190, 218, 0.75);
  }
}

@keyframes visitedAnimation2 {
  0% {
    transform: scale(1.5);
    background-color: orange;
  }

  100% {
    transform: scale(1);
    background-color: gold;
  }
}
</style>