<template>
  <div>
    <v-card class="mx-auto" max-width="350">
      <h2 class="title">あなたの挑戦するミッション</h2>
      <v-row dense>
        <v-col v-for="(mission, i) in missions" :key="i" cols="12" class="col">
          <v-card class="mx-auto" max-width="330">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title v-text="mission.mission"></v-card-title>
              </div>
              <v-avatar class="ma-3" size="100" tile>
                <v-img :src="missionImage"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="link">
        <router-link to="/">トップに戻る</router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      missionImage: require("@/assets/mission.jpg"),
      missions: [
        {
          id: "",
          mission: "",
        },
      ],
    };
  },
  created() {
    this.arrShuffle(this.$store.state.missions);
  },
  methods: {
    arrShuffle(arr) {
      while (arr.length > 0) {
        var n = arr.length;
        var k = Math.floor(Math.random() * n);
        if (this.missions.length === 4) {
          break;
        }
        this.missions.push(arr[k]);
        arr.splice(k, 1);
      }
      this.missions.shift();
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  text-align: center;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
.right {
  margin: 0 0 0 auto;
}
.btn {
  width: 100%;
  font-weight: bold;
}
.col {
  padding-top: 0px;
  padding-bottom: 5px;
}
</style>
