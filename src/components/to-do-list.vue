<template>
  <div class="overall">

    <h2>To-Do List</h2>

    <div class="list-container">

      <div class="info" v-if="this.items.length === 0"> list is empty. add a task below. </div>
      <div class="info" v-if="this.items.length !== 0"> click on completed tasks to
        <span style="text-decoration: line-through white;">strikethrough.</span> 
      </div>

      <ul>
        <li v-for="(item, index) in items" v-bind:key="index">
          <div class="label-container">
            <label class="task" v-on:click="checkItem(index)" v-show="!item.checked">{{ item.task }}</label>
            <label class="task-checked" v-on:click="checkItem(index)" v-show="item.checked">{{ item.task }}</label>
          </div>
          <button v-on:click="deleteItem(index)">-</button>
        </li>
      </ul>
      
    </div>

    <div class="add-container">
      <input class="inputText" type="text" v-model="inputItem" v-on:keyup.enter="addItem()" placeholder="Add a task"/>
      <button class="addButton" v-on:click="addItem()">+</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "to-do-list",
  data() {
    return {
      items: [],
      inputItem: "",
    };
  },
  methods: {
    addItem: function () {
      if (this.inputItem.split(' ').join('') !== "") {
        this.items.push(
          {
            task: this.inputItem,
            checked: false
          }
        );
        this.inputItem = "";
      }
    },
    deleteItem: function (index) {
      this.items.splice(index, 1);
    },
    checkItem: function (index) {
      this.items[index].checked = !this.items[index].checked;
    }
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Nunito);

.overall {
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: manipulation;
  margin-top: 5vh;
  background: transparent;
}

/** header */
h2 {
  font-family: "Nunito";
  color: #cdd0d7;
  margin-bottom: 10px;
}

/** list */
.list-container {
  width: 75vw;
}

.info {
  font-family: "Nunito";
  color: #b3bcc4;
  font-size: 14px;
  margin-left: 4px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  word-wrap: normal;
}

li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
}

label {
  font-family: "Nunito";
  color: #b3bcc4;
  word-wrap: normal;
  margin-left: 4px;
}

/** when label selected, strikethrough */
.task-checked {
  text-decoration: line-through white;
}

/** add container */
.add-container {
  display: flex;
  border-radius: 50px;
  width: 80vw;
  margin: 16px;
  padding: 2px;
  justify-content: center;
  height: 30px;
  background: #161617;
  box-shadow: -2px -2px 3px #0d0d0d, 
              2px 2px 3px #1f1f21;
}

.inputText {
  width: 85%;
  border: none;
  border-radius: 50px;
  background: transparent;
  color: #b3bcc4;
  padding-left: 2%;
  font-size: 16px;
}

::placeholder {
  color: #4c5257;
}

.inputText:focus {
  outline: none;
}

button {
  font-size: 14px;
  font-family: "Nunito";
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: transparent;
  color: #f6f5f7;
}

/** screen size above 768px */
@media only screen and (min-width: 768px) {
  .list-container {
    width: 385px;
  }

  label {
    cursor: pointer;
    position: relative;
    display: block;
  }

  /** label transition (strikethrough when hover) */
  .task:before {
    content: '';
    position: absolute;
    width: 0%;
    height: 1px;
    margin-top: 10px;
    background: white;
  }

  .task:hover:before {
    background: white;
    width: 100%;
    transition: width 0.2s cubic-bezier(1, 0, 0.58, 0.97);
  }

  .add-container {
    width: 420px;
  }
}

</style>