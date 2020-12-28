<template>
  <v-card class="mx-auto" max-width="350">
    <h2 class="title">シングルス選手登録</h2>
    <v-col class="col">
      <v-row>
        <v-col>
          <v-text-field v-model="name" label="名前" required></v-text-field>
        </v-col>
      </v-row>
      <v-col>
        <v-row>
          <v-btn
            outlined
            color="indigo"
            class="white--text register"
            @click="registerSinglesPlayer()"
            :disabled="name === ''"
          >
            シングルス選手登録
            <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <br />
        </v-row>
      </v-col>
    </v-col>
    <div class="link">
      <router-link to="/">トップに戻る</router-link>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      file: "",
    };
  },
  methods: {
    registerSinglesPlayer() {
      this.$axios
        .post("/singlesPlayer", {
          name: this.name,
        })
        .then(() => {
          alert("登録しました");
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
.uploadButton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: #099;
  color: #fff;
  text-align: center;
  padding: 7px;
  width: 180px;
  cursor: pointer;
}
.uploadButton:hover {
  background: #0aa;
}
.uploadButton input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.uploadValue {
  display: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 3px;
  color: #ffffff;
}
.btn {
  width: 100%;
}
.register {
  width: 100%;
}
.title {
  margin-top: 20px;
  text-align: center;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 0px;
  padding-bottom: 20px;
}
.col {
  padding-top: 5px;
}
</style>
