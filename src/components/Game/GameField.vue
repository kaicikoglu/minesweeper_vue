<script>
import $ from 'jquery';
import FlagCounter from "@/components/Game/FlagCounter.vue";

const base_url = "https://minesweeper-web.fly.dev/"

export default {
  components: {FlagCounter},
  props: {
    difficulty: {
      type: String,
      default: 'easy'
    }
  },
  data() {
    return {
      clickCount: 0,
      timer: null,
      minesweeperGrid: [],
      socket: null,
      flags: 0
    };
  },
  methods: {
    async loadStylesheet() {
      try {
        const module = await import(`@/assets/styles/${this.difficulty}.css`);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = module.default;
        document.head.appendChild(link);
      } catch (error) {
        console.error('Failed to load stylesheet:', error);
      }
    },
    connectWebSockets() {
      this.socket = new WebSocket("ws://minesweeper-web.fly.dev/socket");

      this.socket.onopen = () => {
        console.log('WebSocket connection opened.');
      };

      this.socket.onmessage = (event) => {
        const gameData = JSON.parse(event.data);

        if (gameData.event === "bombClick") {
          this.handleBombClick(gameData.row, gameData.col, gameData.size);
        } else {
          this.handleJSONData(gameData);
          this.getFlags();
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed.');
      };

      this.socket.onerror = (error) => {
        console.log('Error in Websocket Occurred: ' + error);
      };
    },
    handleBombClick(row, col, gridSize) {
      this.propagateShockwave(row, col, gridSize);
    },
    propagateShockwave(row, col, gridSize) {
      const directions = [
        {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1},
        {x: 0, y: -1}, /* Center cell */ {x: 0, y: 1},
        {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}
      ];

      const visited = new Set();
      visited.add(`${row}-${col}`);
      const queue = [{row, col, delay: 50}];

      while (queue.length > 0) {
        const {row: currRow, col: currCol, delay} = queue.shift();

        directions.forEach(direction => {
          const nextRow = currRow + direction.x;
          const nextCol = currCol + direction.y;
          const cellId = `${nextRow}-${nextCol}`;

          if (!visited.has(cellId) && this.isValidCell(nextRow, nextCol, gridSize)) {
            visited.add(cellId);
            const cell = $(`#${cellId}`);
            this.applyShockwaveEffect(cell, delay);
            queue.push({row: nextRow, col: nextCol, delay: delay + 50});
          }
        });
      }

      setTimeout(() => {
        this.showLostScreen();
      }, 2000);
    },
    isValidCell(row, col, gridSize) {
      return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
    },
    applyShockwaveEffect(cell, delay) {
      setTimeout(() => {
        cell.addClass('shockwave'); // Apply the shockwave class to trigger the animation
        setTimeout(() => {
          cell.removeClass('shockwave'); // Remove the shockwave class after the animation duration
        }, 1000); // Adjust duration as needed to match the animation duration in your CSS
      }, delay);
    },
    showLostScreen() {
      this.$router.push({name: 'lose'});
    },
    flag(x, y) {
      const message = {
        command: "flag",
        x: x,
        y: y
      };

      this.socket.send(JSON.stringify(message));
      this.getFlags();
    },
    reveal(x, y) {
      const message = {
        command: "reveal",
        x: x,
        y: y
      };
      this.socket.send(JSON.stringify(message));
    },
    initialField() {
      this.loadStylesheet()
      fetch(base_url + `game/${this.difficulty}`)
          .then(response => {
            if (!response.ok) {
              console.log(response)
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(jsonData => {
            this.handleJSONData(jsonData);
            this.getFlags();
          })
          .catch(error => {
            console.error('There was a problem fetching the data:', error);
          });
    },
    sendBombClick(row, col, size) {
      const message = {
        command: "bomb",
        size: size,
        x: row,
        y: col
      };
      this.socket.send(JSON.stringify(message));
    },
    getFlags() {
      $.ajax({
        url: base_url + 'game/flagsLeft',
        method: 'GET',
        success: (response) => {
          this.flags = response.flags_left;
        },
        error: (xhr, status, error) => {
          console.error('Error fetching flags left:', error);
        }
      });
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    handleJSONData(jsonData) {
      try {
        this.validateJSONStructure(jsonData);

        const {sizeRow, sizeCol, cells} = jsonData.field;
        this.minesweeperGrid = this.createMinesweeperGrid(sizeRow, sizeCol, cells);
      } catch (error) {
        console.error('Error processing JSON data:', error);
      }
    },
    validateJSONStructure(jsonData) {
      if (!jsonData.field || !jsonData.field.sizeRow || !jsonData.field.sizeCol || !jsonData.field.cells) {
        throw new Error('Invalid field structure in jsonData');
      }
    },
    createMinesweeperGrid(rows, cols, cellDataArray) {
      return Array.from({length: rows}, (_, rowIndex) => {
        return Array.from({length: cols}, (_, colIndex) => {
          const cellData = this.findCellData(cellDataArray, rowIndex, colIndex);

          if (cellData && cellData.cell) {
            const {first, second} = cellData.cell;
            let visible = false;
            if (first !== "■") {
              visible = true;
            }
            return {
              visible: visible, // Adjust based on your logic
              type: first === "■" ? "button" : first,
              value: first === "■" && second ? second : first, // Check if second is defined
              additionalData: cellData.cell.second || null, // Adjust based on your logic
            };
          } else {
            console.error('Invalid or missing cell data for row:', rowIndex, 'col:', colIndex);
            return {};
          }
        });
      });
    },
    findCellData(cellDataArray, rowIndex, colIndex) {
      return cellDataArray.find((cell) => cell.row === rowIndex && cell.col === colIndex) || {};
    },
    handleClick(row, col, rows, second) {
      this.clickCount++;
      if (this.clickCount === 1) {
        this.timer = setTimeout(async () => {

          if (second === "✴") {
            this.reveal(row, col);
            await this.sleep(200);
            this.sendBombClick(row, col, rows);
          } else {
            this.reveal(row, col);
          }
          this.clickCount = 0;
        }, 300);
      } else if (this.clickCount === 2) {
        clearTimeout(this.timer);
        this.flag(row, col);
        this.clickCount = 0;
      }
    },
  },
  mounted() {
    this.loadStylesheet();
    this.initialField();
    this.connectWebSockets();
    this.getFlags();
  },
};
</script>

<template>
  <div>
    <div id="game">
      <FlagCounter :flags="this.flags"/>
      <div id="minesweeper-grid" class="game-container">
        <div v-for="(row, rowIndex) in minesweeperGrid" :key="rowIndex" class="cell-container">
          <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell"
               @click="handleClick(rowIndex, colIndex, rows, cell.value)">
            <template v-if="cell.visible">
              <template v-if="cell.value === '⚑'">
                <div class="flagged" :id="rowIndex + '-' + colIndex">{{ cell.value }}</div>
              </template>
              <template v-else-if="cell.value === '✴'">
                <div class="cell-type bomb" :id="rowIndex + '-' + colIndex">💣</div>
              </template>
              <template v-else-if="cell.value === '□'">
                <div class="cell-type empty-cell" :id="rowIndex + '-' + colIndex">{{ row.row }}</div>
              </template>
              <template v-else>
                <div class="cell-type" :class="`number-${cell.value}`" :id="rowIndex + '-' + colIndex">{{ cell.value }}
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
