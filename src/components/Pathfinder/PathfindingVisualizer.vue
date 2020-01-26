<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="2">
        <v-btn color="success" :disabled="isLocked" @click="solve">Solve</v-btn>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="primary" :disabled="isLocked" @click="rerun">Re-Run</v-btn>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="error" :disabled="isLocked" @click="reset">Reset</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="pv-grid">
          <div v-for="(row, rowIndex) in grid.numRows" :key="rowIndex" class="pv-row">
            <div v-for="(col, colIndex) in grid.numCols" :key="colIndex">
              <Node
                :key="`${rowIndex}_${colIndex}`"
                :node="getCell(rowIndex, colIndex)"
                :is-locked="isLocked"
                @change-node="toggleNode($event)"
              ></Node>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Node from "@/components/Pathfinder/Node";
import { CellType } from "@/models/CellType";
import Cell from "@/models/Cell";
import Grid from "@/models/Grid";
import DFS from "@/models/Algorithms/DFS";

export default {
  name: "PathfindingVisualizer",
  components: {
    Node
  },
  data: () => ({
    //grid: new Grid(18, 28),
    grid: new Grid(5, 7),
    loaded: false,
    isLocked: false
  }),
  mounted: function() {},
  methods: {
    solve() {
      this.isLocked = true;
      let dfs = new DFS();
      let traversalOrderArr = dfs.getPathFindingData(this.grid);

      if (traversalOrderArr == null) return;

      this.animateCells(
        traversalOrderArr.traversalOrder,
        traversalOrderArr.shortestPathOrder
      );
    },
    reset() {
      //this.grid = new Grid(18, 28);
      this.grid = new Grid(5, 7);
    },
    rerun() {
      this.grid.resetVisited();
      console.log("TCL: rerun -> this.grid.resetVisited");
    },
    toggleNode(node: any) {
      if (!this.isLocked) {
        this.grid.toggleWall(node.rowIndex, node.colIndex);
      }
    },
    getCell(rowIndex: number, colIndex: number) {
      return this.grid.getCell(rowIndex, colIndex);
    },
    getAnswer() {
      let dfs = new DFS();
      dfs.solve(this.grid);
    },
    animateCells(
      traversalOrderArr: [number, number][][],
      shortest: number[][]
    ) {
      let self = this;

      for (let i = 0; i < traversalOrderArr.length; i++) {
        setTimeout(() => {
          let layer = traversalOrderArr[i];
          layer.forEach((cell: [number, number]) => {
            self.grid.setVisitedCell(cell[0], cell[1]);
          });
        }, 150 * i);
      }

      for (let i = 0; i < shortest.length; i++) {
        setTimeout(() => {
          let cell = shortest[i];
          self.grid.setShortestPathCell(cell[0], cell[1]);
        }, 150 * traversalOrderArr.length + 50 * i);
      }

      setTimeout(() => {
        this.isLocked = false;
      }, (traversalOrderArr.length + 4) * 250);
    }
  }
};
</script>

<style scoped>
.pv-grid {
  /* width: 400px; */
}

.pv-row {
  display: flex;
  align-items: center;
}
</style>