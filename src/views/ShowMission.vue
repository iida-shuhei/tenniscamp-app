<template>
  <div>
    <v-card class="mx-auto" max-width="350">
      <h2 class="title">ミッション一覧</h2>
      <v-col>
        <v-card-actions>
          <v-btn class="btn" color="success" @click="toSelectedMission()"
            >試合のミッションを選ぶ</v-btn
          >
        </v-card-actions>
        <br />
      </v-col>
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
            <v-card-actions>
              <v-btn small class="btn" color="error" @click="confirmMissionsDelete(mission)"
                >このミッションを削除</v-btn
              >
            </v-card-actions>
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
    this.missions = this.$store.state.missions;
  },
  methods: {
    toSelectedMission() {
      this.$router.push("/selectedMission");
    },
    confirmMissionsDelete(mission) {
      var result = confirm(mission.mission + "を削除しますか？");
      if (result) {
        this.deleteMission(mission);
      }
    },
    deleteMission(mission) {
      const id = mission.id;
      this.$axios.delete("/mission/" + id).then(() => {
        this.$router.push("/");
      });
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
