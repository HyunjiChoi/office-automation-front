<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            출하리스트
          </div>
        </h1>
      </div>
      <div class="custom-upload">
        <div class="ui segment">
          <div class="custom-title">
            파일 업로드
          </div>
          <div class="custom-date" v-if="!isFetching">
            <div class="ui selection input">
              <input type="text" placeholder="0000-00-00" v-model="inputCalDt">
              <!--              <i class="dropdown icon"></i>-->
              <!--              <div class="default text">-->
              <!--                달력(연월)-->
              <!--              </div>-->
              <!--              <div class="menu">-->
              <!--                <div class="item">-->
              <!--                  항목-->
              <!--                </div>-->
              <!--                <div class="item">-->
              <!--                  항목-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
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
            <!--            <ul class="custom-label">
                          <li>
                            <div class="ui label">
                              네이버.xslx
                              <i class="delete icon"></i>
                            </div>
                          </li>
                          <li>
                            <div class="ui label">
                              11번가.xslx
                              <i class="delete icon"></i>
                            </div>
                          </li>
                        </ul>-->
          </div>
          <div class="custom-file" v-else>
            <div class="custom-title">
            업로드중입니다..
            </div>
          </div>
          <div class="custom-save">
            <button class="ui primary button" @click="registerShipping" :disabled="isFetching">
              저장
            </button>
          </div>
        </div>
      </div>
     <div class="custom-caption">
<!--        <div class="custom-delete">
          <button class="ui button">
            삭제
          </button>
        </div>-->
<!--          <div class="custom-each">-->
<!--            <div class="ui selection dropdown">-->
<!--              <input type="hidden" name="gender">-->
<!--              <i class="dropdown icon"></i>-->
<!--              <div class="default text">5개씩 보기</div>-->
<!--              <div class="menu">-->
<!--                <div class="item">항목</div>-->
<!--                <div class="item">항목</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
      </div>
      <div class="custom-list">
        <table class="ui unstackable fixed selectable celled table">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <thead>
          <tr class="center aligned">
            <th>
              정산날짜
            </th>
            <th>
              쇼핑몰 명
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="center aligned" v-for="shipping in shippingList" :key="shipping.calDt">
            <td>
              {{ shipping.calDt }}
            </td>
            <td>
              <ul class="custom-label">
                <li v-for="nmShop in parseNmShop(shipping.nmShop)" :key="nmShop">
                  <div class="ui label">
                    <router-link :to="`/shippings/detail?calDt=${shipping.calDt}&nmShop=${nmShop}`">
                    {{ nmShop }}
                    </router-link>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import {shippingApi} from '@/api';
import fileMixin from "@/mixins/fileMixin";
import validation from "@/mixins/validation";

export default {
  name: "ShippingsDetail",
  mixins: [fileMixin,validation],
  created() {
    this.setData()
  },
  data() {
    return {
      shippingList: null,
      inputCalDt: '',
    }
  },
  methods: {
    async setData() {
      const { data } = await shippingApi.fetchShippingList()
      this.shippingList = data
    },
    parseNmShop(nmShop) {
      return nmShop.split(' ').filter(el => el)
    },
    async registerShipping(){
      this.isFetching = true;
      try {
        const file = this.getFile();
        if (!file || !this.validateDate(this.inputCalDt)) return;
        const formData = new FormData();
        formData.append('calDt', this.inputCalDt);
        formData.append('frontVideoFile', file);
        const {data} = await shippingApi.createSipping(formData);
        this.shippingList = data;
        this.inputCalDt = '';
      } finally {
        this.isFetching = false;
        this.$nextTick(() => {
          this.$refs.files.value = null;
          this.getFileName();
        })
      }
    }
  },
  watch: {
    inputCalDt(val){
      val = val.replace(/[^0-9]/g, '');
      this.inputCalDt =  val.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/g, '$1-$2-$3');
    }
  }
  // watch: {
  //   inputCalDt(val){
  //     val = val.replace(/[^0-9]/g, '');
  //     const year = val.slice(0,4);
  //     const month = val.slice(4,2);
  //     const day = val.slice(6,2);
  //     this.inputCalDt = `${year}-${month}-${day}`
  //   }
  // }
}
</script>
