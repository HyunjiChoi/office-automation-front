<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            자사몰
          </div>
        </h1>
      </div>
      <div class="custom-upload">
        <div class="ui segment">
          <div class="custom-title">
            파일 업로드
          </div>
          <div class="custom-file" v-if="!isFetching">
            <div class="custom-input">
              <div class="ui fluid action input">
                <input type="text" v-model="fileName" placeholder="선택된 파일이 없습니다." readonly>
                <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="getFileName" ref="files" hidden>
                <div class="ui button" @click="selectFile">
                  파일선택
                </div>
              </div>
            </div>
          </div>
          <div class="custom-file" v-else>
            <div class="custom-title">
              업로드중입니다..
            </div>
          </div>
          <div class="custom-save">
            <button class="ui primary button" @click="save" :disabled="isFetching">
              저장
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import fileMixin from "@/mixins/fileMixin";
import {companyMallApi} from "@/api";
import fileSaver from "@/util/fileSaver";

export default {
  name: "CompanyMall",
  mixins: [fileMixin],
  created() {
  },
  data() {
    return {
      isFetching: false
    }
  },
  methods: {
    async save() {
      this.isFetching = true;
      try {
        const file = this.getFile();
        if (!file) return;
        const formData = new FormData();
        formData.append('frontVideoFile', file);
        fileSaver.downloadExcelFile(await companyMallApi.createCompanyMall(formData), '자사몰.xlsx');
      } finally {
        this.isFetching = false;
        this.$nextTick(() => {
          this.$refs.files.value = null;
          this.getFileName();
        })
      }
    },
  },
  watch: {
    isFetching(){
      this.$store.commit('setShowLoader', this.isFetching);
    }
  }
}
</script>
